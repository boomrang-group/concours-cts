'use client';

import AuthLayout from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function JuryLoginPage() {
  const router = useRouter(); // Initialize router

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle jury login logic
    // For now, simulate success and redirect
    alert("Connexion du jury réussie (simulation). Redirection vers le tableau de bord du jury.");
    router.push('/jury/dashboard'); // Redirect to jury dashboard
  };

  return (
    <AuthLayout
      title="Accès Espace Jury"
      description="Veuillez vous connecter avec vos identifiants de jury."
    >
      <div className="text-center mb-4">
        <Users className="mx-auto h-10 w-10 text-primary" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="juryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Identifiant Jury
          </Label>
          <div className="mt-1">
            <Input
              id="juryId"
              name="juryId"
              type="text"
              required
              placeholder="Votre identifiant jury"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mot de passe
          </Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="********"
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Se Connecter (Jury)
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Problème de connexion ? Contactez l'administration.
        </p>
      </form>
    </AuthLayout>
  );
}
