'use client'
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import api from '@/utils/api';

const AcceptInvitation = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const {user} = useUser()

  const acceptInvitation = async () => {
    try {
      const response = await api.post(`/workspace/accept-invitation/${token}`);
      setMessage('Invitation accepted successfully!');
      // Redirect to the workspace page after a short delay
      window.location.href = `/workspaces/${response.data.workspaceId}`;
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while accepting the invitation.');
    }
  };

  return (
    <div>
      <button className='bg-black text-white p-2' onClick={acceptInvitation}>Accept Invitation</button>
      <p>{message}</p>
    </div>
  );
};

export default AcceptInvitation;