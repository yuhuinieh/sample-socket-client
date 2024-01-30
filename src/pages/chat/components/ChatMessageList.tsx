import { useContext } from 'react';
import { SockectContext } from '@/contexts/SockectContext';
import { ChatMessageType } from '@/types/socket.type';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type ChatMessageItemProps = {
  data: ChatMessageType;
};
const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ data }) => {
  const { username, nickname, message, created_at } = data;
  return (
    <li>
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          <Avatar>
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {nickname}
              <span className="ml-1 truncate text-sm text-gray-500 dark:text-gray-400">
                ({username})
              </span>
            </div>
          </div>

          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {message}
          </div>
        </div>
      </div>
    </li>
  );
};

const ChatMessageList: React.FC = () => {
  const { chatMessages } = useContext(SockectContext);

  return (
    <ul className="grid w-full gap-y-6">
      {chatMessages.map((data, key) => (
        <ChatMessageItem key={data.id} data={data} />
      ))}
    </ul>
  );
};

export default ChatMessageList;
