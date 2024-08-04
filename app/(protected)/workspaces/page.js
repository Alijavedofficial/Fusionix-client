"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../../utils/api";
import { useAuth } from "@clerk/nextjs";
import FormatDate from "../../../helpers/DateFormatter";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [newWorkspaceDescription, setnewWorkspaceDescription] = useState("");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {getToken} = useAuth()

  
   useEffect(() => {
    const init = async () => {
      await fetchWorkspaces();
    };
    init();
  }, []);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const token = await getToken()
      const response = await api.get("/workspace", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (e) => {
    e.preventDefault();
    try {
      await api.post("/workspace", {
        name: newWorkspaceName,
        description: newWorkspaceDescription,
      });
      setNewWorkspaceName("");
      setnewWorkspaceDescription("");
      fetchWorkspaces();
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const renderWorkspaces = () => {
    return workspaces.map((workspace) => {
      return (
        <Link href={`/workspaces/${workspace._id}`}>
          <li
            key={workspace._id}
            className="relative p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-2 hover:bg-gray-100"
          >
            <p key={workspace.name}
              href={`/workspaces/${workspace._id}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              {workspace.name}
            </p>
            <p key={workspace.description} className="text-sm text-gray-700 mt-2">
              <span className="font-semibold text-gray-900">Description:</span>{" "}
              {workspace.description}
            </p>
            <p key={workspace.owner.name} className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Creator:</span>{" "}
              {workspace.owner.name}
            </p>
            <p key={workspace.editors.length} className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Editors:</span>{" "}
              {workspace.editors.length}
            </p>
            <p key={workspace.lastModified} className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">
                Last Modified:
              </span>{" "}
              <FormatDate isoString={workspace.lastModified} />
            </p>
          </li>
        </Link>
      );
    });
  };
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>
     <form onSubmit={createWorkspace} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          placeholder="New Workspace Name"
          className="border p-2 mr-2"
        />
        <textarea
          type="text"
          value={newWorkspaceDescription}
          onChange={(e) => setnewWorkspaceDescription(e.target.value)}
          placeholder="Enter description of workspace..."
          className="border p-2 mr-2"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Workspace
        </button>
      </form> 
      {isLoading ? (
        <div className="flex justify-center items-center">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>
      ) : (
        <ul>{renderWorkspaces()}</ul>
      )}
    </div>
  );
}
