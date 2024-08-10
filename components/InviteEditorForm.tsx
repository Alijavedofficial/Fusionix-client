'use client'
import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function InviteEditorForm({ workspaceId, onInviteSent }){
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/workspace/invite-editor', { workspaceId, editorEmail: email });
      setEmail('');
      toast.success('Email Sent Successfully!')
      onInviteSent();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while sending the invitation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Invite Editor</h2>
  
  <div className="flex flex-col">
    <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
      Editor Email
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter editor's email"
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      required
    />
  </div>
  
  <button
    type="submit"
    className={`w-full py-3 font-semibold rounded-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-80'} text-white transition duration-200`}
    disabled={isLoading}
  >
    {isLoading ? 'Sending Invitation...' : 'Invite Editor'}
  </button>
  
  {error && <p className="text-center text-red-500 font-semibold mt-4">{error}</p>}
</form>

  );
};
