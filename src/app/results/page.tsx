import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResultsDisplay from "@/components/results/results-display";
import { Award, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ResultsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <Award className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Résultats de la Compétition</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Découvrez les classements, les gagnants et les récompenses.
        </p>
      </div>

      {/* Overall Stats Placeholder */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center font-headline flex items-center justify-center">
            <BarChart3 className="mr-3 h-7 w-7 text-primary"/>Statistiques Clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">150+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Projets Soumis</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">5000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Votes Enregistrés</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">10</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Catégories Primées</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <ResultsDisplay />

      <section className="mt-16 text-center">
        <Image 
            src="https://placehold.co/600x400.png" 
            alt="Cérémonie de remise des prix" 
            width={600} 
            height={400} 
            className="mx-auto mb-8 rounded-lg shadow-xl"
            data-ai-hint="awards ceremony"
        />
        <h2 className="text-3xl font-bold mb-4 font-headline">Rencontrez nos Gagnants !</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Découvrez les profils inspirants et les projets exceptionnels qui ont marqué cette édition.
        </p>
        <Link href="/results/winners">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Users className="mr-2 h-5 w-5" /> Voir les Profils des Gagnants
          </Button>
        </Link>
      </section>
    </div>
  );
}
