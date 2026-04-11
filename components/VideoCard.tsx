'use client';

import { useState } from 'react';
import { VideoAsset } from '@/lib/notion';

const QUARK_LINK = 'https://pan.quark.cn/s/e0ff7217a068';

interface VideoCardProps {
  video: VideoAsset;
  afdLink: string;
}

export default function VideoCard({ video, afdLink }: VideoCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    if (video.isPremium) {
      setShowModal(true);
    } else {
      window.open(video.downloadUrl, '_blank');
    }
  };

  const handlePremiumDownload = () => {
    window.open(QUARK_LINK, '_blank');
    setShowModal(false);
  };

  return (
    <>
      <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <div 
            className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage: video.cover ? `url(/covers/${video.cover})` : 'linear-gradient(to bottom right, rgba(88, 28, 135, 0.3), rgba(30, 58, 138, 0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Resolution Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-medium text-white">
            {video.resolution}
          </div>
          
          {/* Premium Badge */}
          {video.isPremium && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded text-xs font-bold text-white flex items-center gap-1">
              <span>👑</span> VIP
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleDownload}
              className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-purple-400 font-medium mb-2">{video.category}</div>
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{video.name}</h3>
          
          {/* Tags */}
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {video.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-700/50 rounded text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${
              video.isPremium
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            {video.isPremium ? '👑 获取 VIP 素材' : '⬇️ 免费下载'}
          </button>
        </div>
      </div>

      {/* Premium Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">4K 精选素材</h3>
              <p className="text-gray-400 mb-6">{video.name}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> 4K/2K 超清无水印
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> 20组精选视频素材
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> 夸克网盘一键保存
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={handlePremiumDownload}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  获取全部 4K 素材
                </button>
                
                <a 
                  href={afdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  ❤️ 用爱发电支持我们
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
