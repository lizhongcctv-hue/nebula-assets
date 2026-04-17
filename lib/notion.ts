// COMMIT_HASH: rolled_back_0417
// NebulaAssets Notion API + Fallback Data
// 原数据库 5496641573784465b9b5b4d0be9497b8 (API受限，使用FALLBACK)

// Asset type
export interface Asset {
  id: string;
  name: string;
  category: string;
  resolution: string;
  downloadUrl: string;
  description: string;
  tags: string[];
  isPremium: boolean;
  cover: string;
}

// VideoAsset is an alias for Asset (for backward compatibility with VideoCard)
export type VideoAsset = Asset;

const NOTION_TOKEN = process.env.NOTION_TOKEN || 'FALLBACK_TOKEN';
const DATABASE_ID = process.env.NOTION_DATABASE_ID || 'FALLBACK_DB';

// COVER_MAP: 新数据库页面ID -> 本地封面图
// 获取方式: node list-pages.js
const COVER_MAP: Record<string, string> = {
  // 人物素材
  '345b63a8-3c7c-8141-819b-def08e7ac5f9': 'outdoor-nature.jpg',  // 人物视频1 - 亚裔面孔特写
  '345b63a8-3c7c-81ab-91ce-e88d1d4f4bf3': 'fashion-street.jpg',   // 人物视频2 - 时尚街拍
  '345b63a8-3c7c-8132-a583-cbbe29d73322': 'city-walk.jpg',        // 人物视频3 - 城市行走
  '345b63a8-3c7c-818c-b9f9-e636a543f87d': 'couple-romantic.jpg',  // 人物视频4 - 情侣互动
  '345b63a8-3c7c-81d2-b1a8-dd226bfcdb4e': 'hiking-outdoor.jpg',  // 人物视频5 - 户外运动
  '345b63a8-3c7c-8141-897d-da543a7ea87a': 'business-work.jpg',   // 人物视频6 - 职场商务
  // 古风意境
  '345b63a8-3c7c-817a-9020-f151b2700ef2': 'face-closeup.jpg',   // 🏯 AI人物 AICharacters
  '345b63a8-3c7c-8176-ac57-ddc8cf1a517e': 'rooftop.jpg',         // 🌅 天台日落 Woman Sunset on Rooftop
  // 花卉微距
  '345b63a8-3c7c-81fa-a386-c46f3551c75b': 'pink-flowers.jpg',     // 🌸 粉色花丛 Pink Flowers
  '345b63a8-3c7c-81ff-bb00-d36a2e07da5f': 'yellow_tree.jpg',     // 🌼 黄花树摇曳 Tree with Yellow Flowers
  // 自然风光
  '345b63a8-3c7c-8108-bb27-f078b8016fd1': 'waterfall.jpg',        // 🏞️ 森林瀑布 Lush Forest Waterfall
  '345b63a8-3c7c-81da-b30c-cd4a6d16d109': 'seagulls.jpg',        // 🦅 海鸥飞越泻湖 Seagulls Over Lagoon
  // 航拍
  '345b63a8-3c7c-81e5-ad1f-ff472b38cc71': 'drone_hills.jpg',     // 🚁 航拍山丘码头 Drone Hills and Dock
  // 海景沙滩
  '345b63a8-3c7c-818b-b7cd-fe85456d60da': 'waves_beach.jpg',     // 🌊 海浪轻拍白沙海滩 Waves on Beach
  '345b63a8-3c7c-812e-91eb-f5373c80675a': 'sunset_sea.jpg',      // 🌅 海景日落 Stunning Sunset
  // 城市建筑
  '345b63a8-3c7c-8156-b125-c46c36639112': 'fireworks_beach.jpg', // 🎆 海滩烟花 Fireworks on Beach
  '345b63a8-3c7c-8124-b8cf-f214903ac7e6': 'tokyo.jpg',          // 🌧️ 雨夜时代广场 Times Square Rainy Night
  '345b63a8-3c7c-81b1-b60e-f15175e4b5f7': 'rooftop.jpg',        // 🌃 东京步行街 Pedestrian Walk in Tokyo
  // 特效背景
  '345b63a8-3c7c-8153-aae8-fb9c535c81fe': 'water_reflect.jpg',  // 💫 迷人水面倒影 Atmospheric Water Reflection
  '345b63a8-3c7c-8149-8fab-ce29259eaa6b': 'orange_blue.jpg',     // 🔵 橙蓝抽象视觉 Abstract Orange Blue Effect
  '345b63a8-3c7c-81c2-8ad0-db64dbce31b6': 'pink_purple.jpg',    // ✨ 粉紫光影反射 Pink Purple Light Reflections
  '345b63a8-3c7c-8176-9a99-cb2e488e3f66': 'bokeh.jpg',          // 🎭 黑白散景光斑 Monochrome Bokeh Lights
};

