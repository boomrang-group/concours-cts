
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PaymentDeclineContent from '@/components/auth/payment-decline-content';

export default function PaymentDeclinePage() {
  return (
    <AuthLayout
      title="Paiement Échoué"
      description="Malheureusement, votre paiement n'a pas pu être traité."
    >
 <Suspense fallback={<div>Loading...</div>}><PaymentDeclineContent /></Suspense>
    </AuthLayout>
  );
}
