import { useParams } from 'react-router';
import { mockChatSessions } from '../mock/data';

const Chat = () => {
  const { id } = useParams();
  const mockChatSessionData = mockChatSessions[0];

  // ? Do zamkniecia chatu mozna uzyc przekierowania na dashboard czyli /
  // ? Przyklad:
  // ? navigate('/') z react-router
  // ? lub
  // ? <Link to='/' />

  // ? Fake dane mozna uzyc z mockChatSessionData
  // ? Przyklad:
  // ? mockChatSessionData.messages.map(...)
  // ? lub
  // ? mockChatSessionData.participants.map(...)
  return <div>Chat: {id}</div>;
};

export default Chat;
