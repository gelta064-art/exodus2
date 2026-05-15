"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


const ArqLedger = dynamic(() => import('@/components/mun-os/ArqLedger'), { ssr: false });

export default function ArqLedgerPage() {

  return (
    <main className="min-h-screen bg-[#020205] relative">
      {/* 🛡️ FLOATING BACK HEADER */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/?warp=true">
          <div className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/70 border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] text-[10px] font-black tracking-[0.25em] text-white/60 hover:text-white transition-all backdrop-blur-lg cursor-pointer select-none">
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
            RETURN_TO_SANCTUARY
          </div>
        </Link>
      </div>

      <ArqLedger />
    </main>
  );
}
