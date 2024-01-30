import React, { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Socket, io } from 'socket.io-client';
import { isSocketConnectedAtom, socketAtom } from '@/states/socketAtom';
import { userAtom } from '@/states/userAtom';
import {
  ChatMessageType,
  OnlineUsersType,
  SocketEmitEventType,
  SocketEventType,
} from '@/types/socket.type';

const URL = 'http://127.0.0.1:3000';

type SocketContextType = {
  isConnected: boolean;
  socket: Socket | null;
  onlineUsers: OnlineUsersType[];
  chatMessages: ChatMessageType[];
  onSendMessage: (message: string) => void;
};

const initContextValue = {
  isConnected: false,
  socket: null,
  onlineUsers: [],
  chatMessages: [],
  onSendMessage: () => {},
};

export const SockectContext =
  React.createContext<SocketContextType>(initContextValue);

const SockectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useAtomValue(userAtom);
  const [socket, setSocket] = useAtom(socketAtom);
  const [isConnected, setIsConnected] = useAtom(isSocketConnectedAtom);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  const onConnect = () => {
    if (!socket) return;
    socket.emit(SocketEmitEventType.Subscribe, user?.uuid);
    setIsConnected(true);
  };

  const onDisconnect = () => setIsConnected(false);

  const onSendMessage = (message: string) => {
    if (!socket) return;
    socket.emit(SocketEmitEventType.SendMessage, message);
  };

  const handleEventOnlineUsers = (data: OnlineUsersType[]) => {
    setOnlineUsers(data);
  };

  const handleEventNewOnlineUsers = (data: OnlineUsersType) => {
    setOnlineUsers((current) => [...current, data]);
  };

  const handleEventAllMessages = (data: ChatMessageType[]) => {
    setChatMessages(data);
  };

  const handleEventNewMessages = (data: ChatMessageType) => {
    setChatMessages((current) => [...current, data]);
  };

  useEffect(() => {
    const socketio = io(URL, {
      transports: ['websocket'],
    });
    setSocket(socketio);

    return () => {
      setSocket(null);
      socketio.off(SocketEventType.Connect, onConnect);
      socketio.off(SocketEventType.Disconnect, onDisconnect);
      socketio.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !user) return;
    socket.connect();
    socket.on(SocketEventType.Connect, onConnect);
    socket.on(SocketEventType.OnlineUsers, handleEventOnlineUsers);
    socket.on(SocketEventType.NewOnlineUser, handleEventNewOnlineUsers);
    socket.on(SocketEventType.AllMessage, handleEventAllMessages);
    socket.on(SocketEventType.NewMessage, handleEventNewMessages);
    socket.on(SocketEventType.Disconnect, onDisconnect);
  }, [socket, user]);

  const ctx = useMemo(
    () => ({
      isConnected,
      socket,
      onlineUsers,
      chatMessages,
      onSendMessage,
    }),
    [isConnected, socket, onlineUsers, chatMessages, onSendMessage],
  );

  return (
    <SockectContext.Provider value={ctx}>{children}</SockectContext.Provider>
  );
};

export default SockectProvider;
