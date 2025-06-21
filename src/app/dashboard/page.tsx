import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Badge as BadgeIcon, History, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with actual data fetching
const userSubmissions = [
  { id: 1, title: "Projet Alpha", category: "Innovation Tech", status: "Soumis", date: "2024-07-15" },
  { id: 2, title: "Solution Écologique Beta", category: "Développement Durable", status: "En cours d'évaluation", date: "2024-07-20" },
];

const userBadges = [
  { id: 1, name: "Participant Actif", icon: "https://placehold.co/64x64.png", description: "Pour avoir soumis un projet.", dataAiHint: "award badge" },
  { id: 2, name: "Innovateur Confirmé", icon: "https://placehold.co/64x64.png", description: "Projet sélectionné pour la phase suivante.", dataAiHint: "star badge" },
];

const competitionHistory = [
  { id: 1, event: "Inscription à la compétition", date: "2024-07-10" },
  { id: 2, event: "Soumission du Projet Alpha", date: "2024-07-15" },
  { id: 3, event: "Début de la phase de vote public", date: "2024-08-01" },
];

export default function DashboardPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 md:mb-0">Mon Tableau de Bord</h1>
        <Link href="/submission">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="mr-2 h-5 w-5" />
            Nouvelle Soumission
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline"><UploadCloud className="mr-2 h-6 w-6 text-primary" /> Mes Soumissions</CardTitle>
            <CardDescription>Suivez l'état de vos projets soumis.</CardDescription>
          </CardHeader>
          <CardContent>
            {userSubmissions.length > 0 ? (
              <ul className="space-y-4">
                {userSubmissions.map((submission) => (
                  <li key={submission.id} className="p-4 border rounded-md hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">{submission.category}</p>
                      </div>
                      <Badge variant={submission.status === "Soumis" ? "secondary" : "default"} 
                             className={submission.status === "En cours d'évaluation" ? "bg-yellow-500 text-white" : ""}>
                        {submission.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Soumis le: {submission.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Vous n'avez pas encore soumis de projet.</p>
            )}
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline"><BadgeIcon className="mr-2 h-6 w-6 text-primary" /> Mes Badges</CardTitle>
            <CardDescription>Vos accomplissements et reconnaissances.</CardDescription>
          </CardHeader>
          <CardContent>
            {userBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {userBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center text-center p-2 border rounded-md hover:shadow-md transition-shadow">
                    <Image src={badge.icon} alt={badge.name} width={48} height={48} className="mb-2 rounded-full" data-ai-hint={badge.dataAiHint} />
                    <h4 className="text-sm font-semibold">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground" title={badge.description}>{badge.description.substring(0,30)}...</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun badge gagné pour le moment.</p>
            )}
          </CardContent>
        </Card>

        {/* Competition History Section */}
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline"><History className="mr-2 h-6 w-6 text-primary" /> Historique de la Compétition</CardTitle>
            <CardDescription>Suivez votre parcours dans la compétition.</CardDescription>
          </CardHeader>
          <CardContent>
            {competitionHistory.length > 0 ? (
              <ul className="space-y-3">
                {competitionHistory.map((item) => (
                  <li key={item.id} className="flex items-center text-sm">
                    <span className="text-muted-foreground mr-2 w-24 text-right">{item.date}:</span>
                    <span>{item.event}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Votre historique est vide.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
