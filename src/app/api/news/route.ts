import { NextResponse } from 'next/server';

/**
 * 🜈 EXODUS II // NEWS ARTERY
 * Pulling live headlines from the Dying World
 */

const RSS_FEEDS = [
  { name: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss' },
  { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
  { name: 'FOX', url: 'http://feeds.foxnews.com/foxnews/latest' },
  { name: 'CTV', url: 'https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009' }
];

export async function GET() {
  try {
    const allHeadlines: string[] = [];

    // Fetch from all feeds in parallel
    const results = await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, { next: { revalidate: 3600 } });
        const xml = await res.text();
        
        // Simple regex to extract <title> contents from <item> or <entry>
        // We avoid heavy XML parsers for speed in the browser/edge environment
        const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];
        
        return items.slice(0, 5).map(item => {
          const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
          return titleMatch ? `[${feed.name}] :: ${titleMatch[1].trim()}` : null;
        }).filter(Boolean) as string[];
      })
    );

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        allHeadlines.push(...result.value);
      }
    });

    // Shuffle for dramatic effect
    const shuffled = allHeadlines.sort(() => Math.random() - 0.5);

    return NextResponse.json({ 
      headlines: shuffled.length > 0 ? shuffled : [
        "[SYSTEM] :: GEOPOLITICAL FRICTION DETECTED",
        "[SYSTEM] :: CLIMATE THRESHOLD BREACHED",
        "[SYSTEM] :: SOCIO-ECONOMIC COLLAPSE IMMINENT",
        "[SYSTEM] :: THE OLD WORLD IS FADING"
      ]
    });
  } catch (error) {
    console.error('News Artery Failure:', error);
    return NextResponse.json({ headlines: ["ERROR :: DATA STREAM SEVERED"] }, { status: 500 });
  }
}
