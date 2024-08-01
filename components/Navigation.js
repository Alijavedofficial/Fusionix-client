'use client'
import Link from 'next/link';
import { UserButton, useUser} from '@clerk/nextjs';



export default function Navigation() {
  const { user } = useUser()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Fusionix
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/workspaces">Workspaces</Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}