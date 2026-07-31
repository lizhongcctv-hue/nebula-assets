'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VideoAsset } from '@/lib/notion';

const QUARK_LINK = 'https://pan.quark.cn/s/e0ff7217a068';

interface VideoCardProps {
  video: VideoAsset;
  afdLink: string;
}

export default function VideoCard({ video, afdLink }: VideoCardProps) {
  const [showPreview, setShowPreview] = useState(false);
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
          {video.cover ? (
            <Image
              src={`/covers/${video.cover}`}
              alt={video.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              quality={80}
            />
          ) : (
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(to bottom right, rgba(88, 28, 135, 0.3), rgba(30, 58, 138, 0.3))',
              }}
            />
          )}
          
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
          
          {/* Preview + Download Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPreview(true)}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                title="预览"
              >
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button 
                onClick={handleDownload}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                title="下载"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </button>
            </div>
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

      {/* Video Preview Modal */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        >
          <div 
            className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-10"
            >
              ✕
            </button>

            {/* Preview area */}
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-black">
              {video.cover ? (
                <Image
                  src={`/covers/${video.cover}`}
                  alt={video.name}
                  fill
                  className="rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              {/* Video info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">{video.category}</span>
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">{video.resolution}</span>
                  {video.isPremium && (
                    <span className="px-2 py-1 bg-amber-500/80 backdrop-blur-sm rounded text-xs text-white font-bold">👑 VIP</span>
                  )}
                </div>
              </div>
            </div>

            {/* Info & actions */}
            <h3 className="text-xl font-bold text-white mb-2">{video.name}</h3>
            <p className="text-gray-400 mb-4">{video.description || '暂无描述'}</p>
            
            {video.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {video.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => { setShowPreview(false); handleDownload(); }}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  video.isPremium
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {video.isPremium ? '👑 获取 VIP 素材' : '⬇️ 免费下载'}
              </button>
            </div>
          </div>
        </div>
      )}

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
              
              <h3 className="text-xl font-bold text-white mb-2">精选 4K 素材库</h3>
              <p className="text-gray-400 mb-6">{video.name}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> 16组精选 4K 视频
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> 已分类整理，找素材不费时
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
