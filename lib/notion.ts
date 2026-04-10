const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Map page IDs to local cover filenames
// This maps Notion page IDs to the actual cover files in /covers/ directory
const COVER_MAP: Record<string, string> = {
  // AI人物
  '331b63a8-3c7c-80b2-9202-da6da989aeb4': 'face-closeup.jpg',
  // 粉色花丛
  '332b63a8-3c7c-8001-8477-ef6453bb9abd': 'pink-flowers.jpg',
  // 黄花树
  '332b63a8-3c7c-800f-8561-f5f21887e531': 'yellow_tree.jpg',
  // Pexels
  '332b63a8-3c7c-8014-9e9a-e1023703401f': 'pexels.jpg',
  // Mixkit
  '332b63a8-3c7c-8032-981e-ca6817208904': 'mixkit.jpg',
  // 森林瀑布
  '332b63a8-3c7c-8048-b35c-df90c29a083c': 'waterfall.jpg',
  // 海鸥
  '332b63a8-3c7c-804b-bffa-ce55c08e034c': 'seagulls.jpg',
  // 航拍山丘
  '332b63a8-3c7c-8050-83fd-f2b0f0026af2': 'drone_hills.jpg',
  // Pixabay
  '332b63a8-3c7c-806d-bc96-ef68da296378': 'pixabay.jpg',
  // 海浪海滩
  '332b63a8-3c7c-8087-b868-e7781b333f7d': 'waves_beach.jpg',
  // 海滩烟花
  '332b63a8-3c7c-8107-8c47-d6d65cd10d01': 'fireworks.jpg',
  // 粉紫光影
  '332b63a8-3c7c-8131-8974-cecd3bd1badd': 'pink_purple.jpg',
  // 东京步行街
  '332b63a8-3c7c-8163-ab7f-e0053c67900a': 'tokyo.jpg',
  // 天台日落
  '332b63a8-3c7c-8165-adb0-ddf4adb1693b': 'rooftop.jpg',
  // 时代广场
  '332b63a8-3c7c-8169-933d-ee0bf041ecfe': 'times_square.jpg',
  // 水面倒影
  '332b63a8-3c7c-81bc-9e3f-ee5bfca8f92c': 'water_reflect.jpg',
  // 视频素材 (watermarked)
  '332b63a8-3c7c-81d4-a8a7-f67fd24c6a95': 'camera_hands.jpg',
  // 海景日落
  '332b63a8-3c7c-81e5-bd54-e83cb1232855': 'sunset_sea.jpg',
  // 橙蓝抽象
  '332b63a8-3c7c-81e9-9181-d01b8b23c963': 'orange_blue.jpg',
  // 黑白散景
  '332b63a8-3c7c-81ea-9c26-ea9cdcf405ce': 'bokeh.jpg',
};

export interface VideoAsset {
  id: string;
  name: string;
  category: string;
  resolution: string;
  downloadUrl: string;
  description: string;
  tags: string[];
  isPremium: boolean;
  coverUrl?: string;
}

async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${NOTION_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error: ${response.status} ${error}`);
  }
  
  return response.json();
}

export async function getVideoAssets(): Promise<VideoAsset[]> {
  const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      sorts: [
        {
          property: 'Category',
          direction: 'ascending',
        },
      ],
    }),
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    
    // Extract name
    const name = props.Name?.title?.[0]?.plain_text || 'Untitled';
    
    // Extract category
    const category = props.Category?.select?.name || 'Uncategorized';
    
    // Extract resolution
    const resolution = props.Resolution?.select?.name || 'HD';
    
    // Extract download URL
    const downloadUrl = props.Download?.url || '#';
    
    // Extract description
    const description = props.Description?.rich_text?.[0]?.plain_text || '';
    
    // Extract tags
    const tags = props.Tags?.multi_select?.map((t: any) => t.name) || [];
    
    // Check isPremium - if property doesn't exist, default to false
    let isPremium = false;
    if (props.isPremium?.checkbox !== undefined) {
      isPremium = props.isPremium.checkbox;
    } else if (props.IsPremium?.checkbox !== undefined) {
      isPremium = props.IsPremium.checkbox;
    } else {
      // Fallback: if URL contains pan.quark.cn, consider it premium
      isPremium = downloadUrl.includes('pan.quark.cn');
    }
    
    // Generate cover URL
    // Priority: 1) External URL (Unsplash/Pixabay), 2) Mapped local file, 3) Default
    let coverUrl: string;
    if (page.cover?.external?.url) {
      coverUrl = page.cover.external.url;
    } else if (COVER_MAP[page.id]) {
      coverUrl = `/covers/${COVER_MAP[page.id]}`;
    } else {
      // Fallback: try page ID as filename
      coverUrl = `/covers/${page.id.replace(/-/g, '')}.jpg`;
    }

    return {
      id: page.id,
      name,
      category,
      resolution,
      downloadUrl,
      description,
      tags,
      isPremium,
      coverUrl,
    };
  });
}

export async function getCategories(): Promise<string[]> {
  const assets = await getVideoAssets();
  const categories = new Set(assets.map(a => a.category));
  return Array.from(categories).sort();
}
