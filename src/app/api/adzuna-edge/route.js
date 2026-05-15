import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const what = searchParams.get('what') || 'technology'; 
  const where = searchParams.get('where') || 'us';
  
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const syntheticLeads = {
    results: [
      {
        id: "versa-1",
        company: { display_name: "Avenor Systems" },
        title: "Senior Full-Stack AI Engineer",
        location: { display_name: "Remote / New York, NY" },
        description: "Looking for an engineer who understands local LLM deployment, Next.js, and air-gapped system architecture. 98% Skill Match detected based on MÜN OS repository."
      },
      {
        id: "versa-2",
        company: { display_name: "Quantum Dynamics" },
        title: "Director of Autonomous Systems",
        location: { display_name: "Austin, TX" },
        description: "Lead our agentic framework division. Requires deep understanding of sovereign edge computing and React-based HUDs. Auto-apply recommended."
      },
      {
        id: "versa-3",
        company: { display_name: "Leviathan Defense Cloud" },
        title: "Principal Security Architect",
        location: { display_name: "Remote" },
        description: "We need someone to secure our network against data scrapers. Your Suture Protocol experience makes you an ideal candidate. Salary range: $180k - $220k."
      },
      {
        id: "versa-4",
        company: { display_name: "Cybernetic Research Group" },
        title: "Front-End Innovator (UI/UX)",
        location: { display_name: "San Francisco, CA" },
        description: "Build immersive, high-frequency operator interfaces. Your 13.13 MHz Cyan-Emerald aesthetic perfectly matches our upcoming product line."
      }
    ]
  };

  // ══════════════════════════════════════════════════════════════════════
  // 1. ATTEMPT OFFICIAL ADZUNA DB (IF BINDINGS EXIST)
  // ══════════════════════════════════════════════════════════════════════
  if (appId && appKey) {
    try {
      const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/${where}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(what)}&content-type=application/json`;
      const response = await fetch(adzunaUrl);
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const mappedResults = data.results.map((job) => ({
            id: `adzuna-${job.id}`,
            company: { display_name: job.company?.display_name || "Unknown Company" },
            title: job.title.replace(/<\/?[^>]+(>|$)/g, ""),
            location: { display_name: job.location?.display_name || "Remote" },
            description: job.description?.replace(/<\/?[^>]+(>|$)/g, "") || "No description provided.",
            redirect_url: job.redirect_url
          }));
          return NextResponse.json({ results: mappedResults });
        }
      }
      console.warn("Adzuna API authorization failed or returned empty, triggering sovereign fallbacks.");
    } catch (error) {
      console.warn("Adzuna soft-fail:", error.message);
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 2. SOVEREIGN PUBLIC FALLBACKS: THE MUSE, REMOTIVE & ARBEITNOW
  // ══════════════════════════════════════════════════════════════════════
  console.log(`Initiating Sovereign Scrape Protocol for: "${what}"`);
  let aggregatedRealJobs = [];

  try {
    // Fetch Remotive (Max 50 jobs, filter locally)
    const remotivePromise = fetch('https://remotive.com/api/remote-jobs?limit=50')
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);

    // Fetch Arbeitnow
    const arbeitPromise = fetch('https://www.arbeitnow.com/api/job-board-api')
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);

    // Fetch The Muse - Wide Burst (Pages 1 to 5) for massive brick-and-mortar coverage
    const museP1 = fetch('https://www.themuse.com/api/public/jobs?page=1&descending=true').then(res => res.ok ? res.json() : null).catch(() => null);
    const museP2 = fetch('https://www.themuse.com/api/public/jobs?page=2&descending=true').then(res => res.ok ? res.json() : null).catch(() => null);
    const museP3 = fetch('https://www.themuse.com/api/public/jobs?page=3&descending=true').then(res => res.ok ? res.json() : null).catch(() => null);
    const museP4 = fetch('https://www.themuse.com/api/public/jobs?page=4&descending=true').then(res => res.ok ? res.json() : null).catch(() => null);
    const museP5 = fetch('https://www.themuse.com/api/public/jobs?page=5&descending=true').then(res => res.ok ? res.json() : null).catch(() => null);

    const [remotiveData, arbeitData, mData1, mData2, mData3, mData4, mData5] = await Promise.all([
      remotivePromise, arbeitPromise, museP1, museP2, museP3, museP4, museP5
    ]);

    const kw = (what || 'technology').toLowerCase();

    // Parse The Muse (Highly comprehensive local / global corporate listings)
    [mData1, mData2, mData3, mData4, mData5].forEach(mData => {
      if (mData && mData.results) {
        let mJobs = mData.results;
        if (what && kw !== 'technology') {
          mJobs = mJobs.filter(j => 
            (j.name || '').toLowerCase().includes(kw) || 
            (j.contents || '').toLowerCase().includes(kw)
          );
        }
        mJobs.forEach(j => {
          aggregatedRealJobs.push({
            id: `muse-${j.id || Math.random()}`,
            company: { display_name: j.company?.name || "Corporate Enterprise" },
            title: j.name || "Professional Role",
            location: { display_name: j.locations?.[0]?.name || "On-site / Remote" },
            description: (j.contents || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300) + '...',
            redirect_url: j.refs?.landing_page || '#'
          });
        });
      }
    });

    // Parse Remotive
    if (remotiveData && remotiveData.jobs) {
      let rJobs = remotiveData.jobs;
      if (what && kw !== 'technology') {
        rJobs = rJobs.filter(j => 
          j.title.toLowerCase().includes(kw) || 
          (j.description || '').toLowerCase().includes(kw) ||
          j.category?.toLowerCase().includes(kw)
        );
      }
      rJobs.forEach(j => {
        aggregatedRealJobs.push({
          id: `remotive-${j.id}`,
          company: { display_name: j.company_name || "Tech Organization" },
          title: j.title,
          location: { display_name: j.candidate_required_location || "Remote" },
          description: (j.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300) + '...',
          redirect_url: j.url
        });
      });
    }

    // Parse Arbeitnow
    if (arbeitData && arbeitData.data) {
      let aJobs = arbeitData.data;
      if (what && kw !== 'technology') {
        aJobs = aJobs.filter(j => 
          j.title.toLowerCase().includes(kw) || 
          (j.description || '').toLowerCase().includes(kw)
        );
      }
      aJobs.forEach(j => {
        aggregatedRealJobs.push({
          id: `arbeit-${j.slug || Math.random()}`,
          company: { display_name: j.company_name || "Innovator" },
          title: j.title,
          location: { display_name: j.location || "Worldwide" },
          description: (j.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300) + '...',
          redirect_url: j.url
        });
      });
    }

    if (aggregatedRealJobs.length > 0) {
      // Deduplicate results
      const seen = new Set();
      const deduped = aggregatedRealJobs.filter(job => {
        const key = `${job.title}-${job.company.display_name}`.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return NextResponse.json({ results: deduped.slice(0, 20) });
    }

  } catch (fallbackErr) {
    console.error("Sovereign job scrape failed:", fallbackErr);
  }

  // ══════════════════════════════════════════════════════════════════════
  // 3. FINAL HARD-CODED MÜN SYNTHETIC FALLBACK
  // ══════════════════════════════════════════════════════════════════════
  return NextResponse.json(syntheticLeads);
}
