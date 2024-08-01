'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../utils/api';
import InviteEditorForm from '../../../components/InviteEditorForm';
import { useUser, useAuth } from '@clerk/nextjs';

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  // const [videos, setVideos] = useState([]);
  // const [newEditorId, setNewEditorId] = useState('');
  // const [videoFile, setVideoFile] = useState(null);
  // const [videoTitle, setVideoTitle] = useState('');
  // const [videoDescription, setVideoDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const {user} = useUser()
  const {getToken} = useAuth()
  // const role = user?.publicMetadata?.role

  useEffect(() => {
    if (id && getToken) {
      fetchWorkspaceDetails();
    }
  }, [id, getToken]);
  const fetchWorkspaceDetails = async () => {
    try {
      setIsLoading(true);
      const token = await getToken()
      const response = await api.get(`/workspace/${id}`, {
         Authorization: `Bearer ${token}`
      });
      setWorkspace(response.data);
    } catch (error) {
      console.error('Error fetching workspace details:', error);
    } finally{
      setIsLoading(false);
    }
  }

  const handleInviteSent = () => {
    // Optionally refresh the workspace details or show a success message
    fetchWorkspaceDetails();
  };

  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   // Fetch the user's role for this workspace
  //   async function fetchUserRole() {
  //     const response = await api.get(`/workspace/role/${id}`,);
  //     const data = await response.json();
  //     setUserRole(data.role);
  //   }
  //   fetchUserRole();
  // }, [id, user]);

  if (isLoading) {
    return  <div className="flex justify-center items-center">
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
  }
  const renderEditors = () => {
    return workspace.editors.map((editor) => (
        <li key={editor.userId} className='text-gray-700'>
            {editor.name}
        </li>
    ));
};

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Workspace: {workspace.name}</h1>
    <p className="mb-4">
      <span className="font-semibold text-gray-900 text-lg">Description:</span> {workspace.description}
    </p>
    <div className='flex items-center gap-2'>
    <h2 className="text-lg font-semibold">Owner:</h2>
    <p className=" text-gray-700">{workspace.owner.name}</p>
    </div>
    <div className='flex items-center gap-2'>
    <h2 className="text-lg font-semibold">Editors:</h2>
    <ul className=" space-y-2 text-gray-700">
      {renderEditors()}
    </ul>
    </div>
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Invite Editor:</h2>
      <InviteEditorForm workspaceId={id} onInviteSent={handleInviteSent} />
    </div>
  </div>
  );
}  