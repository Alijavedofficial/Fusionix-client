import { useState } from "react";
import api from "../utils/api";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

interface UploadVideoProps {
  onClose: () => void;
}
interface FormData {
  title: string;
  description: string;
  video: File | null;
  thumbnail: File | null;
}

export default function UploadVideo({onClose}: UploadVideoProps) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null)
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue, 
      watch,
    } = useForm();

    const UploadVideo:SubmitHandler<FormData> = async (data) => {
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("video", video);
          formData.append("thumbnail", thumbnail)
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('workspaceId', id.toString());

      await api.post('/video/upload', formData);

      reset();
      toast.success('Video Uploaded Successfully!');
      onClose();
        } catch (error) {
          console.error("Error uploading video", error);
          toast.error('Failed to upload video');
        } finally {
          setIsLoading(false);
          
        }
      };

      const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };
    const handleImageChange = (e) => {
      setThumbnail(e.target.files[0]);
    }
    
    return (
      <form onSubmit={handleSubmit(UploadVideo)} className="p-2 space-y-4 w-[500px] flex-grow max-sm:w-full">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-800 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Enter the title"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-gray-800 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter a description"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="file" className="text-gray-800 font-semibold mb-2">
          Video
        </label>
        <div className="relative">
        <input
      type="file"
      id="file"
      accept="video/*"
      className="hidden"
      onChange={handleFileChange}
    />
          <label
            htmlFor="file"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          >
            <Icon
              icon="material-symbols:cloud-upload"
              className="text-primary mr-2"
              style={{ fontSize: '24px' }}
            />
            <span className="text-gray-800 font-medium">Upload Video</span>
          </label>
          {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video.message as string}</p>}
        </div>
        {video && (
          <div className="mt-2 p-2 border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <span className="text-md text-gray-700 font-medium">{video.name}</span>
              <span className="text-sm text-gray-900 bg-gray-200 rounded-md p-1.5 font-medium">{(video.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="thumbnail" className="text-gray-800 font-semibold mb-2">
          Thumbnail
        </label>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
          className='hidden'
        />
        <label
            htmlFor="thumbnail"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          >
            <Icon
              icon="material-symbols:cloud-upload"
              className="text-primary mr-2"
              style={{ fontSize: '24px' }}
            />
            <span className="text-gray-800 font-medium">Upload Thumbnail</span>
          </label>
        {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message as string}</p>}
      </div>
      {thumbnail && (
          <div className="mt-2 p-2 border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <span className="text-md text-gray-700 font-medium">{thumbnail.name}</span>
              <span className="text-sm text-gray-900 bg-gray-200 rounded-md p-1.5 font-medium">{(thumbnail.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            
          </div>
        )}
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
