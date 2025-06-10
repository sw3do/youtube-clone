import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MdVerified, MdThumbUp, MdThumbDown, MdShare, MdMoreVert, MdPlaylistAdd, MdDownload } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import axios from "axios";
import Layout from "../../components/Layout";
import { formatViews, formatDuration, formatPublishDate } from "../../utils/videoUtils";
import { useTheme } from "../../contexts/ThemeContext";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoDetailPage() {
  const router = useRouter();
  const { videoId } = router.query;
  const { theme } = useTheme();
  
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (videoId && typeof videoId === 'string') {
      loadVideoDetails(videoId);
    }
  }, [videoId]);

  const loadVideoDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/video/${id}`);
      setVideo(response.data.video);
      setRelatedVideos(response.data.relatedVideos);
    } catch (error) {
      console.error("Video detayları yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const toggleLike = () => {
    if (isDisliked) setIsDisliked(false);
    setIsLiked(!isLiked);
  };

  const toggleDislike = () => {
    if (isLiked) setIsLiked(false);
    setIsDisliked(!isDisliked);
  };

  const navigateToVideo = (id: string) => {
    router.push(`/video/${id}`);
  };

  if (loading) {
    return (
      <Layout currentSection="home">
        <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout currentSection="home">
        <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <FaPlay size={64} className="text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Video bulunamadı</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentSection="home">
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
            <div className="flex-1 xl:w-2/3">
              <div className="bg-black dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl mb-3 sm:mb-4 transition-colors duration-200">
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <ReactPlayer
                    url={video.embed_url}
                    playing={isPlaying}
                    width="100%"
                    height="100%"
                    controls={true}
                    config={{
                      youtube: {
                        playerVars: {
                          autoplay: 0,
                          rel: 0,
                          showinfo: 1,
                          modestbranding: 1,
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                    {video.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatViews(video.views)} görüntüleme</span>
                      <span>•</span>
                      <span>{formatPublishDate(video.published)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                      <motion.button
                        className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 border text-sm font-medium whitespace-nowrap ${
                          isLiked 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLike}
                      >
                        <BiLike size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">{formatViews(video.likes || 0)}</span>
                      </motion.button>
                      
                      <motion.button
                        className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 border text-sm font-medium ${
                          isDisliked 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' 
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDislike}
                      >
                        <BiDislike size={18} className="sm:w-5 sm:h-5" />
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-all duration-200 text-sm font-medium whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MdShare size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Paylaş</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-all duration-200 text-sm font-medium whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MdPlaylistAdd size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Kaydet</span>
                      </motion.button>
                      
                      <motion.button
                        className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                      >
                        <MdMoreVert size={18} className="sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 transition-colors duration-200">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      {video.channel.thumbnail ? (
                        <Image
                          src={video.channel.thumbnail}
                          alt={video.channel.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 flex items-center justify-center transition-colors duration-200">
                          <span className="text-white font-bold text-sm sm:text-lg">
                            {video.channel.name?.charAt(0) || 'C'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                              {video.channel.name}
                            </h3>
                            {video.channel.verified && (
                              <MdVerified size={14} className="text-blue-500 flex-shrink-0 sm:w-4 sm:h-4" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {formatViews(video.channel?.subscriber_count || 0)} abone
                          </p>
                        </div>
                        
                        <motion.button
                          className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap ${
                            isSubscribed
                              ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                              : 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleSubscribe}
                        >
                          {isSubscribed ? (
                            <>
                              <IoMdNotifications size={16} className="sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Abone olundu</span>
                              <span className="sm:hidden">Abone</span>
                            </>
                          ) : (
                            <span>Abone ol</span>
                          )}
                        </motion.button>
                      </div>
                      
                      {video.description && (
                        <div className="mt-2 sm:mt-3">
                          <p className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed ${
                            showDescription ? '' : 'line-clamp-2 sm:line-clamp-3'
                          }`}>
                            {video.description}
                          </p>
                          {video.description.length > 150 && (
                            <button
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 hover:underline"
                              onClick={() => setShowDescription(!showDescription)}
                            >
                              {showDescription ? 'Daha az göster' : 'Daha fazla göster'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-1/3 min-w-0">
              <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Önerilen videolar
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                  {relatedVideos.map((relatedVideo, index) => (
                    <motion.div
                      key={relatedVideo.id || index}
                      className="cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigateToVideo(relatedVideo.id)}
                    >
                      <div className="flex xl:flex-col space-x-3 xl:space-x-0 xl:space-y-2">
                        <div className="relative w-32 sm:w-40 xl:w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md transition-colors duration-200 flex-shrink-0">
                          {relatedVideo.thumbnail ? (
                            <Image
                              src={relatedVideo.thumbnail}
                              alt={relatedVideo.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center transition-colors duration-200">
                              <FaPlay size={20} className="text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          {relatedVideo.duration && (
                            <div className="absolute bottom-1 right-1 bg-black/80 dark:bg-gray-900/90 text-white text-xs px-1.5 py-0.5 rounded transition-colors duration-200">
                              {formatDuration(relatedVideo.duration)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 xl:line-clamp-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors leading-tight">
                            {relatedVideo.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{relatedVideo.channel?.name}</span>
                            {relatedVideo.channel?.verified && (
                              <MdVerified size={10} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            <span>{formatViews(relatedVideo.views || 0)} görüntüleme</span>
                            {relatedVideo.published && relatedVideo.published !== 'Bilinmiyor' && (
                              <>
                                <span> • </span>
                                <span>{formatPublishDate(relatedVideo.published)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {relatedVideos.length === 0 && (
                  <div className="text-center py-8">
                    <FaPlay size={32} className="text-gray-400 dark:text-gray-500 mx-auto mb-2 transition-colors duration-200" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">
                      Önerilen video bulunamadı
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 