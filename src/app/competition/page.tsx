import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveBattlePlayer from "@/components/competition/live-battle-player";
import VotingArea from "@/components/competition/voting-area";
import { TrophyIcon, UsersIcon, PlayCircleIcon, CheckSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data
const challenges = [
  { id: 1, title: "Défi Innovation Tech", category: "Technologie", status: "Ouvert aux votes", submissions: 25, image: "https://placehold.co/600x400.png", dataAiHint: "technology abstract" },
  { id: 2, title: "Concours d'Art Numérique", category: "Art & Culture", status: "Soumissions en cours", submissions: 18, image: "https://placehold.co/600x400.png", dataAiHint: "digital art" },
  { id: 3, title: "Projet Impact Social", category: "Social", status: "Évaluation par le jury", submissions: 32, image: "https://placehold.co/600x400.png", dataAiHint: "community people" },
];

const liveBattles = [
   { id: 1, title: "Duel des Développeurs: App vs App", time: "Aujourd'hui à 18:00", playerA: "Équipe Alpha", playerB: "Équipe Gamma", image: "https://placehold.co/600x400.png", dataAiHint: "coding screen" },
];


export default function CompetitionPage() {
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
          <TabsTrigger value="live-battles"><PlayCircleIcon className="mr-2 h-4 w-4"/>Battles en Direct</TabsTrigger>
          <TabsTrigger value="jury-space" className="hidden md:inline-flex"><UsersIcon className="mr-2 h-4 w-4"/>Espace Jury</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden">
                    <Image src={challenge.image} alt={challenge.title} layout="fill" objectFit="cover" data-ai-hint={challenge.dataAiHint} />
                  </div>
                  <CardTitle className="font-headline">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.category} - {challenge.submissions} soumissions</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Statut: <span className="font-semibold text-primary">{challenge.status}</span></p>
                </CardContent>
                <CardFooter>
                  {challenge.status === "Ouvert aux votes" ? (
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Voter Maintenant</Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled={challenge.status !== "Soumissions en cours"}>
                      {challenge.status === "Soumissions en cours" ? "Soumettre un projet" : "Voir les détails"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live-battles">
          {liveBattles.length > 0 ? liveBattles.map(battle => (
            <Card key={battle.id} className="shadow-xl mb-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{battle.title}</CardTitle>
                <CardDescription>{battle.time} - {battle.playerA} vs {battle.playerB}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LiveBattlePlayer videoSrc={battle.image} videoTitle={battle.title} dataAiHint={battle.dataAiHint} />
                <VotingArea battleId={battle.id} />
              </CardContent>
            </Card>
          )) : (
            <div className="text-center py-12">
              <PlayCircleIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune battle en direct pour le moment.</h3>
              <p className="text-muted-foreground">Revenez bientôt pour assister aux prochains duels !</p>
            </div>
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
              <Link href="/jury/login"> {/* Assuming a specific jury login */}
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
