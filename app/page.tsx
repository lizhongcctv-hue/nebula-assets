import { getVideoAssets, getCategories } from '@/lib/notion';
import VideoCard from '@/components/VideoCard';

export const revalidate = 60;

export default async function Home() {
  const videos = await getVideoAssets();
  const categories = await getCategories();
  const afdLink = process.env.AFD_LINK || 'https://afdian.com/a/nebula-assets';

  const premiumCount = videos.filter(v => v.isPremium).length;
  const freeCount = videos.length - premiumCount;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      
      {/* 顶部留白 - 让 header 不紧贴屏幕顶部 */}
      <div style={{ height: '24px' }} />
      
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 简洁 Logo：渐变 N 字母 */}
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
              }}
            >
              N
            </div>
            <div>
              {/* 艺术字标题 */}
              <h1 
                className="text-xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                Nebula Assets
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">免费4K影视素材库</p>
            </div>
          </div>
          
          <a 
            href={afdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
          >
            <span>❤️</span> 用爱发电
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            发现高质量
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> 4K 影视素材</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {videos.length}+ 精选视频素材，涵盖自然风光、城市建筑、特效背景等。
            完全免费，支持个人和商业用途。
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{videos.length}</div>
              <div className="text-sm text-gray-500">总素材</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{freeCount}</div>
              <div className="text-sm text-gray-500">免费</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{premiumCount}</div>
              <div className="text-sm text-gray-500">VIP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{categories.length}</div>
              <div className="text-sm text-gray-500">分类</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
              全部
            </button>
            {categories.map((cat) => (
              <button 
                key={cat}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} afdLink={afdLink} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Nebula Assets. 本站在入驻爱发电，唯一官方主页：
            <a href={afdLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              {afdLink.replace('https://', '')}
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
