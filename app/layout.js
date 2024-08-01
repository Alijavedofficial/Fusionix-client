import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '../components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Fusionix',
  description: 'A collaboration platform for YouTubers and editors',
};

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  publishableKey={clerkPubKey}>
      <html lang="en">
        <body>
          <Navigation />
          <main className="container mx-auto mt-8 px-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}