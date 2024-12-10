import { Link, useParams } from 'react-router';
import { mockChatSessions, mockUsers } from '../mock/data'; 
const Chat = () => {
  const { id } = useParams();  
  const chatSession = mockChatSessions[0]

  if (!chatSession) {
    return <div>Sesja czatu nie została znaleziona.</div>;  
  }

  const { participants, messages } = chatSession;  

  return (
    <div>
      <h1>Chat: {id}</h1>
      <div>
        <h2>Participants:</h2>
        <ul>
          {participants.map(participant => {
            const userStatus = participant.isOnline ? 'Online' : 'Offline';
            return (
              <li key={participant.id}>
                {participant.name} - {userStatus}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2>Messages:</h2>
        <div>
          {messages.map(message => {
            const sender = mockUsers.find(user => user.id === message.senderId);
            return (
              <div key={message.id}>
                <p><strong>{sender?.name}:</strong> {message.content}</p>
                <p><small>{new Date(message.timestamp).toLocaleString()}</small></p>
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/">Back to Dashboard</Link> {/* Link do dashboard */}
    </div>
  );
};

export default Chat;
