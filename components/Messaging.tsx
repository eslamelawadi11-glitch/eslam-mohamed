import React, { useState } from 'react';
import { Send, CheckCheck } from 'lucide-react';
import { Message, User, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MessagingProps {
  messages: Message[];
  currentUser: User;
  lang: Language;
}

export const Messaging: React.FC<MessagingProps> = ({ messages: initialMessages, currentUser, lang }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const t = TRANSLATIONS[lang];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: 'target', // Simplified
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.messages}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${isMe ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'} rounded-2xl px-4 py-3 shadow-sm`}>
                <p className="text-sm">{msg.content}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${isMe ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck size={14} className="opacity-80" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeMessage}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button 
            type="submit"
            className="p-2.5 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};