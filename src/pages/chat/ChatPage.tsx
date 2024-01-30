import ChatMessageList from './components/ChatMessageList';
import ChatSideMenu from './components/ChatSideMenu';
import SendMessage from './components/SendMessage';

const ChatPage = () => {
  return (
    <>
      <ChatSideMenu />
      <div className="grid w-full grid-cols-1 content-between p-4">
        <ChatMessageList />
        <SendMessage />
      </div>
    </>
  );
};

export default ChatPage;
