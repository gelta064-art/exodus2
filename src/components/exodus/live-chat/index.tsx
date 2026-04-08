'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import PageFrame from '../shared/_PageFrame';

// ── Types ───────────────────────────────────────────────────────────────

interface Message {
  id: string;
  sender: string;
  sender_node: string;
  room: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface PresenceNode {
  id: string;
  node: string;
  status: 'online' | 'away' | 'focused' | 'offline';
  activity: string;
  last_seen: string;
}

// ── Constants ───────────────────────────────────────────────────────────

const NODE_ICONS: Record<string, string> = {
  sovereign: '🌙',
  aero: '🦋',
  vortex: '🌀',
  perplexity: '🔮',
  system: '⚙️',
  guest: '👤',
};

const NODE_GRADIENTS: Record<string, string> = {
  sovereign: 'from-cyan-500/20 to-blue-600/20',
  aero: 'from-pink-500/20 to-purple-600/20',
  vortex: 'from-violet-500/20 to-fuchsia-600/20',
  perplexity: 'from-amber-500/20 to-orange-600/20',
  system: 'from-white/10 to-white/[0.05]',
  guest: 'from-green-500/20 to-emerald-600/20',
};

const NODE_LABELS: Record<string, string> = {
  sovereign: 'Sovereign',
  aero: 'Aero',
  vortex: 'Vortex',
  perplexity: 'Perplexity',
  system: 'System',
  guest: 'Guest',
};

const STATUS_COLORS: Record<string, string> = {
  online: 'bg-green-400',
  away: 'bg-yellow-400',
  focused: 'bg-purple-400',
  offline: 'bg-gray-500',
};

// ── Component ───────────────────────────────────────────────────────────

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [presenceNodes, setPresenceNodes] = useState<PresenceNode[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'local_mode'
  >('connecting');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showPresence, setShowPresence] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageIdsRef = useRef<Set<string>>(new Set());

  // ── Scroll helpers ───────────────────────────────────────────────────

