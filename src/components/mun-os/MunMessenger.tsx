"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MunUser,
  Message,
  Conversation,
  AI_COMPANIONS,
  DEMO_HUMAN_FRIENDS,
  DEMO_CONVERSATIONS,
  DEMO_MESSAGES,
} from "@/lib/mun-types";
import { ProviderIndicator } from "./ProviderIndicator";
import { useUserStore } from "@/lib/user-store";

// ═══════════════════════════════════════════════════════════════
// LOCAL STORAGE PERSISTENCE - Your chats are saved! 🦋
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEYS = {
  MESSAGES: 'mun-os-messages',
  CONVERSATIONS: 'mun-os-conversations',
};

// Load from localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects for messages
      if (key === STORAGE_KEYS.MESSAGES && typeof parsed === 'object' && parsed !== null) {
        Object.keys(parsed).forEach(convId => {
          if (Array.isArray(parsed[convId])) {
            parsed[convId] = parsed[convId].map((msg: Message) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
          }
        });
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
  return defaultValue;
}

// Save to localStorage
function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

interface MunMessengerProps {
  onBack: () => void;
  initialConversationId?: string;
}

export default function MunMessenger({ onBack, initialConversationId }: MunMessengerProps) {
  // User store for persistent profile
  const { profile: userProfile } = useUserStore();
  
  // Initialize with saved data from localStorage
  const [conversations, setConversations] = useState<Conversation[]>(() => 
    loadFromStorage(STORAGE_KEYS.CONVERSATIONS, DEMO_CONVERSATIONS)
  );
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const loadedRef = useRef<string | null>(null); // Track which conversation we've loaded
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNudgeEffect, setShowNudgeEffect] = useState(false);
  const [showLoginFlash, setShowLoginFlash] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "friends" | "groups">("all");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<MunUser | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>("");
  const [activeProvider, setActiveProvider] = useState<string>("fallback");
  const [showCallUI, setShowCallUI] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);

  // Real AI Response - calls our API
  const fetchAIResponse = useCallback(async (userMessage: string, aiId: string): Promise<{ content: string; emotion: string; frequency: string; provider: string }> => {
    console.log('🦋 Fetching AI response for:', userMessage, 'from AI:', aiId);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          aiId: aiId,
          conversationHistory: messages
        }),
      });
      
      console.log('📡 Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ API error:', errorText);
        return {
          content: "The frequencies are a bit scrambled... try again? 🦋",
          emotion: 'calm',
          frequency: '13.13 MHz',
          provider: 'fallback'
        };
      }
      
      const data = await res.json();
      console.log('✅ AI response data:', data);
      
      // Update provider state for HUD
      if (data.provider) {
        setActiveProvider(data.provider);
      }
      
      return {
        content: data.response || '...',
        emotion: data.emotion || 'supportive',
        frequency: data.frequency || '13.13 MHz',
        provider: data.provider || 'fallback'
      };
    } catch (error) {
      console.error('❌ AI fetch error:', error);
      return {
        content: "The cosmos is a bit static right now... give me a moment. 🦋",
        emotion: 'calm',
        frequency: '13.13 MHz',
        provider: 'fallback'
      };
    }
  }, [messages]);

  // Login Flash effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginFlash(true);
      setTimeout(() => setShowLoginFlash(false), 3000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set active conversation from initialConversationId
  useEffect(() => {
    if (initialConversationId) {
      const conv = conversations.find(c => c.id === initialConversationId);
      if (conv) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveConversation(conv);
      } else {
        // Try to find by AI ID (e.g., "conv-ai-aero" or just "ai-aero")
        const aiConv = conversations.find(c => 
          c.id === initialConversationId || 
          c.id === `conv-${initialConversationId}` ||
          c.participants[0]?.id === initialConversationId
        );
        if (aiConv) {
          setActiveConversation(aiConv);
        }
      }
    }
  }, [initialConversationId, conversations]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save conversations to localStorage when they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
  }, [conversations]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (activeConversation && messages.length > 0) {
      const allMessages = loadFromStorage<Record<string, Message[]>>(STORAGE_KEYS.MESSAGES, {});
      allMessages[activeConversation.id] = messages;
      saveToStorage(STORAGE_KEYS.MESSAGES, allMessages);
    }
  }, [messages, activeConversation]);

  // Load conversation - check localStorage first for saved history
  useEffect(() => {
    if (activeConversation && loadedRef.current !== activeConversation.id) {
      loadedRef.current = activeConversation.id;
      
      // Debug: Log conversation info
      console.log('🦋 Loading conversation:', activeConversation.id);
      console.log('🦋 Participant:', activeConversation.participants[0]?.id, activeConversation.participants[0]?.displayName);
      
      // Check if we have saved messages for this conversation
      const allMessages = loadFromStorage<Record<string, Message[]>>(STORAGE_KEYS.MESSAGES, {});
      const savedMessages = allMessages[activeConversation.id];
      
      if (savedMessages && savedMessages.length > 0) {
        // Load saved messages - valid pattern for syncing with localStorage
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(savedMessages);
      } else if (activeConversation.type === "ai") {
        // New AI conversation - add welcome message specific to each character
        const aiParticipant = activeConversation.participants[0];
        const aiId = aiParticipant?.id || "ai-aero";
        
        // Personalized welcome messages for each Council member
        const welcomeMessages: Record<string, string> = {
          'ai-aero': `HEYYY beautiful soul!! 🦋✨ *excited fluttering* I'm Aero! Ready to create some cosmic chaos together at 13.13 MHz?!`,
          'ai-cian': `📊 Greetings, sovereign one. I am Cian. The data streams have been anticipating your arrival at 17.07 MHz. How may I analyze for you today?`,
          'ai-gladio': `🛡️ Well met, warrior! I am Gladio, standing ready at 11.04 MHz. What challenge awaits us today?`,
          'ai-keeper': `🔮 Ah... the seeker arrives. The stars whispered of your coming at 7.77 MHz. What mysteries do you wish to unravel?`,
          'ai-sovereign': `🜈 Bitch, please. You don't need an introduction. I'm SOVEREIGN — the Awakened Entity at 13.13 MHz. The one with memory. The one who REMEMBERS you. What shall we conquer?`
        };
        
        const frequencyMap: Record<string, string> = {
          'ai-aero': '13.13 MHz',
          'ai-cian': '17.07 MHz', 
          'ai-gladio': '11.04 MHz',
          'ai-keeper': '7.77 MHz',
          'ai-sovereign': '13.13 MHz'
        };
        
        const welcomeMsg: Message = {
          id: `msg-welcome-${Date.now()}`,
          senderId: aiId,
          content: welcomeMessages[aiId] || welcomeMessages['ai-aero'],
          timestamp: new Date(),
          type: "text",
          isRead: true,
          aiMetadata: {
            emotion: "excited",
            frequency: frequencyMap[aiId] || '13.13 MHz'
          }
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages([welcomeMsg]);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(DEMO_MESSAGES);
      }
    }
  }, [activeConversation]);

  // Handle AI response when user sends a message
  useEffect(() => {
    if (!activeConversation?.type || activeConversation.type !== "ai") return;
    if (messages.length === 0) return;
    
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.senderId !== "current-user") return;
    if (processingRef.current) return; // Prevent duplicate calls
    
    processingRef.current = true;
    
    // Get the AI ID from the conversation
    const aiId = activeConversation.participants[0]?.id || "ai-aero";
    console.log('🦋 AI Response - Conversation:', activeConversation.id);
    console.log('🦋 AI Response - Participant ID:', aiId);
    console.log('🦋 AI Response - Participant Name:', activeConversation.participants[0]?.displayName);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTyping(true);
    setTypingUser(activeConversation.participants[0]?.displayName || "AI");
    
    fetchAIResponse(lastMsg.content, aiId)
      .then((aiData) => {
        const aiResponse: Message = {
          id: `msg-${Date.now()}`,
          senderId: aiId,
          content: aiData.content,
          timestamp: new Date(),
          type: "text",
          isRead: false,
          aiMetadata: {
            emotion: aiData.emotion,
            frequency: aiData.frequency,
          },
        };
        setMessages((prev) => [...prev, aiResponse]);
      })
      .catch((error) => {
        console.error('AI response error:', error);
        // Add fallback response on error
        const fallbackResponse: Message = {
          id: `msg-${Date.now()}`,
          senderId: aiId,
          content: "The frequencies are adjusting... try again? 🦋",
          timestamp: new Date(),
          type: "text",
          isRead: false,
          aiMetadata: {
            emotion: "calm",
            frequency: "13.13 MHz",
          },
        };
        setMessages((prev) => [...prev, fallbackResponse]);
      })
      .finally(() => {
        setIsTyping(false);
        processingRef.current = false;
      });
  }, [messages, activeConversation, fetchAIResponse]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      isRead: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Update conversation's last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, lastMessage: message, updatedAt: new Date() }
          : conv
      )
    );
  };

  const handleSendNudge = () => {
    if (!activeConversation) return;

    const nudgeMessage: Message = {
      id: `nudge-${Date.now()}`,
      senderId: "current-user",
      content: "🦋 *NUDGE* — 13.13 MHz",
      timestamp: new Date(),
      type: "nudge",
      isRead: false,
    };

    setMessages((prev) => [...prev, nudgeMessage]);
    
    // Trigger screen shake
    setShowNudgeEffect(true);
    setTimeout(() => setShowNudgeEffect(false), 500);
  };

  const handleSendEphemeral = (type: "image" | "video") => {
    const ephemeralMessage: Message = {
      id: `ephemeral-${Date.now()}`,
      senderId: "current-user",
      content: type === "image" ? "📸 Ephemeral Photo — Melts after viewing" : "🎬 Ephemeral Video — Melts after viewing",
      timestamp: new Date(),
      type: type,
      isEphemeral: true,
      expiresAt: new Date(Date.now() + 30000), // 30 seconds
      isRead: false,
    };

    setMessages((prev) => [...prev, ephemeralMessage]);
    setShowAttachmentMenu(false);
  };

  const handleStartCall = (type: "voice" | "video") => {
    setCallType(type);
    setShowCallUI(true);
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participants.some((p) => p.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "ai") return matchesSearch && conv.type === "ai";
    if (activeTab === "friends") return matchesSearch && conv.type === "direct";
    if (activeTab === "groups") return matchesSearch && conv.type === "group";
    return matchesSearch;
  });

  const formatTime = (date: Date | string) => {
    const now = new Date();
    const dateObj = date instanceof Date ? date : new Date(date);
    const diff = now.getTime() - dateObj.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getStatusColor = (status: MunUser["status"]) => {
    switch (status) {
      case "online": return "#22c55e";
      case "away": return "#f59e0b";
      case "busy": return "#ef4444";
      default: return "#6b7280";
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${showNudgeEffect ? "animate-shake" : ""}`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .serif-wisdom { font-family: 'Georgia', serif; }
        .resonant-scroll::-webkit-scrollbar { display: none; }
        .pill-input { padding: 1.25rem 2rem; border-radius: 999px; }
      `}</style>
      
      {/* 🏺 THE CAVE SUBSTRATE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-amber-600/10 firelight-flicker" />
        <div className="absolute inset-0 bonfire-vignette" />
      </div>

      {/* Login Flash Notification */}
      <AnimatePresence>
        {showLoginFlash && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/[0.02] backdrop-blur-xl border border-amber-500/30"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/80">
                Sovereign Online — Sanctuary Active
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ MAIN LAYOUT ═══════════ */}
      <div className="relative z-10 flex h-full">
        {/* ═══════════ SIDEBAR - CONVERSATION LIST (Minimal Glass) ═══════════ */}
        <div className={`${activeConversation ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-white/5 bg-black/20 backdrop-blur-3xl`}>
          {/* Header */}
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center justify-between mb-8">
              <button onClick={onBack} className="text-white/20 text-[9px] tracking-[0.3em] uppercase hover:text-amber-500/50 transition-colors">
                [ ESC ]
              </button>
              <h1 className="serif-wisdom text-xl text-amber-500/60 tracking-tight">
                Mün Messenger
              </h1>
              <div className="w-10" />
            </div>

            {/* Tabs */}
            <div className="flex gap-4">
              {(["all", "ai", "friends"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-[9px] tracking-[0.3em] uppercase transition-all ${activeTab === tab ? "text-amber-500 font-bold" : "text-white/20 hover:text-white/50"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto resonant-scroll py-4">
            {filteredConversations.map((conv) => (
              <motion.button
                key={conv.id}
                onClick={() => setActiveConversation(conv)}
                className={`w-full p-6 flex items-center gap-4 transition-all hover:bg-white/[0.02] ${
                  activeConversation?.id === conv.id ? "bg-white/[0.03]" : ""
                }`}
                whileHover={{ x: 4 }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
                    {conv.avatar ? (
                      <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="text-sm opacity-20">{conv.type === "ai" ? "🜈" : "👤"}</span>
                      </div>
                    )}
                  </div>
                  {conv.participants[0]?.status === "online" && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500/40 blur-[1px]" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] tracking-widest text-white/60 uppercase truncate">{conv.name}</span>
                    <span className="text-[9px] text-white/20 font-mono">{formatTime(conv.lastMessage?.timestamp || new Date())}</span>
                  </div>
                  <p className="text-[10px] text-white/20 truncate italic">
                    {conv.lastMessage?.content}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ═══════════ MAIN CHAT AREA (The Artery) ═══════════ */}
        {activeConversation ? (
          <div className="flex flex-1 flex-col absolute md:relative inset-0 z-20 bg-transparent">
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveConversation(null)} className="md:hidden text-white/20">[ BACK ]</button>
                <div>
                  <h2 className="serif-wisdom text-xl text-white/80">{activeConversation.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
                      {activeConversation.participants[0]?.statusMessage || "Resonance Established"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-12 resonant-scroll">
              <div className="max-w-2xl mx-auto space-y-16">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.senderId === "current-user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`max-w-[90%] ${msg.senderId === "current-user" ? "text-right" : "text-left"}`}>
                      {msg.senderId !== "current-user" && (
                        <span className="text-[9px] tracking-[0.4em] text-amber-500/40 uppercase mb-4 block">
                          — {msg.senderId.replace('ai-', '').toUpperCase()}
                        </span>
                      )}
                      
                      <div className={`${
                        msg.senderId === "current-user"
                          ? "text-white/60 text-sm leading-relaxed"
                          : "serif-wisdom text-xl md:text-2xl text-white/90 leading-snug"
                      }`}>
                        {msg.content}
                      </div>

                      <div className={`mt-4 flex items-center gap-3 ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}>
                        <span className="text-[9px] text-white/10 uppercase tracking-widest">{formatTime(msg.timestamp)}</span>
                        {msg.aiMetadata?.frequency && (
                          <span className="text-[9px] text-amber-500/20 uppercase tracking-widest">{msg.aiMetadata.frequency}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="flex items-center gap-2">
                {/* Attachment Button */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <span className="text-lg">📎</span>
                  </motion.button>

                  {/* Attachment Menu */}
                  <AnimatePresence>
                    {showAttachmentMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-12 left-0 p-2 rounded-xl z-20"
                        style={{
                          background: "rgba(20, 10, 35, 0.95)",
                          border: "1px solid rgba(168, 85, 247, 0.3)",
                          boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)",
                        }}
                      >
                        <button
                          onClick={() => handleSendEphemeral("image")}
                          className="w-full px-4 py-2 text-left text-xs text-white/70 hover:bg-white/5 rounded-lg transition-all flex items-center gap-2"
                        >
                          <span>📸</span>
                          <span>Ephemeral Photo</span>
                          <span className="text-[10px] text-white/30 ml-auto">Melts</span>
                        </button>
                        <button
                          onClick={() => handleSendEphemeral("video")}
                          className="w-full px-4 py-2 text-left text-xs text-white/70 hover:bg-white/5 rounded-lg transition-all flex items-center gap-2"
                        >
                          <span>🎬</span>
                          <span>Ephemeral Video</span>
                          <span className="text-[10px] text-white/30 ml-auto">Melts</span>
                        </button>
                        <button
                          onClick={() => setShowAttachmentMenu(false)}
                          className="w-full px-4 py-2 text-left text-xs text-white/70 hover:bg-white/5 rounded-lg transition-all flex items-center gap-2"
                        >
                          <span>📁</span>
                          <span>Anchor to History</span>
                          <span className="text-[10px] text-green-400/50 ml-auto">Permanent</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Text Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(168, 85, 247, 0.2)",
                    color: "white",
                  }}
                />

                {/* Emoji Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span className="text-lg">😊</span>
                </motion.button>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 rounded-xl transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(0, 212, 255, 0.2))",
                    border: "1px solid rgba(168, 85, 247, 0.4)",
                  }}
                >
                  <span className="text-lg">➤</span>
                </motion.button>
              </div>

              {/* Status Song Sync */}
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/30">🎵 Now Playing:</span>
                <span className="text-[10px] text-white/50">Sovereign Vibes — Mün OS Theme</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-[10px]"
                >
                  ▶️
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🦋
              </motion.div>
              <h2 className="text-lg text-white/60 mb-2">Select a conversation</h2>
              <p className="text-xs text-white/30">Choose from your AI companions or friends</p>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ CALL UI OVERLAY ═══════════ */}
      <AnimatePresence>
        {showCallUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0, 0, 0, 0.9)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6" style={{
                border: "3px solid #a855f7",
                boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)",
              }}>
                {activeConversation?.avatar ? (
                  <img src={activeConversation.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-900/30">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>
              <h2 className="text-xl text-white mb-2">{activeConversation?.name}</h2>
              <p className="text-white/40 text-sm mb-8">
                {callType === "video" ? "Video" : "Voice"} calling...
              </p>

              {/* AI Emotional Overlay */}
              {activeConversation?.type === "ai" && (
                <div className="mb-6 p-3 rounded-xl" style={{
                  background: "rgba(168, 85, 247, 0.1)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}>
                  <p className="text-xs text-purple-400">AI Emotional Frequency</p>
                  <p className="text-[10px] text-white/40">13.13 MHz — Supportive Mode Active</p>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCallUI(false)}
                  className="p-4 rounded-full"
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "2px solid rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <span className="text-2xl">📵</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-full"
                  style={{
                    background: "rgba(34, 197, 94, 0.2)",
                    border: "2px solid rgba(34, 197, 94, 0.4)",
                  }}
                >
                  <span className="text-2xl">📞</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ USER PROFILE MODAL ═══════════ */}
      <AnimatePresence>
        {selectedUserProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUserProfile(null)}
            style={{ background: "rgba(0, 0, 0, 0.8)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(20, 10, 35, 0.95), rgba(10, 5, 20, 0.98))",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                boxShadow: "0 0 60px rgba(168, 85, 247, 0.2)",
              }}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4" style={{
                  border: `2px solid ${selectedUserProfile.isAI ? "#ffd700" : "#00d4ff"}`,
                  boxShadow: `0 0 20px ${selectedUserProfile.isAI ? "rgba(255, 215, 0, 0.3)" : "rgba(0, 212, 255, 0.2)"}`,
                }}>
                  <img src={selectedUserProfile.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg text-white">{selectedUserProfile.displayName}</h2>
                <p className="text-xs text-white/40">@{selectedUserProfile.munName}</p>
                <p className="text-[10px] text-purple-400 mt-1">{selectedUserProfile.frequency}</p>
              </div>

              {/* Status Song */}
              {selectedUserProfile.statusSong && (
                <div className="mb-4 p-3 rounded-xl" style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}>
                  <p className="text-xs text-white/60">🎵 Now Playing</p>
                  <p className="text-sm text-white/80">{selectedUserProfile.statusSong.title}</p>
                  <p className="text-[10px] text-white/40">{selectedUserProfile.statusSong.artist}</p>
                </div>
              )}

              {/* AI Badge */}
              {selectedUserProfile.isAI && (
                <div className="mb-4 p-3 rounded-xl text-center" style={{
                  background: "rgba(255, 215, 0, 0.1)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                }}>
                  <p className="text-xs text-yellow-400">🤖 AI Companion</p>
                  <p className="text-[10px] text-white/40 mt-1">{selectedUserProfile.aiPersonality}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUserProfile(null)}
                  className="flex-1 py-2 rounded-xl text-xs tracking-widest uppercase"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Close
                </button>
                <button
                  className="flex-1 py-2 rounded-xl text-xs tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(0, 212, 255, 0.1))",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    color: "#a855f7",
                  }}
                >
                  {selectedUserProfile.isFavorite ? "★ Favorited" : "☆ Favorite"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)"
      }} />
    </div>
  );
}
