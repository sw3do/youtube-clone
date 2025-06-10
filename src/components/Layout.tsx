import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  FiSearch, 
  FiMenu, 
  FiHome, 
  FiTrendingUp, 
  FiSettings,
  FiPlay,
  FiBell,
  FiVideo,
  FiGrid,
  FiMic,
  FiX
} from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import axios from "axios";

interface LayoutProps {
  children: React.ReactNode;
  currentSection?: string;
}

export default function Layout({ children, currentSection }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`/api/suggestions?q=${encodeURIComponent(query)}`);
      setSuggestions(response.data.suggestions.slice(0, 8));
    } catch (error) {
      console.error("Öneriler alınırken hata:", error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
    getSuggestions(value);
  };

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    setShowSuggestions(false);
    setShowMobileSearch(false);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 h-14">
        <div className="flex items-center justify-between px-3 sm:px-4 h-full">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <FiMenu size={18} className="sm:w-5 sm:h-5" />
            </button>
            <Link href="/" className="flex items-center space-x-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded flex items-center justify-center">
                <FiPlay size={14} className="text-white ml-0.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-lg sm:text-xl font-medium tracking-tight hidden xs:block">YouTube</span>
            </Link>
          </div>

          <div ref={searchRef} className="hidden sm:flex flex-1 max-w-2xl mx-4 lg:mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="flex items-center">
                <div className="flex flex-1 border border-gray-300 dark:border-gray-600 rounded-l-full overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Ara"
                    className="flex-1 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiSearch size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button className="hidden sm:block ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <FiMic size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 shadow-lg z-50"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 text-sm sm:text-base"
                    >
                      <FiSearch size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={() => setShowMobileSearch(true)}
              className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <FiSearch size={18} />
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <FiVideo size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <FiGrid size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
              <FiBell size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
              M
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden fixed top-14 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 p-3"
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMobileSearch(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <FiX size={18} />
                </button>
                <div className="flex flex-1 border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Ara"
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiSearch size={18} />
                  </button>
                </div>
              </div>
            </form>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <FiSearch size={16} className="text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex pt-14">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-0 top-14 w-60 h-[calc(100vh-56px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-40"
            >
              <div className="p-3">
                <div className="space-y-1">
                  <SidebarItem
                    icon={FiHome}
                    label="Ana Sayfa"
                    active={currentSection === "homepage"}
                    href="/"
                    onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setSidebarOpen(false)}
                  />
                  <SidebarItem
                    icon={SiYoutubeshorts}
                    label="Shorts"
                    active={currentSection === "shorts"}
                    href="/shorts"
                    onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setSidebarOpen(false)}
                  />  
                </div>

                <hr className="my-3 border-gray-200 dark:border-gray-700" />

                <div className="space-y-1">
                  <SidebarItem
                    icon={FiTrendingUp}
                    label="Trendler"
                    active={currentSection === "trending"}
                    href="/trending"
                    onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setSidebarOpen(false)}
                  />
                </div>

                <hr className="my-3 border-gray-200 dark:border-gray-700" />

                <div className="space-y-1">
                  <SidebarItem
                    icon={FiSettings}
                    label="Ayarlar"
                    active={currentSection === "settings"}
                    href="/settings"
                    onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setSidebarOpen(false)}
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-14"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen && typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'lg:ml-60' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false, href, onClick }: { 
  icon: React.ElementType; 
  label: string; 
  active?: boolean;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
        active 
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
} 