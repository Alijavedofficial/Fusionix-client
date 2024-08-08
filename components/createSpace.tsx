import React, { useState } from 'react'
import api from "../utils/api";

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
      fetchworkspaces()
      onClose()
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <form onSubmit={createWorkspace} className="mb-4 flex flex-col gap-2">
    <input
      type="text"
      value={newWorkspaceName}
      onChange={(e) => setNewWorkspaceName(e.target.value)}
      placeholder="New Workspace Name"
      className="border p-2 mr-2"
    />
    <textarea
      value={newWorkspaceDescription}
      onChange={(e) => setnewWorkspaceDescription(e.target.value)}
      placeholder="Enter description of workspace..."
      className="border p-2 mr-2"
    ></textarea>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
      Create Workspace
    </button>
  </form> 
  )
}

export default CreateSpace