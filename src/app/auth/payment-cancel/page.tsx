
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Suspense, useState, useEffect } from 'react';
import PaymentCancelContent from '@/components/auth/payment-cancel-content';
import { Skeleton } from '@/components/ui/skeleton';

function PaymentPageSkeleton() {
  return (
    <div className="space-y-6 text-center">
      <Skeleton className="mx-auto h-16 w-16 rounded-full bg-muted" />
      <Skeleton className="h-6 w-3/4 mx-auto bg-muted" />
      <Skeleton className="h-4 w-1/2 mx-auto bg-muted" />
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Skeleton className="h-10 w-full bg-muted rounded-md" />
        <Skeleton className="h-10 w-full bg-muted rounded-md" />
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AuthLayout
      title="Paiement Annulé"
      description="Le processus de paiement pour votre inscription a été annulé."
    >
      {isClient ? (
        <Suspense fallback={<PaymentPageSkeleton />}>
          <div className="space-y-6 text-center">
            <PaymentCancelContent />
          </div>
        </Suspense>
      ) : (
        <PaymentPageSkeleton />
      )}
    </AuthLayout>
  );
}
