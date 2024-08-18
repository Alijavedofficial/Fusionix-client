"use client";

import api from "../../../../../../utils/api";
import { redirect, useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import FormatDate from "../../../../../../helpers/DateFormatter";
import YouTubeConnect from "../../../../../../components/youtubeConnect";
import VideoPlayer from "../../../../../../components/youtubePlayer";
import Link from "next/link";
import { toast } from "react-toastify";

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
  const [otherVideos, setOtherVideos] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    if (videoId && getToken) {
      fetchVideos()
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

  const fetchVideos = async () => {
    try {
      const token = await getToken();
      const response = await api.get("/video/getAllVideos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOtherVideos(response.data);
    } catch (error) {
      console.error("Error fetching Videos");
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
      toast.success('Video Uploaded successfully')
      redirect('/dashboard')
    } catch (error) {
      console.error("Error approving and uploading video:", error);
    }
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

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Video not found</p>
      </div>
    );
  }

  return (
    <div className="px-4">
    <div className="p-4 flex justify-end items-center gap-2">
      <YouTubeConnect />
      {video.status === "pending" && (
        <button
          onClick={approveAndUploadVideo}
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
        >
          Approve and Upload to YouTube
        </button>
      )}
      {video.status === 'approved' && (
        <button className="bg-green-600 text-white py-2 px-4">Video Uploaded</button>
      )}
    </div>
    <div className="flex gap-6 px-14">
      {/* Main video and details */}
      <div className="flex-1">
        <div className="w-full aspect-video rounded-xl">
          <VideoPlayer src={video.cloudinaryId} />
        </div>
        <div className="mt-4">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <div className="flex items-center gap-4 my-2">
            <p className="text-sm text-gray-500">{video.uploadedBy.name}</p>
            <p className="text-sm text-gray-500">
              <FormatDate isoString={video.createdAt} />
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-4">{video.description}</p>
        </div>
      </div>
     
    </div>
  </div>
  );
}
