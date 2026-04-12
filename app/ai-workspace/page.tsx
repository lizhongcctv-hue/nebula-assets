// 完全静态页面，无需 revalidate

const WORKSPACE_URL = 'https://concrete-stem-aca.notion.site/Nebula-AI-340b63a83c7c81baa595caac1107d684';
const AFD_LINK = 'https://afdian.com/a/nebula-assets';
const PRICE = 59;

const features = [
  {
    emoji: '🔮',
    title: '选题灵感库',
    desc: 'AI 生成 50+ 短视频选题方向，配合平台热度分析，告别创作瓶颈',
  },
  {
    emoji: '✨',
    title: '爆款文案生成器',
    desc: '内置 20+ 套经过验证的提示词模板，一键生成钩子、开头、结尾文案',
  },
  {
    emoji: '🎬',
    title: 'AI 视频脚本框架',
    desc: '从开头留人到结尾引导关注，全流程结构化提示词，复制即用',
  },
  {
    emoji: '💡',
    title: '内容创作台',
    desc: '分平台、分赛道的内容框架，覆盖口播/图文/Vlog/种草等主流形式',
  },
  {
    emoji: '🚀',
    title: '创作者效率工具包',
    desc: '视频标题公式、封面文案模板、标签库，让创作效率翻倍',
  },
  {
    emoji: '🌙',
    title: 'AI 副业进阶指南',
    desc: '变现路径、平台选择、账号定位，从零到一的全套思路',
  },
  {
    emoji: '📊',
    title: '数据分析仪表盘',
    desc: '追踪热点趋势的框架方法，把直觉变成可复制的判断力',
  },
];

const modules = [
  { num: '01', title: '选题灵感库', icon: '🔮' },
  { num: '02', title: '爆款文案生成器', icon: '✨' },
  { num: '03', title: 'AI 视频脚本框架', icon: '🎬' },
  { num: '04', title: '内容创作台', icon: '💡' },
  { num: '05', title: '创作者效率工具包', icon: '🚀' },
  { num: '06', title: 'AI 副业进阶指南', icon: '🌙' },
  { num: '07', title: '数据分析仪表盘', icon: '📊' },
  { num: '08', title: '使用说明 & 更新记录', icon: '📖' },
];

export default function AIWorkspacePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
      }} />

      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-40 bg-gray-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
              <p className="text-xs text-gray-400">Nebula Assets</p>
              <h1 className="text-base font-bold text-white leading-tight">AI 工作台</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WORKSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-300 transition-all"
            >
              <span>👀</span> 预览模板
            </a>
            <a
              href={AFD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
            >
              <span>❤️</span> 用爱发电
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            AI 创作者工具 · Notion 模板
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            从「不知道拍什么」<br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              到「批量生产爆款」
            </span>
          </h2>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            7 大功能模块 · 20+ AI 提示词模板 · 永久更新<br />
            一套 Notion 模板，解决 90% 的创作焦虑
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={AFD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-3"
            >
              <span className="text-xl">❤️</span>
              <span>用爱发电支持 · ¥{PRICE}</span>
            </a>
            <a
              href={WORKSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gray-800 text-white font-medium text-lg rounded-2xl hover:bg-gray-700 transition-all border border-gray-700 flex items-center justify-center gap-2"
            >
              <span>👀</span> 免费预览模板
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-4">一次付费，永久使用 · 持续更新</p>
        </div>
      </section>

      {/* What is this */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 sm:p-10">
            <h3 className="text-xl font-bold text-white mb-4">这是什么？</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              这是一套基于 <strong className="text-white">Notion</strong> 的 AI 创作工具包。里面不是干巴巴的教程，而是：
            </p>
            <div className="space-y-3">
              {[
                '可以直接复制的 AI 提示词（ChatGPT / Claude / Kimi 直接用）',
                '经过验证的爆款内容框架（拿来就能写，不用自己摸索）',
                '选题 → 脚本 → 文案 → 效率工具的全套流程',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 text-purple-400 text-sm">✅</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-white mb-3">7 大模块，覆盖创作全流程</h3>
            <p className="text-gray-400">每个模块都经过真实创作验证，拿来就用</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-gray-900/90 transition-all group"
              >
                <div className="text-2xl mb-3">{f.emoji}</div>
                <h4 className="text-white font-bold mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module List */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-800/30">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Notion 模板内有什么？</h3>
          <div className="space-y-2">
            {modules.map((m) => (
              <div key={m.num} className="flex items-center gap-4 bg-gray-900/40 border border-gray-800/60 rounded-xl px-5 py-3.5">
                <span className="text-xs text-gray-600 font-mono w-6">{m.num}</span>
                <span className="text-base">{m.icon}</span>
                <span className="text-gray-200 font-medium">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">适合谁？</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
            {[
              ['✅', '想用 AI 工具辅助创作，但没有头绪'],
              ['✅', '写过几篇内容，但数据一直很平'],
              ['✅', '想开始做自媒体，不知道从哪下手'],
              ['✅', '已经有账号，想系统化提升效率'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-start gap-2.5 bg-gray-900/40 border border-gray-800/60 rounded-xl px-4 py-3">
                <span className="text-purple-400 mt-0.5">{icon}</span>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-gray-800/30">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/40 via-gray-900/80 to-fuchsia-900/40 border border-purple-500/30 rounded-3xl p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs font-medium mb-4">
              <span>❤️</span> Nebula Assets 官方出品
            </div>

            <div className="mb-6">
              <div className="text-gray-400 text-sm line-through mb-1">原价 ¥99</div>
              <div className="text-5xl font-black text-white">¥{PRICE}</div>
              <div className="text-gray-500 text-sm mt-1">一次付费 · 永久使用 · 持续更新</div>
            </div>

            <a
              href={AFD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-500/30 mb-3"
            >
              立即获取 · 用爱发电 ❤️
            </a>

            <p className="text-gray-500 text-xs">
              购买后联系作者获取 Notion 模板链接<br />
              或直接访问：concrete-stem-aca.notion.site
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="mb-4">
            <a
              href={AFD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>❤️</span>
              <span>已入驻爱发电</span>
              <span className="text-amber-100 text-sm">afdian.com/a/nebula-assets</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Nebula Assets · AI 工作台专属页面
          </p>
        </div>
      </footer>

    </main>
  );
}
