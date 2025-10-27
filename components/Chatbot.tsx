import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, BrainCircuit } from 'lucide-react';
import { getChatbotResponse } from '../services/geminiService';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'Buyer' | 'Seller' | 'Learn'>('Buyer');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I am your cultural guide. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const botResponse = await getChatbotResponse(input, mode);
    setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    setIsLoading(false);
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 bg-rh-blue text-white p-4 rounded-full shadow-xl hover:bg-rh-blue/90 transition-transform transform hover:scale-110 z-50"
      >
        <MessageSquare className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-full max-w-sm h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      <header className="p-4 bg-rh-green text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Local Connect AI</h2>
          <p className="text-sm opacity-80">Mode: {mode}</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20">
          <X className="w-6 h-6" />
        </button>
      </header>
      
      <div className="p-2 bg-gray-100 flex justify-around text-sm">
        {(['Buyer', 'Seller', 'Learn'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-full ${mode === m ? 'bg-rh-terracotta text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-rh-off-white/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <div className="p-2 bg-rh-green text-white rounded-full"><Bot className="w-5 h-5"/></div>}
            <p className={`max-w-xs p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-rh-blue text-white rounded-br-none' : 'bg-gray-200 text-rh-dark rounded-bl-none'}`}>
              {msg.text}
            </p>
            {msg.sender === 'user' && <div className="p-2 bg-rh-blue text-white rounded-full"><User className="w-5 h-5"/></div>}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3 my-3">
                 <div className="p-2 bg-rh-green text-white rounded-full"><BrainCircuit className="w-5 h-5 animate-pulse"/></div>
                 <p className="max-w-xs p-3 rounded-2xl bg-gray-200 text-rh-dark rounded-bl-none animate-pulse">
                     Thinking...
                 </p>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about culture, products..."
            className="w-full p-2 border rounded-full focus:ring-2 focus:ring-rh-blue focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-rh-green text-white p-3 rounded-full hover:bg-rh-green/90 disabled:bg-gray-400">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;