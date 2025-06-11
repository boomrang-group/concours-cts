
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveBattlePlayer from "@/components/competition/live-battle-player";
import VotingArea from "@/components/competition/voting-area";
import { 
  TrophyIcon, 
  UsersIcon, 
  PlayCircleIcon, 
  CheckSquareIcon, 
  ArrowLeftIcon, 
  MicIcon,
  FeatherIcon,
  PersonStandingIcon,
  MusicIcon,
  MessageSquareTextIcon,
  DramaIcon,
  HeartPulseIcon,
  ActivityIcon,
  ChefHatIcon,
  PaletteIcon,
  PaintbrushIcon,
  LightbulbIcon,
  SendIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const competitionCategories = [
  { id: "slam", name: "Slam", icon: MicIcon, dataAiHint: "microphone poetry" },
  { id: "poesie", name: "Poésie", icon: FeatherIcon, dataAiHint: "poetry book" },
  { id: "danse", name: "Danse", icon: PersonStandingIcon, dataAiHint: "dance silhouette" },
  { id: "musique", name: "Musique", icon: MusicIcon, dataAiHint: "music notes" },
  { id: "art_oratoire", name: "Art Oratoire (Débat)", icon: MessageSquareTextIcon, dataAiHint: "public speaking" },
  { id: "theatre", name: "Théâtre", icon: DramaIcon, dataAiHint: "theater masks" },
  { id: "fitness_yoga", name: "Fitness & Yoga", icon: HeartPulseIcon, dataAiHint: "yoga pose" },
  { id: "gymnastique", name: "Gymnastique", icon: ActivityIcon, dataAiHint: "gymnast action" },
  { id: "cuisine", name: "Cuisine", icon: ChefHatIcon, dataAiHint: "gourmet food" },
  { id: "modelisme", name: "Modélisme (Mode/Design)", icon: PaletteIcon, dataAiHint: "fashion design" },
  { id: "peinture", name: "Peinture", icon: PaintbrushIcon, dataAiHint: "artist painting" },
  { id: "entrepreneuriat", name: "Entrepreneuriat", icon: LightbulbIcon, dataAiHint: "business idea" },
];


export default function CompetitionPage() {
  const [selectedBattle, setSelectedBattle] = useState<LiveBattle | null>(null);

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <TrophyIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">La Compétition</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choisissez une catégorie pour soumettre votre projet, ou assistez aux battles en direct !
        </p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 max-w-lg mx-auto">
          <TabsTrigger value="challenges"><CheckSquareIcon className="mr-2 h-4 w-4"/>Catégories & Soumissions</TabsTrigger>
          <TabsTrigger value="live-battles" onClick={() => setSelectedBattle(null)}><PlayCircleIcon className="mr-2 h-4 w-4"/>Battles en Direct</TabsTrigger>
          <TabsTrigger value="jury-space" className="hidden md:inline-flex"><UsersIcon className="mr-2 h-4 w-4"/>Espace Jury</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold font-headline">Choisissez une catégorie pour participer</h2>
            <p className="text-muted-foreground">Cliquez sur une catégorie pour accéder au formulaire de soumission.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {competitionCategories.map(category => (
              <Link key={category.id} href={`/submission?category=${category.id}`} passHref>
                <Card className="shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer group">
                  <CardHeader className="pb-2">
                    <category.icon className="h-12 w-12 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                    <CardTitle className="font-headline text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-xs text-muted-foreground">Soumettre un projet dans la catégorie {category.name.toLowerCase()}.</p>
                  </CardContent>
                  <CardFooter className="w-full pt-3">
                      <Button variant="ghost" className="w-full text-primary group-hover:bg-primary/10">
                        <SendIcon className="mr-2 h-4 w-4" /> Participer
                      </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
             {competitionCategories.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <CheckSquareIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune catégorie pour le moment.</h3>
                <p className="text-muted-foreground">Revenez bientôt pour découvrir les catégories de compétition !</p>
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
    
