"use client";

import { useAuth } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import YouTubeConnect from "@/components/Video/youtubeConnect";
import VideoPlayer from "@/components/Video/youtubePlayer";
import FormatDate from "@/helpers/DateFormatter";
import api from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/ui/PopOver";
import DeleteWorkspaceModal from "@/components/Workspace/DeleteConfirmation";
import Modal from "@/components/common/Modal";

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
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
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
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({ title, description }: any) => {
      const token = await getToken();
      const response = await api.patch(
        `/video/${videoId}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Video updated successfully");
    },
    onError: (error) => {
      console.error("Error updating Video", error);
      toast.error("Failed to update Video Details.");
    },
  });

  const updateVideo = async () => {
    updateVideoMutation.mutate({
      title: video.title,
      description: video.description,
    });
  };

  const deleteVideoMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      await api.delete(`/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Video deleted successfully");
      closeDeleteModal()
      router.push("/workspaces");
    },
    onError: (error) => {
      console.error("Error deleting Video", error);
      toast.error("Failed to delete Video.");
      closeDeleteModal()
    },
  });

  const deleteVideo = async () => {
    deleteVideoMutation.mutate();
  };

  const approveAndUploadVideo = async () => {
    try {
      const token = await getToken();
      await api.post(`/video/${videoId}/approve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Video Uploaded successfully");
      redirect("/dashboard");
    } catch (error) {
      console.error("Error approving and uploading video:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Video not found</p>
      </div>
    );
  }

  if (error) {
    toast.error("Error");
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
        <Popover>
          <PopoverTrigger>
            <button className="hover:bg-gray-300 rounded-md p-2">
              <Icon
                icon="bi:three-dots-vertical"
                className=""
                style={{ fontSize: "20px" }}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="p-2 border-b border-gray-300 text-[15px] font-medium">
              Options
            </p>
            <div className="flex flex-col space-y-1 p-1">
              <button
                // onClick={}
                className="flex items-center justify-between space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-colors duration-200 font-medium"
              >
                <span>Update</span>
                <Icon icon="octicon:pencil-24" className="text-lg" />
              </button>
              <button
                onClick={openDeleteModal}
                className="flex items-center justify-between space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors duration-200 font-medium"
              >
                <span>Delete</span>
                <Icon icon="ant-design:delete-outlined" className="text-lg" />
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DeleteWorkspaceModal
          onDelete={deleteVideo}
          value={video.title}
          onCancel={closeDeleteModal}
          name="Video"
        />
      </Modal>

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
