import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './views/login.tsx';
import ChatList from './components/chat-list.tsx';
import AuthWrapper from './components/wrappers/auth-wrapper.tsx';
import Chat from './views/chat.tsx';
import GlobalWrapper from './components/wrappers/global-wrapper.tsx';
import Dashboard from './views/dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalWrapper />}>
          <Route path='/' element={<Login />} />
          <Route element={<AuthWrapper />}>
            <Route path='dashboard' element={<Dashboard />}>
              <Route index element={<ChatList />} />
              <Route path='chat/:id' element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
