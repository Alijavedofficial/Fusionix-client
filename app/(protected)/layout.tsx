'use client'
import { ToastContainer } from 'react-toastify';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/sidebar'; 
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navigation setIsOpen={setIsOpen} isOpen={isOpen} />
        <ToastContainer />
        <div className="flex flex-grow">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`flex-grow transition-margin duration-300 mt-16 ${isOpen ? 'ml-44' : 'ml-14'}`}>
            <main className="mt-8 px-4 z-0">{children}</main>
          </div>
        </div>
      </div>
      </QueryClientProvider>
  );
}