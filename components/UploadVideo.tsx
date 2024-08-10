import { useState } from "react";
import api from "../utils/api";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

export default function UploadVideo(onClose) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
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
          toast.success('Video Uploaded Successfully!');
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
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
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
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
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
            className="hidden"
          />
          <label
            htmlFor="file"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          >
            <Icon
              icon="material-symbols:cloud-upload"
              className="text-primary mr-2"
              style={{ fontSize: "24px" }}
            />
            <span className="text-gray-800 font-medium">Upload Video</span>
          </label>
        </div>
        {file && (
          <div className="mt-2 p-2 border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <span className="text-md text-gray-700 font-medium">{file.name}</span>
              <span className="text-sm text-gray-900 bg-gray-200 rounded-md p-1.5 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-900 bg-gray-200 rounded-md p-1.5">{file.type}</span>
              <span className="text-sm text-gray-600 p-1.5">modified {new Date(file.lastModified).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    
      <button
        type="submit"
        className={`w-full py-3 font-semibold rounded-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-80'} text-white transition duration-200`}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading Video...' : 'Upload'}
      </button>
    </form>
    );
}
