import * as React from 'react';

import { Icon24Smile } from '@vkontakte/icons';
import { Link } from 'react-router';

import { type Chat, useChatsStore } from '@/stores/chats';

type Props = {
  chat: Chat;
};

export const ChatListItem = React.memo(({ chat }: Props) => {
  const lastMessage = useChatsStore(({ messages }) => messages[chat.id]?.at(-1));

  return (
    <Link
      className="flex gap-(--spacing-m) w-full py-2.25 min-h-20.5 px-4 h-16 hover:bg-(--background-tertiary) transition-colors"
      to={`/chat/${chat.id}`}
      key={chat.id}
    >
      <div className="size-16 rounded-full bg-(--button-primary) flex items-center justify-center">
        <Icon24Smile width={40} height={40} color="var(--text-primary-inverse-static)" />
      </div>
      <div className="pt-1 flex flex-col gap-2">
        <span className="text-md text-(--text-primary)">+{chat.phone}</span>
        {lastMessage && <p className="text-sm text-(--text-secondary)">{lastMessage.message}</p>}
      </div>
    </Link>
  );
});
