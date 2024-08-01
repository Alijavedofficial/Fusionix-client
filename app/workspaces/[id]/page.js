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
      const token = await getToken()
      const response = await api.get(`/workspace/${id}`, {
         Authorization: `Bearer ${token}`
      });
      setWorkspace(response.data);
    } catch (error) {
      console.error('Error fetching workspace details:', error);
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

  if (!workspace) {
    return <div>No Workspace to show...</div>;
  }
 

  return (
    <div>
    <h1>{workspace.name}</h1>
    <h2>Editors:</h2>
    <ul>
      {workspace.editors.map((editor) => (
        <li key={editor}>{editor}</li>
      ))}
    </ul>
  
      <div>
    <h2>Invite Editor:</h2>
    <InviteEditorForm workspaceId={id} onInviteSent={handleInviteSent} />
    </div>  
  </div>
  );
}  