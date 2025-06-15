
import SignupForm from '@/components/auth/signup-form';
import AuthLayout from '@/components/auth/auth-layout';

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Créez votre compte"
      description="Rejoignez la compétition et montrez votre talent ! L'inscription requiert des frais de $2."
    >
      <SignupForm />
    </AuthLayout>
  );
}
