import { useCredentialsStore } from '../stores/credentials';

const apiUrl = 'https://4100.api.green-api.com';

const getApiUrl = (endpoint: 'checkAccount') => {
  const { credentials } = useCredentialsStore.getState();

  if (!credentials) {
    throw new Error('idInstance и apiTokenInstance отсутствуют');
  }

  const { idInstance, apiTokenInstance } = credentials;

  return `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
};

const post = async <P, R>({ url, params }: { url: string; params?: P }): Promise<R | null> => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error('Ошибка запроса');
  } catch (error) {
    console.error('GreenApi error', error);
    return null;
  }
};

export const GreenApi = {
  checkAccount: ({ phone }: { phone: number }) =>
    post<
      {
        phone?: number;
        username?: string;
        force?: boolean;
      },
      {
        exist: boolean;
        chatId: string;
        username: string;
        phoneNumber: number;
        fromCache: boolean;
      }
    >({
      url: getApiUrl('checkAccount'),
      params: {
        phone,
      },
    }),
};
