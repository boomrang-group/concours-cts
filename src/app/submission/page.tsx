import SubmissionForm from '@/components/submission/submission-form';
import InteractiveCalendar from '@/components/submission/interactive-calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileTextIcon, CalendarDaysIcon } from 'lucide-react';
import { Suspense } from 'react';

export default function SubmissionPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SubmissionContent />
    </Suspense>
  )
}
function SubmissionContent() {
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Soumettre votre Projet</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline"><FileTextIcon className="mr-2 h-6 w-6 text-primary" /> Détails de la Soumission</CardTitle>
              <CardDescription>Remplissez les informations ci-dessous pour soumettre votre projet. Assurez-vous de respecter les formats et tailles de fichiers autorisés.</CardDescription>
            </CardHeader>
            <CardContent>
              <SubmissionForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline"><CalendarDaysIcon className="mr-2 h-6 w-6 text-primary" /> Calendrier & Deadlines</CardTitle>
              <CardDescription>Consultez les dates importantes de la compétition.</CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveCalendar />
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="font-semibold text-destructive">Deadline Soumission:</span> 31 Août 2024</p>
                <p><span className="font-semibold text-primary">Début Votes Publics:</span> 5 Septembre 2024</p>
                <p><span className="font-semibold text-green-600">Annonce Finalistes:</span> 20 Septembre 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
