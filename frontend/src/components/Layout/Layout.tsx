import React from 'react';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  showHeader = true 
}) => {
  return (
    <div className="min-h-screen bg-background dark:bg-darkbg">
      {showHeader && (
        <Header user={user} onLogout={onLogout} />
      )}
      <main className={showHeader ? 'pt-16' : ''}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 