"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from '../../../../../utils/api'
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function VideosPage() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    if (id && getToken) {
      fetchVideosAndWorkspace();
    }
  }, [id, getToken]);

  const fetchVideosAndWorkspace = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await api.get(`/video/workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` ,
        }
      })
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-4">{workspace.name} - Videos</h1>
      <p className="text-gray-600 mb-6">{workspace.description}</p> */}
      {videos.length === 0 ? (
        <p className="text-lg text-gray-500">No videos found in this workspace.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <li key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
              <video src={video.cloudinaryId} controls />
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <p className="text-sm text-gray-500">Status: {video.status}</p>
                <p className="text-sm text-gray-500">Uploaded by: {video.uploadedBy.name}</p>
                <Link href={`/workspaces/${id}/videos/${video._id}`}>Open</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}