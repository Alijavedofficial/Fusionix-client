import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Icon } from "@iconify/react";

const YouTubeConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    checkYouTubeConnection();
  }, []);

  const checkYouTubeConnection = async () => {
    try {
      const response = await api.get("/video/youtube/connection-status");
      setIsConnected(response.data.isConnected);
    } catch (error) {
      console.error("Error checking YouTube connection:", error);
      setIsConnected(false);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await api.get("/video/youtube/auth");
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Error connecting to YouTube:", error);
    }
  };

  if (isConnected === null) {
    return <div>Loading...</div>;
  }

  if (isConnected) {
    return null;
  }

  return (
    <button
      onClick={handleConnect}
      className="border border-red-600 text-red-600 bg-red-100 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <Icon icon="bi:youtube" className="text-lg" />
      Connect Account
    </button>
  );
};

export default YouTubeConnect;
