"use client";

import api from "../../../../../../utils/api";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import FormatDate from "../../../../../../helpers/DateFormatter";
import YouTubeConnect from "../../../../../../components/youtubeConnect";
import VideoPlayer from "../../../../../../components/youtubePlayer";
import Link from "next/link";

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
    } catch (error) {
      console.error("Error approving and uploading video:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
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
    <div className="p-4">
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
        </div>
      <div className="flex gap-6">
        {/* Video Player Section */}
        <div className="flex-1">
          <div className="w-[800px] h-auto">
            <VideoPlayer src={video.cloudinaryId} />
          </div>
          <div className="flex flex-col mt-4">
            <h1 className="text-2xl font-semibold mb-2">{video.title}</h1>
            <p className="text-gray-600 mb-2">{video.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Uploaded by:</span> {video.uploadedBy.name}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Created:</span> <FormatDate isoString={video.createdAt} />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Last updated:</span> <FormatDate isoString={video.updatedAt} />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Status:</span> {video.status}
              </p>
            </div>
           
          </div> 
        </div>  
        <div className="w-80 lg:w-96">
  <h2 className="text-lg font-semibold mb-4">More videos</h2>
  <div className="space-y-3">
    {otherVideos.map((video) => (
      <Link href={`/workspaces/${video.workspaceId}/videos/${video._id}`} key={video._id}>
        <div className="flex space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <div className="w-40 h-24 bg-gray-200 rounded overflow-hidden">
            <video src={video.cloudinaryId} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{video.uploadedBy.name}</p>
            <p className="text-xs text-gray-500">Status: {video.status}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
      </div>
      
    </div>
  );
}
