// AI Tag & Description Generator for NebulaAssets
// Uses local Ollama + Gemma2 to enhance asset metadata

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'gemma2:latest';

// 内嵌素材数据（从 notion.ts 复制）
const FALLBACK_ASSETS = [
  { id: '331b63a8-3c7c-80b2-9202-da6da989aeb4', name: '🏯 AI人物 AICharacters', category: '古风意境', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/portrait/', isPremium: true, cover: 'face-closeup.jpg', tags: ['AI', '人像'], description: 'AI生成的高清人像' },
  { id: '332b63a8-3c7c-8001-8477-ef6453bb9abd', name: '粉色花丛', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/pink-flowers/', isPremium: true, cover: 'pink-flowers.jpg', tags: ['粉色', '花卉'], description: '唯美粉色花丛视频' },
  { id: '332b63a8-3c7c-800f-8561-f5f21887e531', name: '樱花树下', category: '自然风光', resolution: '4K', downloadUrl: 'https://www.pexels.com/search/videos/cherry-blossom/', isPremium: true, cover: 'yellow_tree.jpg', tags: ['樱花', '树木'], description: '盛开的樱花树下' },
  { id: '332b63a8-3c7c-8014-9e9a-e1023703401f', name: 'Pexels 素材导航', category: '素材导航', resolution: '4K', downloadUrl: 'https://www.pexels.com/zh-cn/video/', isPremium: false, cover: 'pexels.jpg', tags: ['导航', 'Pexels'], description: '免费高清视频素材库' },
  { id: '332b63a8-3c7c-8032-981e-ca6817208904', name: 'Mixkit 素材导航', category: '素材导航', resolution: '4K', downloadUrl: 'https://mixkit.co/free-stock-video/', isPremium: false, cover: 'mixkit.jpg', tags: ['导航', 'Mixkit'], description: '免费创意视频素材' },
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

// Prompt template for generating tags and description
const PROMPT_TEMPLATE = `你是一个专业的视频素材营销文案专家。请为以下视频素材生成更丰富的标签和吸引人的描述。

素材名称：{name}
分类：{category}
现有标签：{tags}
现有描述：{description}
是否VIP：{isPremium}

请按以下格式输出（不要添加任何其他文字）：
标签：[标签1] [标签2] [标签3] [标签4] [标签5]
描述：一句话营销文案，突出视觉美感和使用场景，20-30字，适合小红书风格

要求：
- 标签要具体，包含视觉元素、情感氛围、适用场景
- 描述要治愈系、有画面感，能激发创作者使用欲望
- 如果是VIP素材，描述中暗示其独特性`;

async function generateWithOllama(prompt) {
  const response = await fetch(OLLAMA_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        num_predict: 200
      }
    })
  });
  
  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status}`);
  }
  
  const data = await response.json();
  // 去掉可能的前后空白/标记
  let text = (data.response || '').trim();
  // 提取"标签"和"描述"所在段落（兼容多种格式）
  if (!text.includes('标签') && !text.includes('描述')) {
    // 模型可能输出纯文本，尝试用换行分割
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length >= 2) {
      text = `标签：[${lines[0].trim()}]\n描述：${lines[1].trim()}`;
    }
  }
  return text;
}

function parseAIResponse(response, fallbackTags, fallbackDesc) {
  try {
    // 尝试匹配带方括号的标签格式
    let tagMatch = response.match(/标签[：:]\s*\[([^\]]+)\]/);
    if (!tagMatch) {
      // 尝试匹配不带方括号的格式：标签：xxx xxx xxx
      tagMatch = response.match(/标签[：:]\s*(.+)/);
    }
    const descMatch = response.match(/描述[：:]\s*(.+)/);
    
    const tags = tagMatch 
      ? tagMatch[1].replace(/[\[\]]/g, '').split(/[,，\s]+/).map(t => t.trim()).filter(t => t && t.length <= 10)
      : [];
    
    const description = descMatch 
      ? descMatch[1].trim().substring(0, 100)
      : '';
    
    return { tags: tags.length ? tags : fallbackTags, description: description || fallbackDesc };
  } catch {
    return { tags: fallbackTags, description: fallbackDesc };
  }
}

async function processAsset(asset, index, total) {
  console.log(`\n[${index + 1}/${total}] 处理: ${asset.name}`);
  
  const prompt = PROMPT_TEMPLATE
    .replace('{name}', asset.name)
    .replace('{category}', asset.category)
    .replace('{tags}', asset.tags.join(', '))
    .replace('{description}', asset.description)
    .replace('{isPremium}', asset.isPremium ? '是' : '否');
  
  // 最多重试2次
  let lastError = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const aiResponse = await generateWithOllama(prompt);
      const { tags, description } = parseAIResponse(aiResponse, asset.tags, asset.description);
      
      console.log(`  原标签: ${asset.tags.join(', ')}`);
      console.log(`  新标签: ${tags.join(', ')}`);
      console.log(`  原描述: ${asset.description}`);
      console.log(`  新描述: ${description}`);
      
      return { ...asset, aiTags: tags, aiDescription: description, rawAIResponse: aiResponse };
    } catch (error) {
      lastError = error;
      console.error(`  ⚠️ 第${attempt + 1}次尝试失败: ${error.message}`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.error(`  ❌ 3次均失败，保留原数据`);
  return { ...asset, aiTags: asset.tags, aiDescription: asset.description, error: lastError?.message };
}

async function main() {
  console.log('🚀 NebulaAssets AI 标签生成器');
  console.log(`📦 模型: ${MODEL}`);
  console.log(`📊 素材数: ${FALLBACK_ASSETS.length}`);
  console.log('─'.repeat(50));
  
  const results = [];
  
  for (let i = 0; i < FALLBACK_ASSETS.length; i++) {
    const result = await processAsset(FALLBACK_ASSETS[i], i, FALLBACK_ASSETS.length);
    results.push(result);
    
    // 小延迟避免过载
    if (i < FALLBACK_ASSETS.length - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  // 输出汇总结果
  console.log('\n\n' + '═'.repeat(50));
  console.log('📋 生成结果汇总');
  console.log('═'.repeat(50));
  
  results.forEach((r, i) => {
    console.log(`\n[${i + 1}] ${r.name}`);
    console.log(`    标签: ${r.aiTags.join(', ')}`);
    console.log(`    描述: ${r.aiDescription}`);
  });
  
  // 输出为 JSON 文件
  const outputPath = './ai-generated-metadata.json';
  const fs = await import('fs');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n✅ 结果已保存到: ${outputPath}`);
}

main().catch(console.error);
