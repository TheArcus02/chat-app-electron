import { useParams } from 'react-router';
import { useChatContext } from '../context/chat-context';
import { useMemo } from 'react';

const Chat = () => {
  const { id: userId } = useParams();
  const { chatMessages: allChatMessages } = useChatContext();

  const chatMessages = useMemo(() => {
    return allChatMessages.filter(
      (message) => message.senderID === userId,
    );
  }, [allChatMessages, userId]);

  return (
    <div>
      {chatMessages.map((message) => (
        <div key={message.content + message.senderID}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
