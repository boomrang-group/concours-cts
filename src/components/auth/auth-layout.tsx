import type { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] container flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image 
            src="https://placehold.co/100x100.png" 
            alt="BantuChamp Logo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4 rounded-full shadow-md" 
            data-ai-hint="abstract logo"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-headline">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Card className="shadow-xl">
          <CardContent className="p-6 sm:p-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Need to manually import Card and CardContent as they are used here.
// This is a workaround for the current setup.
// Ideally, these components would be properly exported and imported.

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);


export default AuthLayout;
