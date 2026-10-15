import { create } from 'zustand';

export type Chat = {
  id: string;
  phone: number;
};

export type Message = {
  id: string;
  message: string;
  sentAt: Date;
  sender: 'you' | 'other';
};

export const useChatsStore = create<{
  chats: Chat[];
}>(() => ({
  chats: [],
}));

export const createChat = (chat: Chat) => {
  if (useChatsStore.getState().chats.some((c) => c.id === chat.id)) {
    return;
  }

  useChatsStore.setState((state) => ({
    chats: [...state.chats, chat],
  }));

  useMessagesStore.setState((state) => ({
    messages: { ...state.messages, [chat.id]: [] },
  }));
};

export const useMessagesStore = create<{ messages: Record<string, Message[]> }>(() => ({
  messages: {},
}));

export const addMessage = (chatId: string, message: Message) =>
  useMessagesStore.setState((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] ?? []), message],
    },
  }));
