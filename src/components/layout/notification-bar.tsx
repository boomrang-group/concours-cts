
'use client';

import { useState, useEffect, type FC } from 'react';
import { TimerIcon, InfoIcon } from 'lucide-react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): Countdown | null => {
  const difference = +targetDate - +new Date();
  if (difference <= 0) {
    return null; // Countdown finished
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

interface NotificationBarProps {
  targetDate: Date;
  message: string;
}

const NotificationBar: FC<NotificationBarProps> = ({ targetDate, message }) => {
  const [timeLeft, setTimeLeft] = useState<Countdown | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setTimeLeft(calculateTimeLeft(targetDate)); // Initial calculation on client

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  if (!isClient) {
    // SSR fallback or initial render before client-side hydration
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-2 text-center text-sm shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
            <TimerIcon className="inline-block h-4 w-4 mr-1" />
            <span>{message} Chargement du compte à rebours...</span>
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] bg-primary/90 text-primary-foreground p-2 text-center text-sm shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
            <InfoIcon className="inline-block h-4 w-4 mr-1" />
            <span>Les inscriptions sont maintenant terminées !</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-2 text-center text-sm shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
        <TimerIcon className="inline-block h-4 w-4 mr-1" />
        <span>{message}</span>
        <span className="font-semibold">
          {String(timeLeft.days).padStart(2, '0')}j : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
};

export default NotificationBar;
