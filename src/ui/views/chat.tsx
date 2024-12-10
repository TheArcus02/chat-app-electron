import { useParams } from 'react-router';
import { useChatContext } from '../context/chat-context';
import { useMemo, useState } from 'react';
import { useUserListContext } from '../context/user-list-context';
import { cn } from '../lib/utils';
import { useAuth } from '../context/auth-context';
import { Send } from 'lucide-react';

const Chat = () => {
  const { id: participantUserId } = useParams();
  const { chatMessages: allChatMessages, sendChatMessage } =
    useChatContext();
  const { getUser } = useUserListContext();
  const { user: currentUser } = useAuth();

  const [inputMessage, setInputMessage] = useState('');

  const chatUser = useMemo(
    () => getUser(participantUserId || ''),
    [getUser, participantUserId],
  );

  const chatMessages = useMemo(() => {
    return allChatMessages.filter(
      (message) =>
        (message.senderID === participantUserId &&
          message.recipientID === currentUser?.userID) ||
        (message.recipientID === participantUserId &&
          message.senderID === currentUser?.userID),
    );
  }, [allChatMessages, participantUserId]);

  function handleSendMessage() {
    if (!inputMessage || !participantUserId) return;
    setInputMessage('');
    sendChatMessage(participantUserId, inputMessage);
  }

  return chatUser && currentUser ? (
    <>
      <div className='w-full'>
        <h1 className='text-2xl font-semibold'>
          Chat with {chatUser.username}
        </h1>
      </div>
      <div className='w-full flex-1 overflow-y-scroll max-h-[calc(100vh-100px)]'>
        {chatMessages.map((message) => {
          const isSenderParticipant =
            message.senderID === participantUserId;
          const user = isSenderParticipant ? chatUser : currentUser;
          return (
            <div
              className={cn(
                'chat',
                isSenderParticipant ? 'chat-start' : 'chat-end',
              )}
              key={message.content + message.senderID}
            >
              <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS chat bubble component'
                    src={`https://ui-avatars.com/api/?name=${user.username.replace(/ /g, '+')}`}
                  />
                </div>
              </div>
              <div className='chat-header'>{user.username}</div>

              <div className='chat-bubble'>{message.content}</div>
            </div>
          );
        })}
      </div>
      <div className='w-full flex space-x-2'>
        <input
          type='text'
          className='input input-bordered w-full'
          placeholder='Type your message here...'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className='btn btn-primary btn-circle'
          onClick={handleSendMessage}
        >
          <Send className='w-5 h-5 text-primary-content' />
        </button>
      </div>
    </>
  ) : (
    <div>User not found</div>
  );
};

export default Chat;
