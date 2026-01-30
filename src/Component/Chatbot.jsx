import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaRocketchat } from 'react-icons/fa';

const Chatbot = () => {
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
      const response = await fetch('https://ai2266.app.n8n.cloud/webhook/ae482a94-9f32-48d4-95cf-3b722d81bfd5', {
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
          className="w-18 h-18 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
          style={{ backgroundColor: '#2C5AA0' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <div className="flex flex-col items-center">
                <FaRocketchat className="text-3xl" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 text-white rounded-t-2xl flex items-center justify-between" style={{ backgroundColor: '#2C5AA0' }}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <FaRocketchat className="text-xl" style={{ color: '#2C5AA0' }} />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg">BnC AI Assistant</h3>
                <p className="font-geist text-blue-100 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: '#2C5AA0' }}>
                    <FaRocketchat className="text-white text-sm" />
                  </div>
                )}
                <div className={`max-w-xs p-3 rounded-2xl font-geist ${
                  message.type === 'user' 
                    ? 'text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                }`} style={message.type === 'user' ? { backgroundColor: '#2C5AA0' } : {}}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: '#2C5AA0' }}>
                  <FaRocketchat className="text-white text-sm" />
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
          <div className="p-4 bg-white rounded-b-2xl">
            <form onSubmit={handleSubmit} className="flex space-x-3 mb-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="w-12 h-12 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
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
                  className="font-geist px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-1 text-center text-gray-700"
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