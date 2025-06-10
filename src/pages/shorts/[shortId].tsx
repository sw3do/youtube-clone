import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SiYoutubeshorts } from "react-icons/si";
import { MdVerified, MdThumbUp, MdThumbDown, MdShare, MdMoreVert, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from "axios";
import Layout from "../../components/Layout";
import { formatViews, parseVideoData } from "../../utils/videoUtils";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function ShortDetailPage() {
  const router = useRouter();
  const { shortId } = router.query;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [video, setVideo] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  useEffect(() => {
    if (shortId && typeof shortId === 'string') {
      loadShortDetails(shortId);
    }
  }, [shortId]);

  const loadShortDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/shorts/${id}`);
      setVideo(response.data.video);
      setRelatedVideos(response.data.relatedVideos.map(parseVideoData));
    } catch (error) {
      console.error("Short detayları yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const navigateToShort = (id: string) => {
    router.push(`/shorts/${id}`);
    setShowRelated(false);
  };

  if (loading) {
    return (
      <Layout currentSection="shorts">
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout currentSection="shorts">
        <div className="flex flex-col justify-center items-center h-screen bg-black">
          <SiYoutubeshorts size={64} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-300">Short bulunamadı</h2>
        </div>
      </Layout>
    );
  }

  const embedUrl = video.basic_info?.embed?.iframe_url;
  const videoTitle = video.basic_info?.title || 'Başlık yok';
  const channelName = video.basic_info?.channel?.name || 'Kanal yok';
  const viewCount = video.basic_info?.view_count || 0;
  const thumbnailUrl = video.basic_info?.thumbnail?.[0]?.url;

  return (
    <Layout currentSection="shorts">
      <div className="h-screen bg-black overflow-hidden relative">
        <div className="flex h-full">
          <div className="flex-1 flex justify-center items-center bg-black relative">
            <div 
              className="relative bg-black w-full h-full max-w-md mx-auto"
              onTouchStart={() => setShowControls(true)}
              onTouchEnd={() => setTimeout(() => setShowControls(false), 3000)}
              onClick={() => {
                setShowControls(true);
                setTimeout(() => setShowControls(false), 3000);
              }}
            >
              {embedUrl ? (
                <ReactPlayer
                  url={embedUrl}
                  playing={isPlaying}
                  muted={isMuted}
                  loop={true}
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 0,
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        fs: 0,
                        cc_load_policy: 0,
                        iv_load_policy: 3,
                      }
                    }
                  }}
                />
              ) : thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={videoTitle}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <SiYoutubeshorts size={64} className="text-gray-500" />
                </div>
              )}
              
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                >
                  {isPlaying ? (
                    <FaPause size={24} className="text-black" />
                  ) : (
                    <FaPlay size={24} className="text-black ml-1" />
                  )}
                </motion.button>
              </motion.div>

              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                >
                  {isMuted ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
                </motion.button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-20">
                <div className="text-white mb-3">
                  <h1 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
                    {videoTitle}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm mb-1">
                    <span className="font-medium truncate">{channelName}</span>
                    <MdVerified size={14} className="text-blue-400 flex-shrink-0" />
                  </div>
                  <div className="text-sm text-gray-300">
                    {formatViews(viewCount)} görüntüleme
                  </div>
                </div>
              </div>

              <div className="absolute right-4 bottom-24 flex flex-col space-y-4 z-10">
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdThumbUp size={24} className="text-white mb-1" />
                  <span className="text-xs text-white font-medium">Beğen</span>
                </motion.button>
                
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdThumbDown size={24} className="text-white mb-1" />
                  <span className="text-xs text-white font-medium">Beğenme</span>
                </motion.button>
                
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdShare size={24} className="text-white mb-1" />
                  <span className="text-xs text-white font-medium">Paylaş</span>
                </motion.button>
                
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRelated(true)}
                >
                  <MdMoreVert size={24} className="text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex w-80 bg-black border-l border-gray-800 flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex-shrink-0">
              <h2 className="text-white text-lg font-semibold flex items-center space-x-2">
                <SiYoutubeshorts className="text-red-500" size={20} />
                <span>Daha fazla Shorts</span>
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}>
              <div className="p-4 space-y-3">
                {relatedVideos.map((relatedVideo, index) => (
                  <motion.div
                    key={relatedVideo.id || index}
                    className="flex space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => navigateToShort(relatedVideo.id)}
                  >
                    <div className="relative w-16 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      {relatedVideo.thumbnail?.url ? (
                        <Image
                          src={relatedVideo.thumbnail.url}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <SiYoutubeshorts size={14} className="text-gray-400" />
                        </div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                        Shorts
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium line-clamp-3 group-hover:text-red-400 transition-colors leading-tight">
                        {relatedVideo.title}
                      </h3>
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-gray-400 text-xs truncate">{relatedVideo.channel?.name}</span>
                        {relatedVideo.channel?.verified && (
                          <MdVerified size={12} className="text-blue-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {formatViews(relatedVideo.views)} görüntüleme
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col"
          initial={{ y: "100%" }}
          animate={{ y: showRelated ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-white text-lg font-semibold flex items-center space-x-2">
              <SiYoutubeshorts className="text-red-500" size={20} />
              <span>Daha fazla Shorts</span>
            </h2>
            <button
              onClick={() => setShowRelated(false)}
              className="text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <MdMoreVert size={20} className="rotate-45" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo, index) => (
                <motion.div
                  key={relatedVideo.id || index}
                  className="flex space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => navigateToShort(relatedVideo.id)}
                >
                  <div className="relative w-20 h-28 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {relatedVideo.thumbnail?.url ? (
                      <Image
                        src={relatedVideo.thumbnail.url}
                        alt={relatedVideo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <SiYoutubeshorts size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      Shorts
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-base font-medium line-clamp-3 group-hover:text-red-400 transition-colors leading-tight mb-2">
                      {relatedVideo.title}
                    </h3>
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-gray-400 text-sm truncate">{relatedVideo.channel?.name}</span>
                      {relatedVideo.channel?.verified && (
                        <MdVerified size={14} className="text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {formatViews(relatedVideo.views)} görüntüleme
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 