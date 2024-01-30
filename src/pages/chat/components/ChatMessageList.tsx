import { useContext, useEffect, useRef } from 'react';
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
        <div>
          <div>
            {/* User */}
            <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {nickname}
              <span className="ml-1 truncate text-sm text-gray-500 dark:text-gray-400">
                ({username})
              </span>
              <span className="ml-1 text-xs text-gray-400">{created_at}</span>
            </div>
          </div>
          {/* Message */}
          <div className="mt-1 w-auto rounded-md bg-gray-100 px-3 py-2 text-base">
            {message}
          </div>
        </div>
      </div>
    </li>
  );
};

const ChatMessageList: React.FC = () => {
  const chatListEl = useRef<HTMLUListElement>(null);
  const { chatMessages } = useContext(SockectContext);

  const scrollToBottom = () => {
    const lastChildElement = chatListEl.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
    // chatListEl?.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log(chatListEl);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <ul className="grid w-full gap-y-6 overflow-auto" ref={chatListEl}>
      {chatMessages.map((data, key) => (
        <ChatMessageItem key={data.id} data={data} />
      ))}
    </ul>
  );
};

export default ChatMessageList;
