import React from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { FiSettings, FiSun, FiMoon, FiUser, FiBell, FiShield, FiHelpCircle, FiInfo } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const settingsGroups = [
    {
      title: "Görünüm",
      items: [
        {
          icon: theme === 'dark' ? FiMoon : FiSun,
          title: "Tema",
          description: theme === 'dark' ? "Karanlık tema aktif" : "Açık tema aktif",
          action: (
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )
        }
      ]
    },
    {
      title: "Hesap",
      items: [
        {
          icon: FiUser,
          title: "Profil Ayarları",
          description: "Profil bilgilerinizi düzenleyin",
          action: (
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              Düzenle
            </button>
          )
        }
      ]
    },
    {
      title: "Bildirimler",
      items: [
        {
          icon: FiBell,
          title: "Bildirim Tercihleri",
          description: "Hangi bildirimleri almak istediğinizi seçin",
          action: (
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              Ayarla
            </button>
          )
        }
      ]
    },
    {
      title: "Gizlilik ve Güvenlik",
      items: [
        {
          icon: FiShield,
          title: "Gizlilik Ayarları",
          description: "Gizlilik ve güvenlik tercihlerinizi yönetin",
          action: (
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              Yönet
            </button>
          )
        }
      ]
    },
    {
      title: "Yardım ve Destek",
      items: [
        {
          icon: FiHelpCircle,
          title: "Yardım Merkezi",
          description: "Sık sorulan sorular ve yardım dökümanları",
          action: (
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              Görüntüle
            </button>
          )
        },
        {
          icon: FiInfo,
          title: "Hakkında",
          description: "Uygulama bilgileri ve sürüm detayları",
          action: (
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              Detaylar
            </button>
          )
        }
      ]
    }
  ];

  return (
    <Layout currentSection="settings">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <FiSettings className="mr-2" />
            Ayarlar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hesabınızı ve uygulama tercihlerinizi yönetin
          </p>
        </div>

        <div className="space-y-8">
          {settingsGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold">{group.title}</h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <item.icon size={20} className="text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        {item.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
              <FiInfo size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Tema Değiştirme
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Açık ve karanlık tema arasında geçiş yapabilirsiniz. Tema tercihiniz otomatik olarak kaydedilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 