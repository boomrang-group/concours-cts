"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlayIcon, Volume2Icon, ExpandIcon, PauseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from 'react';

interface LiveBattlePlayerProps {
  videoSrc: string; // URL to a placeholder image for now
  videoTitle: string;
  dataAiHint?: string;
}

export default function LiveBattlePlayer({ videoSrc, videoTitle, dataAiHint }: LiveBattlePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  if (!isClient) {
    return <div className="aspect-video bg-muted rounded-lg flex items-center justify-center"><p>Chargement du lecteur...</p></div>;
  }

  return (
    <Card className="overflow-hidden shadow-md">
      <CardContent className="p-0">
        <div className="aspect-video bg-black flex items-center justify-center relative group">
          <Image src={videoSrc} alt={videoTitle} fill className="object-cover" data-ai-hint={dataAiHint} />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <Button variant="ghost" size="icon" className="text-white h-16 w-16 hover:bg-white/20" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PauseIcon className="h-10 w-10" /> : <PlayIcon className="h-10 w-10" />}
            </Button>
          </div>
          
          {/* Mock Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Progress value={progress} className="w-full h-1.5 mb-1 [&>div]:bg-primary" />
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-white/20" onClick={() => setIsPlaying(!isPlaying)}>
                   {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-white/20">
                  <Volume2Icon className="h-5 w-5" />
                </Button>
                 <span className="text-xs">{`${Math.floor(progress*0.6)}:00 / 60:00`}</span>
              </div>
              <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-white/20">
                <ExpandIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
