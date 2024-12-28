import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
  isDev,
} from './util.js';
import { getPreloadPath } from './path-resolver.js';
import * as net from 'net';

let socket: net.Socket;
let connectedUser: User;
let window: BrowserWindow;

app.on('ready', () => {
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    window.loadURL('http://localhost:5123');
  } else {
    window.loadFile(
      path.join(app.getAppPath() + '/dist-react/index.html'),
    );
  }
});

app.on('before-quit', () => {
  if (connectedUser && socket) {
    const disconnectMessage: DissconnectFromServerMessage = {
      type: 'disconnect',
      senderID: connectedUser.userID,
      content: connectedUser.username,
    };
    socket.write(JSON.stringify(disconnectMessage));
  }

  socket.end();
});

function handleServerResponse(data: Buffer) {
  try {
    const jsonData = JSON.parse(data.toString()) as Message;

    switch (jsonData.type) {
      case 'connect_response':
        const parsedContent = JSON.parse(jsonData.content as any);

        const connectResponse = {
          ...jsonData,
          content: parsedContent,
        } as ConnectResponse;

        connectedUser = {
          userID: parsedContent.userID,
          username: parsedContent.username,
        };

        ipcWebContentsSend(
          'connection-status',
          window.webContents,
          connectResponse,
        );
        break;
      case 'chat':
        ipcWebContentsSend(
          'chat-message',
          window.webContents,
          jsonData as ChatMessage,
        );
        break;
      case 'user_list_update':
        const userListUpdate = {
          ...jsonData,
          content: JSON.parse(jsonData.content as any),
        } as UserListUpdateMessage;

        ipcWebContentsSend(
          'user-list-update',
          window.webContents,
          userListUpdate,
        );
        break;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}

ipcMainHandle('connect-user-to-server', (data) => {
  console.log('[connect-user-to-server]: ', data);
  const { host, username } = data;
  const port = 8080;
  if (socket && !socket.destroyed) {
    console.log('Socket already connected');
    return;
  }

  console.log(
    `Trying to connect to ${host}:${port} as ${username}...`,
  );

  return new Promise((resolve, reject) => {
    socket = new net.Socket();

    socket.connect(port, host, () => {
      console.log('Connected to the server!');
      const message: ConnectToServerMessage = {
        type: 'connect',
        senderID: '',
        content: username,
      };
      socket.write(JSON.stringify(message));
      resolve(true);
    });

    socket.on('data', (data) => {
      console.log('Received data:', data.toString());
      handleServerResponse(data);
    });

    socket.on('error', (error) => {
      console.error('Connection error:', error);
      socket.destroy();
      resolve(false);
    });

    socket.on('close', () => {
      console.log('Connection closed');
      resolve(false);
    });
  });
});

ipcMainOn('send-message', (message) => {
  socket.write(JSON.stringify(message));
});

ipcMainOn('disconnect-user-from-server', (user) => {
  const message: DissconnectFromServerMessage = {
    type: 'disconnect',
    content: user.username,
    senderID: user.userID,
  };
  socket.write(JSON.stringify(message), () => {
    socket.end();
    console.log('Disconnected from the server');
  });
});
