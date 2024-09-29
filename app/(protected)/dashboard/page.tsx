"use client";
import { useAuth } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateSpace from "@/components/Workspace/createSpace";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/ToolTip";
import { Workspace } from "../../../Types";
import api from "../../../utils/api";

export default function Dashboard() {
  const { getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: workspaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<Workspace[]>("/workspace", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
        .sort(
          (a, b) =>
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime()
        )
        .slice(0, 4);
    },
  });

  if (error) {
    toast.error("Error fetching workspaces");
  }

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
            <h1 className="font-semibold text-lg">Workspaces</h1>
            <div className="flex gap-2 items-center">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <button
                      onClick={openModal}
                      className="bg-primary text-white rounded-md p-2 border border-gray-300"
                    >
                      <Icon
                        icon="material-symbols:add"
                        style={{ fontSize: "18px" }}
                      />
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
                    <span className="text-gray-500 text-sm">
                      {item.editors.length} Editors
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateSpace
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
}
