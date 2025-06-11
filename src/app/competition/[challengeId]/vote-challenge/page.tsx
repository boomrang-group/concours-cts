// src/app/competition/[challengeId]/vote-challenge/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { ThumbsUpIcon, ArrowLeftIcon } from "lucide-react";
import Image from "next/image";

// Mock data for challenge details - in a real app, fetch this based on challengeId
const mockChallengeDetails = {
  id: "1",
  title: "Défi Innovation Tech",
  description: "Votez pour le projet le plus innovant dans la catégorie Technologie.",
  submissions: [
    { id: "sub1", name: "Projet Innovant A", image: "https://placehold.co/600x400.png", dataAiHint: "tech project", votes: 120 },
    { id: "sub2", name: "Solution Tech B", image: "https://placehold.co/600x400.png", dataAiHint: "modern app", votes: 95 },
    { id: "sub3", name: "Concept Révolutionnaire C", image: "https://placehold.co/600x400.png", dataAiHint: "futuristic ui", votes: 150 },
  ]
};

export default function VoteChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.challengeId as string;

  // In a real app, you would fetch challenge details based on challengeId
  const challenge = mockChallengeDetails; // Using mock data for now

  if (!challenge) {
    return (
      <div className="container py-8 md:py-12 text-center">
        <p>Chargement du défi...</p>
      </div>
    );
  }

  const handleVote = (submissionId: string) => {
    // Implement voting logic here (e.g., API call, update state)
    alert(`Vous avez voté pour la soumission ${submissionId} du défi ${challengeId}! (Logique de vote à implémenter)`);
  };

  return (
    <div className="container py-8 md:py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour aux défis
      </Button>
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">{challenge.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{challenge.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {challenge.submissions.map((submission) => (
            <Card key={submission.id} className="p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-1">
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                     <Image src={submission.image} alt={submission.name} fill className="object-cover" data-ai-hint={submission.dataAiHint} />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xl font-semibold font-headline">{submission.name}</h3>
                  <p className="text-sm text-muted-foreground">Votes actuels: {submission.votes}</p>
                  <Button onClick={() => handleVote(submission.id)} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    <ThumbsUpIcon className="mr-2 h-4 w-4" /> Voter pour ce projet
                  </Button>
                </div>
              </div>
            </Card>
          ))}
           {challenge.submissions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Aucune soumission disponible pour le vote pour ce défi.</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
