'use client'
import { useAuth, useUser } from '@clerk/nextjs';
import Link from "next/link";
import api from "../../../utils/api";
import { useEffect, useState } from 'react';
import FormatDate from "../../../helpers/DateFormatter";
import { Icon } from "@iconify/react";
import { set } from 'react-hook-form';
import CreateSpace from '../../../components/createSpace';
import Modal from '../../../components/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Workspace {
  _id: string; 
  name: string;
  owner: { name: string };
  lastModified: string;
  editors: any[];
}

export default function Dashboard() {
  const { user } = useUser();
  const {getToken} = useAuth()
  const [workspaces, setWorkspaces] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const tasks = [
    {
      id: 1,
      title: 'Create userflow for Hisphonic Application Design',
      status: 'In Review',
      completed: false,
    },
    {
      id: 2,
      title: 'Homepage design for Diphub Application',
      status: 'In Progress',
      completed: false,
    },
    {
      id: 2,
      title: 'Homepage design for Diphub Application',
      status: 'In Progress',
      completed: false,
    },
    {
      id: 2,
      title: 'Homepage design for Diphub Application',
      status: 'In Preview',
      completed: true,
    },
  ];


  useEffect(() => {
      fetchWorkspaces();
      fetchVideos()
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const token = await getToken()
      const response = await api.get<Workspace[]>("/workspace", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const sortedWorkspaces = response.data
        .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
        .slice(0, 4);
      setWorkspaces(sortedWorkspaces);
    } catch (error) {
      toast.error("Error fetching workspaces");
    }
  }

  const fetchVideos = async () => {
    try {
      const token = await getToken()
      const response = await api.get('/video/getAllVideos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
     setVideos(response.data)
    } catch (error) {
      toast.error("Error fetching Videos");
    }
  }

  return (
    <div className='flex justify-betweem gap-10 p-2 w-full'>

      <div className="bg-white rounded-lg shadow overflow-hidden p-4 flex-grow w-[60%]">
        {/* Workspace Heading and Buttons for add and view all */}
      <div className='flex justify-between items-center'>
      <h1 className="text-xl font-bold mb-4">Workspaces</h1>
      <div className='flex justify-center items-center gap-4'>
        <button>
          <Link href={`/workspaces`}>See all</Link></button>
        <button onClick={openModal} className='p-1.5 rounded-md text-white bg-[#2563EB]'>
        <Icon icon='gg:add' className="" style={{ fontSize: "18px" }} />
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
            <tr className='text-gray-500'>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">name</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">creator</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">last updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">editors</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">...</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workspaces.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><Link href={`/workspaces/${item._id}`}>{item.name}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.owner.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <FormatDate isoString={item.lastModified} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span>{item.editors.length}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>

    
    
    </div>
    
  );
}