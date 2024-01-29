import { useSocket } from '@/hooks/useSocket';

const Chat = () => {
  // const user = useAtomValue(userAtom);
  const { isConnected } = useSocket();

  isConnected && console.log('系統已連線');

  return <div>Chat</div>;
};

export default Chat;
