
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Suspense, useState, useEffect } from 'react';
import PaymentDeclineContent from '@/components/auth/payment-decline-content';
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

export default function PaymentDeclinePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AuthLayout
      title="Paiement Échoué"
      description="Malheureusement, votre paiement n'a pas pu être traité."
    >
      {isClient ? (
        <Suspense fallback={<PaymentPageSkeleton />}>
          <PaymentDeclineContent />
        </Suspense>
      ) : (
        <PaymentPageSkeleton />
      )}
    </AuthLayout>
  );
}
