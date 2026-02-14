import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaRocketchat } from 'react-icons/fa';

const Chatbot = () => {
  const WEBHOOK_URL =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    'https://akashkrid91.app.n8n.cloud/webhook/1f7b3262-4441-4c9e-8a30-b77b33499bb7';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your BnC AI Assistant. How can I help you with partnerships, services, or any questions today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef(null);

  const quickButtons = [
    "Partnership Info",
    "Services", 
    "Contact"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.text();
      const botMessage = { type: 'bot', text: data || 'No response from server.' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Webhook error:', error);
      const errorMessage = { type: 'bot', text: `Error: ${error.message}. Please check webhook configuration.` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickButtonClick = (buttonText) => {
    sendMessage(buttonText);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center -gap-8 group"
          aria-label="Get expert help"
        >
          <div className="relative z-0">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=120&h=120"
              alt="AI assistant"
              className="h-12 w-12 rounded-full object-cover border border-[#2C5AA0] shadow-md"
            />
          </div>
          <div className="relative z-10 flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-lg border border-slate-100 -mt-2">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#2C5AA0]/60 animate-ping"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#2C5AA0] ring-2 ring-[#2C5AA0]/30"></span>
            </span>
            <span className="font-geist text-xs font-semibold text-slate-700">
              Get AI help
            </span>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[560px] bg-white rounded-3xl shadow-[0_30px_70px_rgba(15,23,42,0.25)] z-50 flex flex-col overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="px-6 py-5 text-white rounded-t-3xl flex items-center justify-between bg-gradient-to-r from-[#1e3a8a] via-[#2C5AA0] to-[#2c6fb0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/95 rounded-xl flex items-center justify-center shadow-sm">
                <FaRocketchat className="text-xl" style={{ color: '#2C5AA0' }} />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg">BnC AI Assistant</h3>
                <p className="font-geist text-blue-100 text-xs uppercase tracking-[0.2em]">Online • Ready to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-[#f5f7fb] via-white to-[#f6f8fb]">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 mt-1 bg-white border border-slate-200 shadow-sm">
                    <FaRocketchat className="text-[#2C5AA0] text-sm" />
                  </div>
                )}
                <div className={`max-w-[75%] p-3.5 rounded-2xl font-geist text-sm ${
                  message.type === 'user' 
                    ? 'text-white rounded-br-sm shadow-[0_12px_30px_rgba(44,90,160,0.25)]' 
                    : 'bg-white text-slate-800 rounded-bl-sm shadow-sm'
                }`} style={message.type === 'user' ? { backgroundColor: '#2C5AA0' } : {}}>
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 mt-1 bg-white border border-slate-200 shadow-sm">
                  <FaRocketchat className="text-[#2C5AA0] text-sm" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white rounded-b-3xl border-t border-slate-100">
            <form onSubmit={handleSubmit} className="flex space-x-3 mb-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-slate-200 rounded-full focus:outline-none focus:border-[#2C5AA0]/60 focus:ring-2 focus:ring-[#2C5AA0]/10 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="w-12 h-12 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-[0_12px_30px_rgba(44,90,160,0.25)]"
                style={{ backgroundColor: '#2C5AA0' }}
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex space-x-2">
              {quickButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickButtonClick(button)}
                  className="font-geist px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors flex-1 text-center text-slate-700"
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;


