'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, ChevronRight } from 'lucide-react';

const SUGGESTIONS = [
  'What is your MOQ?',
  'How long is the lead time?',
  'Do you support OEM/ODM?',
  'What certifications do you have?',
];

const QUICK_REPLIES: Record<string, string> = {
  'What is your MOQ?': 'MOQ is confirmed after product selection, specifications, customization scope and order configuration. Please request a quotation for the applicable requirement.',
  'How long is the lead time?': 'Lead time, shipping method and export documentation are confirmed in your quotation after the product and order requirements are reviewed.',
  'Do you support OEM/ODM?': 'Discuss OEM/ODM availability, branding, packaging and product-modification requirements with our team. The available scope and order conditions are confirmed in your quotation.',
  'What certifications do you have?': 'Certification and compliance documentation vary by product and destination. Request the relevant product documentation before purchase or project approval.',
  'default': 'Thanks for reaching out. Share your product requirements and our team will review them. You can also reach HousePlus via WhatsApp +86 155 7811 9543.',
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi there! Welcome to HousePlus. I can help with quick questions about our products, MOQ, lead time, and certifications. What would you like to know?',
      sender: 'bot',
      time: getCurrentTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function handleSuggestionClick(suggestion: string) {
    const userMsg: Message = {
      id: Date.now(),
      text: suggestion,
      sender: 'user',
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const reply = QUICK_REPLIES[suggestion] || QUICK_REPLIES['default'];
      const botMsg: Message = {
        id: Date.now() + 1,
        text: reply,
        sender: 'bot',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  }

  function handleSend() {
    if (!inputValue.trim()) return;
    handleSuggestionClick(inputValue);
    setInputValue('');
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-slate-800 rotate-0' : 'bg-blue-600 hover:bg-blue-700'
        } ${showPulse && !isOpen ? 'animate-bounce' : ''}`}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">HousePlus Assistant</p>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                Online now
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-blue-100' : 'bg-blue-600'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User size={14} className="text-blue-600" />
                  ) : (
                    <Bot size={14} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Quick Questions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-700 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Send"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              Powered by HousePlus Global Trade
            </p>
          </div>
        </div>
      )}
    </>
  );
}
