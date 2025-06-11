import WinnerProfileCard from "@/components/results/winner-profile-card";
import { UsersIcon, AwardIcon } from "lucide-react";

// Mock data
const winners = [
  {
    id: 1,
    name: "Les Visionnaires (Équipe)",
    category: "Technologie & Innovation - 1ère Place",
    projectName: "Projet 'Quantum Leap'",
    avatarUrl: "https://placehold.co/150x150.png",
    dataAiHint: "team photo",
    media: { type: "video", url: "https://placehold.co/300x200.png", title: "Démo Quantum Leap", dataAiHint: "technology demo" },
    bio: "Une équipe passionnée par l'IA et le futur de la technologie, déterminée à résoudre des problèmes complexes.",
  },
  {
    id: 2,
    name: "Amina Kasongo (Individuel)",
    category: "Art & Culture - 1ère Place",
    projectName: "Film d'animation 'Rêves Kinois'",
    avatarUrl: "https://placehold.co/150x150.png",
    dataAiHint: "person portrait",
    media: { type: "image", url: "https://placehold.co/300x200.png", title: "Affiche 'Rêves Kinois'", dataAiHint: "movie poster" },
    bio: "Artiste numérique et conteuse, Amina explore l'identité congolaise à travers ses créations visuelles.",
  },
  {
    id: 3,
    name: "Les Bienfaiteurs (Équipe)",
    category: "Impact Social - 1ère Place",
    projectName: "Initiative 'Santé Pour Tous'",
    avatarUrl: "https://placehold.co/150x150.png",
    dataAiHint: "group people",
    media: { type: "document", url: "https://placehold.co/300x200.png", title: "Rapport 'Santé Pour Tous'", dataAiHint: "document icon" },
    bio: "Engagés pour l'amélioration de l'accès aux soins de santé dans les communautés défavorisées.",
  },
];

export default function WinnersPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <AwardIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Nos Brillants Gagnants</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Félicitations aux talents exceptionnels de cette édition de BantuChamp !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {winners.map(winner => (
          <WinnerProfileCard key={winner.id} winner={winner} />
        ))}
      </div>
       {winners.length === 0 && (
        <div className="text-center col-span-full py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Les profils des gagnants seront bientôt affichés.</h3>
            <p className="text-muted-foreground">Restez connectés pour découvrir les lauréats !</p>
        </div>
      )}
    </div>
  );
}
