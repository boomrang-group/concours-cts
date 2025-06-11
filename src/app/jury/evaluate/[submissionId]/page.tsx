// src/app/jury/evaluate/[submissionId]/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, CheckCircleIcon, FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock submission data - in a real app, fetch this based on submissionId
const mockSubmissionsData: { [key: string]: any } = {
  proj001: { 
    id: "proj001", 
    title: "Projet Tech Alpha", 
    category: "Technologie", 
    dateSubmitted: "2024-08-10", 
    description: "Une solution innovante utilisant l'IA pour optimiser la logistique urbaine. Ce projet vise à réduire les embouteillages et la pollution en temps réel.",
    submittedBy: "Équipe Innovatech",
    fileType: "document", // 'document', 'image', 'video', 'audio'
    fileUrl: "https://placehold.co/800x600.png", // Placeholder, ideally a link to actual file or preview
    dataAiHint: "tech document",
    criteria: [
      { id: "innovation", name: "Innovation", score: 0 },
      { id: "feasibility", name: "Faisabilité", score: 0 },
      { id: "impact", name: "Impact Potentiel", score: 0 },
      { id: "presentation", name: "Présentation", score: 0 },
    ],
    comments: ""
  },
  proj002: { 
    id: "proj002", 
    title: "Oeuvre d'Art Gamma", 
    category: "Art & Culture", 
    dateSubmitted: "2024-08-12", 
    description: "Une série de peintures numériques explorant l'intersection de la tradition et de la modernité dans l'art congolais contemporain.",
    submittedBy: "Artiste Visionnaire",
    fileType: "image",
    fileUrl: "https://placehold.co/600x400.png",
    dataAiHint: "digital art",
     criteria: [
      { id: "originality", name: "Originalité", score: 0 },
      { id: "technique", name: "Technique Artistique", score: 0 },
      { id: "emotion", name: "Impact Émotionnel", score: 0 },
      { id: "theme", name: "Pertinence Thématique", score: 0 },
    ],
    comments: ""
  },
   proj003: { 
    id: "proj003", 
    title: "Initiative Sociale Beta", 
    category: "Impact Social", 
    dateSubmitted: "2024-08-05", 
    description: "Un programme d'alphabétisation mobile pour les communautés rurales, utilisant des tablettes et du contenu éducatif adapté.",
    submittedBy: "Les Bienfaiteurs",
    fileType: "video",
    fileUrl: "https://placehold.co/800x450.png",
    dataAiHint: "community video",
     criteria: [
      { id: "relevance", name: "Pertinence Sociale", score: 80 },
      { id: "sustainability", name: "Durabilité", score: 85 },
      { id: "scalability", name: "Scalabilité", score: 90 },
      { id: "clarity", name: "Clarté du Projet", score: 85 },
    ],
    comments: "Excellent projet avec un fort potentiel. Quelques suggestions pour améliorer la scalabilité ont été fournies."
  },
};

const FileDisplay = ({ fileType, fileUrl, title, dataAiHint }: { fileType: string, fileUrl: string, title: string, dataAiHint?: string }) => {
  switch (fileType) {
    case 'image':
      return <Image src={fileUrl} alt={`Aperçu de ${title}`} width={600} height={400} className="rounded-md shadow-md object-cover mx-auto" data-ai-hint={dataAiHint} />;
    case 'video':
      return (
        <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-muted-foreground">
          <VideoIcon className="h-16 w-16 mb-2" />
          <p>Aperçu vidéo de "{title}"</p>
          <p className="text-xs">(Lecteur vidéo à implémenter)</p>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Voir la vidéo</a>
          </Button>
        </div>
      );
    case 'document':
       return (
        <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-muted-foreground p-4">
          <FileTextIcon className="h-16 w-16 mb-2" />
          <p>Document: "{title}"</p>
           <Button variant="outline" size="sm" className="mt-2" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Ouvrir le document</a>
          </Button>
        </div>
      );
    default:
      return <p className="text-muted-foreground">Type de fichier non supporté pour l'aperçu direct. <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Télécharger le fichier</a></p>;
  }
};


export default function EvaluateSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const submissionId = params.submissionId as string;
  const isViewMode = searchParams.get('view') === 'true';

  const [submission, setSubmission] = useState(mockSubmissionsData[submissionId] || null);
  
  if (!submission) {
    return (
      <div className="container py-8 md:py-12 text-center">
        <p>Chargement de la soumission...</p>
        <p className="text-sm text-muted-foreground mt-2">Si le chargement persiste, la soumission n'existe peut-être pas.</p>
        <Button onClick={() => router.back()} variant="outline" className="mt-4">
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>
    );
  }
  
  const [criteriaScores, setCriteriaScores] = useState<{ [key: string]: number }>(
    submission.criteria.reduce((acc: any, crit: any) => {
      acc[crit.id] = crit.score || 0;
      return acc;
    }, {})
  );
  const [comments, setComments] = useState(submission.comments || "");

  const handleSliderChange = (criterionId: string, value: number[]) => {
    setCriteriaScores(prev => ({ ...prev, [criterionId]: value[0] }));
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = submission.criteria.reduce((sum: number, crit: any) => sum + (criteriaScores[crit.id] || 0), 0);
    const averageScore = totalScore / submission.criteria.length;
    
    console.log({
      submissionId,
      scores: criteriaScores,
      averageScore: averageScore.toFixed(2),
      comments,
    });

    toast({
      title: "Évaluation Soumise !",
      description: `Le projet "${submission.title}" a été évalué avec une note moyenne de ${averageScore.toFixed(2)}/100.`,
      variant: "default",
    });
    // In a real app, navigate back or to the next submission
    router.push('/jury/dashboard'); 
  };


  return (
    <div className="container py-8 md:py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour au tableau de bord
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{isViewMode ? "Détails de l'Évaluation" : "Évaluer la Soumission"} : {submission.title}</CardTitle>
          <CardDescription>Catégorie: {submission.category} | Soumis par: {submission.submittedBy} le {submission.dateSubmitted}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 font-headline">Description du Projet</h3>
            <p className="text-muted-foreground whitespace-pre-line">{submission.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 font-headline">Fichier Soumis</h3>
            <FileDisplay fileType={submission.fileType} fileUrl={submission.fileUrl} title={submission.title} dataAiHint={submission.dataAiHint} />
          </div>
          
          <form onSubmit={handleSubmitEvaluation} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 font-headline">Critères d'Évaluation</h3>
              {submission.criteria.map((criterion: any) => (
                <div key={criterion.id} className="mb-6 p-4 border rounded-md bg-muted/30">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor={criterion.id} className="text-md font-medium">{criterion.name}</Label>
                    <span className="text-lg font-semibold text-primary">{criteriaScores[criterion.id]}/100</span>
                  </div>
                  <Slider
                    id={criterion.id}
                    defaultValue={[criteriaScores[criterion.id]]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleSliderChange(criterion.id, value)}
                    disabled={isViewMode}
                    className={cn(isViewMode ? "opacity-70 cursor-not-allowed" : "")}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="comments" className="text-xl font-semibold mb-2 block font-headline">Commentaires Généraux</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={isViewMode ? "Aucun commentaire fourni." : "Ajoutez vos commentaires et suggestions..."}
                rows={5}
                disabled={isViewMode}
                className={cn(isViewMode ? "bg-muted/50" : "")}
              />
            </div>
            
            {!isViewMode && (
              <Button type="submit" size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                <CheckCircleIcon className="mr-2 h-5 w-5" />
                Soumettre l'Évaluation
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    