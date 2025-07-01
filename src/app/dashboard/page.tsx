import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Badge as BadgeIcon, History, PlusCircle, Eye, ThumbsUp, FileCheck, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data - reset for pre-competition state
const userSubmissions: any[] = [];

const userBadges: any[] = [];

const competitionHistory: any[] = [];

export default function DashboardPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 md:mb-0">Mon Tableau de Bord</h1>
        <Button disabled className="bg-primary/50 cursor-not-allowed">
          <PlusCircle className="mr-2 h-5 w-5" />
          Nouvelle Soumission
        </Button>
      </div>

      <Alert className="mb-8 border-primary/50 bg-primary/10 text-primary">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold">La compétition approche !</AlertTitle>
          <AlertDescription>
            Les soumissions de projets ouvriront le 1er août. Préparez-vous !
          </AlertDescription>
      </Alert>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues de Profil</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Les statistiques apparaîtront ici.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues des Projets</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Les statistiques apparaîtront ici.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Votes Reçus</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Les statistiques apparaîtront ici.</p>
          </CardContent>
        </Card>
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
              <p className="text-muted-foreground">Vous n'avez pas encore soumis de projet. Revenez après le 1er août !</p>
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
              <p className="text-muted-foreground">Aucun badge gagné pour le moment. Participez pour en gagner !</p>
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
              <p className="text-muted-foreground">Votre historique est vide. Il se remplira dès le début de la compétition.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
