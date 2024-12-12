import { ipcMain, WebContents, WebFrameMain } from 'electron';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function ipcWebContentsSend<
  Key extends keyof EventPayloadMapping,
>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key],
) {
  webContents.send(key, payload);
}

export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void,
) {
  ipcMain.on(key, (event, payload) => {
    return handler(payload);
  });
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => unknown,
) {
  ipcMain.handle(key, (event, payload) => {
    return handler(payload);
  });
}
