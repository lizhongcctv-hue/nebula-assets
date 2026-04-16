// COMMIT_HASH: rebuilt_0411_correct
// NebulaAssets Notion API + Fallback Data

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

const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_TOKEN = process.env.NOTION_TOKEN || 'FALLBACK_TOKEN';
const DATABASE_ID = process.env.NOTION_DATABASE_ID || 'FALLBACK_DB';

const COVER_MAP: Record<string, string> = {
  '331b63a8-3c7c-80b2-9202-da6da989aeb4': 'face-closeup.jpg', // AI人物
  '332b63a8-3c7c-8001-8477-ef6453bb9abd': 'pink-flowers.jpg',
  '332b63a8-3c7c-800f-8561-f5f21887e531': 'yellow_tree.jpg',
  '332b63a8-3c7c-8014-9e9a-e1023703401f': 'pexels.jpg',
  '332b63a8-3c7c-8032-981e-ca6817208904': 'mixkit.jpg',
  '332b63a8-3c7c-8048-b35c-df90c29a083c': 'waterfall.jpg',
  '332b63a8-3c7c-804b-bffa-ce55c08e034c': 'seagulls.jpg',
  '332b63a8-3c7c-8050-83fd-f2b0f0026af2': 'drone_hills.jpg',
  '332b63a8-3c7c-806d-bc96-ef68da296378': 'pixabay.jpg',
  '332b63a8-3c7c-8087-b868-e7781b333f7d': 'waves_beach.jpg',
  '332b63a8-3c7c-8107-8c47-d6d65cd10d01': 'fireworks_beach.jpg',
  '332b63a8-3c7c-8131-8974-cecd3bd1badd': 'pink_purple.jpg',
  '332b63a8-3c7c-8163-ab7f-e0053c67900a': 'tokyo.jpg',
  '332b63a8-3c7c-8165-adb0-ddf4adb1693b': 'rooftop.jpg',
  '332b63a8-3c7c-8169-933d-ee0bf041ecfe': 'times_square.jpg',
  '332b63a8-3c7c-81bc-9e3f-ee5bfca8f92c': 'water_reflect.jpg',
  '332b63a8-3c7c-81d4-a8a7-f67fd24c6a95': 'camera_hands.jpg',
  '332b63a8-3c7c-81e5-bd54-e83cb1232855': 'sunset_sea.jpg',
  '332b63a8-3c7c-81e9-9181-d01b8b23c963': 'orange_blue.jpg',
  '332b63a8-3c7c-81ea-9c26-ea9cdcf405ce': 'bokeh.jpg',
};

