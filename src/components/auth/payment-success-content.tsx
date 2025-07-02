
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { getFirebaseServices } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Vérification du paiement, veuillez patienter...");
  const [errorOccurred, setErrorOccurred] = useState(false);
  
  const userProfileId = searchParams.get('ref');
  const amountInCents = parseInt(searchParams.get('amount') || '200', 10);
  const amountInUSD = amountInCents / 100;

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!userProfileId) {
        setStatusMessage("Impossible de vérifier la transaction. Référence de paiement manquante.");
        setErrorOccurred(true);
        setIsProcessing(false);
        return;
    }

    const { auth, firestore } = getFirebaseServices();
    if (!auth || !firestore) {
        setStatusMessage("Erreur de configuration du serveur. Veuillez contacter le support.");
        setErrorOccurred(true);
        setIsProcessing(false);
        return;
    }

    const userDocRef = doc(firestore, 'users', userProfileId);

    const createAuthUser = async () => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const pendingAuthData = sessionStorage.getItem('pendingAuth');
        if (!pendingAuthData) {
            setStatusMessage("Données d'authentification expirées ou introuvables. Votre paiement a été reçu, mais la création du compte a échoué. Veuillez contacter le support.");
            setErrorOccurred(true);
            setIsProcessing(false);
            return;
        }

        setStatusMessage("Paiement vérifié. Finalisation de la création de votre compte...");
        const { email, password } = JSON.parse(pendingAuthData);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateDoc(userDocRef, {
                uid: user.uid,
                paymentStatus: 'account_created'
            });

            toast({
                title: "Compte créé avec succès !",
                description: "Bienvenue ! Votre inscription est maintenant terminée.",
            });
            setStatusMessage("Inscription réussie et paiement confirmé !");

        } catch (error: any) {
            console.error("Account creation error after payment:", error);
            if (error.code === 'auth/email-already-in-use') {
                 setStatusMessage("Paiement confirmé. Un compte avec cet e-mail existe déjà. Veuillez vous connecter.");
                 toast({
                    title: "Compte déjà existant",
                    description: "Votre paiement a été confirmé. Veuillez vous connecter avec votre compte existant.",
                });
            } else {
                 setStatusMessage("Une erreur est survenue lors de la création de votre compte. Veuillez contacter le support.");
                 toast({
                    title: "Erreur de création de compte",
                    description: `Votre paiement a été reçu (Ref: ${userProfileId}), mais nous n'avons pas pu créer votre compte. Veuillez nous contacter.`,
                    variant: "destructive",
                });
                 setErrorOccurred(true);
            }
        } finally {
            sessionStorage.removeItem('pendingAuth');
            setIsProcessing(false);
        }
    };
    
    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
        if (hasProcessed.current) {
            unsubscribe();
            return;
        }

        if (docSnap.exists()) {
            const userData = docSnap.data();
            
            if (userData.paymentStatus === 'completed') {
                unsubscribe();
                await createAuthUser();
            } else if (userData.paymentStatus === 'account_created') {
                unsubscribe();
                hasProcessed.current = true;
                setStatusMessage("Votre compte est déjà créé et prêt !");
                sessionStorage.removeItem('pendingAuth');
                setIsProcessing(false);
            } else if (userData.paymentStatus === 'failed') {
                unsubscribe();
                hasProcessed.current = true;
                setStatusMessage("Votre paiement a échoué. Veuillez réessayer depuis la page d'inscription.");
                setErrorOccurred(true);
                setIsProcessing(false);
            }
        }
    }, (error) => {
        console.error("Firestore listener error:", error);
        unsubscribe();
        setStatusMessage("Erreur lors de la vérification du paiement. Veuillez contacter le support.");
        setErrorOccurred(true);
        setIsProcessing(false);
    });

    const timeoutId = setTimeout(() => {
        if (!hasProcessed.current) {
            unsubscribe();
            setStatusMessage("La vérification du paiement a pris trop de temps. Si vous avez été débité, veuillez contacter le support.");
            setErrorOccurred(true);
            setIsProcessing(false);
        }
    }, 45000); // 45-second timeout

    return () => {
        clearTimeout(timeoutId);
        unsubscribe();
    };
  }, [userProfileId, router, toast]);

  if (isProcessing) {
    return (
      <div className="space-y-6 text-center">
        <Loader2 className="mx-auto h-16 w-16 text-primary animate-spin" />
        <p className="text-muted-foreground">{statusMessage}</p>
      </div>
    );
  }

  if (errorOccurred) {
    return (
      <div className="space-y-6 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
        <p className="text-destructive font-semibold">Une erreur est survenue</p>
        <p className="text-muted-foreground">{statusMessage}</p>
        {userProfileId && <p className="text-xs text-muted-foreground">Référence de transaction : {userProfileId}</p>}
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            Retour à l'Accueil
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <p className="text-muted-foreground">
        {statusMessage} Votre paiement de <strong>${amountInUSD}</strong> a bien été reçu.
      </p>
      {userProfileId && (
        <p className="text-xs text-muted-foreground">
          Référence de transaction : {userProfileId}
        </p>
      )}
      <div className="p-4 bg-secondary/50 rounded-md">
        <p className="text-foreground font-semibold">
          La compétition officielle démarrera le 1er Août.
        </p>
        <p className="text-muted-foreground mt-1">
          Revenez à cette date pour vous connecter et commencer l'aventure !
        </p>
        <p className="text-muted-foreground mt-3">
          En attendant, vous pouvez participer à nos quizz quotidiens pour tenter de gagner des prix.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <a href="https://quiz.bantudemy.com" target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <ExternalLink className="mr-2 h-4 w-4" />
            Participer aux Quizz Quotidiens
          </Button>
        </a>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            Retour à l'Accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
