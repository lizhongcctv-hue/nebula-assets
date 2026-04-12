import { getVideoAssets, getCategories } from '@/lib/notion';
import VideoCard from '@/components/VideoCard';

export default async function Home() {
  const videos = await getVideoAssets();
  const categories = await getCategories();
  const afdLink = process.env.AFD_LINK || 'https://afdian.com/a/nebula-assets';

  const premiumCount = videos.filter(v => v.isPremium).length;
  const freeCount = videos.length - premiumCount;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div style={{ height: '24px' }} />
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-3">
            <a
              href="https://nebula-assets.vercel.app/ai-workspace"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-purple-300 border border-purple-500/50 bg-purple-500/10 rounded-lg hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-200 transition-all"
            >
              <span>🤖</span> AI工作台
            </a>
            <a
              href={afdLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
            >
              <span>❤️</span> 用爱发电
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            发现高质量
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> 4K 影视素材</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            从海量素材中筛选出最美的 {videos.length} 组视频，精心分类，一键获取。
          </p>
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

      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  <span className="text-amber-400">VIP</span> 整理包下载
                </h3>
                <p className="text-gray-400 text-sm">
                  20组精选素材索引 + 剪辑模板 + 使用指南 + 独家AI素材
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  不是卖素材，是卖整理好的时间和教程
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://pan.quark.cn/s/dd48a1e66776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  免费下载
                </a>
                <a
                  href={afdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
                >
                  <span>❤️</span> 支持作者
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} afdLink={afdLink} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="mb-6">
            <a
              href={afdLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }}
            >
              <span>❤️</span>
              <span>已入驻爱发电</span>
              <span className="text-amber-100 text-sm">afdian.com/a/nebula-assets</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Nebula Assets. 部分素材来源于 Pexels 授权协议，经过 Nebula Assets 艺术加工处理。
          </p>
          <p className="text-gray-500 text-sm">
            唯一官方主页：
            <a href={afdLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              {afdLink.replace('https://', '')}
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
