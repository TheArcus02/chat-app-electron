import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';
import { getPreloadPath } from './path-resolver.js';
import * as net from 'net';

let socket: net.Socket;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }

  console.log('Trying to connect to the server...');
  const SERVER_HOST = 'localhost';
  const SERVER_PORT = 8080;
  socket = new net.Socket();

  socket.connect(SERVER_PORT, SERVER_HOST, () => {
    console.log('Connected to the server!');
  });

  socket.on('data', (data) => {
    console.log('Received data:', data.toString());
    handleServerResponse(data, mainWindow);
  });

  socket.on('error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('close', () => {
    console.log('Connection closed');
  });
});

app.on('before-quit', () => {
  socket.end();
});

function handleServerResponse(data: Buffer, window: BrowserWindow) {
  try {
    const jsonData = JSON.parse(data.toString()) as Message;

    switch (jsonData.type) {
      case 'connect_response':
        const parsedContent = JSON.parse(jsonData.content as any);

        const connectResponse = {
          ...jsonData,
          content: parsedContent,
        } as ConnectResponse;

        ipcWebContentsSend(
          'connection-status',
          window.webContents,
          connectResponse
        );
        break;
      case 'chat':
        ipcWebContentsSend(
          'chat-message',
          window.webContents,
          jsonData as ChatMessage
        );
        break;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}

ipcMain.on('connect-user-to-server', (event, username: string) => {
  const message: ConnectToServerMessage = {
    type: 'connect',
    senderID: '',
    content: username,
  };
  socket.write(JSON.stringify(message));
});
