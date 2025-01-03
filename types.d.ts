export {};

declare global {
  interface User {
    userID: string;
    username: string;
  }

  type MessageType =
    | 'connect'
    | 'chat'
    | 'connect_response'
    | 'disconnect_response'
    | 'user_list_update'
    | 'disconnect';

  interface Message {
    type: MessageType;
    senderID: string;
    content?: string | Object;
    recipientID?: string;
  }
  interface ConnectResponse extends Message {
    type: 'connect_response';
    content: {
      userID: string;
      username: string;
      userList: User[];
    };
  }

  interface DisconnectResponse extends Message {
    type: 'disconnect_response';
    content: {
      userID: string;
      username: string;
    };
  }

  interface ChatMessage extends Message {
    type: 'chat';
    recipientID: string;
    content: string;
  }

  interface ConnectToServerMessage extends Message {
    type: 'connect';
    senderID: string;
    content: string;
  }

  interface DissconnectFromServerMessage extends Message {
    type: 'disconnect';
    senderID: string;
    content: string;
  }

  interface UserListUpdateMessage extends Message {
    type: 'user_list_update';
    content: {
      userList: User[];
    };
  }

  type UnsubscribeFunction = () => void;

  interface Window {
    electron: {
      connectUserToServer: (data: {
        host: string;
        username: string;
      }) => Promise<unknown>;
      disconnectUserFromServer: (user: User) => void;
      sendChatMessage: (message: ChatMessage) => void;
      subscribeConnectionStatus: (
        callback: (
          status: ConnectResponse | DisconnectResponse,
        ) => void,
      ) => UnsubscribeFunction;
      subscribeChatMessages: (
        callback: (message: ChatMessage) => void,
      ) => UnsubscribeFunction;
      subscribeUserListUpdate: (
        callback: (message: UserListUpdateMessage) => void,
      ) => UnsubscribeFunction;
    };
  }

  type EventPayloadMapping = {
    'connect-user-to-server': {
      host: string;
      username: string;
    };
    'disconnect-user-from-server': User;
    'connection-status': ConnectResponse | DisconnectResponse;
    'chat-message': ChatMessage;
    'send-message': ChatMessage;
    'connect-response': ConnectResponse;
    'user-list-update': UserListUpdateMessage;
  };

  // Old
  interface ChatSession {
    id: string;
    participants: User[];
    messages: Message[];
    lastUpdated: string;
  }

  interface ConnectionStatus {
    isConnected: boolean;
    lastChecked: string;
  }
}
