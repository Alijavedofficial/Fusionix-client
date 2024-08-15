import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const YouTubeConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    checkYouTubeConnection();
  }, []);

  const checkYouTubeConnection = async () => {
    try {
      const response = await api.get('/video/youtube/connection-status');
      setIsConnected(response.data.isConnected);
    } catch (error) {
      console.error('Error checking YouTube connection:', error);
      setIsConnected(false);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await api.get('/video/youtube/auth');
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Error connecting to YouTube:', error);
    }
  };

  if (isConnected === null) {
    return <div>Loading...</div>;
  }

  if (isConnected) {
    return null
  }

  return (
    <button onClick={handleConnect} className="bg-red-600 text-white px-4 py-2 rounded">
      Connect YouTube Account
    </button>
  );
};

export default YouTubeConnect;