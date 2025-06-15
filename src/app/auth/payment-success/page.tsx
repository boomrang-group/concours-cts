
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  useEffect(() => {
    // In a real app, you might want to verify the payment status with your backend using the reference
    // and then finalize account creation or activation.
    console.log("Payment success for reference:", reference);
    // Example: verifyPayment(reference).then(() => redirect('/dashboard'));
  }, [reference]);

  return (
    <AuthLayout
      title="Paiement Réussi !"
      description="Votre inscription et votre paiement ont été traités avec succès."
    >
      <div className="space-y-6 text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <p className="text-muted-foreground">
          Merci pour votre inscription à BantuChamp ! Votre paiement de $2 a été confirmé.
        </p>
        {reference && (
          <p className="text-xs text-muted-foreground">
            Référence de transaction : {reference}
          </p>
        )}
        <p className="text-muted-foreground">
          Vous pouvez maintenant accéder à votre tableau de bord.
        </p>
        <div>
          <Link href="/dashboard">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Accéder au Tableau de Bord
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