// Fallback data (used when Notion API is unavailable)
export const FALLBACK_ASSETS: Asset[] = [
  { id: '331b63a8-3c7c-80b2-9202-da6da989aeb4', name: '🏯 AI人物 AICharacters', category: '古风意境', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/portrait/', isPremium: true, cover: 'face-closeup.jpg', tags: ['AI', '人像'], description: 'AI生成的高清人像' },
  { id: '332b63a8-3c7c-8001-8477-ef6453bb9abd', name: '粉色花丛', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/pink-flowers/', isPremium: true, cover: 'pink-flowers.jpg', tags: ['粉色', '花卉'], description: '唯美粉色花丛视频' },
  { id: '332b63a8-3c7c-800f-8561-f5f21887e531', name: '樱花树下', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/cherry-blossom/', isPremium: true, cover: 'yellow_tree.jpg', tags: ['樱花', '树木'], description: '盛开的樱花树下' },
  // 人物素材 - 替换原来的素材导航
  { id: '人物001', name: '人物视频1', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物002', name: '人物视频2', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物003', name: '人物视频3', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物004', name: '人物视频4', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物005', name: '人物视频5', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '人物006', name: '人物视频6', category: '人物素材', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['人物', 'Pexels'], description: 'Pexels高清人物视频' },
  { id: '332b63a8-3c7c-8048-b35c-df90c29a083c', name: '森林瀑布', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/waterfall/', isPremium: true, cover: 'waterfall.jpg', tags: ['自然', '瀑布'], description: '森林中的美丽瀑布' },
  { id: '332b63a8-3c7c-804b-bffa-ce55c08e034c', name: '海鸥飞越泻湖', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/seagulls/', isPremium: true, cover: 'seagulls.jpg', tags: ['海鸥', '泻湖'], description: '海鸥飞越美丽泻湖' },
  { id: '332b63a8-3c7c-8050-83fd-f2b0f0026af2', name: '航拍山丘码头', category: '航拍', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/aerial-landscape/', isPremium: true, cover: 'drone_hills.jpg', tags: ['航拍', '山丘'], description: '无人机航拍山丘与码头' },
  { id: '332b63a8-3c7c-806d-bc96-ef68da296378', name: 'Pixabay 素材导航', category: '素材导航', resolution: '4K', downloadUrl: 'https://pixabay.com/videos/', isPremium: false, cover: 'pixabay.jpg', tags: ['导航', 'Pixabay'], description: '免费视频和图片素材' },
  { id: '332b63a8-3c7c-8087-b868-e7781b333f7d', name: '海浪沙滩', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/ocean-waves/', isPremium: true, cover: 'waves_beach.jpg', tags: ['海浪', '海滩'], description: '海浪拍打金色海滩' },
  { id: '332b63a8-3c7c-8107-8c47-d6d65cd10d01', name: '海滩烟花', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/fireworks/', isPremium: true, cover: 'fireworks_beach.jpg', tags: ['烟花', '海滩'], description: '海滩上绽放的烟花' },
  { id: '332b63a8-3c7c-8131-8974-cecd3bd1badd', name: '粉紫光影', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/abstract-light/', isPremium: true, cover: 'pink_purple.jpg', tags: ['特效', '光影'], description: '梦幻粉紫色光影背景' },
  { id: '332b63a8-3c7c-8163-ab7f-e0053c67900a', name: '东京雨中行', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/tokyo-night/', isPremium: true, cover: 'tokyo.jpg', tags: ['城市', '东京'], description: '东京繁华街道雨中行' },
  { id: '332b63a8-3c7c-8165-adb0-ddf4adb1693b', name: '天台日落', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/city-sunset/', isPremium: true, cover: 'rooftop.jpg', tags: ['日落', '天台'], description: '天台视角的城市日落' },
  { id: '332b63a8-3c7c-8169-933d-ee0bf041ecfe', name: '时代广场', category: '城市建筑', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/new-york-city/', isPremium: true, cover: 'times_square.jpg', tags: ['纽约', '时代广场'], description: '纽约时代广场繁华夜景' },
  { id: '332b63a8-3c7c-81bc-9e3f-ee5bfca8f92c', name: '水面倒影', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/water-reflection/', isPremium: true, cover: 'water_reflect.jpg', tags: ['倒影', '水面'], description: '唯美水面倒影特效' },
  { id: '332b63a8-3c7c-81d4-a8a7-f67fd24c6a95', name: '视频素材', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/bokeh/', isPremium: true, cover: 'camera_hands.jpg', tags: ['视频', '素材'], description: '专业视频素材展示' },
  { id: '332b63a8-3c7c-81e5-bd54-e83cb1232855', name: '海景日落', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/sunset-sea/', isPremium: true, cover: 'sunset_sea.jpg', tags: ['日落', '海景'], description: '海边绝美日落' },
  { id: '332b63a8-3c7c-81e9-9181-d01b8b23c963', name: '橙蓝抽象', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/abstract-gradient/', isPremium: true, cover: 'orange_blue.jpg', tags: ['抽象', '特效'], description: '橙蓝渐变抽象背景' },
  { id: '332b63a8-3c7c-81ea-9c26-ea9cdcf405ce', name: '黑白散景', category: '特效背景', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/bokeh-lights/', isPremium: true, cover: 'bokeh.jpg', tags: ['散景', '黑白'], description: '黑白散景虚焦背景' },
];

export async function fetchNotionAssets(): Promise<Asset[]> {
  try {
    const { Client } = await import('@notionhq/client');
    const notion = new Client({ auth: NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: 'Category', direction: 'ascending' }],
    });
    const assets: Asset[] = response.results
      .filter((page: any) => page.object === 'page')
      .map((page: any) => {
        const props = page.properties;
        const name = props.Name?.title?.[0]?.plain_text || '未命名';
        const category = props.Category?.select?.name || 'Uncategorized';
        const resolution = props.Resolution?.select?.name || 'HD';
        const downloadUrl = props.DownloadUrl?.url || '';
        const isPremium = props.IsPremium?.checkbox || false;
        const tags = (props.Tags?.multi_select || []).map((t: any) => t.name);
        const description = props.Description?.rich_text?.[0]?.plain_text || '';
        const cover = COVER_MAP[page.id] || '';
        return { id: page.id, name, category, resolution, downloadUrl, description, tags, isPremium, cover };
      });
    return assets.length > 0 ? assets : FALLBACK_ASSETS;
  } catch {
    return FALLBACK_ASSETS;
  }
}

// Helper: get all video assets
export async function getVideoAssets(): Promise<Asset[]> {
  return fetchNotionAssets();
}

// Helper: get unique categories
export async function getCategories(): Promise<string[]> {
  const assets = await fetchNotionAssets();
  return Array.from(new Set(assets.map(a => a.category))).sort();
}

