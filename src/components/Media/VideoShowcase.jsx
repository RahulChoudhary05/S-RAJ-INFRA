"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import video from "../../../src/assets/Video/S_RAJ_INFRA_VIDEO.mp4";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      if (duration) {
        setProgress((currentTime / duration) * 100);
        setCurrentTime(formatTime(currentTime));
        setDuration(formatTime(duration));
      }
    }
  }, []);

  const handleSeek = (e) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  useEffect(() => {
    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateProgress);
      videoElement.addEventListener("loadedmetadata", () => {
        setDuration(formatTime(videoElement.duration));
      });

      return () => {
        videoElement.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [updateProgress]);

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-black mb-2">Project Showcase</h2>
          <div className="w-16 h-1 bg-gray-300 mx-auto mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-xl overflow-hidden shadow-[0_0_30px rgba(0,0,0,0.1)] bg-gray-100 border border-gray-200"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster="/placeholder.svg?height=720&width=1280"
            muted
            playsInline
            loop
            preload="metadata"
            onClick={handlePlayPause}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <AnimatePresence>
            {(!isPlaying || isHovering) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/30"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors shadow-[0_0_20px rgba(0,0,0,0.5)]"
                >
                  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent"
              >
                <div
                  ref={progressBarRef}
                  className="w-full h-2 bg-gray-400 rounded-full mb-4 cursor-pointer overflow-hidden"
                  onClick={handleSeek}
                >
                  <div className="h-full bg-gray-800 rounded-full relative" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_5px rgba(255,255,255,0.8)]"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={handlePlayPause} className="text-white hover:text-gray-400 transition-colors">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>

                    <span className="text-white text-sm">
                      {currentTime} / {duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={handleMute} className="text-white hover:text-gray-400 transition-colors">
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>

                    <button onClick={handleFullscreen} className="text-white hover:text-gray-400 transition-colors">
                      <Maximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-200 rounded-full blur-3xl"></div>
    </section>
  );
};

export default VideoShowcase;
