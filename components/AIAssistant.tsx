
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap, MessageSquare, Terminal } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hello Commander. I am FFH4X Core AI. Need some professional strategies for your next match?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are an advanced gaming strategist for an app called FFH4X. You provide professional advice on aim settings, map strategies, character combinations, and tactical movement. Keep your tone futuristic, authoritative, and helpful for competitive players. Do not actually provide cheat codes, instead focus on "optimization" and "skill enhancement". Use technical gaming terms.',
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection lost. Please retry protocol synchronization." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "ERROR: Sync failed. The AI processor is under heavy load." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white mb-1">STRATEGIC <span className="text-cyan-400">COACH</span></h2>
          <p className="text-slate-400">Advanced AI tactical analysis for top-tier competitive play.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
           <Sparkles className="w-4 h-4 text-cyan-400" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Powered by Gemini v3</span>
        </div>
      </div>

      <div className="flex-1 glass-morphism rounded-[2rem] border-slate-800 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/30 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tactical Core: Online</span>
        </div>

        {/* Chat History */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] md:max-w-[70%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${m.role === 'ai' ? 'bg-cyan-600/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {m.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={`p-4 rounded-2xl ${m.role === 'ai' ? 'bg-slate-900/80 border border-slate-800 text-slate-200' : 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/10'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="flex gap-4 max-w-[70%]">
                <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-cyan-600/10 border border-cyan-500/30 text-cyan-400">
                  <Bot size={20} className="animate-bounce" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"></div>
                </div>
              </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-slate-900/40 border-t border-slate-800">
          <div className="relative flex items-center gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Request tactical optimization..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            </div>
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 shadow-lg shadow-cyan-900/20"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
