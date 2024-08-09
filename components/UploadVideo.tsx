import { useState } from "react";
import api from "../utils/api";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";

export default function UploadVideo(onClose) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        try {
          setIsLoading(true);
          e.preventDefault();
          const formData = new FormData();
          formData.append("video", file);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("workspaceId", id.toString());
          await api.post(`/video/upload`, formData);
          setTitle("");
          setDescription("");
          setFile(null);
        } catch (error) {
          console.error("Error uploading video", error);
        } finally {
          setIsLoading(false);
        }
      };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
    return (
      <form onSubmit={handleSubmit} className="p-2 space-y-4 w-[400px] flex-grow max-sm:w-full">
        
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-800 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
    
      <div className="flex flex-col">
        <label htmlFor="description" className="text-gray-800 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
    
      <div className="flex flex-col">
  <label htmlFor="file" className="text-gray-800 font-semibold mb-2">
    Video File
  </label>
  <div className="relative">
    <input
      type="file"
      id="file"
      accept="video/*"
      onChange={handleFileChange}
      required
      className=""
    />
    <label
      htmlFor="file"
      className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    >
      <Icon
        icon="material-symbols:cloud-upload"
        className="text-blue-500 mr-2"
        style={{ fontSize: "24px" }}
      />
      <span className="text-gray-800 font-medium">Upload Video</span>
    </label>
  </div>
</div>


    
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Upload Video
      </button>
    </form>
    
    )
}