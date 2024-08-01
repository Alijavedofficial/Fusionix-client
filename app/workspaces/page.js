'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../utils/api';

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await api.get('/workspace');
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const createWorkspace = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workspace', { name: newWorkspaceName });
      setNewWorkspaceName('');
      fetchWorkspaces();
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  return (
    <div className='text-black'>
      <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>
      <form onSubmit={createWorkspace} className="mb-4">
        <input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          placeholder="New Workspace Name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Workspace
        </button>
      </form>
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace._id} className="mb-2">
            <Link href={`/workspaces/${workspace._id}`} className="text-blue-500 hover:underline">
              {workspace.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}