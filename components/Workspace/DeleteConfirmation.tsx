import React from 'react';

export default function DeleteWorkspaceModal({ value, onDelete, onCancel, name }) {
  return (
    <div className="p-2 w-full max-w-md  space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Delete Workspace?</h2>
      <p className="text-gray-600">
        Are you sure you want to permanently delete the {name} <span className="font-bold">{value}</span>?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

