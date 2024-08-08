import React from 'react';
import api from '../utils/api';

const YouTubeConnect: React.FC = () => {
  const handleConnect = async () => {
    try {
      const response = await api.get('/video/youtube/auth');
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Error connecting to YouTube:', error);
    }
  };

  return (
    <button onClick={handleConnect} className="bg-red-600 text-white px-4 py-2 rounded">
      Connect YouTube Account
    </button>
  );
};

export default YouTubeConnect;