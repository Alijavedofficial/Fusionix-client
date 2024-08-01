'use client'
import React, { useState } from 'react';
import api from '../utils/api';

const InviteEditorForm = ({ workspaceId, onInviteSent }) => {
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
      console.log('Email sent successfully')
      onInviteSent();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while sending the invitation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-2 text-gray-700 font-semibold">
        Editor Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Editor's email"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      className={`px-4 py-2 font-semibold rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      disabled={isLoading}
    >
      {isLoading ? 'Sending...' : 'Invite Editor'}
    </button>
    {error && <p className="text-red-500 font-semibold">{error}</p>}
  </form>
  );
};

export default InviteEditorForm;