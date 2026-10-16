import * as React from 'react';
import { Input } from '../../input';
import { Button } from '../../button';
import { createChat } from '../../../stores/chats';
import { closeModal } from '../../../stores/modals';
import { GreenApi } from '../../../lib/green-api';
import { useNavigate } from 'react-router';
import { FormField } from '../../form-field';
import { formatPhoneInput, PHONE_MIN_DIGITS } from '../../../lib/utils';

export const CreateChatModal = React.memo(() => {
  const [phone, setPhone] = React.useState('');
  const navigate = useNavigate();
  const [adding, setAdding] = React.useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const digits = phone.slice(1);

    if (adding || digits.length < PHONE_MIN_DIGITS) {
      return;
    }

    setAdding(true);

    try {
      const account = await GreenApi.checkAccount({
        phoneNumber: Number(digits),
      });

      if (account.success) {
        createChat({
          id: account.data.chatId,
          phone: account.data.phoneNumber,
        });

        navigate(`/chat/${account.data.chatId}`);
        closeModal();
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-w-96 bg-(--background-secondary) py-6 px-4 rounded-(--border-radius-common-l)">
      <div className="mb-4 text-header text-(--text-primary)">Новый чат</div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="Номер телефона" htmlFor="phone">
          <Input
            value={phone}
            onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
            placeholder="+79991234567"
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
          />
        </FormField>
        <Button disabled={adding} stretched>
          Добавить
        </Button>
      </form>
    </div>
  );
});
