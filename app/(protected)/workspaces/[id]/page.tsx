"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../utils/api";
import InviteEditorForm from "../../../../components/InviteEditorForm";
import { useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../../../../components/Modal";
import UploadVideo from "../../../../components/UploadVideo";
import { Icon } from "@iconify/react";
import DeleteWorkspaceModal from "../../../../components/DeleteConfirmation";

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openEditorModal = () => setIsEditorModalOpen(true);
  const closeEditorModal = () => setIsEditorModalOpen(false);

  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (id && getToken) {
      fetchWorkspaceDetails();
    }
  }, [id, getToken]);

  const fetchWorkspaceDetails = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await api.get(`/workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkspace(response.data);
    } catch (error) {
      console.error("Error fetching workspace details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteWorkspace = async () => {
    try {
      const token = await getToken();
      await api.delete(`workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Workspace deleted successfully!");
      router.push('/workspaces');
    } catch (error) {
      console.error("Error deleting workspace", error);
      toast.error("Failed to delete workspace.");
    }
  };

  const handleInviteSent = () => {
    fetchWorkspaceDetails();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  }

  const renderEditors = () => {
    return workspace.editors.map((editor) => (
      <li key={editor.userId} className="text-gray-700">
        {editor.name}
      </li>
    ));
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{workspace.name}</h1>
        {workspace.owner.userId === user.id && (
          <div className="flex items-center gap-4">
            <button 
              onClick={openEditorModal} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Invite Editor
            </button>
            <button 
              onClick={openDeleteModal}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Delete Workspace
            </button>
          </div>
        )}
      </div>
      
      <button onClick={openModal} className="w-full sm:w-auto">
        <div className="flex items-center justify-between bg-white hover:bg-blue-50 p-4 rounded-lg border border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon icon="iconoir:youtube" className="text-blue-500" style={{ fontSize: "24px" }} />
            </div>
            <span className="font-semibold text-gray-900">Upload Video</span>
          </div>
          <Icon icon="material-symbols:upload" className="text-gray-500" style={{ fontSize: "24px" }} />
        </div>
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-lg">
          <span className="font-semibold text-gray-900">Description:</span> {workspace.description}
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
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DeleteWorkspaceModal onDelete={DeleteWorkspace} workspaceName={workspace.name} onCancel={closeDeleteModal} />
      </Modal>
      <Modal isOpen={isEditorModalOpen} onClose={closeEditorModal}>
        <InviteEditorForm workspaceId={id} onInviteSent={handleInviteSent} />
      </Modal>

      {workspace.owner.userId === user.id && (
        <div className="mt-8">
          <Link href={`/workspaces/${id}/videos`}>
            <p className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              View Videos
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
