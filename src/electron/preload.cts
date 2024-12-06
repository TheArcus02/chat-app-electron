const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  connectUserToServer: (username) =>
    ipcSend('connect-user-to-server', username),
  sendChatMessage: (message) => ipcSend('send-message', message),
  subscribeConnectionStatus: (callback: (status: ConnectResponse) => void) => {
    return ipcOn('connection-status', (status) => callback(status));
  },
  subscribeChatMessages: (callback) => {
    return ipcOn('chat-message', (message) => callback(message));
  },
} satisfies Window['electron']);

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}
