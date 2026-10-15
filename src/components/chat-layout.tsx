import { Link, Navigate, Outlet } from 'react-router';
import { useChatsStore } from '../stores/chats';
import { Button } from './button';
import { useCredentialsStore } from '../stores/credentials';
import { openModal } from '../modals';
import { CreateChatModal } from './create-chat-modal';

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
      <div className="bg-(--background-secondary) w-screen sm:w-">
        <div className="p-md flex justify-end p-4">
          <Button className="size-8 flex items-center justify-center" onClick={openCreateChatModal}>
            +
          </Button>
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
      <Outlet />
    </div>
  );
};
