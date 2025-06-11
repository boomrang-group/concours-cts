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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const submissionFormSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères.").max(500, "La description ne peut pas dépasser 500 caractères."),
  category: z.string({ required_error: "Veuillez sélectionner une catégorie." }),
  file: z.any().refine(file => file?.length > 0, "Un fichier est requis.") // Basic check, more specific validation (type, size) usually done server-side or with more complex client logic
                 .refine(file => file?.[0]?.size <= 5000000, `La taille maximale du fichier est 5MB.`), // Example size limit
  teamMembers: z.array(z.object({ email: z.string().email("Email de coéquipier invalide.") })).optional(),
  confirmSubmission: z.boolean().refine(val => val === true, {
    message: "Veuillez confirmer votre soumission.",
  }),
});

const categories = [
  { id: "tech", name: "Technologie & Innovation" },
  { id: "art", name: "Art & Culture" },
  { id: "social", name: "Impact Social" },
  { id: "environment", name: "Environnement & Développement Durable" },
];

export default function SubmissionForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof submissionFormSchema>>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      teamMembers: [],
      confirmSubmission: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  function onSubmit(values: z.infer<typeof submissionFormSchema>) {
    console.log(values);
    // Simulate API call
    toast({
      title: "Soumission Réussie!",
      description: `Votre projet "${values.title}" a été soumis avec succès.`,
      variant: "default",
    });
    form.reset();
  }

  // Check if the user is part of a group (mocked)
  const isGroupAccount = true; // This should come from user's auth context

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du projet</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Plateforme d'e-learning innovante" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du projet</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre projet en quelques mots (max 500 caractères)..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => ( // Destructure field to handle file input correctly
            <FormItem>
              <FormLabel>Fichier du projet</FormLabel>
              <FormControl>
                 <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.jpg,.jpeg,.png" 
                    onChange={(e) => onChange(e.target.files)} // Pass FileList to react-hook-form
                    {...rest} // Pass other props like name, ref, onBlur
                  />
              </FormControl>
              <FormDescription>
                Formats acceptés: PDF, DOC, PPT, MP4, MP3, JPG, PNG. Taille max: 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isGroupAccount && (
          <div>
            <FormLabel>Membres de l'équipe (Optionnel)</FormLabel>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`teamMembers.${index}.email`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-2">
                    <FormControl>
                      <Input placeholder="email@coequipier.com" {...field} />
                    </FormControl>
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ email: "" })}
              disabled={fields.length >= 4} // Max 5 members total (1 leader + 4 others)
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Ajouter un coéquipier
            </Button>
             <FormDescription className="mt-1">
                Ajoutez les adresses e-mail de vos coéquipiers (max 4 en plus du chef d'équipe).
              </FormDescription>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="confirmSubmission"
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
                  Je confirme que les informations sont correctes et que cette soumission respecte les règles de la compétition.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Soumettre mon Projet
        </Button>
      </form>
    </Form>
  );
}
