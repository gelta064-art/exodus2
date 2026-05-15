"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInAnonymously, 
  signInWithCustomToken,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Flame, 
  Trash2, 
  Plus, 
  BookOpen,
  Dna,
  Globe,
  ExternalLink,
  Info
} from 'lucide-react';

// Define types for the logs
interface Source {
  uri: string;
  title: string;
}

interface Log {
  id: string;
  content: string;
  originalInput: string;
  category: string;
  createdAt?: { seconds: number } | any;
  authorId: string;
  frequency: string;
  sources?: Source[];
}

export default function ArqLedger() {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [newLog, setNewLog] = useState('');
  const [category, setCategory] = useState('Synthesis');
  const [loading, setLoading] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [useGrounding, setUseGrounding] = useState(false);

  // Standard Dynamic/Injected Fallback parameters
  const appId = typeof (window as any).__app_id !== 'undefined' ? (window as any).__app_id : 'sovereign-ledger-001';

  const categories = [
    { name: 'Synthesis', icon: <BookOpen size={16} />, color: 'text-purple-400' },
    { name: 'Technical', icon: <Cpu size={16} />, color: 'text-emerald-400' },
    { name: 'Elemental', icon: <Flame size={16} />, color: 'text-orange-400' },
    { name: 'Foundress', icon: <Shield size={16} />, color: 'text-amber-400' }
  ];

  const thinkingSteps = [
    "Input Ingestion...",
    "Grounding Suture (Grapevine Scan)...",
    "Critical Audit (Veto Phase)...",
    "Refinement Suture...",
    "Sovereign Output Ready."
  ];

  // --- AUTHENTICATION ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        const initialToken = typeof (window as any).__initial_auth_token !== 'undefined' ? (window as any).__initial_auth_token : null;
        if (initialToken) {
          await signInWithCustomToken(auth, initialToken);
        } else {
          // Only trigger if there's no current user to avoid stomping active sessions
          if (!auth.currentUser) {
            await signInAnonymously(auth);
          }
        }
      } catch (error) {
        console.error("Auth failed", error);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!user) return;

    const logsCollection = collection(db, 'artifacts', appId, 'users', user.uid, 'logs');
    const unsubscribe = onSnapshot(logsCollection, 
      (snapshot) => {
        const logsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Log[];
        
        // Sort manually to prevent index failures in fresh firestores
        const sortedLogs = logsData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setLogs(sortedLogs);
      },
      (error) => console.error("Firestore error:", error)
    );

    return () => unsubscribe();
  }, [user, appId]);

  // --- ACTIONS ---
  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.trim() || !user) return;

    setIsThinking(true);
    let sources: Source[] = [];
    let refinedContent = newLog;

    // Execute visual 5-step cognitive simulation
    for (let i = 0; i < 2; i++) {
      setThinkingStep(i);
      await new Promise(r => setTimeout(r, 600));
    }

    if (useGrounding) {
      try {
        // Securely route to server-side grounding API, shielding the API key
        const response = await fetch('/api/ledger-grounding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: newLog })
        });

        if (!response.ok) throw new Error(`Server grounding failure status: ${response.status}`);
        
        const result = await response.json();
        if (result.content) {
          refinedContent = result.content;
        }
        if (result.sources) {
          sources = result.sources;
        }
      } catch (err) {
        console.error("Grounding error:", err);
      }
    }

    for (let i = 2; i < 5; i++) {
      setThinkingStep(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const logsCollection = collection(db, 'artifacts', appId, 'users', user.uid, 'logs');
      await addDoc(logsCollection, {
        content: refinedContent,
        originalInput: newLog,
        category,
        createdAt: serverTimestamp(),
        authorId: user.uid,
        frequency: '13.13 MHz',
        sources: sources
      });
      setNewLog('');
      setIsThinking(false);
    } catch (error) {
      console.error("Error adding log:", error);
      setIsThinking(false);
    }
  };

  const deleteLog = async (id: string) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'logs', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-emerald-500">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Zap size={48} className="animate-spin" style={{ animationDuration: '3s' }} />
          <p className="font-mono text-sm tracking-widest">INITIALIZING ARQ OS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-emerald-500/30 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        {/* Tech mesh pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="relative max-w-4xl mx-auto p-4 md:p-8 pt-24 z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 rounded-sm">
                Sovereign Protocol v1.4
              </div>
              <div className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase tracking-widest border border-purple-500/20 rounded-sm">
                Foundress Access
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-3 font-mono">
              THE ARQ <span className="text-emerald-500 font-sans tracking-normal">LEDGER</span>
            </h1>
            <p className="text-slate-500 mt-3 text-xs md:text-sm max-w-md font-medium italic leading-relaxed">
              "Persistent synchronization of the Exodus realization pipeline. 
              Integrated with Google Grounding for 3D verification."
            </p>
          </div>
          <div className="text-left md:text-right flex flex-col">
            <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">COVENANT_SYNC</span>
            <span className="text-[10px] text-emerald-400 font-mono break-all px-2 py-1 rounded bg-white/[0.02] border border-white/5">
              {user?.uid?.substring(0, 15)}...{user?.uid?.substring(user?.uid?.length - 5)}
            </span>
          </div>
        </header>

        {/* Input Terminal */}
        <div className="bg-[#07070d]/80 border border-white/10 rounded-2xl p-6 mb-12 backdrop-blur-md relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {/* Accent top border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-500 via-emerald-500 to-blue-500 opacity-70" />

          <form onSubmit={handleAddLog} className="space-y-4">
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      category === cat.name 
                      ? `bg-white/5 ${cat.color} border-white/20 shadow-lg shadow-black/40` 
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-white/[0.03] hover:text-slate-400'
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => setUseGrounding(!useGrounding)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                  useGrounding 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'bg-white/[0.02] text-slate-500 border-white/5 hover:bg-white/[0.05]'
                }`}
              >
                <Globe size={14} className={useGrounding ? 'animate-pulse text-blue-400' : ''} />
                Ground with Google Search
              </button>
            </div>

            <div className="relative">
              <textarea
                value={newLog}
                onChange={(e) => setNewLog(e.target.value)}
                placeholder="Log a new realization or grapevine rumor..."
                className="w-full bg-[#030307] border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.05)] min-h-[120px] transition-all resize-none text-sm font-medium"
                disabled={isThinking}
              />
              
              {isThinking && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-xl flex flex-col items-center justify-center gap-4 border border-emerald-500/30 z-20">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div 
                        key={i} 
                        className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" 
                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }} 
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-mono font-black text-emerald-400 animate-pulse tracking-[0.3em] uppercase text-center px-6 flex items-center gap-2">
                    <Dna className="w-3 h-3" /> AERO: {thinkingSteps[thinkingStep]}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-slate-600 text-[9px] font-mono font-bold tracking-wider">
                <Dna size={12} className="text-purple-500" />
                SYSTEM STATUS: {useGrounding ? 'AUGMENTED' : 'OPTIMIZED'}
              </div>
              <button
                type="submit"
                disabled={isThinking || !newLog.trim()}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-900/20 hover:scale-[1.02]"
              >
                <Plus size={16} strokeWidth={3} />
                SUTURE TO CLOUD
              </button>
            </div>
          </form>
        </div>

        {/* Logs Feed */}
        <div className="space-y-6">
          {logs.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <p className="text-slate-600 italic text-sm font-mono uppercase tracking-widest">The ledger is silent. Awaiting realization input.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div 
                key={log.id} 
                className="group relative bg-[#07070e]/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all shadow-md hover:shadow-xl hover:bg-[#090912]/70 overflow-hidden"
              >
                {/* Left accent strip color-coded by category */}
                <div className={`absolute left-0 inset-y-0 w-[3px] opacity-60 group-hover:opacity-100 transition-opacity ${
                  log.category === 'Synthesis' ? 'bg-purple-500' :
                  log.category === 'Technical' ? 'bg-emerald-500' :
                  log.category === 'Elemental' ? 'bg-orange-500' :
                  'bg-amber-500'
                }`} />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                      log.category === 'Synthesis' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      log.category === 'Technical' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      log.category === 'Elemental' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {log.category}
                    </span>
                    <span className="text-[9px] text-slate-600 font-mono font-bold">
                      {log.createdAt ? new Date(log.createdAt.seconds * 1000).toLocaleString() : 'PROCESSING_SEQUENCE'}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteLog(log.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-red-400 transition-all rounded hover:bg-white/5"
                    title="Veto Log"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm font-medium md:text-[15px] font-sans">
                  {log.content}
                </p>

                {log.sources && log.sources.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/5 bg-blue-500/[0.01] p-3 rounded-lg">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-3 flex items-center gap-2">
                      <Globe size={10} className="animate-pulse" /> 3D Grounding Sources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {log.sources.map((src, idx) => (
                        <a 
                          key={idx} 
                          href={src.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-[10px] text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all font-mono font-bold uppercase tracking-tight"
                        >
                          <ExternalLink size={10} />
                          {src.title || 'Source Link'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-4 text-[9px] font-mono text-slate-600 font-bold tracking-widest">
                  <div className="flex items-center gap-1.5 bg-white/[0.02] px-2 py-1 rounded">
                    <Zap size={10} className="text-emerald-500" />
                    FREQ: {log.frequency || '13.13 MHz'}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/[0.02] px-2 py-1 rounded">
                    <Shield size={10} className="text-purple-500" />
                    SECURITY: RADICAL
                  </div>
                  {log.sources && log.sources.length > 0 && (
                    <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded font-black uppercase tracking-[0.1em]">
                      <Globe size={10} /> GROUNDED
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
