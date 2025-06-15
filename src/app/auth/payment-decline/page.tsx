
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentDeclinePage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <AuthLayout
      title="Paiement Échoué"
      description="Malheureusement, votre paiement n'a pas pu être traité."
    >
      <div className="space-y-6 text-center">
        <XCircleIcon className="mx-auto h-16 w-16 text-destructive" />
        <p className="text-muted-foreground">
          Votre paiement pour l'inscription à BantuChamp n'a pas abouti.
        </p>
        {reference && (
          <p className="text-xs text-muted-foreground">
            Référence de transaction concernée : {reference}
          </p>
        )}
        <p className="text-muted-foreground">
          Veuillez vérifier les informations de paiement ou essayer une autre méthode. Si le problème persiste, contactez le support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/signup" className="w-full">
            <Button variant="outline" className="w-full">
              Réessayer l'inscription
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
