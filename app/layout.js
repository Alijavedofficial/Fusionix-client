import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '../components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Fusionix',
  description: 'A collaboration platform for YouTubers and editors',
  keywords: ['sass', 'nextjs', 'react'],
};

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  publishableKey={clerkPubKey}>
      <html>
        <body>
          <main className="">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}