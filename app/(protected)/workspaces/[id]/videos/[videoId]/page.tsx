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
import Loader from "../../../../../../components/Loader";
import { Icon } from "@iconify/react";

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
      <Loader />
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
    <div className="container mx-auto px-4 py-6">
  {/* Header and Actions */}
  <div className="flex justify-end items-center mb-6 gap-5">
    <YouTubeConnect />
    {video.status === "pending" ? (
      <button
        onClick={approveAndUploadVideo}
        className="border border-primary text-primary bg-purple-100  px-4 py-2 rounded-lg shadow-lg hover:bg-opacity-80 transition-all flex gap-2 items-center"
      >
        <Icon icon="mdi:approve" className="text-lg" />
        Approve & Upload
      </button>
    ) : (
      <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
        Video Uploaded
      </button>
    )}
  </div>

  <div className="flex flex-col md:flex-row gap-8">
    {/* Main Video Section */}
    <div className="flex-1">
      <div className="relative pb-[56.25%] overflow-hidden rounded-xl shadow-lg">
        <div className="absolute inset-0 h-screen">
          <VideoPlayer src={video.cloudinaryId} />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        <div className="flex items-center gap-4 my-2">
          <p className="text-sm text-gray-500">{video.uploadedBy.name}</p>
          <p className="text-sm text-gray-500">
            <FormatDate isoString={video.createdAt} />
          </p>
        </div>
        <p className="text-sm text-gray-700 mt-4 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  </div>
</div>

  );
}
