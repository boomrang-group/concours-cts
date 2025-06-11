"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUpIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface VotingAreaProps {
  battleId: number;
  // Assume options are predefined or fetched based on battleId
}

const options = [
  { id: 'optionA', name: 'Projet Alpha' },
  { id: 'optionB', name: 'Projet Gamma' },
];

export default function VotingArea({ battleId }: VotingAreaProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [votes, setVotes] = useState<{ [key: string]: number }>({ optionA: 0, optionB: 0 });
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Mock initial votes and simulate real-time updates
    const initialVotesA = Math.floor(Math.random() * 50) + 10;
    const initialVotesB = Math.floor(Math.random() * 50) + 10;
    setVotes({ optionA: initialVotesA, optionB: initialVotesB });
    setTotalVotes(initialVotesA + initialVotesB);

    const interval = setInterval(() => {
      setVotes(prevVotes => {
        const newVotesA = prevVotes.optionA + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0);
        const newVotesB = prevVotes.optionB + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0);
        setTotalVotes(newVotesA + newVotesB);
        return { optionA: newVotesA, optionB: newVotesB };
      });
    }, 3000); // Update votes every 3 seconds

    // Check if user has already voted for this battle (e.g., from localStorage)
    // const userVote = localStorage.getItem(`vote_battle_${battleId}`);
    // if (userVote) {
    //   setHasVoted(true);
    //   setSelectedOption(userVote);
    // }

    return () => clearInterval(interval);
  }, [battleId]);

  const handleVote = (optionId: string) => {
    if (hasVoted) {
      toast({
        title: "Vote déjà enregistré",
        description: "Vous ne pouvez voter qu'une seule fois par battle.",
        variant: "destructive",
      });
      return;
    }
    setSelectedOption(optionId);
    setVotes(prev => ({ ...prev, [optionId]: prev[optionId] + 1 }));
    setTotalVotes(prev => prev + 1);
    setHasVoted(true);
    // localStorage.setItem(`vote_battle_${battleId}`, optionId);
    toast({
      title: "Vote enregistré!",
      description: `Merci d'avoir voté pour ${options.find(o => o.id === optionId)?.name}.`,
    });
  };
  
  if (!isClient) {
    return <div className="p-4 bg-muted rounded-lg"><p>Chargement des votes...</p></div>;
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-headline text-center">Votez pour votre projet préféré !</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {options.map(option => {
          const percentage = totalVotes > 0 ? Math.round((votes[option.id] / totalVotes) * 100) : 0;
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium">{option.name}</h4>
                <span className="text-sm text-muted-foreground">{votes[option.id]} votes ({percentage}%)</span>
              </div>
              <Progress value={percentage} className="h-3 [&>div]:bg-primary" />
              <Button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                variant={selectedOption === option.id ? "default" : "outline"}
                className="w-full mt-2 transition-all duration-300 ease-in-out"
              >
                <ThumbsUpIcon className="mr-2 h-4 w-4" />
                Voter pour {option.name}
              </Button>
            </div>
          );
        })}
        {hasVoted && <p className="text-sm text-center text-green-600 font-medium">Merci pour votre vote !</p>}
         {!hasVoted && <p className="text-sm text-center text-muted-foreground">Un seul vote par utilisateur et par battle.</p>}
      </CardContent>
    </Card>
  );
}
