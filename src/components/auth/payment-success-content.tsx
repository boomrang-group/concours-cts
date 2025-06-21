
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  useEffect(() => {
    if (reference) {
      // You might want to log this or send it to an analytics service
      console.log(`Payment success with reference: ${reference}`);
    }
    // Potentially, if user data was saved in a 'pending payment' state before redirecting to MaxiCash,
    // and if your notifyurl hasn't confirmed the user creation yet,
    // this might be a place to trigger a check or finalization if strictly necessary on client-side,
    // though backend handling via notifyurl is more robust.
  }, [reference]);

  return (
    <div className="space-y-6 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      {/* The title "Paiement Réussi !" can be part of AuthLayout or here if more specific */}
      {/* <h2 className="text-2xl font-bold">Paiement Réussi !</h2> */}
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
