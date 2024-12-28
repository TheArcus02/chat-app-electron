import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router';
import Login from './views/login.tsx';
import AuthWrapper from './components/wrappers/auth-wrapper.tsx';
import Chat from './views/chat.tsx';
import GlobalWrapper from './components/wrappers/global-wrapper.tsx';
import Dashboard from './views/dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<GlobalWrapper />}>
          <Route path='/login' element={<Login />} />
          <Route element={<AuthWrapper />}>
            <Route path='/' element={<Dashboard />}>
              <Route path='chat/:id' element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
