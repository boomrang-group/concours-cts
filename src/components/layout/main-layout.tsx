import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import NotificationBar from './notification-bar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const registrationDeadline = new Date("2025-07-17T23:59:59");

  return (
    <>
      <NotificationBar
        targetDate={registrationDeadline}
        message="Fin des inscriptions dans :"
      />
      <div className="flex flex-col min-h-screen pt-10"> {/* Adjusted pt-10 for notification bar height */}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
