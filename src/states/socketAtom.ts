import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { ChatMessageType } from '@/types/socket.type';

// const URL = 'http://127.0.0.1:3000';
// const socketio = io(URL, { transports: ['websocket'] });

export const socketAtom = atom<Socket | null>(null);
export const isSocketConnectedAtom = atom(false);

export const chatMessagesAtom = atom<ChatMessageType[]>([]);
