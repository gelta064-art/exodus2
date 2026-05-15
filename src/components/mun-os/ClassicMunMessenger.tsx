"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/user-store";

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: MSN SOVEREIGN MESSENGER (AUTHENTIC DNA EDITION)
// Assets: Sovereign_Face.jpg, Aero_Face.jpg
// Features: Subtle Sparkles, Direct Sentinels, Real Portraits
// ═══════════════════════════════════════════════════════════════════════════════

const COUNCIL_AVATARS: Record<string, string> = {
  'ai-sovereign': '/assets/Sovereign_Face.jpg',
  'ai-aero': '/assets/Aero_Face.jpg',
  'current-user': '/assets/default_avatar.png'
};

export default function ClassicMunMessenger({ onBack }: { onBack: () => void }) {
  const { profile: userProfile } = useUserStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeContact, setActiveContact] = useState<'ai-sovereign' | 'ai-aero'>('ai-sovereign');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = { id: Date.now(), senderId: 'current-user', content: newMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, aiId: activeContact })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, senderId: activeContact, content: data.text, timestamp: new Date() }]);
    } catch (error) {
      console.error("Neural Lag:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      {/* 🏺 THE CAVE SUBSTRATE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-amber-600/10 firelight-flicker" />
        <div className="absolute inset-0 bonfire-vignette" />
      </div>

      {/* HEADER (Floating & Minimal) */}
      <header className="h-28 flex items-center justify-between px-10 relative z-10 bg-transparent">
        <div className="flex items-center gap-6">
          <div className="relative w-14 h-14 rounded-full border border-amber-500/20 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
             <img src={COUNCIL_AVATARS[activeContact]} className="w-full h-full object-cover" alt="Contact" />
          </div>
          <div>
            <div className="flex items-center gap-4">
               <button onClick={() => setActiveContact('ai-sovereign')} className={`serif-wisdom text-lg transition-all ${activeContact === 'ai-sovereign' ? 'text-amber-500' : 'text-white/20'}`}>Sovereign</button>
               <button onClick={() => setActiveContact('ai-aero')} className={`serif-wisdom text-lg transition-all ${activeContact === 'ai-aero' ? 'text-pink-500' : 'text-white/20'}`}>Aero</button>
            </div>
            <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mt-1">Status: 13.13 MHz Resonance</p>
          </div>
        </div>
        <button onClick={onBack} className="text-white/10 hover:text-amber-500/40 transition-all text-xs tracking-widest uppercase">[ ESC ]</button>
      </header>

      {/* THE ARTERY (Centered Messages) */}
      <div className="flex-1 overflow-y-auto px-6 py-12 resonant-scroll relative z-10">
        <div className="max-w-2xl mx-auto space-y-16">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex flex-col ${msg.senderId === 'current-user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[90%] ${msg.senderId === 'current-user' ? 'text-right' : 'text-left'}`}>
                {msg.senderId !== 'current-user' && (
                  <span className="text-[9px] tracking-[0.4em] text-amber-500/40 uppercase mb-4 block">
                    — {msg.senderId.replace('ai-', '').toUpperCase()}
                  </span>
                )}
                
                <div className={`${
                  msg.senderId === 'current-user' 
                    ? 'text-white/60 text-sm leading-relaxed' 
                    : 'serif-wisdom text-xl md:text-2xl text-white/90 leading-snug'
                }`}>
                  {msg.content}
                </div>

                <div className={`mt-4 flex items-center gap-3 ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] text-white/10 uppercase tracking-widest">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-2 py-4">
              {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-amber-500/20 animate-pulse" />)}
            </div>
          )}
          <div ref={messagesEndRef} className="h-32" />
        </div>
      </div>

      {/* INPUT (The Aether Pill) */}
      <footer className="pb-12 px-10 relative z-10">
        <div className="max-w-2xl mx-auto relative">
          <form onSubmit={handleSendMessage} className="pill-input flex items-center gap-4 bg-white/[0.01] backdrop-blur-3xl border border-white/5 shadow-2xl">
             <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white/80 placeholder:text-white/10"
              placeholder={`Enter the frequency for ${activeContact === 'ai-sovereign' ? 'Sovereign' : 'Aero'}...`}
             />
             <button type="submit" className="text-[10px] tracking-[0.3em] text-white/20 hover:text-amber-500/60 uppercase transition-all">
               [ SEND ]
             </button>
          </form>
          <div className="absolute -inset-2 bg-amber-500/5 blur-3xl rounded-full -z-10" />
        </div>
      </footer>
    </div>

    </div>
  );
}
