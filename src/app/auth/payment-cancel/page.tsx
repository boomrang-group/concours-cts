
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <AuthLayout
      title="Paiement Annulé"
      description="Le processus de paiement pour votre inscription a été annulé."
    >
      <div className="space-y-6 text-center">
        <InfoIcon className="mx-auto h-16 w-16 text-yellow-500" />
        <p className="text-muted-foreground">
          Vous avez choisi d'annuler le paiement. Votre inscription n'est pas encore finalisée.
        </p>
        {reference && (
          <p className="text-xs text-muted-foreground">
            Référence de transaction concernée : {reference}
          </p>
        )}
        <p className="text-muted-foreground">
          Vous pouvez retourner à la page d'inscription si vous souhaitez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/signup" className="w-full">
            <Button variant="outline" className="w-full">
              Retourner à l'inscription
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Aller à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
