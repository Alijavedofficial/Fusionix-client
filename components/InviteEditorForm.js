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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Editor's email"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Invite Editor'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default InviteEditorForm;