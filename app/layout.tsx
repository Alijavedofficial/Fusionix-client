import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Inter, Montserrat} from "next/font/google";

const Interr = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Fusionix',
  description: 'A collaboration platform for YouTubers and editors',
  keywords: ['sass', 'nextjs', 'react'],
};

const clerkPubKey = 'pk_test_c3VyZS1zcXVpZC05LmNsZXJrLmFjY291bnRzLmRldiQ'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  publishableKey={clerkPubKey}>
      <html>
        <body className={Interr.className}>
          <main className="">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}