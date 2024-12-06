export {};

declare global {
  interface User {
    userID: string;
    username: string;
  }

  type MessageType = 'connect' | 'chat' | 'connect_response';

  interface Message {
    type: MessageType;
    senderID: string;
    content?: string;
    recipientID?: string;
  }
  interface ConnectResponse extends Message {
    type: 'connect_response';
    userID: string;
    userList: User[];
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
