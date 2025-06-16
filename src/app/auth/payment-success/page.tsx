
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Suspense } from 'react';
import PaymentSuccessContent from '@/components/auth/payment-success-content';
import { Skeleton } from '@/components/ui/skeleton'; // For fallback

export default function PaymentSuccessPage() {
  return (
    <AuthLayout
      title="Inscription Réussie et Paiement Confirmé !"
      description="Bienvenue à BantuChamp !"
    >
      <Suspense fallback={<PaymentSuccessPageSkeleton />}>
        <PaymentSuccessContent />
      </Suspense>
    </AuthLayout>
  );
}

function PaymentSuccessPageSkeleton() {
  return (
    <div className="space-y-6 text-center">
      <Skeleton className="mx-auto h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700" />
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md space-y-2">
        <Skeleton className="h-5 w-full bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-4 w-2/3 mx-auto bg-gray-300 dark:bg-gray-700" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  );
}
