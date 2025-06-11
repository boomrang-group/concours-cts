
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveBattlePlayer from "@/components/competition/live-battle-player";
import VotingArea from "@/components/competition/voting-area";
import { TrophyIcon, UsersIcon, PlayCircleIcon, CheckSquareIcon, ArrowLeftIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data
const challenges = [
  { id: "c1", title: "Défi Innovation Tech", category: "Technologie", status: "Ouvert aux votes", submissions: 25, image: "https://placehold.co/600x400.png", dataAiHint: "technology abstract" },
  { id: "c2", title: "Concours d'Art Numérique", category: "Art & Culture", status: "Soumissions en cours", submissions: 18, image: "https://placehold.co/600x400.png", dataAiHint: "digital art" },
  { id: "c3", title: "Projet Impact Social", category: "Social", status: "Évaluation par le jury", submissions: 32, image: "https://placehold.co/600x400.png", dataAiHint: "community people" },
];

interface LiveBattle {
  id: number;
  title: string;
  time: string;
  playerA: string;
  playerB: string;
  image: string;
  dataAiHint: string;
  description?: string;
}

const liveBattles: LiveBattle[] = [
   { id: 1, title: "Duel des Développeurs: App vs App", time: "Aujourd'hui à 18:00", playerA: "Équipe Alpha", playerB: "Équipe Gamma", image: "https://placehold.co/600x400.png", dataAiHint: "coding screen", description: "Un affrontement épique entre deux applications révolutionnaires. Qui remportera les faveurs du public ?" },
   { id: 2, title: "Battle Design: UI/UX Challenge", time: "Demain à 16:00", playerA: "Créatifs Unis", playerB: "Pixel Parfait", image: "https://placehold.co/600x400.png", dataAiHint: "design interface", description: "Voyez s'affronter deux visions du design d'interface. Ergonomie contre esthétisme pur !" },
];


export default function CompetitionPage() {
  const [selectedBattle, setSelectedBattle] = useState<LiveBattle | null>(null);

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <TrophyIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">La Compétition</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Découvrez les défis, participez aux votes, et assistez aux battles en direct !
        </p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 max-w-lg mx-auto">
          <TabsTrigger value="challenges"><CheckSquareIcon className="mr-2 h-4 w-4"/>Défis & Soumissions</TabsTrigger>
          <TabsTrigger value="live-battles" onClick={() => setSelectedBattle(null)}><PlayCircleIcon className="mr-2 h-4 w-4"/>Battles en Direct</TabsTrigger>
          <TabsTrigger value="jury-space" className="hidden md:inline-flex"><UsersIcon className="mr-2 h-4 w-4"/>Espace Jury</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden">
                    <Image src={challenge.image} alt={challenge.title} fill className="object-cover" data-ai-hint={challenge.dataAiHint} />
                  </div>
                  <CardTitle className="font-headline">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.category} - {challenge.submissions} soumissions</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Statut: <span className="font-semibold text-primary">{challenge.status}</span></p>
                </CardContent>
                <CardFooter>
                  {challenge.status === "Ouvert aux votes" ? (
                    <Link href={`/competition/${challenge.id}/vote-challenge`} passHref className="w-full">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Voter Maintenant
                      </Button>
                    </Link>
                  ) : challenge.status === "Soumissions en cours" ? (
                    <Link href="/submission" passHref className="w-full">
                      <Button className="w-full" variant="outline">
                        Soumettre un projet
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/competition/${challenge.id}`} passHref className="w-full">
                       <Button className="w-full" variant="outline">
                        Voir les détails
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
             {challenges.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <CheckSquareIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun défi pour le moment.</h3>
                <p className="text-muted-foreground">Revenez bientôt pour découvrir les défis !</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="live-battles">
          {selectedBattle ? (
            <Card className="shadow-xl mb-8">
              <CardHeader>
                <Button variant="outline" onClick={() => setSelectedBattle(null)} className="mb-4 self-start">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" /> Retour à la liste des battles
                </Button>
                <CardTitle className="font-headline text-2xl">{selectedBattle.title}</CardTitle>
                <CardDescription>{selectedBattle.time} - {selectedBattle.playerA} vs {selectedBattle.playerB}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LiveBattlePlayer videoSrc={selectedBattle.image} videoTitle={selectedBattle.title} dataAiHint={selectedBattle.dataAiHint} />
                <VotingArea battleId={selectedBattle.id} />
              </CardContent>
            </Card>
          ) : (
            liveBattles.length > 0 ? (
              <div className="space-y-6">
                 <h2 className="text-2xl font-semibold text-center font-headline mb-6">Choisissez une Battle en Direct</h2>
                {liveBattles.map(battle => (
                  <Card key={battle.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative h-48 md:h-full w-full md:col-span-1 rounded-l-md overflow-hidden">
                             <Image src={battle.image} alt={battle.title} fill className="object-cover" data-ai-hint={battle.dataAiHint} />
                        </div>
                        <div className="md:col-span-2 p-6 flex flex-col justify-between">
                            <div>
                                <CardTitle className="font-headline text-xl mb-1">{battle.title}</CardTitle>
                                <CardDescription className="text-sm mb-1">{battle.time}</CardDescription>
                                <CardDescription className="text-sm font-medium mb-2">{battle.playerA} vs {battle.playerB}</CardDescription>
                                <p className="text-xs text-muted-foreground mb-3">{battle.description}</p>
                            </div>
                            <Button onClick={() => setSelectedBattle(battle)} className="w-full md:w-auto self-end bg-primary text-primary-foreground hover:bg-primary/90">
                                <PlayCircleIcon className="mr-2 h-4 w-4" /> Regarder et Voter
                            </Button>
                        </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
            <div className="text-center py-12">
              <PlayCircleIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune battle en direct pour le moment.</h3>
              <p className="text-muted-foreground">Revenez bientôt pour assister aux prochains duels !</p>
            </div>
            )
          )}
        </TabsContent>
        
        <TabsContent value="jury-space">
          <Card className="shadow-lg max-w-lg mx-auto">
            <CardHeader className="text-center">
              <UsersIcon className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-headline text-2xl">Espace Jury</CardTitle>
              <CardDescription>Réservé aux membres du jury pour l'évaluation des soumissions.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-muted-foreground">
                Si vous êtes membre du jury, veuillez vous connecter pour accéder à votre espace d'évaluation.
              </p>
              <Link href="/jury/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Accéder à l'Espace Jury
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    
