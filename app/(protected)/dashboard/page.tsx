"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import FormatDate from "../../../helpers/DateFormatter";
import { Icon } from "@iconify/react";
import CreateSpace from "../../../components/createSpace";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatedTooltip } from "../../../components/ui/EditorTooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/ToolTip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/PopOver";
import Loader from "../../../components/Loader";

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
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchWorkspaces();
    fetchVideos();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await api.get("/video/getAllVideos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(response.data);
    } catch (error) {
      toast.error("Error fetching Videos");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-betweem gap-10 p-2">
      <div className="flex items-center flex-grow rounded-lg border border-gray-300 p-4">
        <div className="flex px-4 py-2 gap-8 flex-grow custom-dotted-border">
        <div className="bg-purple-100 p-3 rounded-lg">
              <Icon
                icon="ph:briefcase-light"
                className="text-primary"
                style={{ fontSize: "24px" }}
              />
            </div>
            <div className="flex flex-col">
          <h6>Total Workspaces</h6>
          <h1 className="font-bold text-xl">2</h1>
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 flex-grow custom-dotted-border">
        <div className="bg-purple-100 p-3 rounded-lg">
              <Icon
                icon="mage:users"
                className="text-primary"
                style={{ fontSize: "24px" }}
              />
            </div>
            <div className="flex flex-col">
          <h6>Total Members</h6>
          <h1 className="font-bold text-xl">3</h1>
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 flex-grow custom-dotted-border">
        <div className="bg-purple-100 p-3 rounded-lg">
              <Icon
                icon="mdi:approve"
                className="text-primary"
                style={{ fontSize: "24px" }}
              />
            </div>
            <div className="flex flex-col">
          <h6>Approved Videos</h6>
          <h1 className="font-bold text-xl">5</h1>
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 flex-grow">
        <div className="bg-purple-100 p-3 rounded-lg">
              <Icon
                icon="material-symbols-light:pending-actions-rounded"
                className="text-primary"
                style={{ fontSize: "24px" }}
              />
            </div>
            <div className="flex flex-col">
          <h6>Pending Videos</h6>
          <h1 className="font-bold text-xl">2</h1>
          </div>
        </div>
      </div>


       <div className="flex justify-between gap-5 w-[60%]">
          <div className="bg-white flex-grow p-2 rounded-md px-4 custom-shadow-container duration-300 transition-shadow">
            <div className="flex justify-between items-center custom-dotted-bottomborder py-4">
              <h1 className='font-semibold text-lg'>Workspaces</h1>
              <div className="flex gap-2 items-center">
              <TooltipProvider> 
              <Tooltip delayDuration={100}>
              <TooltipTrigger>
              <button onClick={openModal} className="bg-primary text-white rounded-md p-2 border border-gray-300">
                          <Icon icon="material-symbols:add" style={{ fontSize: "18px" }} />
              </button>
              </TooltipTrigger>
              <TooltipContent>
                          <p>Create Workspace</p>
                        </TooltipContent> 
              </Tooltip>
              </TooltipProvider>
             <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                <button className=" rounded-md p-2 border border-gray-300 custom-shadow">
                          <Icon icon="ci:expand" style={{ fontSize: "18px" }} />
              </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View All</p>
                </TooltipContent>
              </Tooltip>
             </TooltipProvider>
              
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4 py-4">
            
      {workspaces.map((item, index) => (
        <Link href={`/workspaces/${item._id}`} key={index}>
      <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-300 cursor-pointer custom-shadow transition-shadow duration-300">
      <span className="inline-flex items-center w-12 h-12 justify-center bg-blue-100 text-primary text-[20px] font-semibold rounded px-4 py-3 uppercase">
            {item.name.charAt(0)}
      </span>
      <div className="flex flex-col  items-start">
      <span className="font-medium">{item.name}</span>
      <span className="text-gray-500 text-sm">{item.editors.length} Editors</span>
      </div>
      </div>
      </Link>
        ))}
    </div>
          </div>

         </div>

       <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateSpace onClose={closeModal} fetchworkspaces={fetchWorkspaces} />
        </Modal>

      {/* add new workspace */}
      {/* <button onClick={openModal} className="w-[40%]">
        <div className="flex items-center justify-between bg-white hover:text-primary  p-2 rounded-lg border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow">
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
      </button> */}

      {/* <div className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden p-4 flex-grow hover:shadow-lg transition-shadow w-[60%]"> */}
        {/* Workspace Heading and Buttons for view all 
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold mb-4">Workspaces</h1>
          <div className="flex justify-center items-center gap-4">
            <button>
              <Link href={`/workspaces`}>See all</Link>
            </button>
          </div>
        </div>

        

        {/* Workspace Table 
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary">
              <tr className="text-white">
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  name
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium  uppercase tracking-wider">
                  creator
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  last updated
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium  uppercase tracking-wider">
                  editors
                </th>
                <th className="px-8 py-2 text-left text-xs font-medium  uppercase tracking-wider">
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
                <tr
                  key={index}
                  className=" hover:bg-gray-100 transition-opacity"
                >
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-primary">
                        <TooltipTrigger>
                          <Link href={`/workspaces/${item._id}`}>
                            <div className="flex gap-2 items-center">
                              <span>{item.name}</span>
                              <Icon
                                icon="mi:external-link"
                                style={{ fontSize: "14px" }}
                              />
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to Open</p>
                        </TooltipContent>
                      </td>
                    </Tooltip>
                  </TooltipProvider>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    {item.owner.name}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <FormatDate isoString={item.lastModified} />
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-row items-center justify-start gap-2 w-full">
                      <AnimatedTooltip items={item.editors} />
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <Popover>
                      <PopoverTrigger>
                        <button className="hover:bg-gray-300 rounded-md p-2">
                          <Icon
                            icon="tabler:dots"
                            className=""
                            style={{ fontSize: "18px" }}
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="p-2 border-b border-gray-300 text-[15px] font-medium">
                          Options
                        </p>
                        <div className="flex flex-col space-y-1 p-1">
                          <button className="flex items-center justify-between font-medium space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200">
                            <span>Visit</span>
                            <Icon icon="mdi:open-in-new" className="text-lg" />
                          </button>
                          <button className="flex items-center justify-between font-medium space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-colors duration-200">
                            <span>Update</span>
                            <Icon
                              icon="octicon:pencil-24"
                              className="text-lg"
                            />
                          </button>
                          <button className="flex items-center justify-between font-medium space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors duration-200">
                            <span>Delete</span>
                            <Icon
                              icon="ant-design:delete-outlined"
                              className="text-lg"
                            />
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      */}
      {/* Videos Table 
      <div className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden p-4 flex-grow w-[60%]  hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold mb-4">Recent Videos</h1>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary">
              <tr className="text-white">
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Video
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-8 py-2 text-left text-xs font-medium  uppercase tracking-wider">
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
                <tr
                  key={video._id}
                  className="hover:bg-gray-100 transition-opacity"
                >
                  <td className="px-6 py-2 whitespace-nowrap">
                    <Link
                      href={`workspaces/${video.workspaceId}/videos/${video._id}`}
                    >
                      <div className="relative w-10 h-10 bg-gray-200 rounded-md p-1.5 group">
                        <video
                          src={video.cloudinaryId}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                          <Icon
                            icon="mdi:play"
                            className="text-red-600 text-[22px]"
                            style={{ fontSize: "22px" }}
                          />
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
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
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    {video.uploadedBy.name}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <Popover>
                      <PopoverTrigger>
                        <button className="hover:bg-gray-300 rounded-md p-2">
                          <Icon
                            icon="tabler:dots"
                            className=""
                            style={{ fontSize: "18px" }}
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="p-2 border-b border-gray-300 text-[15px] font-medium">
                          Options
                        </p>
                        <div className="flex flex-col space-y-1 p-1">
                          <button className="flex items-center justify-between space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200 font-medium">
                            <span>Approve</span>
                            <Icon icon="mdi:approve" className="text-lg" />
                          </button>
                          <button className="flex items-center justify-between space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-600 rounded-md transition-colors duration-200 font-medium">
                            <span>Update</span>
                            <Icon
                              icon="octicon:pencil-24"
                              className="text-lg"
                            />
                          </button>
                          <button className="flex items-center justify-between space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors duration-200 font-medium">
                            <span>Delete</span>
                            <Icon
                              icon="ant-design:delete-outlined"
                              className="text-lg"
                            />
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>*/}
    </div>
  );
}
