import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { SiYoutubeshorts } from "react-icons/si";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import Layout from "../components/Layout";
import { formatViews, parseVideoData } from "../utils/videoUtils";

export default function ShortsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShortsVideos();
  }, []);

  const loadShortsVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/shorts');
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Shorts videolar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout currentSection="shorts">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <SiYoutubeshorts size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shorts</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <ShortsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ShortsCard video={parseVideoData(video)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

function ShortsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[9/16] bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ShortsCard({ video }: { video: any }) {
  const router = useRouter();

  const handleClick = () => {
    if (video.id) {
      router.push(`/shorts/${video.id}`);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        {video.thumbnail?.url ? (
          <Image
            src={video.thumbnail.url}
            alt={video.title || 'Shorts Video'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12.5vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
            <SiYoutubeshorts size={32} className="text-white opacity-80" />
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <SiYoutubeshorts size={12} />
            <span>Shorts</span>
          </div>
        </div>
        
        {video.durationFormatted && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-md font-medium">
            {video.durationFormatted}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-white">
            <h3 className="text-sm font-semibold line-clamp-2 leading-tight mb-1 drop-shadow-lg">
              {video.title}
            </h3>
            <div className="flex items-center justify-between text-xs opacity-90">
              <span className="drop-shadow">{formatViews(video.views)} görüntüleme</span>
              {video.channel?.verified && (
                <MdVerified size={14} className="text-white drop-shadow" />
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-red-500/30 rounded-2xl transition-all duration-300" />
      </div>
    </div>
  );
} 