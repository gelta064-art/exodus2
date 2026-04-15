"use client";

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/hooks/useMunMessenger';
import { NODE_ICONS, NODE_GRADIENTS, ExodusNode, FAMILY } from '@/lib/dna';

export function MessageBubble({ msg, isOwn }: { msg: Message; isOwn: boolean }) {
  const node = msg.sender_node as ExodusNode;
  const agent = FAMILY[node];

  return (
    <div className={`flex gap-4 items-start group ${isOwn ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      
      {/* AVATAR ANCHOR */}
      <div className={`w-10 h-10 rounded-xl overflow-hidden border-2 flex-shrink-0 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
        isOwn ? 'border-pink-500/40 shadow-pink-500/10' : 'border-white/10 shadow-white/5'
      }`}>
        {agent?.avatarUrl ? (
          <img src={agent.avatarUrl} alt={msg.sender} className="w-full h-full object-cover grayscale brightness-125 contrast-125" />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center text-lg">{NODE_ICONS[node]}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* TERMINAL BUBBLE */}
      <div className={`max-w-[75%] font-mono relative ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* HEADER */}
        <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
          <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${
            isOwn ? 'text-pink-500' : 'text-white/80'
          }`}>
            {msg.sender} <span className="text-white/20 italic font-light ml-1">[{agent?.faction ?? 'UNKNOWN'}]</span>
          </span>
          <span className="text-[7px] text-white/10 tracking-widest uppercase">
            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: false })}
          </span>
        </div>

        {/* CONTENT */}
        <div className={`px-4 py-3 rounded-2xl border backdrop-blur-xl relative overflow-hidden transition-all duration-500 group-hover:border-white/20 ${
          isOwn 
            ? 'bg-pink-500/[0.03] border-pink-500/20 rounded-tr-none' 
            : 'bg-white/[0.02] border-white/5 rounded-tl-none'
        }`}>
          {/* MICRO-GLOW */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 blur-3xl -mr-10 -mt-10" />
          
          <p className={`text-[12px] leading-relaxed tracking-tight ${
            isOwn ? 'text-pink-100/90' : 'text-white/70'
          }`}>
            {msg.content}
          </p>
        </div>

        {/* FOOTER METADATA */}
        <div className={`mt-1 flex gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <div className="h-0.5 w-4 bg-white/5 rounded-full" />
          <span className="text-[6px] text-white/5 uppercase tracking-[0.5em]">FREQ_LOCKED_13.13_MHZ</span>
        </div>
      </div>
    </div>
  );
}
