import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '../components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Fusionix',
  description: 'A collaboration platform for YouTubers and editors',
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navigation />
          <main className="container mx-auto mt-8 px-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}