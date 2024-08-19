import React, { useState } from 'react'
import api from "../utils/api";
import { toast } from 'react-toastify';

const CreateSpace = ({onClose, fetchworkspaces}) => {
    const [newWorkspaceDescription, setnewWorkspaceDescription] = useState("");
    const [newWorkspaceName, setNewWorkspaceName] = useState("");

    
  const createWorkspace = async (e) => {
    e.preventDefault();
    try {
      await api.post("/workspace", {
        name: newWorkspaceName,
        description: newWorkspaceDescription,
      });
      setNewWorkspaceName("");
      setnewWorkspaceDescription("");
      fetchworkspaces();
      onClose()
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      toast.success('Workspace created successfully!')
    }
  };

  return (
    <form onSubmit={createWorkspace} className="flex flex-col space-y-4 w-[300px] max-sm:w-full">
      <h1 className='text-2xl font-bold text-gray-900'>Create Workspace</h1>
    <input
      type="text"
      value={newWorkspaceName}
      onChange={(e) => setNewWorkspaceName(e.target.value)}
      placeholder="Workspace Name"
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    />
    {/* <textarea
      value={newWorkspaceDescription}
      onChange={(e) => setnewWorkspaceDescription(e.target.value)}
      placeholder="Enter description of workspace..."
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
    ></textarea> */}
    <button type="submit" className="bg-primary text-white p-2 rounded">
      Create Workspace
    </button>
  </form> 
  )
}

export default CreateSpace