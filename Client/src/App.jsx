import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import AppRoutes from './routes/AppRoutes';
import ChatWidget from './components/chat/ChatWidget';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
          <ChatWidget />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}