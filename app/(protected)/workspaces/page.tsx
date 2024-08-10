"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../../utils/api";
import { useAuth } from "@clerk/nextjs";
import FormatDate from "../../../helpers/DateFormatter";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      await fetchWorkspaces();
    };
    init();
  }, []);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
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

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderWorkspaces = () => {
    return filteredWorkspaces.map((workspace) => (
      <Link key={workspace._id} href={`/workspaces/${workspace._id}`}>
        <li
          className="relative p-6 bg-white border border-gray-300 rounded-lg shadow-lg mb-4 hover:bg-gray-50 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-primary hover:underline">{workspace.name}</h3>
          <p className="text-sm text-gray-800 mt-2">
            <span className="font-semibold text-gray-900">Description:</span>{" "}
            {workspace.description}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            <span className="font-semibold text-gray-900">Creator:</span>{" "}
            {workspace.owner.name}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            <span className="font-semibold text-gray-900">Editors:</span>{" "}
            {workspace.editors.length}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            <span className="font-semibold text-gray-900">Last Modified:</span>{" "}
            <FormatDate isoString={workspace.lastModified} />
          </p>
        </li>
      </Link>
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Workspaces</h1>
        <input
          type="text"
          placeholder="Search Workspaces..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 p-2 w-full border border-gray-300 rounded-lg"
        />
      </header>

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
