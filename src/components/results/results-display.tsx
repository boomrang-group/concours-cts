
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Eye, 
  Trophy, 
  Star, 
  Award,
  Feather,
  PersonStanding,
  Music,
  MessageSquare,
  Drama,
  ChefHat,
  Palette,
  Paintbrush
} from "lucide-react";
import Image from "next/image";

const categories = [
  { id: "esthetique_mode", name: "Esthétique et Mode", icon: <Palette className="mr-2 h-4 w-4"/> },
  { id: "peinture", name: "Peinture", icon: <Paintbrush className="mr-2 h-4 w-4"/> },
  { id: "cuisine", name: "Cuisine", icon: <ChefHat className="mr-2 h-4 w-4"/> },
  { id: "poesie", name: "Poésie", icon: <Feather className="mr-2 h-4 w-4"/> },
  { id: "art_oratoire", name: "Art Oratoire", icon: <MessageSquare className="mr-2 h-4 w-4"/> },
  { id: "theatre", name: "Théâtre", icon: <Drama className="mr-2 h-4 w-4"/> },
  { id: "musique", name: "Musique", icon: <Music className="mr-2 h-4 w-4"/> },
  { id: "danse", name: "Danse", icon: <PersonStanding className="mr-2 h-4 w-4"/> },
];

const rankingsData: { [key: string]: any[] } = {
  musique: [
    { rank: 1, name: "Composition 'Harmonie Nouvelle'", team: "Mélodie Pure", score: 96.2, prize: "Enregistrement Studio", avatar: "https://placehold.co/40x40.png", dataAiHint: "musician" },
    { rank: 2, name: "Chanson 'Voix du Congo'", team: "Rythmes d'Afrique", score: 91.5, prize: "Equipement Musical", avatar: "https://placehold.co/40x40.png", dataAiHint: "singer" },
  ],
  peinture: [
     { rank: 1, name: "Tableau 'Renaissance Africaine'", team: "Pinceau d'Or", score: 94.0, prize: "Exposition + Matériel d'Art", avatar: "https://placehold.co/40x40.png", dataAiHint: "painting art" },
  ],
  danse: [
     { rank: 1, name: "Chorégraphie 'Origines'", team: "Corps en Mouvement", score: 93.3, prize: "Stage de Danse Pro", avatar: "https://placehold.co/40x40.png", dataAiHint: "dancer silhouette" },
  ],
  cuisine: [
    { rank: 1, name: "Plat Signature 'Saveurs du Fleuve'", team: "Toque Créative", score: 95.0, prize: "Stage Culinaire", avatar: "https://placehold.co/40x40.png", dataAiHint: "gourmet dish" },
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
        <Tabs defaultValue="musique" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mb-6">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex items-center text-xs sm:text-sm py-1.5 px-2">
                {cat.icon}{cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              {rankingsData[cat.id] && rankingsData[cat.id].length > 0 ? (
                <div className="overflow-x-auto pt-6">
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
                            {item.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500 inline-block mr-1" />}
                            {item.rank === 2 && <Award className="h-6 w-6 text-gray-400 inline-block mr-1" />}
                            {item.rank === 3 && <Star className="h-6 w-6 text-orange-400 inline-block mr-1" />}
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
                              <Eye className="h-4 w-4" />
                            </Button>
                            {item.rank <=3 && (
                            <Button variant="ghost" size="icon" title="Télécharger le certificat">
                              <Download className="h-4 w-4" />
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
