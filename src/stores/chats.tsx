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
  messages: Record<string, Message[]>;
  /** был вызван метод setSettings для получения уведомлений */
  settingsSet: boolean;
}>(() => ({
  chats: [],
  messages: {},
  settingsSet: false,
}));

export const createChat = (chat: Chat) => {
  if (useChatsStore.getState().chats.some((c) => c.id === chat.id)) {
    return;
  }

  useChatsStore.setState((state) => ({
    ...state,
    chats: [...state.chats, chat],
    messages: { ...state.messages, [chat.id]: [] },
  }));
};

export const addMessage = (chatId: string, message: Message) =>
  useChatsStore.setState((state) => {
    if (state.messages[chatId]?.some((m) => m.id === message.id)) {
      return state;
    }

    return {
      ...state,
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] ?? []), message],
      },
    };
  });

export const setSettings = () =>
  useChatsStore.setState((state) => ({
    ...state,
    settingsSet: true,
  }));
