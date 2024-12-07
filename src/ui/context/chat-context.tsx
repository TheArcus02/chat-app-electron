import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from './auth-context';

type ChatContextType = {
  sendChatMessage: (recepient: string, content: string) => void;
  chatMessages: Array<ChatMessage>;
};

const ChatContext = createContext<ChatContextType>({
  sendChatMessage: () => {},
  chatMessages: [],
});

export const ChatContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [chatMessages, setChatMessages] = useState<
    Array<ChatMessage>
  >([]);
  const { user } = useAuth();

  // ! This is just for debugging purposes
  console.log('chatMessages', chatMessages);

  useEffect(() => {
    if (!user) return;

    const unsub = window.electron.subscribeChatMessages((message) => {
      console.log('message', message);
      console.log('ids', message.recipientID, user.userID);
      if (message.recipientID !== user.userID) return;
      setChatMessages((prev) => [...prev, message]);
    });

    return unsub;
  }, [user]);

  function sendChatMessage(recepient: string, content: string) {
    if (!user) return;

    const message: ChatMessage = {
      type: 'chat',
      senderID: user.userID,
      recipientID: recepient,
      content,
    };

    window.electron.sendChatMessage(message);
    setChatMessages((prev) => [...prev, message]);
  }

  return (
    <ChatContext.Provider value={{ sendChatMessage, chatMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      'useChatContext must be used within a UserProvider',
    );
  }
  return context;
};
