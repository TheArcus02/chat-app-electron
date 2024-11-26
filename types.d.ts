export {};

declare global {
  interface User {
    id: string;
    name: string;
    isOnline: boolean;
  }

  interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
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
