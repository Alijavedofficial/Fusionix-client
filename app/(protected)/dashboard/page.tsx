"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import FormatDate from "../../../helpers/DateFormatter";
import { Icon } from "@iconify/react";
import { set } from "react-hook-form";
import CreateSpace from "../../../components/createSpace";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Workspace {
  _id: string;
  name: string;
  owner: { name: string };
  lastModified: string;
  editors: any[];
}

interface Video {
  _id: string;
  title: string;
  status: string;
  uploadedBy: {
    name: string;
  };
  cloudinaryId: string;
  workspaceId: string;
}

export default function Dashboard() {
  const { getToken } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchWorkspaces();
    fetchVideos();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const token = await getToken();
      const response = await api.get<Workspace[]>("/workspace", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedWorkspaces = response.data
        .sort(
          (a, b) =>
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime()
        )
        .slice(0, 4);
      setWorkspaces(sortedWorkspaces);
    } catch (error) {
      toast.error("Error fetching workspaces");
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
      setVideos(response.data);
    } catch (error) {
      toast.error("Error fetching Videos");
    }
  };

  return (
    <div className="flex flex-col justify-betweem gap-10 p-2 w-[60%]">

      {/* add new workspace */}
      <button onClick={openModal}>
        <div className="flex items-center justify-between hover:text-primary  p-2 rounded-lg border border-gray-300 cursor-pointer w-[40%] hover:shadow-md transition-shadow">
          <div className="flex gap-4 justify-center items-center">
          <div className="bg-blue-100 p-4 rounded-lg">
            <Icon
              icon="tabler:folder"
              className="text-primary"
              style={{ fontSize: "20px" }}
            />
          </div>
          <span className="font-medium">Create Workspace</span>
          </div>
          <Icon icon="tabler:plus" className="" style={{ fontSize: "20px" }} />
        </div>
      </button>

      <div className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden p-4 flex-grow w-full">
        {/* Workspace Heading and Buttons for add and view all */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Workspaces</h1>
          <div className="flex justify-center items-center gap-4">
            <button>
              <Link href={`/workspaces`}>See all</Link>
            </button>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateSpace onClose={closeModal} fetchworkspaces={fetchWorkspaces} />
        </Modal>

        {/* Workspace Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-gray-500">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  last updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  editors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  <Icon
                    icon="tabler:dots"
                    className=""
                    style={{ fontSize: "18px" }}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workspaces.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/workspaces/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.owner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FormatDate isoString={item.lastModified} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span>{item.editors.length}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Icon
                      icon="tabler:dots"
                      className=""
                      style={{ fontSize: "18px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden p-4 flex-grow w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Recent Videos</h1>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-gray-500">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Video
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  <Icon
                    icon="tabler:dots"
                    className=""
                    style={{ fontSize: "18px" }}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video._id}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <Link
                      href={`workspaces/${video.workspaceId}/videos/${video._id}`}
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-md p-2">
                        <video
                          src={video.cloudinaryId}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {video.title}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      video.status === "approved"
                        ? "text-green-400"
                        : video.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {video.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {video.uploadedBy.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Icon
                      icon="tabler:dots"
                      className=""
                      style={{ fontSize: "18px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
