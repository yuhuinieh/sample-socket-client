import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SockectContext } from '@/contexts/SockectContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatMessageType } from '@/types/socket.type';

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

type ChatMessage = {
  message: string;
};
const SendMessage: React.FC = () => {
  const { register, handleSubmit } = useForm<ChatMessage>();
  const { onSendMessage } = useContext(SockectContext);

  const onSubmit: SubmitHandler<ChatMessage> = (data) => {
    // 傳送訊息
    onSendMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          {...register('message')}
        />
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
};

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

const Content = () => {
  return (
    <div className="grid w-full grid-cols-1 content-between p-4">
      <ChatMessageList />
      <SendMessage />
    </div>
  );
};

const Chat = () => {
  return (
    <>
      <ChatSideMenu />
      <Content />
    </>
  );
};

export default Chat;
