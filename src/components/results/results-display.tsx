"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon, EyeIcon, TrophyIcon, StarIcon } from "lucide-react";
import Image from "next/image";

// Mock data
const categories = [
  { id: "tech", name: "Technologie", icon: <TrophyIcon className="mr-2 h-4 w-4"/> },
  { id: "art", name: "Art & Culture", icon: <StarIcon className="mr-2 h-4 w-4"/> },
  { id: "social", name: "Impact Social", icon: <TrophyIcon className="mr-2 h-4 w-4"/> },
  { id: "environment", name: "Environnement", icon: <StarIcon className="mr-2 h-4 w-4"/> },
];

const rankingsData: { [key: string]: any[] } = {
  tech: [
    { rank: 1, name: "Projet 'Quantum Leap'", team: "Les Visionnaires", score: 95.5, prize: "Incubation + 5000 USD", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
    { rank: 2, name: "App 'ConnectLocal'", team: "Innovatech Plus", score: 92.1, prize: "Mentorate + 2000 USD", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
    { rank: 3, name: "Plateforme 'EduSphere'", team: "Campus Coders", score: 89.7, prize: "Matériel Tech", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
  ],
  art: [
    { rank: 1, name: "Film d'animation 'Rêves Kinois'", team: "Studio Étoile", score: 96.2, prize: "Bourse de production", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
    { rank: 2, name: "Expo Photo 'Visages du Congo'", team: "Objectif Congo", score: 91.5, prize: "Exposition en galerie", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
  ],
  social: [
     { rank: 1, name: "Initiative 'Santé Pour Tous'", team: "Les Bienfaiteurs", score: 94.0, prize: "Financement projet + Partenariat ONG", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
  ],
  environment: [
     { rank: 1, name: "Projet 'Forêt Urbaine'", team: "Green Congo", score: 93.3, prize: "Soutien logistique + Visibilité", avatar: "https://placehold.co/40x40.png", dataAiHint: "person avatar" },
  ],
};

export default function ResultsDisplay() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center md:text-left">Classement Final par Catégorie</CardTitle>
        <CardDescription className="text-center md:text-left">
          Félicitations à tous les participants et aux lauréats !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tech" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex items-center text-xs sm:text-sm">
                {cat.icon}{cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              {rankingsData[cat.id] && rankingsData[cat.id].length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Rang</TableHead>
                        <TableHead>Projet / Équipe</TableHead>
                        <TableHead className="hidden md:table-cell">Score</TableHead>
                        <TableHead className="hidden lg:table-cell">Récompense</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rankingsData[cat.id].map((item) => (
                        <TableRow key={item.rank} className="hover:bg-muted/50">
                          <TableCell className="font-bold text-lg">
                            {item.rank === 1 && <TrophyIcon className="h-6 w-6 text-yellow-500 inline-block mr-1" />}
                            {item.rank === 2 && <AwardIcon className="h-6 w-6 text-gray-400 inline-block mr-1" />}
                            {item.rank === 3 && <StarIcon className="h-6 w-6 text-orange-400 inline-block mr-1" />}
                            {item.rank > 3 && item.rank}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                <Image src={item.avatar} alt={item.team} width={32} height={32} className="rounded-full hidden sm:block" data-ai-hint={item.dataAiHint} />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.team}</p>
                                </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="secondary" className="text-sm">{item.score.toFixed(1)}</Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{item.prize}</TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" title="Voir le projet">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            {item.rank <=3 && (
                            <Button variant="ghost" size="icon" title="Télécharger le certificat">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Les résultats pour cette catégorie seront bientôt disponibles.</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
