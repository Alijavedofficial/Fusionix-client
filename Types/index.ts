export interface Workspace {
  _id: string;
  name: string;
  owner: { name: string };
  lastModified: string;
  editors: any[];
}

export interface Video {
  _id: string;
  title: string;
  status: string;
  uploadedBy: {
    name: string;
  };
  cloudinaryId: string;
  workspaceId: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "editor";
}

export interface CreateWorkspaceFormdata {
  WorkspaceName: string;
}

export interface InviteEditorFormProps {
  workspaceId: any;
  onCancel: () => void;
}

export interface FormData {
  email: string;
}
