"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteWorkspaceModal from "../../../../components/DeleteConfirmation";
import InviteEditorForm from "../../../../components/InviteEditorForm";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/PopOver";
import UploadVideo from "../../../../components/UploadVideo";
import api from "../../../../utils/api";

export default function WorkspaceDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);
  const [updatedWorkspaceName, setupdatedWorkspaceName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openEditorModal = () => setIsEditorModalOpen(true);
  const closeEditorModal = () => setIsEditorModalOpen(false);
  const openUpdateModel = () => setIsUpdateModelOpen(true);
  const closeUpdateModel = () => setIsUpdateModelOpen(false);  
  const queryClient = useQueryClient()

  const { user } = useUser();
  const { getToken } = useAuth();

  const {data: workspace, isLoading, error} = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get(`/workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    }
  })

  const updateWorkspaceMutation = useMutation({
    mutationFn: async ({ name }: any) => {
      const token = await getToken();
      const response = await api.patch(
        `workspace/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace", id]});
      toast.success("Workspace updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating workspace:", error);
      toast.error("Failed to update workspace.");
    }
  });
  
  const UpdateWorkspace = async () => {
    updateWorkspaceMutation.mutate({ name: updatedWorkspaceName });
  };


  const deleteWorkspaceMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      await api.delete(`workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }, 
    onSuccess: () => {
      toast.success("Workspace deleted successfully!");
      router.push("/workspaces");
    },
    onError: (error) => {
      console.error("Error deleting workspace:", error);
      toast.error("Failed to delete workspace.");
    }
   }
  )

  const DeleteWorkspace = async () => {
    deleteWorkspaceMutation.mutate();
  };

  if (isLoading) {
    return (
     <Loader />
    );
  }

  const renderEditors = () => {
    return workspace.editors.map((editor) => (
      <div>
        <li key={editor.userId} className="text-gray-700">
          {editor.name}
        </li>
        <Image
          src={
            workspace.editors[0].ProfilePic ||
            "https://dashboard.clerk.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yanpBT3ZxNW9KNTJscFNxMXNoYzl0cFFxY0oiLCJyaWQiOiJ1c2VyXzJrNDNrTVhBT1VKVUlGZTJQVURXQ0wxZlFFVCIsImluaXRpYWxzIjoiQSJ9&w=1920&q=75"
          }
          width={30}
          height={30}
          className="rounded-full w-8 h-auto"
          alt="editor"
        />
      </div>
    ));
  };

  return (
    <div className="p-6 px-40 mx-auto space-y-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 flex items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-primary text-[18px] font-semibold mr-4 rounded">
            {workspace.name.charAt(0)}
          </span>
          {workspace.name}
        </h1>
        {workspace.owner.userId === user.id && (
          <div className="flex items-center gap-4">
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
                    onClick={openUpdateModel}
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
                    <Icon
                      icon="ant-design:delete-outlined"
                      className="text-lg"
                    />
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="bg-blue-100 text-primary p-3 space-y-4 rounded-md">
        <h1 className="font-semibold text-xl">
          Add Editor to your workspace now!
        </h1>
        <p className="text-[15px]">
          Empower your team by adding an editor who can seamlessly upload videos
          for your review. Once approved, the content can be effortlessly
          published directly to YouTube, ensuring a smooth and efficient
          workflow from creation to upload.
        </p>
        <button
          onClick={openEditorModal}
          className="bg-primary hover:bg-opacity-80 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Add Editor
        </button>
      </div>

      <button onClick={openModal} className="w-[350px]">
        <div className="flex items-center justify-between bg-white hover:bg-blue-50 p-4 rounded-lg border border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon
                icon="iconoir:youtube"
                className="text-primary"
                style={{ fontSize: "24px" }}
              />
            </div>
            <span className="font-semibold text-gray-900">Upload Video</span>
          </div>
          <Icon
            icon="material-symbols:upload"
            className="text-gray-500"
            style={{ fontSize: "24px" }}
          />
        </div>
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-lg">
          <span className="font-semibold text-gray-900">Description:</span>{" "}
          {workspace.description}
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Owner:</h2>
          <p className="text-gray-700">{workspace.owner.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Editors:</h2>
          <ul className="space-y-2 text-gray-700">{renderEditors()}</ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadVideo onClose={closeModal} />
      </Modal>

      <Modal isOpen={isUpdateModelOpen} onClose={closeUpdateModel}>
        <form
          onSubmit={UpdateWorkspace}
          className="flex flex-col space-y-4 w-[300px] max-sm:w-full"
        >
          <h1 className="text-2xl font-bold text-gray-900">Update Workspace</h1>
          <input
            type="text"
            value={updatedWorkspaceName}
            onChange={(e) => setupdatedWorkspaceName(e.target.value)}
            placeholder="Workspace Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button type="submit" className="bg-primary text-white p-2 rounded">
            Update Workspace
          </button>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DeleteWorkspaceModal
          onDelete={DeleteWorkspace}
          workspaceName={workspace.name}
          onCancel={closeDeleteModal}
        />
      </Modal>
      <Modal isOpen={isEditorModalOpen} onClose={closeEditorModal}>
        <InviteEditorForm
          workspaceId={id}
          onCancel={closeEditorModal}
        />
      </Modal>

      {workspace.owner.userId === user.id && (
        <div className="mt-8">
          <Link href={`/workspaces/${id}/videos`}>
            <p className="inline-block bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              View Videos
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
