
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useState, useEffect } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Import useRouter

const memberDetailSchema = z.object({
  name: z.string().min(2, { message: "Le nom du membre doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "L'adresse e-mail du membre est invalide." }),
});

const formSchema = z.object({
  accountType: z.enum(["individual", "group"], {
    required_error: "Veuillez sélectionner un type de compte.",
  }),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().min(9, "Numéro de téléphone invalide.").optional().or(z.literal('')),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  confirmPassword: z.string(),
  groupName: z.string().optional().or(z.literal('')),
  groupMembers: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number().min(1, "Le groupe doit avoir au moins 1 membre.").max(5, "Le nombre de membres ne peut pas dépasser 5.").optional()
  ),
  memberDetails: z.array(memberDetailSchema).optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les termes et conditions.",
  }),
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Les mots de passe ne correspondent pas.", path: ["confirmPassword"] });
  }

  if (data.accountType === 'group') {
    if (!data.groupName || data.groupName.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le nom du groupe est requis pour un compte de groupe.", path: ["groupName"] });
    }
    if (data.groupMembers === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le nombre de membres du groupe est requis.", path: ["groupMembers"] });
    } else {
      if (data.groupMembers > 1) {
        if (!data.memberDetails || data.memberDetails.length !== data.groupMembers - 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Veuillez fournir les détails pour les ${data.groupMembers - 1} autres membres.`,
            path: ["memberDetails"], // This will show a general message if the count is wrong.
                                     // Individual field errors within memberDetails are handled by Zod's array(object()) structure.
          });
        }
      } else if (data.groupMembers === 1) {
        // If group of 1, memberDetails should be empty or not present
        if (data.memberDetails && data.memberDetails.length > 0) {
           ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Les détails des membres ne sont pas nécessaires pour un groupe d'un seul membre.",
            path: ["memberDetails"],
          });
        }
      }
    }
  }
});


export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
      groupName: "",
      groupMembers: undefined,
      memberDetails: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "memberDetails",
  });

  const accountType = form.watch("accountType");
  const groupMembersCount = form.watch("groupMembers");

  useEffect(() => {
    if (accountType === "group" && groupMembersCount !== undefined && groupMembersCount > 0) {
      const targetSize = Math.max(0, groupMembersCount - 1);
      // Only update if the size is different to avoid unnecessary re-renders/flicker
      if (fields.length !== targetSize) {
        const newFields = Array.from({ length: targetSize }, () => ({ name: "", email: "" }));
        replace(newFields);
      }
    } else {
      if (fields.length > 0) { // Only replace if there's something to clear
        replace([]);
      }
    }
  }, [accountType, groupMembersCount, replace, fields.length]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    toast({
      title: "Compte Créé !",
      description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      variant: "default",
    });

    form.reset();
    setIsLoading(false);
    router.push("/auth/login");
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
                    <Input placeholder="Ex: Les Innovateurs" {...field} value={field.value ?? ""} />
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
                  <FormLabel>Nombre de membres (1 à 5)</FormLabel>
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
                           field.onChange(undefined); 
                        } else {
                           const num = parseInt(val, 10);
                           field.onChange(isNaN(num) ? undefined : num);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Inclut le responsable d'équipe.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {accountType === "group" && groupMembersCount && groupMembersCount > 1 && fields.length > 0 && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <h3 className="text-lg font-medium">Détails des autres membres de l'équipe</h3>
                {fields.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-md space-y-3 bg-muted/50">
                    <p className="text-sm font-semibold text-foreground">Membre {index + 2}</p>
                    <FormField
                      control={form.control}
                      name={`memberDetails.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet du membre</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Alice Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`memberDetails.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse e-mail du membre</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Ex: alice.dupont@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                {/* Display general error for memberDetails array if any (e.g. wrong count) */}
                {form.formState.errors.memberDetails && !form.formState.errors.memberDetails.root && (
                     <FormMessage>{form.formState.errors.memberDetails.message}</FormMessage>
                )}
              </div>
            )}
          </>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail {accountType === "group" ? "du responsable" : ""}</FormLabel>
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
              <FormLabel>Numéro de téléphone {accountType === "group" ? "du responsable " : ""} (Optionnel)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Ex: 0812345678" {...field} value={field.value ?? ""} />
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

        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "Créer mon compte"}
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

