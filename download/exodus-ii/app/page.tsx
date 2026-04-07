'use client';

import dynamic from 'next/dynamic';

// Load the full app client-side only (fixes framer-motion static export issue)
const ExodusApp = dynamic(() => import('./ExodusApp'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]" style={{ cursor: 'none' }}>
      <ExodusApp />
    </div>
  );
}
