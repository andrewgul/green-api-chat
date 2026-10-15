import { Link, Navigate, Outlet } from 'react-router';
import { useChatsStore } from '../stores/chats';
import { Button } from './button';
import { useCredentialsStore } from '../stores/credentials';
import { openModal } from '../stores/modals';
import { CreateChatModal } from './create-chat-modal';
import { Input } from './input';

export const ChatLayout = () => {
  const credentials = useCredentialsStore(({ credentials }) => credentials);
  const chats = useChatsStore(({ chats }) => chats);

  const openCreateChatModal = () => {
    openModal(<CreateChatModal />);
  };

  if (!credentials) {
    return <Navigate to="/start" />;
  }

  return (
    <div className="w-screen min-h-screen bg-(--background-primary) flex">
      <div className="bg-(--background-secondary) w-screen sm:w-[393px]">
        <div className="p-md flex justify-between items-center p-4 ">
          <h1 className="text-lg text-(--text-primary)">Чаты</h1>
          <Button className="size-8 flex items-center justify-center" onClick={openCreateChatModal}>
            +
          </Button>
        </div>
        <div className="px-4 pb-4">
          <Input placeholder="Поиск" />
        </div>
        {chats.length > 0 ? (
          <div className="pt-2">
            {chats.map((chat) => (
              <Link
                className="block w-full p-4 h-16 bg-(--background-tertiary)"
                to={`/chat/${chat.id}`}
                key={chat.id}
              >
                <span className="text-md text-(--text-primary)">{chat.phone}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="text-sm py-4 text-(--text-tertiary) text-center">Пока нет чатов</div>
          </div>
        )}
      </div>
      <div className="grow flex">
        <Outlet />
      </div>
    </div>
  );
};
