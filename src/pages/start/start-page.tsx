import * as React from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../../components/input';
import { FormField } from '../../components/form-field';
import { Button } from '../../components/button';
import { setCredentials } from '../../stores/credentials';

export const StartPage = React.memo(() => {
  const [idInstance, setIdInstance] = React.useState('');
  const [apiTokenInstance, setApiTokenInstance] = React.useState('');
  const [subdomain, setSubdomain] = React.useState('');

  const isValid = idInstance.trim().length > 0 && apiTokenInstance.trim().length > 0;

  const navigate = useNavigate();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setCredentials(
      { idInstance, apiTokenInstance, ...(subdomain.length > 0 && { subdomain }) },
      { saveToSessionStorage: true },
    );
    navigate('/chat');
  };

  return (
    <div className="w-screen min-h-screen bg-(--background-primary) flex items-center justify-center">
      <form className="p-5 rounded-2xl bg-(--background-secondary)" onSubmit={handleSubmit}>
        <div className="mb-3">
          <h1 className="text-(--text-primary) text-lg">Добро пожаловать</h1>
          <h2 className="text-(--text-tertiary) text-md">
            Пожалуйста, введите данные от вашего аккаунта
          </h2>
        </div>
        <FormField label="idInstance *" htmlFor="idInstance">
          <Input
            value={idInstance}
            onChange={(event) => setIdInstance(event.target.value)}
            placeholder=" Введите idInstance"
            id="idInstance"
          />
        </FormField>
        <FormField label="apiTokenInstance *" htmlFor="apiTokenInstance">
          <Input
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
            type="password"
            placeholder="Введите apiTokenInstance"
            id="apiTokenInstance"
          />
        </FormField>
        <FormField label="subdomain" htmlFor="subdomain">
          <Input
            value={subdomain}
            onChange={(event) => setSubdomain(event.target.value)}
            placeholder="4100"
            id="subdomain"
          />
        </FormField>
        <div className="mt-6">
          <Button stretched disabled={!isValid} type="submit">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
});
