import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateWorkspaceFormdata } from "@/Types";
import api from "@/utils/api";

const UpdateSpace = (workspaceId) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormdata>();
  const { getToken } = useAuth();

  // handle the workspace update process
  const updateWorkspaceMutation = useMutation({
    mutationFn: async (data: CreateWorkspaceFormdata) => {
      const token = await getToken();
      await api.patch(
        `workspace/${workspaceId}`,
        {
          name: data.WorkspaceName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Workspace Updated Successfully");
    },
    onError: (error) => {
      toast.error("Error updating Workspace");
      console.log("Error Updating Workspace", error);
    },
  });

  // Handler for mutation Trigger
  const updateWorkspace = (data: CreateWorkspaceFormdata) => {
    updateWorkspaceMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(updateWorkspace)}
      className="flex flex-col space-y-4 w-[300px] max-sm:w-full"
    >
      <h1 className="text-2xl font-bold text-gray-900">Update Workspace</h1>
      <input
        type="text"
        {...register("WorkspaceName", {
          required: "Workspace Name is required",
        })}
        placeholder="Workspace Name"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      {errors.WorkspaceName && (
        <p className="text-red-500 text-sm">
          {errors.WorkspaceName.message as string}
        </p>
      )}
      <button type="submit" className="bg-primary text-white p-2 rounded">
        Update Workspace
      </button>
    </form>
  );
};

export default UpdateSpace;
