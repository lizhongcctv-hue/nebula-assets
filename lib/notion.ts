const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

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
    
    // Generate cover URL from page ID
    const coverUrl = page.cover?.external?.url || page.cover?.file?.url || `/covers/${page.id.replace(/-/g, '')}.jpg`;

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
