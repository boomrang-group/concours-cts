
'use client';

import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const userProfileId = searchParams.get('ref');

  return (
    <div className="space-y-6 text-center">
      <Info className="mx-auto h-16 w-16 text-yellow-500" />
      <p className="text-muted-foreground">
        Vous avez choisi d&apos;annuler le paiement. Votre inscription n&apos;est pas encore finalisée.
      </p>
      {userProfileId && (
         <p className="text-xs text-muted-foreground">
           Référence de transaction concernée : {userProfileId}
         </p>
       )}
      <p className="text-muted-foreground">
        Vous pouvez retourner à la page d&apos;inscription si vous souhaitez réessayer.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/auth/signup" className="w-full">
          <Button variant="outline" className="w-full">
            Retourner à l&apos;inscription
          </Button>
        </Link>
        <Link href="/" className="w-full">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Aller à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
