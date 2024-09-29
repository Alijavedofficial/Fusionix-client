'use client'
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import '../../Styles/player.css'

import { useEffect, useRef } from 'react';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      new Plyr(videoRef.current, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed'],
        captions: { active: true, language: 'auto', update: true },
        quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
    });
    }
  }, []);

  return (
    <video ref={videoRef} src={src} />
  );
};

export default VideoPlayer;