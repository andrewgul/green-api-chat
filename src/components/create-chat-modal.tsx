import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { createChat } from '../stores/chats';
import { closeModal } from '../modals';
import { GreenApi } from '../lib/green-api';

export const CreateChatModal = React.memo(() => {
  const [phone, setPhone] = React.useState('');

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (phone.length !== 11) {
      return;
    }

    const account = await GreenApi.checkAccount({
      phone: Number(phone),
    });

    if (account) {
      createChat({
        id: account.chatId,
        phone: account.phoneNumber,
      });
    }

    closeModal();
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
        <Button stretched>Добавить</Button>
      </form>
    </div>
  );
});