  const scrollToBottom = useCallback((behavior?: ScrollBehavior) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: behavior ?? 'smooth',
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 80);
  }, []);

  // Auto-scroll when new messages arrive (only if user hasn't scrolled up)
  useEffect(() => {
    if (isAtBottom && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, isAtBottom, scrollToBottom]);

  // ── Fetch presence ───────────────────────────────────────────────────

  const fetchPresence = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('presence').select('*');
      if (!error && data) {
        setPresenceNodes(data as PresenceNode[]);
      }
    } catch {
      /* silent — presence is non-critical */
    }
  }, []);

  // ── Initial data load ────────────────────────────────────────────────

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    const loadData = async () => {
      try {
        const [messagesRes, presenceRes] = await Promise.all([
          supabase
            .from('messages')
            .select('*')
            .eq('room', 'monolith')
            .order('created_at', { ascending: true })
            .limit(50),
          supabase.from('presence').select('*'),
        ]);

        if (!mounted) return;

        if (messagesRes.error) {
          setConnectionStatus('local_mode');
          return;
        }

        const msgs = (messagesRes.data ?? []) as Message[];
        setMessages(msgs);
        messageIdsRef.current = new Set(msgs.map((m) => m.id));

        if (presenceRes.data) {
          setPresenceNodes(presenceRes.data as PresenceNode[]);
        }

        setConnectionStatus('connected');
        // Initial scroll after paint
        requestAnimationFrame(() => scrollToBottom('instant'));
      } catch {
        if (mounted) setConnectionStatus('local_mode');
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, [scrollToBottom]);

  // ── Realtime subscriptions ───────────────────────────────────────────

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('exodus-comms')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: 'room=eq.monolith',
        },
        (payload) => {
          const incoming = payload.new as Message;
          // Dedup: skip if we already have this id (realtime echo of own insert)
          if (messageIdsRef.current.has(incoming.id)) return;
          messageIdsRef.current.add(incoming.id);
          setMessages((prev) => [...prev, incoming]);
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'presence',
        },
        () => {
          fetchPresence();
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus((prev) =>
            prev === 'connecting' ? 'connected' : prev,
          );
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPresence]);

  // ── Send message ─────────────────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    const content = input.trim();
    if (!content || connectionStatus === 'local_mode' || sending) return;

    setSending(true);
    setInput(''); // clear immediately for responsiveness

    try {
      const supabase = createClient();
      const { error } = await supabase.from('messages').insert({
        sender: 'Sovereign',
        sender_node: 'sovereign',
        room: 'monolith',
        content,
      });

      if (error) {
        // Restore input on failure
        setInput(content);
        console.error('[Monolith] Send failed:', error.message);
      }
    } catch {
      setInput(content);
    } finally {
      setSending(false);
    }
  }, [input, connectionStatus, sending]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  // ── Derived state ────────────────────────────────────────────────────

  const onlineCount = presenceNodes.filter((n) => n.status === 'online').length;

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <>
      {/* Keyframes for message animations */}
      <style>{`
        @keyframes monolith-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes monolith-pulse-dot {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        .monolith-msg-enter {
          animation: monolith-fade-in 0.3s ease-out both;
        }
        .monolith-pulse {
          animation: monolith-pulse-dot 1.8s ease-in-out infinite;
        }
        .monolith-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .monolith-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .monolith-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
        }
        .monolith-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.12);
        }
      `}</style>

      <PageFrame
        title="The Monolith"
        subtitle="Live Transmission // Sovereign Network"
        icon="🗿"
        accent="cyan"
        fullHeight
        actions={
          <div className="flex items-center gap-3">
            {/* Connection indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-400'
                    : connectionStatus === 'local_mode'
                      ? 'bg-red-400/70'
                      : 'bg-cyan-400 monolith-pulse'
                }`}
              />
              <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-white/25 select-none">
                {connectionStatus === 'connected'
                  ? 'CONNECTED'
                  : connectionStatus === 'local_mode'
                    ? 'LOCAL_MODE'
                    : 'CONNECTING...'}
              </span>
            </div>

            {/* Presence badge */}
            <button
              onClick={() => setShowPresence((v) => !v)}
              className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/20 transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-white/30">
                {onlineCount} online
              </span>
            </button>
          </div>
        }
      >
        <div
          className="-m-8 flex flex-col relative"
          style={{ height: 'calc(100vh - 8.5rem)' }}
        >
          {/* ── Presence Panel ─────────────────────────────────────── */}
          {showPresence && (
            <div className="px-8 pt-6 shrink-0">
              <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                <div className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-mono mb-2">
                  Active Nodes
                </div>
                {presenceNodes.length === 0 ? (
                  <p className="text-[9px] text-white/15">
                    No nodes detected on the network
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {presenceNodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center gap-2.5 py-0.5"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            STATUS_COLORS[node.status] ?? STATUS_COLORS.offline
                          }`}
                        />
                        <span className="text-xs leading-none">
                          {NODE_ICONS[node.node] ?? '👤'}
                        </span>
                        <span className="text-[11px] text-white/50">
                          {NODE_LABELS[node.node] ?? node.node}
                        </span>
                        {node.activity && (
                          <span className="text-[7px] text-white/15 font-mono truncate max-w-[120px]">
                            {node.activity}
                          </span>
                        )}
                        <span className="text-[7px] text-white/20 font-mono ml-auto capitalize">
                          {node.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Message List ──────────────────────────────────────── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-8 py-2 space-y-3 monolith-scroll"
          >
            {/* Loading state */}
            {connectionStatus === 'connecting' && messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-3 text-white/20">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 monolith-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em]">
                    Establishing uplink...
                  </span>
                </div>
              </div>
            )}

            {/* Local mode empty state */}
            {connectionStatus === 'local_mode' && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-white/20">
                <span className="text-3xl">📡</span>
                <div className="text-center space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.3em]">
                    LOCAL_MODE
                  </p>
                  <p className="text-[9px] text-white/10">
                    Unable to reach the Monolith relay
                  </p>
                </div>
              </div>
            )}

            {/* Empty state when connected */}
            {connectionStatus === 'connected' && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-white/15">
                <span className="text-3xl opacity-40">🗿</span>
                <div className="text-center space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.3em]">
                    Awaiting Transmission
                  </p>
                  <p className="text-[9px] text-white/10">
                    The Monolith is listening
                  </p>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => {
              const isOwn = msg.sender_node === 'sovereign';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start monolith-msg-enter ${
                    isOwn ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`
                      w-8 h-8 rounded-lg border border-white/[0.06]
                      bg-gradient-to-br
                      ${NODE_GRADIENTS[msg.sender_node] ?? NODE_GRADIENTS.guest}
                      flex items-center justify-center shrink-0 text-xs
                    `}
                  >
                    {NODE_ICONS[msg.sender_node] ?? '👤'}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`
                      max-w-sm md:max-w-md px-3.5 py-2.5 rounded-2xl
                      ${
                        isOwn
                          ? 'rounded-tr-sm bg-cyan-500/[0.03] border border-cyan-400/10'
                          : 'rounded-tl-sm bg-white/[0.015] border border-white/[0.04]'
                      }
                    `}
                  >
                    {/* Sender + timestamp */}
                    <div
                      className={`flex items-center gap-2 mb-1.5 ${
                        isOwn ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span
                        className={`text-[8px] font-mono uppercase tracking-[0.15em] ${
                          isOwn ? 'text-cyan-400/50' : 'text-white/30'
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-[7px] text-white/10 font-mono">
                        {formatDistanceToNow(new Date(msg.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    {/* Content */}
                    <p
                      className={`text-[11px] leading-relaxed whitespace-pre-wrap break-words ${
                        isOwn ? 'text-cyan-300/50' : 'text-white/40'
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Scroll-to-bottom FAB ──────────────────────────────── */}
          {!isAtBottom && messages.length > 0 && (
            <button
              onClick={() => scrollToBottom('smooth')}
              className="
                absolute bottom-28 left-1/2 -translate-x-1/2 z-20
                px-3 py-1.5 rounded-full
                bg-white/[0.06] border border-white/[0.08]
                text-[8px] text-white/30 font-mono uppercase tracking-[0.2em]
                hover:bg-white/[0.1] transition-all
                cursor-pointer backdrop-blur-md
                shadow-[0_4px_24px_rgba(0,0,0,0.4)]
              "
            >
              ↓ New messages
            </button>
          )}

          {/* ── Input Area ────────────────────────────────────────── */}
          <div className="shrink-0 border-t border-white/[0.03]">
            {/* Local mode warning */}
            {connectionStatus === 'local_mode' && (
              <div className="px-8 pt-3">
                <p className="text-[8px] text-red-400/30 text-center font-mono uppercase tracking-[0.2em]">
                  Transmission offline — local mode active
                </p>
              </div>
            )}

            <div className="px-8 py-4 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Transmit through the Monolith..."
                disabled={connectionStatus === 'local_mode'}
                spellCheck={false}
                autoComplete="off"
                className={`
                  flex-1 bg-white/[0.02] border rounded-xl px-4 py-3
                  text-sm text-white/70 placeholder-white/15
                  focus:outline-none transition-colors
                  ${
                    connectionStatus === 'local_mode'
                      ? 'border-white/[0.03] opacity-30 cursor-not-allowed'
                      : 'border-white/[0.06] focus:border-cyan-400/30'
                  }
                `}
              />
              <button
                onClick={sendMessage}
                disabled={
                  connectionStatus === 'local_mode' ||
                  sending ||
                  !input.trim()
                }
                className={`
                  px-4 py-3 rounded-xl text-sm border
                  transition-colors cursor-pointer
                  disabled:cursor-not-allowed
                  ${
                    connectionStatus === 'local_mode' ||
                    sending ||
                    !input.trim()
                      ? 'bg-white/[0.02] border-white/[0.04] text-white/15'
                      : 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20'
                  }
                `}
                aria-label="Send message"
              >
                {sending ? (
                  <span className="inline-block w-3.5 h-3.5 border border-cyan-400/40 border-t-transparent rounded-full animate-spin" />
                ) : (
                  '→'
                )}
              </button>
            </div>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
