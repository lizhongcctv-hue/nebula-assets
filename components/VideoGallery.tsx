'use client';

import { useState, useMemo } from 'react';
import { VideoAsset } from '@/lib/notion';
import VideoCard from './VideoCard';

interface VideoGalleryProps {
  videos: VideoAsset[];
  categories: string[];
  afdLink: string;
}

export default function VideoGallery({ videos, categories, afdLink }: VideoGalleryProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('全部');

  const filtered = useMemo(() => {
    let result = videos;
    if (active !== '全部') {
      result = result.filter((v) => v.category === active);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [videos, query, active]);

  return (
    <>
      {/* Search + Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索素材名称或标签..."
                className="w-full px-5 py-3 pl-12 bg-gray-800/80 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActive('全部')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === '全部'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400">没有找到匹配「{query || active}」的素材</p>
              <button
                onClick={() => { setQuery(''); setActive('全部'); }}
                className="mt-4 px-4 py-2 text-purple-400 hover:text-purple-300 text-sm underline"
              >
                清除筛选
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                共 {filtered.length} 个素材
                {query && <> · 搜索: &ldquo;{query}&rdquo;</>}
                {active !== '全部' && <> · 分类: {active}</>}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((video) => (
                  <VideoCard key={video.id} video={video} afdLink={afdLink} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
