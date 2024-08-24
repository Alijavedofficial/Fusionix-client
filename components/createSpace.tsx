import React, { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CreateWorkspaceFormdata } from "../Types";

const CreateSpace = ({ onClose, onWorkspaceCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createWorkspace = async (data: CreateWorkspaceFormdata) => {
    try {
      await api.post("/workspace", {
        name: data.WorkspaceName,
      });
      reset();
      onWorkspaceCreated()
      onClose();
      toast.success("Workspace created successfully!");
    } catch (error) {
      console.error("Error creating workspace:", error);
      toast.error("Failed to create workspace");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createWorkspace)}
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
      {errors.workspaceName && (
        <p className="text-red-500 text-sm">
          {errors.workspaceName.message as string}
        </p>
      )}
      <button type="submit" className="bg-primary text-white p-2 rounded">
        Create Workspace
      </button>
    </form>
  );
};

export default CreateSpace;
