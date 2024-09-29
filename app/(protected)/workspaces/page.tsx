"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Workspace } from "@/Types";
import Loader from "@/components/common/Loader";
import FormatDate from "@/helpers/DateFormatter";
import api from "@/utils/api";

export default function Workspaces() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getToken } = useAuth();

  const {
    data: workspaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<Workspace[]>("/workspace", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  // const filteredWorkspaces = workspaces.filter(workspace =>
  //   workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  if (error) {
    toast.error("Error fetching workspaces");
  }

  if (isLoading) {
    return <Loader />;
  }

  const renderWorkspaces = () => {
    return workspaces.map((workspace) => (
      <Link key={workspace._id} href={`/workspaces/${workspace._id}`}>
        <li className="relative p-6 bg-white border border-gray-300 rounded-lg shadow-lg mb-4 hover:bg-gray-50 transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-primary hover:underline">
            {workspace.name}
          </h3>
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

      <ul>{renderWorkspaces()}</ul>
    </div>
  );
}
