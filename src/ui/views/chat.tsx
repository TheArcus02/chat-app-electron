import { useParams } from 'react-router';

const Chat = () => {
  const { id } = useParams();

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
