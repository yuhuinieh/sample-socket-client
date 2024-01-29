import { atom } from 'jotai';

export type User = {
  uuid: string;
  username: string;
  nickname: string;
};

export const userAtom = atom<User | null>(null);
