"use client";

import api from "../../../../../../utils/api";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import FormatDate from "../../../../../../helpers/DateFormatter";
import YouTubeConnect from "../../../../../../components/youtubeConnect";
import VideoPlayer from "../../../../../../components/youtubePlayer";

interface Video {
  _id: string;
  title: string;
  description: string;
  workspaceId: string;
  uploadedBy: {
    userId: string;
    name: string;
  };
  cloudinaryId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}
export default function VideoDetailsPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    if (videoId && getToken) {
      fetchVideoDetails();
    }
  }, [videoId, getToken]);

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await api.get(`/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveAndUploadVideo = async () => {
    try {
      const token = await getToken();
      await api.post(`/video/${videoId}/approve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVideoDetails();
    } catch (error) {
      console.error("Error approving and uploading video:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center ">
        
        <div className="flex gap-2">
          <YouTubeConnect />
          {video.status === "pending" && (
            <button
              onClick={approveAndUploadVideo}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve and Upload to YouTube
            </button>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col">
        <div className="w-[800px] h-[415px]">
          <VideoPlayer src={video.cloudinaryId} />
        </div>
       
       <div className="flex flex-col py-10">
        <h1 className="text-xl font-bold">{video.title}</h1> 
        <p className="text-gray-600">{video.description}</p>
        <p className="text-sm text-gray-500">Status: {video.status}</p>
        <p className="text-sm text-gray-500">
          Uploaded by: {video.uploadedBy.name}
        </p>
        <p className="text-sm text-gray-500">
          Created: <FormatDate isoString={video.createdAt} />
        </p>
        <p className="text-sm text-gray-500">
          Last updated: <FormatDate isoString={video.updatedAt} />
        </p>
        </div>
      </div>
    </div>
  );
}
