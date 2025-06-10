import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiTrendingUp, FiPlay } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import Layout from "../components/Layout";
import { formatViews, parseVideoData } from "../utils/videoUtils";
import { useRouter } from "next/router";

export default function TrendingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingVideos();
  }, []);

  const loadTrendingVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/trending');
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Trending videolar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout currentSection="trending">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <FiTrendingUp size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trendler</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <VideoSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard video={parseVideoData(video)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

function VideoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      <div className="flex mt-3 space-x-3">
        <div className="w-9 h-9 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VideoCard({ video }: { video: any }) {
  const router = useRouter();

  const handleClick = () => {
    if (video.id) {
      router.push(`/video/${video.id}`);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
        {video.thumbnail?.url ? (
          <Image
            src={video.thumbnail.url}
            alt={video.title || 'Video'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <FiPlay size={32} className="text-gray-600 dark:text-gray-400" />
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.durationFormatted}
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
      </div>
      
      <div className="flex mt-3 space-x-3">
        <div className="w-9 h-9 relative flex-shrink-0">
          {video.channel?.avatar ? (
            <Image
              src={video.channel.avatar}
              alt={video.channel.name}
              fill
              className="rounded-full object-cover"
              sizes="36px"
            />
          ) : (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {video.channel?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">
            {video.title}
          </h3>
          
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
            <p className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center">
              <span>{video.channel?.name}</span>
              {video.channel?.verified && (
                <MdVerified size={14} className="ml-1 text-gray-500 dark:text-gray-400" />
              )}
            </p>
            
            <div className="flex items-center space-x-1">
              <span>{formatViews(video.views)} görüntüleme</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 