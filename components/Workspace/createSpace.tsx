import React, { useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CreateWorkspaceFormdata } from "@/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

const CreateSpace = ({ onClose }) => {
  // Form management using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkspaceFormdata>();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // React Query's useMutation hook to handle the workspace creation process.
  const createWorkspaceMutation = useMutation({
    mutationFn: async (data: CreateWorkspaceFormdata) => {
      const token = await getToken();
      const response = await api.post(
        "/workspace",
        {
          name: data.WorkspaceName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      onClose();
      reset();
      toast.success("Workspace created successfully!");
    },
    onError: (error) => {
      console.error("Error creating workspace:", error);
      toast.error("Failed to create workspace");
    },
  });

  // Handler for mutation Trigger
  const onSubmit = (data: CreateWorkspaceFormdata) => {
    createWorkspaceMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-[300px] max-sm:w-full"
    >
      <h1 className="text-2xl font-bold text-gray-900">Create Workspace</h1>
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
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded"
        disabled={createWorkspaceMutation.isPending}
      >
        {createWorkspaceMutation.isPending ? "Creating..." : "Create Workspace"}
      </button>
    </form>
  );
};

export default CreateSpace;
