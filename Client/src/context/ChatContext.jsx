import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addMessage  = (msg)  => setMessages(prev => [...prev, msg]);
  const clearMessages = ()   => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}