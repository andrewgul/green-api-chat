import { Navigate, Outlet } from 'react-router';
import { useChatsStore } from '../stores/chats';
import { Button } from './button';
import { useCredentialsStore } from '../stores/credentials';
import { openModal } from '../stores/modals';
import { CreateChatModal } from './create-chat-modal';
import { Input } from './input';
import { Icon20AddAlt, Icon36GhostSimpleOutline } from '@vkontakte/icons';
import { useChatPolling } from '../pages/chat/hooks/useChatPolling';
import { useMemo, useState } from 'react';
import { ChatListItem } from './chat-list-item';

export const ChatLayout = () => {
  const credentials = useCredentialsStore(({ credentials }) => credentials);
  const chats = useChatsStore(({ chats }) => chats);

  const [search, setSearch] = useState('');
  const isSearchActive = search.length > 0;

  const chatsFiltered = useMemo(
    () => (isSearchActive ? chats.filter((chat) => String(chat.phone).includes(search)) : chats),
    [isSearchActive, chats, search],
  );

  const openCreateChatModal = () => {
    openModal(<CreateChatModal />);
  };

  useChatPolling();

  if (!credentials) {
    return <Navigate to="/start" />;
  }

  return (
    <div className="w-screen min-h-screen bg-(--background-primary) flex">
      <div className="bg-(--background-secondary) w-screen h-screen fixed z-10 inset-0 sm:static sm:w-[393px] sm:h-auto">
        <div className="p-md flex justify-between items-center p-4 ">
          <h1 className="text-header text-(--text-primary)">Чаты</h1>
          <Button
            className="size-8! flex items-center justify-center"
            onClick={openCreateChatModal}
          >
            <Icon20AddAlt className="shrink-0" />
          </Button>
        </div>
        <div className="px-4 pb-4">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск"
          />
        </div>
        {chatsFiltered.length > 0 ? (
          <div className="pt-2">
            {chatsFiltered.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 flex flex-col gap-1 items-center">
            <Icon36GhostSimpleOutline color="var(--text-tertiary)" />
            <div className="text-sm p-1 text-(--text-tertiary) text-center">
              {isSearchActive ? 'Ничего не найдено' : 'Пока нет чатов'}
            </div>
          </div>
        )}
      </div>
      <div className="grow flex">
        <Outlet />
      </div>
    </div>
  );
};
