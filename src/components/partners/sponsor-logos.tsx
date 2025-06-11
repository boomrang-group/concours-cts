import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const sponsors = [
  { name: "Sponsor Prestige 1", logoUrl: "https://placehold.co/200x100.png", level: "prestige", dataAiHint: "tech company" },
  { name: "Sponsor Or 1", logoUrl: "https://placehold.co/180x90.png", level: "or", dataAiHint: "bank logo" },
  { name: "Sponsor Or 2", logoUrl: "https://placehold.co/180x90.png", level: "or", dataAiHint: "telecom company" },
  { name: "Sponsor Argent 1", logoUrl: "https://placehold.co/150x75.png", level: "argent", dataAiHint: "education institution" },
  { name: "Sponsor Argent 2", logoUrl: "https://placehold.co/150x75.png", level: "argent", dataAiHint: "ngo logo" },
  { name: "Sponsor Bronze 1", logoUrl: "https://placehold.co/120x60.png", level: "bronze", dataAiHint: "startup logo" },
];

export default function SponsorLogos() {
  const getLogoSize = (level: string) => {
    if (level === "prestige") return { width: 200, height: 100 };
    if (level === "or") return { width: 180, height: 90 };
    if (level === "argent") return { width: 150, height: 75 };
    return { width: 120, height: 60 }; // bronze
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-center">
      {sponsors.map(sponsor => {
        const size = getLogoSize(sponsor.level);
        return (
          <a key={sponsor.name} href="#" target="_blank" rel="noopener noreferrer" 
             className="flex justify-center items-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 duration-300 ease-in-out transform hover:scale-105"
             title={sponsor.name}
             style={{ minHeight: `${size.height + 20}px`}} // Ensure consistent card height
          >
            <Image 
              src={sponsor.logoUrl} 
              alt={sponsor.name} 
              width={size.width} 
              height={size.height} 
              className="object-contain"
              data-ai-hint={sponsor.dataAiHint}
            />
          </a>
        );
      })}
       {sponsors.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground py-8">Nos partenaires seront bientôt annoncés. Restez à l'écoute !</p>
      )}
    </div>
  );
}
