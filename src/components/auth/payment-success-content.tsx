
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFirebaseServices } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Finalisation de votre inscription, veuillez patienter...");

  const reference = searchParams.get('ref');
  const amountInCents = parseInt(searchParams.get('amount') || '200', 10);
  const amountInUSD = amountInCents / 100;

  useEffect(() => {
    const createAccount = async () => {
      const pendingRegData = sessionStorage.getItem('pendingRegistration');

      if (!pendingRegData) {
        setStatusMessage("Paiement confirmé. Si votre compte n'a pas été créé, veuillez contacter le support.");
        setIsProcessing(false);
        return;
      }
      
      const values = JSON.parse(pendingRegData);
      const { auth, firestore } = getFirebaseServices();

      if (!auth || !firestore) {
          toast({
              title: "Erreur de configuration",
              description: "La configuration de Firebase est manquante. Impossible de créer le compte.",
              variant: "destructive",
          });
          setIsProcessing(false);
          return;
      }

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
          paymentReference: reference || null,
          paymentAmount: amountInUSD,
        };

        await setDoc(doc(firestore, "users", user.uid), userProfile);

        toast({
            title: "Compte créé avec succès !",
            description: "Bienvenue ! Votre inscription est maintenant terminée.",
        });

        sessionStorage.removeItem('pendingRegistration');
        setStatusMessage("Inscription réussie et paiement confirmé !");

      } catch (error: any) {
        console.error("Account creation error after payment:", error);
        if (error.code === 'auth/email-already-in-use') {
            setStatusMessage("Paiement confirmé. Un compte avec cet email existe déjà.");
            toast({
                title: "Compte déjà existant",
                description: "Votre paiement a été confirmé. Veuillez vous connecter.",
            });
            sessionStorage.removeItem('pendingRegistration');
            router.push('/auth/login');
        } else {
            setStatusMessage("Une erreur est survenue lors de la création de votre compte. Veuillez contacter le support.");
            toast({
                title: "Erreur de création de compte",
                description: "Votre paiement a été reçu, mais nous n'avons pas pu créer votre compte. Veuillez nous contacter.",
                variant: "destructive",
            });
        }
      } finally {
        setIsProcessing(false);
      }
    };

    if (reference && isProcessing) {
      createAccount();
    } else {
        setStatusMessage("Paiement confirmé.");
        setIsProcessing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (isProcessing) {
    return (
      <div className="space-y-6 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 animate-pulse" />
        <p className="text-muted-foreground">{statusMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <p className="text-muted-foreground">
        {statusMessage} Votre paiement de <strong>${amountInUSD}</strong> a bien été reçu.
      </p>
      {reference && (
        <p className="text-xs text-muted-foreground">
          Référence de transaction : {reference}
        </p>
      )}
      <div className="p-4 bg-secondary/50 rounded-md">
        <p className="text-foreground font-semibold">
          La compétition officielle démarrera le 17 Juillet.
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
