
'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import PaymentCancelContent from '@/components/auth/payment-cancel-content';

export default function PaymentCancelPage() {
  return (
 <AuthLayout
 title="Paiement Annulé"
 description="Le processus de paiement pour votre inscription a été annulé."
 >
 <Suspense fallback={<div>Loading...</div>}>
 <div className="space-y-6 text-center">
 <PaymentCancelContent />
        </div>
      </Suspense>
    </AuthLayout>
  );
}
