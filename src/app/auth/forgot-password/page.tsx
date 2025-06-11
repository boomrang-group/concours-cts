import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  // This is a placeholder. Actual form handling would be similar to login/signup.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle password reset logic
    alert("Logique de réinitialisation du mot de passe à implémenter.");
  };

  return (
    <AuthLayout
      title="Mot de passe oublié ?"
      description="Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Adresse e-mail
          </Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nom@example.com"
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Envoyer le lien de réinitialisation
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Se souvenir de votre mot de passe ?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
