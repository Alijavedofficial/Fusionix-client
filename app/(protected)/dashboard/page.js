'use client'
import { auth, useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div>
  
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <p>Hello {user?.fullName}</p>
    </div>
  );
}