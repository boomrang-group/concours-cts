
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  useEffect(() => {
    // In a real app, your backend would handle the 'notifyurl' from MaxiCash
    // to confirm payment, finalize account creation, and send welcome/credential emails.
    console.log("Payment success for reference:", reference);
    // Example: verifyPayment(reference).then(() => sendWelcomeEmail(userData));
  }, [reference]);

  return (
    <AuthLayout
      title="Inscription Réussie et Paiement Confirmé !"
      description="Bienvenue à BantuChamp !"
    >
      <div className="space-y-6 text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <p className="text-muted-foreground">
          Merci pour votre inscription ! Votre paiement de $2 a été confirmé.
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
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
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
    </AuthLayout>
  );
}
