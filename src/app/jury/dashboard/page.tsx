
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, FileSearch, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data - replace with actual data for a jury member
const pendingSubmissions = [
  { id: "proj001", title: "Projet Tech Alpha", category: "Technologie", dateSubmitted: "2024-08-10", status: "En attente d'évaluation" },
  { id: "proj002", title: "Oeuvre d'Art Gamma", category: "Art & Culture", dateSubmitted: "2024-08-12", status: "En attente d'évaluation" },
];

const evaluatedSubmissions = [
  { id: "proj003", title: "Initiative Sociale Beta", category: "Impact Social", dateSubmitted: "2024-08-05", score: 85, status: "Évalué" },
];

export default function JuryDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Implement actual logout logic here
    alert("Déconnexion du jury (simulation).");
    router.push('/jury/login');
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 md:mb-0">Tableau de Bord du Jury</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-5 w-5" />
          Déconnexion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Submissions Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline"><ListChecks className="mr-2 h-6 w-6 text-primary" /> Soumissions en Attente</CardTitle>
            <CardDescription>Projets nécessitant votre évaluation.</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length > 0 ? (
              <ul className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <li key={submission.id} className="p-4 border rounded-md hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">{submission.category} - Soumis le: {submission.dateSubmitted}</p>
                      </div>
                      <Link href={`/jury/evaluate/${submission.id}`}>
                        <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Évaluer
                        </Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Aucune soumission en attente d'évaluation.</p>
            )}
          </CardContent>
        </Card>

        {/* Evaluated Submissions Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline"><FileSearch className="mr-2 h-6 w-6 text-green-600" /> Soumissions Évaluées</CardTitle>
            <CardDescription>Historique de vos évaluations.</CardDescription>
          </CardHeader>
          <CardContent>
            {evaluatedSubmissions.length > 0 ? (
              <ul className="space-y-4">
                {evaluatedSubmissions.map((submission) => (
                  <li key={submission.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">{submission.category} - Note: {submission.score}/100</p>
                      </div>
                       <Link href={`/jury/evaluate/${submission.id}?view=true`}>
                        <Button variant="outline" size="sm">
                          Revoir
                        </Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Vous n'avez pas encore évalué de soumission.</p>
            )}
          </CardContent>
        </Card>
      </div>
       <div className="mt-12 text-center">
          <Card className="max-w-lg mx-auto shadow-md bg-secondary/30">
            <CardHeader>
                <CardTitle className="font-headline">Guide d'Évaluation</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Merci pour votre contribution en tant que membre du jury. Veuillez évaluer chaque projet objectivement en fonction des critères établis.
                    Vos évaluations sont cruciales pour le succès de Campus de Talents & de Savoir.
                </p>
                <Button variant="link" className="mt-2 text-primary">Consulter les critères détaillés</Button>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
