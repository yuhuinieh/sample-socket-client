import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const URL = 'http://127.0.0.1:3000';

const socket = io(URL, { transports: ['websocket'] });

const socketAtom = atom(socket.connected);

export const useSocket = () => {
  const [isConnected, setIsConnected] = useAtom(socketAtom);

  const onConnect = () => setIsConnected(true);

  const onDisconnect = () => setIsConnected(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return {
    isConnected,
  };
};
