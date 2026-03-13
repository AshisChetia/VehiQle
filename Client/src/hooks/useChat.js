import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { sendMessage } from '../api/chatApi';

export function useChat() {
  const { messages, addMessage, clearMessages } = useContext(ChatContext);

  const send = async (content, vehicleId) => {
    const userMsg = {
      _id: `u_${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    addMessage(userMsg);

    const data = await sendMessage({ message: content, vehicleId });
    addMessage({
      _id: `a_${Date.now()}`,
      role: 'assistant',
      content: data.reply,
      createdAt: new Date().toISOString(),
    });
  };

  return { messages, send, clearMessages };
}