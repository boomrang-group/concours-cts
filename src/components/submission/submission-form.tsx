
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
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const submissionFormSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères.").max(500, "La description ne peut pas dépasser 500 caractères."),
  category: z.string({ required_error: "Veuillez sélectionner une catégorie." }),
  file: z.any().refine(file => file?.length > 0, "Un fichier est requis.")
                 .refine(file => file?.[0]?.size <= 5000000, `La taille maximale du fichier est 5MB.`),
  teamMembers: z.array(z.object({ email: z.string().email("Email de coéquipier invalide.") })).optional(),
  confirmSubmission: z.boolean().refine(val => val === true, {
    message: "Veuillez confirmer votre soumission.",
  }),

  songTitle: z.string().optional(),
  musicPlatformLink: z.string().optional().or(z.literal('')).refine(val => val === '' || z.string().url().safeParse(val).success, {
    message: "Veuillez entrer une URL valide ou laisser vide.",
  }),
  dishName: z.string().optional(),
  recipeSteps: z.string().optional(),
  mainIngredients: z.string().optional(),
  writtenPieceText: z.string().optional(),

}).superRefine((data, ctx) => {
  if (data.category === "musique") {
    if (!data.songTitle || data.songTitle.trim() === "") {
      ctx.addIssue({ path: ["songTitle"], message: "Le titre de la chanson est requis pour la catégorie Musique.", code: z.ZodIssueCode.custom });
    }
  }
  if (data.category === "cuisine") {
    if (!data.dishName || data.dishName.trim() === "") {
      ctx.addIssue({ path: ["dishName"], message: "Le nom du plat est requis pour la catégorie Cuisine.", code: z.ZodIssueCode.custom });
    }
    if (!data.recipeSteps || data.recipeSteps.trim() === "") {
      ctx.addIssue({ path: ["recipeSteps"], message: "Les étapes de la recette sont requises pour la catégorie Cuisine.", code: z.ZodIssueCode.custom });
    }
    if (!data.mainIngredients || data.mainIngredients.trim() === "") {
      ctx.addIssue({ path: ["mainIngredients"], message: "Les ingrédients principaux sont requis pour la catégorie Cuisine.", code: z.ZodIssueCode.custom });
    }
  }
  const textBasedCategories = ["poesie", "art_oratoire", "theatre"];
  if (textBasedCategories.includes(data.category)) {
    if (!data.writtenPieceText || data.writtenPieceText.trim() === "") {
      ctx.addIssue({ path: ["writtenPieceText"], message: "Le texte de l'œuvre est requis pour cette catégorie.", code: z.ZodIssueCode.custom });
    }
  }
});

const categories = [
    { id: "esthetique_mode", name: "Esthétique et Mode" },
    { id: "peinture", name: "Peinture" },
    { id: "cuisine", name: "Cuisine" },
    { id: "poesie", name: "Poésie" },
    { id: "art_oratoire", name: "Art Oratoire" },
    { id: "theatre", name: "Théâtre" },
    { id: "musique", name: "Musique" },
    { id: "danse", name: "Danse" },
];

export default function SubmissionForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const form = useForm<z.infer<typeof submissionFormSchema>>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "", // Initialize category as empty or handle undefined better
      teamMembers: [],
      confirmSubmission: false,
      songTitle: "",
      musicPlatformLink: "",
      dishName: "",
      recipeSteps: "",
      mainIngredients: "",
      writtenPieceText: "",
    },
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.some(c => c.id === categoryFromUrl)) {
      form.setValue('category', categoryFromUrl);
    }
  }, [searchParams, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  const selectedCategory = form.watch("category");

  function onSubmit(values: z.infer<typeof submissionFormSchema>) {
    console.log(values);
    toast({
      title: "Soumission Réussie!",
      description: `Votre projet "${values.title}" a été soumis avec succès.`,
      variant: "default",
    });
    form.reset({
      title: "",
      description: "",
      category: "",
      teamMembers: [],
      confirmSubmission: false,
      songTitle: "",
      musicPlatformLink: "",
      dishName: "",
      recipeSteps: "",
      mainIngredients: "",
      writtenPieceText: "",
      file: undefined
    });
  }

  const isGroupAccount = true; 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du projet/de l'œuvre</FormLabel>
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
              <FormLabel>Description générale du projet/de l'œuvre</FormLabel>
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
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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

        {selectedCategory === "musique" && (
          <>
            <FormField
              control={form.control}
              name="songTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la chanson</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Mon Hymne à la Joie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="musicPlatformLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien vers la musique (SoundCloud, YouTube, etc.) - Optionnel</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://soundcloud.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {selectedCategory === "cuisine" && (
          <>
            <FormField
              control={form.control}
              name="dishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du plat</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Saka Saka revisité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipeSteps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recette (Étapes)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="1. Préparer les ingrédients...\n2. Cuire à feu doux..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingrédients Principaux</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Feuilles de manioc, Huile de palme, Poisson fumé..." {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        
        {["poesie", "art_oratoire", "theatre"].includes(selectedCategory || "") && (
           <FormField
            control={form.control}
            name="writtenPieceText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texte de l'œuvre (Poème, Discours, Script)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Écrivez ou collez votre texte ici..." {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => ( // `value` is handled by the file input itself
            <FormItem>
              <FormLabel>Fichier principal du projet</FormLabel>
              <FormControl>
                 <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.jpg,.jpeg,.png,.wav,.m4a,.mov,.avi,.flac,.ogg,.txt,.rtf" 
                    onChange={(e) => onChange(e.target.files)}
                    {...rest}
                    ref={null} // react-hook-form doesn't need ref for file inputs if onChange is used
                  />
              </FormControl>
              <FormDescription>
                Formats acceptés: PDF, DOC(X), PPT(X), MP4, MP3, JPG, PNG, WAV, M4A, MOV, AVI, FLAC, OGG, TXT, RTF. Taille max: 5MB.
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
                render={({ field: memberField }) => (
                  <FormItem className="flex items-center space-x-2 mt-2">
                    <FormControl>
                      <Input placeholder="email@coequipier.com" {...memberField} />
                    </FormControl>
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
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
              disabled={fields.length >= 4} 
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un coéquipier
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
