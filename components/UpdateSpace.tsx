import { useAuth } from '@clerk/nextjs';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../utils/api';

const UpdateSpace = (workspaceId) => {

    const [updatedWorkspaceName, setupdatedWorkspaceName] = useState('')
    const { getToken } = useAuth();

    const UpdateWorkspace = async () => {
        try {
            const token = await getToken()
            await api.patch(`workspace/${workspaceId}`,
                {
                  name: updatedWorkspaceName
                } , {
            headers: {  
              Authorization: `Bearer ${token}`,
            },
            })
        }  catch (error) {
            console.error("Error Updating workspace:", error);
          } finally {
            toast.success('Workspace Updated successfully!')
          }
    }

  return (
    <form onSubmit={UpdateWorkspace} className="flex flex-col space-y-4 w-[300px] max-sm:w-full">
    <h1 className='text-2xl font-bold text-gray-900'>Update Workspace</h1>
  <input
    type="text"
    value={updatedWorkspaceName}
    onChange={(e) => setupdatedWorkspaceName(e.target.value)}
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
    Update Workspace
  </button>
</form> 
  )
}

export default UpdateSpace