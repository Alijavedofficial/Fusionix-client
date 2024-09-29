import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProviders } from "@/Providers/ThemeProviders";

const Interr = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Fusionix",
  description: "A collaboration platform for YouTubers and editors",
  keywords: ["sass", "nextjs", "react"],
};

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <html>
        <body className={Interr.className}>
          <ThemeProviders>
            <main className="">{children}</main>
          </ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
