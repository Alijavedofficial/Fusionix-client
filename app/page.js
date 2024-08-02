'use client'
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user } = useUser()

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/sign-in');
  }

  return null;
}