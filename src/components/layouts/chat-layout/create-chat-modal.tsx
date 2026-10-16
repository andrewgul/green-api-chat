import * as React from 'react';
import { Input } from '../../input';
import { Button } from '../../button';
import { createChat } from '../../../stores/chats';
import { closeModal } from '../../../stores/modals';
import { GreenApi } from '../../../lib/green-api';
import { useNavigate } from 'react-router';

export const CreateChatModal = React.memo(() => {
  const [phone, setPhone] = React.useState('');
  const navigate = useNavigate();
  const [adding, setAdding] = React.useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (adding) {
      return;
    }

    setAdding(true);

    if (phone.length !== 11) {
      return;
    }

    const account = await GreenApi.checkAccount({
      phoneNumber: Number(phone),
    });

    if (account.success) {
      createChat({
        id: account.data.chatId,
        phone: account.data.phoneNumber,
      });

      navigate(`/chat/${account.data.chatId}`);
      closeModal();
    }

    setAdding(false);
  };

  return (
    <div className="min-w-96 bg-(--background-secondary) py-6 px-4 rounded-xl">
      <div className="mb-4 text-md text-(--text-primary)">Новый чат</div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Телефон"
        />
        <Button disabled={adding} stretched>
          Добавить
        </Button>
      </form>
    </div>
  );
});
