import { useCredentialsStore } from '../stores/credentials';

type Result<D> =
  | {
      success: true;
      data: D;
    }
  | {
      success: false;
      error: unknown;
    };

type NotifiactionBody = {
  /** в секундах */
  timestamp: number;
  messageData: {
    typeMessage: 'textMessage';
    textMessageData: {
      textMessage: string;
      forwardingScore: number;
      isForwarded: boolean;
    };
  };
};

const apiUrl = 'https://4100.api.green-api.com';

const getApiUrl = (
  endpoint: 'checkAccount' | 'sendMessage' | 'setSettings' | 'receiveNotification',
) => {
  const { credentials } = useCredentialsStore.getState();

  if (!credentials) {
    throw new Error('idInstance и apiTokenInstance отсутствуют');
  }

  const { idInstance, apiTokenInstance } = credentials;

  return `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
};

const post = async <P, R>({ url, params }: { url: string; params?: P }): Promise<Result<R>> => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }

    throw new Error('Ошибка запроса');
  } catch (error) {
    console.error('GreenApi POST error', error);

    return {
      success: false,
      error,
    };
  }
};

const get = async <P, R>({ url, params }: { url: string; params?: P }): Promise<Result<R>> => {
  try {
    const response = await fetch(
      `${url}${params && Object.keys(params).length > 0 ? new URLSearchParams(params).toString() : ''}`,
      {
        method: 'get',
        body: JSON.stringify(params),
      },
    );

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }

    throw new Error('Ошибка запроса');
  } catch (error) {
    console.error('GreenApi POST error', error);

    return {
      success: false,
      error,
    };
  }
};

export const GreenApi = {
  checkAccount: ({ phoneNumber }: { phoneNumber: number }) =>
    post<
      {
        phoneNumber?: number;
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
        phoneNumber,
      },
    }),
  sendMessage: (params: { chatId: string; message: string }) =>
    post<
      {
        chatId: string;
        message: string;
        quotedMessageId?: string;
        typingTime?: number;
        typingType?: string;
      },
      {
        idMessage: string;
      }
    >({
      url: getApiUrl('sendMessage'),
      params,
    }),
  receiveNotification: async (params?: { receiveTimeout?: number }) => {
    const response = await get<
      {
        receiveTimeout?: number;
      },
      {
        receiptId: number;
        body: NotifiactionBody;
      }
    >({
      url: getApiUrl('receiveNotification'),
      params,
    });

    // возвращаем только textMessage, остальные
    // игнорируем чтобы не возникало ошибок
    return response.success && response.data.body.messageData.typeMessage === 'textMessage'
      ? response
      : { success: false };
  },
};
