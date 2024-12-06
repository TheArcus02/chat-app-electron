import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  connectUserToServer: (username: string) =>
    ipcRenderer.send('connect-user-to-server', username),
  sendChatMessage: (message: ChatMessage) =>
    ipcRenderer.send('send-message', message),
  subscribeConnectionStatus: (callback: (status: ConnectResponse) => void) => {
    ipcRenderer.on('connection-status', (_, status) => callback(status));
  },
  subscribeChatMessages: (callback: (message: ChatMessage) => void) => {
    ipcRenderer.on('chat-message', (_, message) => callback(message));
  },
});