// Category-based fallback cover (for pages not in COVER_MAP)
const CATEGORY_COVER_MAP: Record<string, string> = {
  '人物素材': 'face-closeup.jpg',
  '古风意境': 'face-closeup.jpg',
  '自然风光': 'pink-flowers.jpg',
  '航拍': 'drone_hills.jpg',
  '城市建筑': 'rooftop.jpg',
  '特效背景': 'pink_purple.jpg',
  '花卉微距': 'pink-flowers.jpg',
  '海景沙滩': 'sunset_sea.jpg',
};

// Fallback data (used when Notion API is unavailable)
export const FALLBACK_ASSETS: Asset[] = [
  { id: '331b63a8-3c7c-80b2-9202-da6da989aeb4', name: '🏯 AI人物 AICharacters', category: '古风意境', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/portrait/', isPremium: true, cover: 'face-closeup.jpg', tags: ['AI', '人像'], description: 'AI生成的高清人像' },
  { id: '332b63a8-3c7c-8001-8477-ef6453bb9abd', name: '🌸 粉色花丛随风轻摇 Pink Flowers', category: '花卉微距', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/pink-flowers/', isPremium: true, cover: 'pink-flowers.jpg', tags: ['粉色', '花卉'], description: '唯美粉色花丛视频' },
  { id: '332b63a8-3c7c-800f-8561-f5f21887e531', name: '🌼 黄花树摇曳 Tree with Yellow Flowers', category: '花卉微距', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/cherry-blossom/', isPremium: true, cover: 'yellow_tree.jpg', tags: ['樱花', '树木'], description: '盛开的樱花树下' },
  // 人物素材 - 6个占位条目（实际数据来自Notion）
  { id: '人物001', name: '人物视频1 - 亚裔面孔特写', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/e00345009218', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物002', name: '人物视频2 - 时尚街拍', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/a04a8b08ece2', isPremium: true, cover: 'pink-flowers.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物003', name: '人物视频3 - 城市行走', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/bd6899eee77f', isPremium: true, cover: 'sunset_sea.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物004', name: '人物视频4 - 情侣互动', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/0a13fa7e52d8', isPremium: true, cover: 'pink_purple.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物005', name: '人物视频5 - 户外运动', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/660b6a174a7d', isPremium: true, cover: 'waterfall.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物006', name: '人物视频6 - 职场商务', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/445730f0e022', isPremium: true, cover: 'waves_beach.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '332b63a8-3c7c-8048-b35c-df90c29a083c', name: '🏞️ 森林瀑布秘境 Lush Forest Waterfall', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/waterfall/', isPremium: true, cover: 'waterfall.jpg', tags: ['自然', '瀑布'], description: '森林中的美丽瀑布' },
  { id: '332b63a8-3c7c-804b-bffa-ce55c08e034c', name: '🦅 海鸥飞越泻湖 Seagulls Over Lagoon', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/seagulls/', isPremium: true, cover: 'seagulls.jpg', tags: ['海鸥', '泻湖'], description: '海鸥飞越美丽泻湖' },
  { id: '332b63a8-3c7c-8050-83fd-f2b0f0026af2', name: '🚁 航拍山丘码头 Drone Hills and Dock', category: '航拍', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/aerial-landscape/', isPremium: true, cover: 'drone_hills.jpg', tags: ['航拍', '山丘'], description: '无人机航拍山丘与码头' },
  { id: '332b63a8-3c7c-8087-b868-e7781b333f7d', name: '🌊 海浪轻拍白沙海滩 Waves on Beach', category: '海景沙滩', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/ocean-waves/', isPremium: true, cover: 'waves_beach.jpg', tags: ['海浪', '海滩'], description: '海浪拍打金色海滩' },
  { id: '332b63a8-3c7c-81e5-bd54-e83cb1232855', name: '🌅 海景日落 Stunning Sunset', category: '海景沙滩', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/sunset-sea/', isPremium: true, cover: 'sunset_sea.jpg', tags: ['日落', '海景'], description: '海边绝美日落' },
  { id: '332b63a8-3c7c-8107-8c47-d6d65cd10d01', name: '🎆 海滩烟花绽放 Fireworks on Beach', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/fireworks/', isPremium: true, cover: 'fireworks_beach.jpg', tags: ['烟花', '海滩'], description: '海滩上绽放的烟花' },
  { id: '332b63a8-3c7c-8163-ab7f-e0053c67900a', name: '🌧️ 雨夜时代广场 Times Square Rainy Night', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/tokyo-night/', isPremium: true, cover: 'tokyo.jpg', tags: ['城市', '东京'], description: '东京繁华街道雨中行' },
  { id: '332b63a8-3c7c-8169-933d-ee0bf041ecfe', name: '🌃 东京步行街 Pedestrian Walk in Tokyo', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/city-sunset/', isPremium: true, cover: 'rooftop.jpg', tags: ['日落', '天台'], description: '天台视角的城市日落' },
  { id: '332b63a8-3c7c-8165-adb0-ddf4adb1693b', name: '🌅 天台日落 Woman Sunset on Rooftop', category: 'AI人物', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/city-sunset/', isPremium: true, cover: 'rooftop.jpg', tags: ['AI', '日落'], description: 'AI生成的天台日落人像' },
  { id: '332b63a8-3c7c-81bc-9e3f-ee5bfca8f92c', name: '💫 迷人水面倒影 Atmospheric Water Reflection', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/water-reflection/', isPremium: true, cover: 'water_reflect.jpg', tags: ['倒影', '水面'], description: '唯美水面倒影特效' },
  { id: '332b63a8-3c7c-81d4-a8a7-f67fd24c6a95', name: '📹 视频素材 Watermarked Preview', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/bokeh/', isPremium: true, cover: 'camera_hands.jpg', tags: ['视频', '素材'], description: '专业视频素材展示' },
  { id: '332b63a8-3c7c-81e9-9181-d01b8b23c963', name: '🔵 橙蓝抽象视觉 Abstract Orange Blue Effect', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/abstract-gradient/', isPremium: true, cover: 'orange_blue.jpg', tags: ['抽象', '特效'], description: '橙蓝渐变抽象背景' },
  { id: '332b63a8-3c7c-8131-8974-cecd3bd1badd', name: '✨ 粉紫光影反射 Pink Purple Light Reflections', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/abstract-light/', isPremium: true, cover: 'pink_purple.jpg', tags: ['特效', '光影'], description: '梦幻粉紫色光影背景' },
  { id: '332b63a8-3c7c-81ea-9c26-ea9cdcf405ce', name: '🎭 黑白散景光斑 Monochrome Bokeh Lights', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/bokeh-lights/', isPremium: true, cover: 'bokeh.jpg', tags: ['散景', '黑白'], description: '黑白散景虚焦背景' },
];

export async function fetchNotionAssets(): Promise<Asset[]> {
  try {
    const { Client } = await import('@notionhq/client');
    const notion = new Client({ auth: NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        { property: 'Category', direction: 'ascending' },
        { property: '序号', direction: 'ascending' },
      ],
    });
    const assets: Asset[] = response.results
      .filter((page: any) => page.object === 'page')
      .map((page: any) => {
        const props = page.properties;
        const name = props['名称']?.title?.[0]?.plain_text || '未命名';
        const category = props.Category?.select?.name || 'Uncategorized';
        const resolution = props['分辨率']?.select?.name || 'HD';
        const downloadUrl = props.Download?.url || '';
        const isPremium = false;
        const tags = (props['标签']?.multi_select || []).map((t: any) => t.name);
        const effectiveTags = tags.length > 0 ? tags : [category];
        const description = props['备注']?.rich_text?.[0]?.plain_text || '';
        const cover = COVER_MAP[page.id] || CATEGORY_COVER_MAP[category] || '';
        return { id: page.id, name, category, resolution, downloadUrl, description, tags: effectiveTags, isPremium, cover };
      });
    return assets.length > 0 ? assets : FALLBACK_ASSETS;
  } catch {
    return FALLBACK_ASSETS;
  }
}

export async function getVideoAssets(): Promise<Asset[]> {
  return fetchNotionAssets();
}

export async function getCategories(): Promise<string[]> {
  const assets = await fetchNotionAssets();
  return Array.from(new Set(assets.map(a => a.category))).sort();
}
