
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth, isFirebaseInitialized } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email("Adresse e-mail invalide."),
  password: z.string().min(1, "Le mot de passe est requis."),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!isFirebaseInitialized()) {
      toast({
        title: "Configuration Firebase manquante",
        description: "L'authentification ne peut pas fonctionner. Veuillez configurer vos clés API Firebase.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        toast({
            title: "Erreur d'initialisation",
            description: "Impossible d'initialiser Firebase. Vérifiez la console pour les erreurs.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Connexion Réussie !",
        description: "Vous allez être redirigé vers votre tableau de bord.",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Les identifiants sont incorrects.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Adresse e-mail ou mot de passe incorrect.";
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = "La configuration de Firebase est introuvable ou invalide. Vérifiez vos clés API dans le fichier .env.local.";
      }
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nom@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">Se souvenir de moi</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-primary hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>


        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </Form>
  );
}
