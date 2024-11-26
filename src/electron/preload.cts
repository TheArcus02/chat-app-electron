const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  sendMessage: () => undefined,
  onMessageReceived: () => undefined,
});
