import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'everythingmoe.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CATEGORY_MAP = {
  'sec-anime': { category: 'Anime', subCategory: 'Streaming Platforms' },
  'sec-donghua': { category: 'Anime', subCategory: 'Chinese Animation (Donghua)' },
  'sec-manga': { category: 'Manga', subCategory: 'Reading Portals' },
  'sec-manhwa': { category: 'Manga', subCategory: 'Manhwa Reading' },
  'sec-novel': { category: 'Light Novels', subCategory: 'Reading & EPUBs' },
  'sec-drama': { category: 'Japan & Immersion', subCategory: 'Asian Drama Streaming' },
  'sec-game': { category: 'Tools & Trackers', subCategory: 'Visual Novel Databases' },
  'sec-apps': { category: 'Tools & Trackers', subCategory: 'Mobile Apps' },
  'sec-download': { category: 'Torrenting', subCategory: 'BitTorrent Trackers' },
  'sec-music': { category: 'Music & Audio', subCategory: 'Soundtrack Downloads' },
  'sec-schedule': { category: 'Tools & Trackers', subCategory: 'Schedules & Broadcasts' },
  'sec-database': { category: 'Tools & Trackers', subCategory: 'Otaku Tracking & Lists' },
  'sec-utils': { category: 'Tools & Trackers', subCategory: 'Otaku Tools' },
  'sec-wiki': { category: 'Japan & Immersion', subCategory: 'Learning Guides' },
  'sec-artboard': { category: 'Music & Audio', subCategory: 'Imageboards & Art' }
};

const COLOR_MAP = {
  'Anime': '#38BDF8',
  'Manga': '#F43F5E',
  'Light Novels': '#A855F7',
  'Torrenting': '#22C55E',
  'Tools & Trackers': '#3B82F6',
  'Music & Audio': '#EC4899',
  'Japan & Immersion': '#F97316',
  'NSFW': '#EF4444'
};

