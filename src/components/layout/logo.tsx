import Link from 'next/link';
import { RocketIcon } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
      <RocketIcon className="h-7 w-7" />
      <span className="text-2xl font-bold font-headline">BantuChamp</span>
    </Link>
  );
};

export default Logo;
