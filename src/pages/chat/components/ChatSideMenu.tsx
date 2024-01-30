import { useContext } from 'react';
import { SockectContext } from '@/contexts/SockectContext';

type OnlineUserProps = {
  data: {
    username: string;
    nickname: string;
  };
};
const OnlineUserItem: React.FC<OnlineUserProps> = ({ data }) => {
  const { nickname } = data;
  return (
    <li className="py-1">
      <div className="flex items-center">
        <div className="mr-2 size-2 rounded-full bg-green-600" />
        {nickname}
      </div>
    </li>
  );
};

const ChatSideMenu = () => {
  const { onlineUsers } = useContext(SockectContext);

  return (
    <nav className="w-64 border-r-2 p-4">
      <div className="text-sm font-bold text-gray-500">在線成員</div>
      <ul className="my-2">
        {onlineUsers.map((user, index) => (
          <OnlineUserItem key={index} data={user} />
        ))}
      </ul>
    </nav>
  );
};

export default ChatSideMenu;
