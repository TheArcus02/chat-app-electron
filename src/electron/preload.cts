const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  connectUserToServer: (username) =>
    ipcSend('connect-user-to-server', username),
  disconnectUserFromServer: (user) =>
    ipcSend('disconnect-user-from-server', user),
  sendChatMessage: (message) => ipcSend('send-message', message),
  subscribeConnectionStatus: (callback) => {
    return ipcOn('connection-status', (status) => callback(status));
  },
  subscribeChatMessages: (callback) => {
    return ipcOn('chat-message', (message) => callback(message));
  },
  subscribeUserListUpdate: (callback) => {
    return ipcOn('user-list-update', (users) => callback(users));
  },
} satisfies Window['electron']);

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void,
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) =>
    callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key],
) {
  electron.ipcRenderer.send(key, payload);
}
