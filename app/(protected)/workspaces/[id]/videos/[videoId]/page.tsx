"use client";

import { useAuth } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../../../../components/Loader";
import YouTubeConnect from "../../../../../../components/youtubeConnect";
import VideoPlayer from "../../../../../../components/youtubePlayer";
import FormatDate from "../../../../../../helpers/DateFormatter";
import api from "../../../../../../utils/api";
import { useQuery } from "@tanstack/react-query";

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
  const { getToken } = useAuth();

  const {data: video, isLoading, error} = useQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<Video>(`/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
})

if (error) {
  toast.error("Error fetching Video Details");
}

if (isLoading) {
  return <Loader />
}
  // const fetchVideoDetails = async () => {
  //   try {
  //     setIsLoading(true);
  //     const token = await getToken();
  //     const response = await api.get(`/video/${videoId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setVideo(response.data);
  //   } catch (error) {
  //     console.error("Error fetching video details:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const approveAndUploadVideo = async () => {
    try {
      const token = await getToken();
      await api.post(`/video/${videoId}/approve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      <button className=" text-green-600 py-2 px-4 rounded-lg">
        Video Uploaded
      </button>
    )}
  </div>

  <div className="flex flex-col md:flex-row gap-8">
    {/* Video Section */}
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
