"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  accountType: z.enum(["individual", "group"], {
    required_error: "Veuillez sélectionner un type de compte.",
  }),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().min(9, "Numéro de téléphone invalide.").optional(),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  confirmPassword: z.string(),
  groupName: z.string().optional(),
  groupMembers: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)), // Convert empty string to undefined, otherwise to number
    z.number().min(1, "Le nombre de membres doit être au moins 1.").max(5, "Le nombre de membres ne peut pas dépasser 5.").optional()
  ),
  terms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les termes et conditions.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
}).refine(data => data.accountType === "individual" || (data.accountType === "group" && data.groupName && data.groupName.length > 0), {
  message: "Le nom du groupe est requis pour un compte de groupe.",
  path: ["groupName"],
}).refine(data => data.accountType === "individual" || (data.accountType === "group" && data.groupMembers !== undefined), {
  message: "Le nombre de membres du groupe est requis.",
  path: ["groupMembers"],
});

export default function SignupForm() {
  const [accountType, setAccountType] = useState<"individual" | "group">("individual");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: "individual",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      groupName: "", // Initialize groupName
      groupMembers: "" as unknown as number, // Initialize groupMembers as an empty string for the input
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle submission (e.g., API call)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type de compte</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setAccountType(value as "individual" | "group");
                  }}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="individual" />
                    </FormControl>
                    <FormLabel className="font-normal">Individuel</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="group" />
                    </FormControl>
                    <FormLabel className="font-normal">Groupe</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountType === "individual" ? "Nom complet" : "Nom du responsable d'équipe"}</FormLabel>
              <FormControl>
                <Input placeholder={accountType === "individual" ? "Ex: Jean Dupont" : "Ex: Chef d'équipe"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {accountType === "group" && (
          <>
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du groupe</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Les Innovateurs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de membres (max 5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="5" 
                      placeholder="Ex: 3" 
                      {...field} 
                      value={field.value === undefined || field.value === null ? "" : String(field.value)}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === "") {
                           field.onChange(undefined); // Store undefined for empty
                        } else {
                           const num = parseInt(val, 10);
                           field.onChange(isNaN(num) ? undefined : num);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ex: nom@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone (Optionnel)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Ex: 0812345678" {...field} />
              </FormControl>
              <FormDescription>Pour vérification SMS et notifications WhatsApp.</FormDescription>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  J'accepte les <Link href="/terms" className="text-primary hover:underline">termes et conditions</Link>.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Créer mon compte
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </Form>
  );
}
