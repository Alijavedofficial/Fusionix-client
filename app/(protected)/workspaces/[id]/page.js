"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "../../../../utils/api";
import InviteEditorForm from "../../../../components/InviteEditorForm";
import { useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
    if (id && getToken) {
      fetchWorkspaceDetails();
    }
  }, [id, getToken]);

  const fetchWorkspaceDetails = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await api.get(`/workspace/${id}`, {
        Authorization: `Bearer ${token}`,
      });
      setWorkspace(response.data);
    } catch (error) {
      console.error("Error fetching workspace details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("workspaceId", id);
      const response = await api.post(`/video/upload`, formData);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading video", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteSent = () => {
    fetchWorkspaceDetails();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  const renderEditors = () => {
    return workspace.editors.map((editor) => (
      <li key={editor.userId} className="text-gray-700">
        {editor.name}
      </li>
    ));
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Workspace: {workspace.name}</h1>
      <p className="mb-4">
        <span className="font-semibold text-gray-900 text-lg">
          Description:
        </span>{" "}
        {workspace.description}
      </p>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Owner:</h2>
        <p className=" text-gray-700">{workspace.owner.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Editors:</h2>
        <ul className=" space-y-2 text-gray-700">{renderEditors()}</ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            required
            rows="4"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="file" className="text-gray-700 font-medium mb-2">
            Video File
          </label>
          <input
            type="file"
            id="file"
            accept="video/*"
            onChange={handleFileChange}
            required
            className="border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Upload Video
        </button>
      </form>

      {workspace.owner.userId === user.id && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Invite Editor:</h2>
          <InviteEditorForm workspaceId={id} onInviteSent={handleInviteSent} />
          <Link href={`/workspaces/${id}/videos`}>
            <p className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Videos
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
