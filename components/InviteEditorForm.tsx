"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InviteEditor, InviteEditorFormProps } from "../Types";
import api from "../utils/api";

export default function InviteEditorForm({
  workspaceId,
  onCancel,
}: InviteEditorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteEditor>();

   // Mutation to handle the editor invitation
  const AddEditorMutation = useMutation({
    mutationFn: async (data: InviteEditor) => {
      await api.post("/workspace/invite-editor", {
        workspaceId,
        editorEmail: data.email,
      });
    },
    onSuccess: () => {
      toast.success("Email Sent Successfully!");
      onCancel();
    },
    onError: () => {
      toast.error("Error sending Email");
    },
  });

  // Handler for mutation Trigger
  const AddEditor = (data: InviteEditor) => {
    AddEditorMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(AddEditor)}
      className="space-y-6 w-[300px] max-sm:w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Editor</h2>
      <div className="bg-blue-100 text-primary p-2 rounded-md text-sm">
        <p>
          Enter email address of the editor you want to add to this workspace!
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
          Editor's Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Editor's email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          placeholder="Enter editor's email"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`w-full py-2 font-semibold rounded-md ${
            AddEditorMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-opacity-80"
          } text-white transition duration-200`}
          disabled={AddEditorMutation.isPending}
        >
          {AddEditorMutation.isPending
            ? "Sending Invitation..."
            : "Invite Editor"}
        </button>
      </div>
    </form>
  );
}