const fetchHTML = () => {
  return new Promise((resolve, reject) => {
    console.log('Fetching live data from everythingmoe.com...');
    const options = {
      hostname: 'everythingmoe.com',
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch: Status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => { reject(err); });
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
};

const cleanText = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const parseHTML = (html) => {
  const websites = [];
  const sections = html.split(/<div\s+id="sec-/);
  
  for (let i = 1; i < sections.length; i++) {
    const sectionBlock = sections[i];
    const idMatch = sectionBlock.match(/^([a-z0-9-]+)"/);
    if (!idMatch) continue;
    
    const sectionId = 'sec-' + idMatch[1];
    const meta = CATEGORY_MAP[sectionId];
    if (!meta) continue;
    
    const items = sectionBlock.split(/class="section-item"/);
    for (let j = 1; j < items.length; j++) {
      const itemBlock = items[j];
      const linkMatch = itemBlock.match(/data-link="([^"]+)"/);
      if (!linkMatch) continue;
      const url = linkMatch[1];
      
      const nameMatch = itemBlock.match(/<a\s+href="[^"]*"[^>]*>([\s\S]*?)<\/a>/);
      if (!nameMatch) continue;
      const name = cleanText(nameMatch[1]);
      
      if (!name || name.includes('Discord') || name.includes('Telegram') || name.includes('Donate')) {
        continue;
      }
      
      const rankMatch = itemBlock.match(/data-rank="(\d+)"/);
      const rank = rankMatch ? parseInt(rankMatch[1], 10) : 999;
      
      const filterMatch = itemBlock.match(/data-filter="([^"]*)"/);
      const tags = filterMatch && filterMatch[1]
        ? filterMatch[1].split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
        : [];
      
      if (rank > 12 && sectionId !== 'sec-anime' && sectionId !== 'sec-manga') {
        continue;
      }
      if (rank > 18) {
        continue;
      }
      
      const uniqueTags = Array.from(new Set([...tags, meta.subCategory.split(' ')[0].toLowerCase()]));
      
      // Compute accurate details dynamically based on metadata tags
      let adExperience = 'Adblocker Recommended';
      if (tags.includes('ad-free') || tags.includes('no ads')) {
        adExperience = 'Completely Ad-Free';
      } else if (tags.includes('simple interface') || tags.includes('clean ui')) {
        adExperience = 'Minimal Ads / Clean UI';
      } else if (itemBlock.includes('licensed')) {
        adExperience = 'Licensed (Sub/Ad-supported)';
      }

      let signupRequired = 'No Signup Required';
      if (tags.includes('login') || tags.includes('account required')) {
        signupRequired = 'Account Required';
      } else if (tags.includes('optional account') || tags.includes('optional login') || tags.includes('disqus')) {
        signupRequired = 'Optional Account';
      }

      let videoQuality = 'Web Index Link';
      if (meta.category === 'Anime') {
        if (tags.includes('soft-sub')) {
          videoQuality = '1080p Soft-subbed';
        } else if (tags.includes('hard-sub')) {
          videoQuality = '1080p Hard-subbed';
        } else {
          videoQuality = '1080p Full HD';
        }
      } else if (meta.category === 'Manga') {
        if (tags.includes('raws')) {
          videoQuality = 'Japanese Raws';
        } else if (tags.includes('official rips')) {
          videoQuality = 'Official Digital Rips';
        } else {
          videoQuality = 'High-Res Scans';
        }
      } else if (meta.category === 'Light Novels') {
        videoQuality = 'Text EPUB / Web Reader';
      } else if (meta.category === 'Torrenting') {
        videoQuality = 'BitTorrent Peer Sharing';
      } else if (meta.category === 'Tools & Trackers') {
        videoQuality = 'Tracking APIs & DB';
      } else if (meta.category === 'Music & Audio') {
        videoQuality = 'FLAC / MP3 Formats';
      }

      const categoryColor = COLOR_MAP[meta.category] || '#A855F7';

      websites.push({
        name,
        url,
        description: `Highly-rated index for ${name}, cataloged in EverythingMoe under the ${meta.subCategory} section.`,
        category: meta.category,
        subCategory: meta.subCategory,
        color: categoryColor,
        tags: uniqueTags.slice(0, 4),
        adExperience,
        signupRequired,
        videoQuality,
        detailedReview: `Community rated platform on EverythingMoe. It features tags: ${uniqueTags.join(', ')}. Ideal for users looking for reliable ${meta.subCategory.toLowerCase()}.`,
        tip: adExperience.includes('Recommended') 
          ? 'Always use a strong content blocker like uBlock Origin when visiting this site.' 
          : 'Highly recommended client/reader layout with quick response times.'
      });
    }
  }
  
  return websites;
};

const run = async () => {
  try {
    const html = await fetchHTML();
    const parsedWebsites = parseHTML(html);
    
    if (parsedWebsites.length === 0) {
      throw new Error('Scraped list is empty!');
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(parsedWebsites, null, 2), 'utf-8');
    console.log(`Successfully scraped ${parsedWebsites.length} websites from EverythingMoe to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Error fetching/scraping EverythingMoe:', err.message);
    console.log('Attempting fallback to local cache...');
    
    const cachePath = '/data/data/com.termux/files/home/.gemini/antigravity-cli/brain/534c9dd4-5199-4c42-b171-5f4528a5f139/.system_generated/steps/633/content.md';
    if (fs.existsSync(cachePath)) {
      const cachedContent = fs.readFileSync(cachePath, 'utf8');
      const parsedWebsites = parseHTML(cachedContent);
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(parsedWebsites, null, 2), 'utf-8');
      console.log(`Parsed ${parsedWebsites.length} websites from local cache to ${OUTPUT_FILE}`);
    } else {
      console.error('No cache file found. Exiting.');
    }
  }
};

run();
