import * as React from 'react';

import { useParams } from 'react-router';

import { GreenApi } from '@/lib/green-api';
import { addMessage, type Message as MessageType, useChatsStore } from '@/stores/chats';

import { ChatInput } from './components/chat-input';
import { Header } from './components/header';
import { Messages } from './components/messages';

const EMPTY_MESSAGES: MessageType[] = [];

export const ChatPage = React.memo(() => {
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const { chatId } = useParams<{ chatId: string }>();
  const chat = useChatsStore(({ chats }) => chats.find((chat) => chat.id === chatId));
  const messages = useChatsStore(({ messages }) =>
    chatId ? messages[chatId] || EMPTY_MESSAGES : EMPTY_MESSAGES,
  );

  const handleSend = async () => {
    if (!message.trim().length || !chatId) {
      return;
    }

    setSending(true);
    setMessage('');

    const response = await GreenApi.sendMessage({
      chatId,
      message,
    });

    if (response.success) {
      addMessage(chatId, {
        id: response.data.idMessage,
        message,
        sender: 'you',
        sentAt: new Date(),
      });
    }

    setSending(false);
  };

  if (!chat) {
    return;
  }

  return (
    <div className="w-full grow relative overflow-y-scroll flex flex-col">
      <Header phone={chat.phone} />
      <Messages messages={messages} />
      <ChatInput sending={sending} message={message} onChange={setMessage} onSend={handleSend} />
    </div>
  );
});
