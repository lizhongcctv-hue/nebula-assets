const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID || '5496641573784465b9b5b4d0be9497b8';

const COVER_MAP: Record<string, string> = {
  '331b63a8-3c7c-80b2-9202-da6da989aeb4': 'face-closeup.jpg',
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

// 瀹屾暣鐨?20 涓礌鏉?mock 鏁版嵁锛堝搴?Notion 鏁版嵁搴撳叏閮ㄨ褰曪級
const MOCK_ASSETS = [
  { id: '331b63a8-3c7c-80b2-9202-da6da989aeb4', name: 'AI浜虹墿', category: 'AI浜虹墿', resolution: '4K', downloadUrl: 'https://pan.quark.cn/s/xxx', isPremium: true, cover: 'face-closeup.jpg', tags: ['AI', '浜哄儚'], description: 'AI鐢熸垚鐨勯珮娓呬汉鐗? },
  { id: '332b63a8-3c7c-8001-8477-ef6453bb9abd', name: '绮夎壊鑺变笡', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'pink-flowers.jpg', tags: ['鑷劧', '鑺卞崏'], description: '鍞編绮夎壊鑺变笡瑙嗛' },
  { id: '332b63a8-3c7c-800f-8561-f5f21887e531', name: '榛勮姳鏍?, category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'yellow_tree.jpg', tags: ['鑷劧', '鏍戞湪'], description: '鐩涘紑鐨勯粍鑺辨爲' },
  { id: '332b63a8-3c7c-8014-9e9a-e1023703401f', name: 'Pexels 绱犳潗瀵艰埅', category: '绱犳潗瀵艰埅', resolution: '4K', downloadUrl: 'https://www.pexels.com/zh-cn/video/', isPremium: false, cover: 'pexels.jpg', tags: ['瀵艰埅', 'Pexels'], description: '鍏嶈垂楂樻竻瑙嗛绱犳潗搴? },
  { id: '332b63a8-3c7c-8032-981e-ca6817208904', name: 'Mixkit 绱犳潗瀵艰埅', category: '绱犳潗瀵艰埅', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'mixkit.jpg', tags: ['瀵艰埅', 'Mixkit'], description: '鍏嶈垂鍒涙剰瑙嗛绱犳潗' },
  { id: '332b63a8-3c7c-8048-b35c-df90c29a083c', name: '妫灄鐎戝竷', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'waterfall.jpg', tags: ['鑷劧', '鐎戝竷'], description: '妫灄涓殑缇庝附鐎戝竷' },
  { id: '332b63a8-3c7c-804b-bffa-ce55c08e034c', name: '娴烽弗椋炶秺娉绘箹', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'seagulls.jpg', tags: ['娴烽弗', '娉绘箹'], description: '鑸媿娴烽弗椋炶秺缇庝附娉绘箹' },
  { id: '332b63a8-3c7c-8050-83fd-f2b0f0026af2', name: '鑸媿灞变笜鐮佸ご', category: '鑸媿', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'drone_hills.jpg', tags: ['鑸媿', '灞变笜'], description: '鏃犱汉鏈鸿埅鎷嶅北涓樹笌鐮佸ご' },
  { id: '332b63a8-3c7c-806d-bc96-ef68da296378', name: 'Pixabay 绱犳潗瀵艰埅', category: '绱犳潗瀵艰埅', resolution: '4K', downloadUrl: 'https://pixabay.com/videos/', isPremium: false, cover: 'pixabay.jpg', tags: ['瀵艰埅', 'Pixabay'], description: '鍏嶈垂瑙嗛鍜屽浘鐗囩礌鏉? },
  { id: '332b63a8-3c7c-8087-b868-e7781b333f7d', name: '娴锋氮娴锋哗', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'waves_beach.jpg', tags: ['娴锋氮', '娴锋哗'], description: '娴锋氮鎷嶆墦閲戣壊娴锋哗' },
  { id: '332b63a8-3c7c-8107-8c47-d6d65cd10d01', name: '娴锋哗鐑熻姳', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'fireworks_beach.jpg', tags: ['鐑熻姳', '娴锋哗'], description: '娴锋哗涓婄唤鏀剧殑鐑熻姳' },
  { id: '332b63a8-3c7c-8131-8974-cecd3bd1badd', name: '绮夌传鍏夊奖', category: '鐗规晥鑳屾櫙', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'pink_purple.jpg', tags: ['鐗规晥', '鍏夊奖'], description: '姊﹀够绮夌传鑹插厜褰辫儗鏅? },
  { id: '332b63a8-3c7c-8163-ab7f-e0053c67900a', name: '涓滀含姝ヨ琛?, category: '鍩庡競寤虹瓚', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'tokyo.jpg', tags: ['鍩庡競', '涓滀含'], description: '涓滀含绻佸崕姝ヨ琛楀鏅? },
  { id: '332b63a8-3c7c-8165-adb0-ddf4adb1693b', name: '澶╁彴鏃ヨ惤', category: '鍩庡競寤虹瓚', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'rooftop.jpg', tags: ['鏃ヨ惤', '澶╁彴'], description: '澶╁彴瑙嗚鐨勫煄甯傛棩钀? },
  { id: '332b63a8-3c7c-8169-933d-ee0bf041ecfe', name: '鏃朵唬骞垮満', category: '鍩庡競寤虹瓚', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'times_square.jpg', tags: ['绾界害', '鏃朵唬骞垮満'], description: '绾界害鏃朵唬骞垮満绻佸崕澶滄櫙' },
  { id: '332b63a8-3c7c-81bc-9e3f-ee5bfca8f92c', name: '姘撮潰鍊掑奖', category: '鐗规晥鑳屾櫙', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'water_reflect.jpg', tags: ['鍊掑奖', '姘?], description: '鍞編姘撮潰鍊掑奖鐗规晥' },
  { id: '332b63a8-3c7c-81d4-a8a7-f67fd24c6a95', name: '瑙嗛绱犳潗', category: '鐗规晥鑳屾櫙', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'camera_hands.jpg', tags: ['瑙嗛', '绱犳潗'], description: '涓撲笟瑙嗛绱犳潗灞曠ず' },
  { id: '332b63a8-3c7c-81e5-bd54-e83cb1232855', name: '娴锋櫙鏃ヨ惤', category: '鑷劧椋庡厜', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'sunset_sea.jpg', tags: ['鏃ヨ惤', '娴锋櫙'], description: '娴疯竟澹附鏃ヨ惤' },
  { id: '332b63a8-3c7c-81e9-9181-d01b8b23c963', name: '姗欒摑鎶借薄', category: '鐗规晥鑳屾櫙', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'orange_blue.jpg', tags: ['鎶借薄', '鐗规晥'], description: '姗欒摑娓愬彉鎶借薄鑳屾櫙' },
  { id: '332b63a8-3c7c-81ea-9c26-ea9cdcf405ce', name: '榛戠櫧鏁ｆ櫙', category: '鐗规晥鑳屾櫙', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: true, cover: 'bokeh.jpg', tags: ['鏁ｆ櫙', '榛戠櫧'], description: '榛戠櫧鏁ｆ櫙铏氱劍鑳屾櫙' },
];

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
  if (!NOTION_TOKEN) throw new Error('No token');
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
  if (!response.ok) throw new Error(`Notion error: ${response.status}`);
  return response.json();
}

export async function getVideoAssets(): Promise<VideoAsset[]> {
  if (NOTION_TOKEN) {
    try {
      const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
        method: 'POST',
        body: JSON.stringify({ sorts: [{ property: 'Category', direction: 'ascending' }] }),
      });
      return response.results.map((page: any) => {
        const props = page.properties;
        const name = props.Name?.title?.[0]?.plain_text || 'Untitled';
        const category = props.Category?.select?.name || 'Uncategorized';
        const resolution = props.Resolution?.select?.name || 'HD';
        const downloadUrl = props.Download?.url || '#';
        const description = props.Description?.rich_text?.[0]?.plain_text || '';
        const tags = props.Tags?.multi_select?.map((t: any) => t.name) || [];
        let isPremium = false;
        if (props.isPremium?.checkbox !== undefined) isPremium = props.isPremium.checkbox;
        else if (props.IsPremium?.checkbox !== undefined) isPremium = props.IsPremium.checkbox;
        else isPremium = downloadUrl.includes('pan.quark.cn');
        let coverUrl: string;
        if (page.cover?.external?.url) coverUrl = page.cover.external.url;
        else if (COVER_MAP[page.id]) coverUrl = `/covers/${COVER_MAP[page.id]}`;
        else coverUrl = `/covers/${page.id.replace(/-/g, '')}.jpg`;
        return { id: page.id, name, category, resolution, downloadUrl, description, tags, isPremium, coverUrl };
      });
    } catch (error) {
      console.warn('Notion API failed, using fallback data');
    }
  }
  // Fallback: 瀹屾暣鐨?20 涓礌鏉愶紝浣跨敤鏈湴灏侀潰
  return MOCK_ASSETS.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    resolution: item.resolution,
    downloadUrl: item.downloadUrl,
    description: item.description,
    tags: item.tags,
    isPremium: item.isPremium,
    coverUrl: `/covers/${item.cover}`,
  }));
}

export async function getCategories(): Promise<string[]> {
  const assets = await getVideoAssets();
  return Array.from(new Set(assets.map(a => a.category))).sort();
}
