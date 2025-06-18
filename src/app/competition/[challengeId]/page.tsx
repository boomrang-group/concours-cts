
// src/app/competition/[challengeId]/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, InfoIcon, ImageIcon, FileTextIcon, VideoIcon } from "lucide-react";
import Image from "next/image";

// Mock data for challenge details - in a real app, fetch this based on challengeId
const mockChallengeData: { [key: string]: any } = {
  c1: { 
    id: "c1", 
    title: "Défi Innovation Tech", 
    category: "Technologie", 
    status: "Ouvert aux votes", 
    submissionsCount: 25,
    description: "Ce défi vise à récompenser les projets technologiques les plus innovants et impactants. Les participants sont invités à présenter des solutions créatives aux problèmes actuels.",
    image: "https://placehold.co/800x400.png",
    dataAiHint: "technology innovation",
    criteria: ["Originalité", "Faisabilité technique", "Impact potentiel", "Qualité de la présentation"],
    deadline: "2024-09-15",
    sponsorLogos: ["https://placehold.co/100x50.png", "https://placehold.co/100x50.png"] 
  },
  c2: { 
    id: "c2", 
    title: "Concours d'Art Numérique", 
    category: "Art & Culture", 
    status: "Soumissions en cours", 
    submissionsCount: 18,
    description: "Exprimez votre créativité à travers l'art numérique. Ce concours est ouvert à toutes les formes d'art digital : illustration, animation, 3D, etc.",
    image: "https://placehold.co/800x400.png",
    dataAiHint: "digital art gallery",
    criteria: ["Concept artistique", "Maîtrise technique", "Originalité", "Impact visuel"],
    deadline: "2024-09-30",
    sponsorLogos: ["https://placehold.co/100x50.png"] 
  },
   c3: { 
    id: "c3", 
    title: "Projet Impact Social", 
    category: "Social", 
    status: "Évaluation par le jury", 
    submissionsCount: 32,
    description: "Présentez des projets qui apportent des solutions concrètes à des problématiques sociales. L'objectif est de soutenir les initiatives à fort impact communautaire.",
    image: "https://placehold.co/800x400.png",
    dataAiHint: "community project",
    criteria: ["Pertinence sociale", "Viabilité du projet", "Impact mesurable", "Innovation sociale"],
    deadline: "2024-08-30",
    sponsorLogos: [] 
  },
  'music-journey': {
    id: "music-journey",
    title: "BantuChamp Music Journey",
    category: "Musique",
    status: "Semaine 1 - Soumissions & Votes Ouverts",
    submissionsCount: 0, 
    description: `
Préparez-vous pour un voyage musical épique sur 4 semaines !

**Semaine 1 : Lancement et Premières Notes**
- **Type :** Soumission de Vidéo
- **Période :** Ouvert aux soumissions et aux votes.
- **Votes :** 75% vote populaire, 25% vote du jury.
- **Critères d'évaluation :** Originalité, Qualité technique, Interprétation, Potentiel.
- **Qualification :** Les participants atteignant plus de 50% de score combiné accèdent à la Semaine 2.

**Semaine 2 : L'Épreuve du Rythme**
- **Type :** Soumission de Vidéo (peut être une nouvelle soumission ou amélioration)
- **Période :** (Dates à annoncer)
- **Votes :** 70% vote populaire, 30% vote du jury.
- **Qualification :** Les participants atteignant plus de 50% de score combiné accèdent à la Semaine 3.

**Semaine 3 : La Montée en Puissance**
- **Type :** Soumission de Vidéo (peut être une nouvelle soumission ou amélioration)
- **Période :** (Dates à annoncer)
- **Votes :** 60% vote populaire, 40% vote du jury.
- **Qualification :** Les participants atteignant plus de 50% de score combiné accèdent à la Finale.

**Semaine 4 : La Finale en Direct !**
- **Type :** Battle en Direct
- **Période :** (Date à annoncer)
- **Votes :** Vote populaire en direct.
- Le grand gagnant de la catégorie Musique sera couronné !

Soumettez votre meilleure performance vidéo pour la phase en cours et laissez le public et le jury découvrir votre talent !
    `.trim(),
    image: "https://placehold.co/800x400.png",
    dataAiHint: "music stage concert",
    criteria: ["Originalité de la composition/reprise", "Qualité technique vocale/instrumentale", "Présence scénique et Interprétation", "Potentiel artistique et Charisme", "Qualité de la production vidéo"],
    deadline: "Variable (voir phase actuelle)", 
    sponsorLogos: ["https://placehold.co/100x50.png"] 
  },
};


export default function ChallengeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.challengeId as string;

  const challenge = mockChallengeData[challengeId]; 

  if (!challenge) {
    return (
      <div className="container py-8 md:py-12 text-center">
        <InfoIcon className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Défi non trouvé</h2>
        <p className="text-muted-foreground mb-6">
          Le défi que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Button variant="outline" onClick={() => router.push('/competition')}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour à la liste des défis
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour
      </Button>
      <Card className="shadow-xl overflow-hidden">
        <div className="relative w-full h-64 md:h-80">
          <Image src={challenge.image} alt={challenge.title} fill className="object-cover" data-ai-hint={challenge.dataAiHint} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">{challenge.title}</h1>
            <p className="text-lg text-primary-foreground/90">{challenge.category}</p>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 font-headline">Description du Défi</h2>
            <p className="text-muted-foreground whitespace-pre-line">{challenge.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Informations Clés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="font-semibold">Statut:</span> <span className={`font-medium ${challenge.status.includes("Ouvert") ? "text-green-600" : challenge.status.includes("Soumissions en cours") ? "text-blue-600" : "text-orange-600"}`}>{challenge.status}</span></p>
                <p><span className="font-semibold">Soumissions:</span> {challenge.submissionsCount}</p>
                <p><span className="font-semibold">Date Limite:</span> {challenge.deadline}</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Critères d'Évaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {challenge.criteria.map((criterion: string, index: number) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {challenge.status.includes("Soumissions") && (
            <div className="text-center pt-4">
              <Button size="lg" onClick={() => router.push(`/submission?category=${challenge.id === 'music-journey' ? 'musique' : challenge.category.toLowerCase().replace(/\s+/g, '_')}&challengeId=${challenge.id}`)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Soumettre votre projet pour ce défi
              </Button>
            </div>
          )}

          {challenge.status.includes("Vote") && (
             <div className="text-center pt-4">
                <Button size="lg" onClick={() => router.push(`/competition/${challenge.id}/vote-challenge`)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Participer au Vote
                </Button>
            </div>
          )}


          {challenge.sponsorLogos && challenge.sponsorLogos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 font-headline">Sponsors du Défi</h2>
              <div className="flex flex-wrap gap-4 items-center">
                {challenge.sponsorLogos.map((logoUrl: string, index: number) => (
                  <Image key={index} src={logoUrl} alt={`Sponsor ${index + 1}`} width={100} height={50} className="object-contain rounded bg-muted p-1" data-ai-hint="company logo"/>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

