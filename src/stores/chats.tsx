import { create } from 'zustand';

type Chat = {
  id: string;
  phone: number;
};

export const useChatsStore = create<{
  chats: Chat[];
}>(() => ({
  chats: [],
}));

export const createChat = (chat: Chat) =>
  useChatsStore.setState((state) => ({
    chats: [...state.chats, chat],
  }));
