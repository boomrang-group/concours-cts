
import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseServices } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { firestore } = getFirebaseServices();
    if (!firestore) {
      console.error('Firestore service is not available.');
      return new NextResponse('Internal Server Error: Firestore not configured', { status: 500 });
    }

    // MaxiCash sends data as form-data, not JSON
    const formData = await request.formData();
    
    const reference = formData.get('Reference') as string;
    const status = formData.get('Status') as string; // e.g., "SUCCESS", "FAILED"
    const amount = formData.get('Amount') as string;
    const currency = formData.get('Currency') as string;
    const operator = formData.get('Operator') as string;
    const phone = formData.get('Telephone') as string;

    if (!reference || !status) {
      return new NextResponse('Bad Request: Missing Reference or Status', { status: 400 });
    }

    console.log(`Received MaxiCash notification for Ref: ${reference}, Status: ${status}`);

    // Store payment information in Firestore
    const paymentDocRef = doc(firestore, 'payments', reference);

    await setDoc(paymentDocRef, {
      reference,
      status: status === 'SUCCESS' ? 'completed' : 'failed',
      amount: amount ? parseFloat(amount) / 100 : 0,
      currency,
      operator,
      phone,
      notifiedAt: serverTimestamp(),
      rawStatus: status,
    }, { merge: true }); // Use merge to avoid overwriting if doc already exists

    // Respond to MaxiCash to acknowledge receipt
    return new NextResponse('[OK]', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error) {
    console.error('MaxiCash notification processing error:', error);
    // Even on error, we might want to return 200 OK so MaxiCash doesn't keep retrying,
    // but for debugging, a 500 is more informative.
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
