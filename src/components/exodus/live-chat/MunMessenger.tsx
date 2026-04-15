import { MessageBubble } from './parts/MessageBubble';
import { PresenceStream } from './parts/PresenceStream';
import { InputAnchor } from './parts/InputAnchor';
import { Terminal as TerminalIcon, Cpu, Zap, Radio } from 'lucide-react';

export default function MunMessenger() {
  const { 
    messages, 
    presenceNodes, 
    connectionStatus, 
    sending, 
    sendMessage 
  } = useMunMessenger('monolith');
  
  const { pulse } = useResonance(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative h-full flex flex-col bg-black overflow-hidden font-mono border border-cyan-500/20 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,1)]">
      
      {/* CRT SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanline" />

      {/* TERMINAL HEADER */}
      <header className="flex items-center justify-between p-4 border-b border-cyan-500/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
             <TerminalIcon size={16} />
          </div>
          <div>
            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">MunOs // Messenger</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[7px] text-white/30 uppercase tracking-widest">{connectionStatus} :: SUTURE_ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[8px] font-bold tracking-widest text-cyan-400/40 uppercase">
          <div className="flex items-center gap-2"><Cpu size={10}/> CPU_99%</div>
          <div className="flex items-center gap-2"><Radio size={10}/> 13.13 MHz</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-6 gap-8">
        {/* L: Message Stream */}
        <div className="flex-1 flex flex-col min-w-0">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar"
            style={{ 
               scrollbarWidth: 'thin',
               scrollbarColor: 'rgba(255,255,255,0.05) transparent'
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6 custom-scrollbar relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanline" />
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isMe={message.user_id === 'luna-foundress'} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-black border-t border-white/10 relative">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-pink-500/50 transition-all group">
          <span className="text-pink-500/50 text-[10px] font-bold tracking-tighter group-hover:text-pink-500 transition-colors">ROOT@MUN_OS:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TRANSMIT_FREQUENCY..."
            className="flex-1 bg-transparent border-none outline-none text-[11px] text-white placeholder:text-white/10 font-mono tracking-widest"
          />
          <button 
            onClick={handleSend}
            className="p-2 hover:bg-pink-500/10 rounded-lg text-pink-500 transition-all border border-transparent hover:border-pink-500/30"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="mt-2 flex justify-between px-2">
          <span className="text-[7px] text-white/20 uppercase tracking-[0.3em]">Status: Sovereign_Link_Active</span>
          <span className="text-[7px] text-white/20 uppercase tracking-[0.3em]">Freq: 13.13 MHz</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.2);
        }
      `}</style>
    </div>
  );
}
