import { useParams } from 'react-router';
import { useChatContext } from '../context/chat-context';
import { useEffect, useMemo, useRef } from 'react';
import { useUserListContext } from '../context/user-list-context';
import { cn } from '../lib/utils';
import { useAuth } from '../context/auth-context';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const chatInputSchema = z.object({
  inputMessage: z.string().nonempty(),
});

type ChatInputSchemaType = z.infer<typeof chatInputSchema>;

const Chat = () => {
  const { id: participantUserId } = useParams();
  const { chatMessages: allChatMessages, sendChatMessage } =
    useChatContext();
  const { getUser } = useUserListContext();
  const { user: currentUser } = useAuth();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatInputSchemaType>({
    resolver: zodResolver(chatInputSchema),
  });

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

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  function onSubmit(data: ChatInputSchemaType) {
    const { inputMessage } = data;
    if (!inputMessage || !participantUserId) return;
    sendChatMessage(participantUserId, inputMessage);
    reset();
  }

  return chatUser && currentUser ? (
    <>
      <div className='w-full'>
        <h1 className='text-2xl font-semibold'>
          Chat z {chatUser.username}
        </h1>
      </div>
      <div className='w-full flex-1 py-4 overflow-y-scroll max-h-[calc(100vh-100px)]'>
        {chatMessages.map((message, idx) => {
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
              ref={
                idx === chatMessages.length - 1
                  ? lastMessageRef
                  : null
              }
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
      <form
        className='w-full flex space-x-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='text'
          className='input input-bordered w-full'
          placeholder='Napisz wiadomość...'
          {...register('inputMessage')}
        />
        <button
          className='btn btn-primary btn-circle'
          type='submit'
          disabled={Object.keys(errors).length > 0}
        >
          <Send className='w-5 h-5 text-primary-content' />
        </button>
      </form>
    </>
  ) : (
    <div>User not found</div>
  );
};

export default Chat;
