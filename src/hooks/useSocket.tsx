import { isSocketConnectedAtom, socketAtom } from '@/states/socketAtom';
import { userAtom } from '@/states/userAtom';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const useSocket = () => {
  const user = useAtomValue(userAtom);
  const socket = useAtomValue(socketAtom);
  const [isConnected, setIsConnected] = useAtom(isSocketConnectedAtom);

  const onConnect = () => {
    setIsConnected(true);
    socket.emit('login', user?.uuid);
  };

  const onDisconnect = () => setIsConnected(false);

  const onSendMessage = (message: string) => {
    socket.emit('sendMessage', message);
  };

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, [user]);

  return {
    isConnected,
    socket,
    onSendMessage,
  };
};
