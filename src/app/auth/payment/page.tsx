
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionReference, setTransactionReference] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // This effect runs after `transactionReference` is updated.
  // If a reference has been set, we submit the form.
  useEffect(() => {
    if (transactionReference && formRef.current) {
      formRef.current.submit();
    }
  }, [transactionReference]);

  const handlePayment = () => {
    setIsLoading(true);
    // Generate a unique reference. The useEffect will trigger the submission.
    const ref = `reg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setTransactionReference(ref);
  };
  
  const userEmail = searchParams.get('email') || '';
  const userPhone = searchParams.get('phone') || '';
  const membersCount = parseInt(searchParams.get('members') || '1', 10);
  
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    if(typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!origin) {
    return (
      <div className="space-y-4 text-center">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full mx-auto" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  // Amount in cents (2 USD per member)
  const amountInCents = 200 * membersCount;
  const amountInUSD = amountInCents / 100;
  
  const successUrl = `${origin}/auth/payment-success?amount=${amountInCents}`;
  const cancelUrl = `${origin}/auth/payment-cancel`;
  const declineUrl = `${origin}/auth/payment-decline`;
  const notifyUrl = `${origin}/api/maxicash-notify`;

  
  return (
    <div className="space-y-6 text-center">
       {membersCount > 1 && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground bg-secondary/30 p-3 rounded-md">
            <Users className="h-5 w-5" />
            <p>Inscription de groupe pour <strong>{membersCount} membres</strong>.</p>
        </div>
      )}
      <p className="text-muted-foreground">
        Pour finaliser votre inscription, veuillez procéder au paiement sécurisé des frais de participation de <strong>${amountInUSD}</strong> ({membersCount > 1 ? `$2 x ${membersCount} membres` : '$2'}).
      </p>

      {/* Hidden form that will be submitted programmatically */}
      <form 
        ref={formRef}
        action="https://api.maxicashapp.com/PayEntryPost" 
        method="POST" 
        className="hidden"
      >
        <input type="hidden" name="PayType" value="MaxiCash" />
        <input type="hidden" name="Amount" value={amountInCents} />
        <input type="hidden" name="Currency" value="USD" />
        <input type="hidden" name="Telephone" value={userPhone} />
        <input type="hidden" name="Email" value={userEmail} />
        <input type="hidden" name="MerchantID" value="93b10243a03e4536832aa5c9473fd0ae" />
        <input type="hidden" name="MerchantPassword" value="fdf00a6ff0c94b048aa3162677b8a0ef" />
        <input type="hidden" name="Language" value="En" />
        <input type="hidden" name="Reference" value={transactionReference} />
        <input type="hidden" name="accepturl" value={successUrl} />
        <input type="hidden" name="cancelurl" value={cancelUrl} />
        <input type="hidden" name="declineurl" value={declineUrl} />
        <input type="hidden" name="notifyurl" value={notifyUrl} />
      </form>

      <Button 
        onClick={handlePayment}
        disabled={isLoading}
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Veuillez patienter...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Payer ${amountInUSD} Maintenant
          </>
        )}
      </Button>
    </div>
  );
}


function PaymentPageSkeleton() {
  return (
    <div className="space-y-6 text-center">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}


export default function PaymentPage() {
    return (
        <AuthLayout
            title="Finaliser votre Inscription"
            description="Une dernière étape pour rejoindre l'aventure Campus de Talents & de Savoir."
        >
            <Suspense fallback={<PaymentPageSkeleton />}>
              <PaymentPageContent />
            </Suspense>
        </AuthLayout>
    );
}
