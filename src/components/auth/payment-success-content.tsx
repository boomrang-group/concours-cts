
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { getFirebaseServices } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Vérification du paiement, veuillez patienter...");
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [finalReference, setFinalReference] = useState<string | null>(null);

  const amountInCents = parseInt(searchParams.get('amount') || '200', 10);
  const amountInUSD = amountInCents / 100;
  const urlReference = searchParams.get('ref');

  // Use a ref to prevent the createAccount function from running multiple times
  const hasCreatedAccount = useRef(false);

  useEffect(() => {
    const reference = urlReference || sessionStorage.getItem('paymentReference');
    if (!reference) {
        setStatusMessage("Impossible de vérifier la transaction. Référence de paiement manquante.");
        setErrorOccurred(true);
        setIsProcessing(false);
        return;
    }
    setFinalReference(reference);

    const pendingRegData = sessionStorage.getItem('pendingRegistration');
    if (!pendingRegData) {
        setStatusMessage("Données d'inscription non trouvées. Votre paiement a peut-être été reçu, mais la création de compte a échoué. Veuillez contacter le support.");
        setErrorOccurred(true);
        setIsProcessing(false);
        return;
    }

    const { auth, firestore } = getFirebaseServices();
    if (!auth || !firestore) {
        toast({
            title: "Erreur de configuration",
            description: "La configuration de Firebase est manquante. Impossible de créer le compte.",
            variant: "destructive",
        });
        setErrorOccurred(true);
        setStatusMessage("Erreur de configuration du serveur. Veuillez contacter le support.");
        setIsProcessing(false);
        return;
    }

    const createAccount = async () => {
        if (hasCreatedAccount.current) return;
        hasCreatedAccount.current = true; // Mark as started

        setStatusMessage("Paiement vérifié. Création de votre compte...");

        const values = JSON.parse(pendingRegData);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            const userProfile = {
                uid: user.uid,
                accountType: values.accountType,
                name: values.name,
                email: values.email,
                phone: values.phone || null,
                groupName: values.groupName || null,
                groupMembers: values.accountType === 'group' ? (values.memberDetails || []).concat({name: values.name, email: values.email}) : null,
                categories: values.categories,
                createdAt: new Date(),
                paymentStatus: 'completed',
                paymentReference: reference,
                paymentAmount: amountInUSD,
            };

            await setDoc(doc(firestore, "users", user.uid), userProfile);

            toast({
                title: "Compte créé avec succès !",
                description: "Bienvenue ! Votre inscription est maintenant terminée.",
            });
            setStatusMessage("Inscription réussie et paiement confirmé !");
        } catch (error: any) {
            console.error("Account creation error after payment:", error);
            setErrorOccurred(true);
            if (error.code === 'auth/email-already-in-use') {
                setStatusMessage("Paiement confirmé. Un compte avec cet email existe déjà.");
                toast({
                    title: "Compte déjà existant",
                    description: "Votre paiement a été confirmé. Veuillez vous connecter.",
                });
                setErrorOccurred(false); 
                router.push('/auth/login');
            } else {
                setStatusMessage("Une erreur est survenue lors de la création de votre compte. Veuillez contacter le support.");
                toast({
                    title: "Erreur de création de compte",
                    description: `Votre paiement a été reçu (Ref: ${reference}), mais nous n'avons pas pu créer votre compte. Veuillez nous contacter.`,
                    variant: "destructive",
                });
            }
        } finally {
            sessionStorage.removeItem('pendingRegistration');
            sessionStorage.removeItem('paymentReference');
            setIsProcessing(false);
        }
    };
    
    // Listen for payment verification from Firestore
    const paymentDocRef = doc(firestore, 'payments', reference);

    const timeoutId = setTimeout(() => {
        unsubscribe();
        if (!hasCreatedAccount.current) {
            setStatusMessage("La vérification du paiement a pris trop de temps. Si vous avez été débité, veuillez contacter le support.");
            setErrorOccurred(true);
            setIsProcessing(false);
        }
    }, 45000); // 45-second timeout

    const unsubscribe = onSnapshot(paymentDocRef, (docSnap) => {
        if (docSnap.exists() && !hasCreatedAccount.current) {
            const paymentData = docSnap.data();
            if (paymentData.status === 'completed') {
                clearTimeout(timeoutId);
                unsubscribe();
                createAccount();
            } else if (paymentData.status === 'failed') {
                clearTimeout(timeoutId);
                unsubscribe();
                setStatusMessage("Votre paiement a échoué selon la notification du service de paiement.");
                setErrorOccurred(true);
                setIsProcessing(false);
            }
        }
    }, (error) => {
        console.error("Firestore listener error:", error);
        clearTimeout(timeoutId);
        unsubscribe();
        setStatusMessage("Erreur lors de la vérification du paiement. Veuillez contacter le support.");
        setErrorOccurred(true);
        setIsProcessing(false);
    });

    return () => {
        clearTimeout(timeoutId);
        unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlReference]); // Only run on mount and when URL param changes

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
        {finalReference && <p className="text-xs text-muted-foreground">Référence de transaction : {finalReference}</p>}
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
      {finalReference && (
        <p className="text-xs text-muted-foreground">
          Référence de transaction : {finalReference}
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
