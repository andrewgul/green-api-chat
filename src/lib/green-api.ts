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
  idMessage: string;
  messageData: {
    typeMessage: 'textMessage';
    textMessageData: {
      textMessage: string;
      forwardingScore: number;
      isForwarded: boolean;
    };
  };
  senderData: {
    chatId: string;
  };
};

type SetSettingsParams = Partial<{
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: YesOrNo;
  markIncomingMessagesReadedOnReply: YesOrNo;
  outgoingWebhook: YesOrNo;
  outgoingMessageWebhook: YesOrNo;
  outgoingAPIMessageWebhook: YesOrNo;
  incomingWebhook: YesOrNo;
  stateWebhook: YesOrNo;
  keepOnlineStatus: YesOrNo;
  editedMessageWebhook: YesOrNo;
  deletedMessageWebhook: YesOrNo;
}>;

type YesOrNo = 'yes' | 'no';

const getApiBaseUrl = (subdomain = '4100') => `https://${subdomain}.api.green-api.com`;

const getApiUrl = (
  endpoint:
    | 'checkAccount'
    | 'sendMessage'
    | 'setSettings'
    | 'receiveNotification'
    | 'setSettings'
    | 'deleteNotification',
) => {
  const { credentials } = useCredentialsStore.getState();

  if (!credentials) {
    throw new Error('idInstance и apiTokenInstance отсутствуют');
  }

  const { idInstance, apiTokenInstance, subdomain } = credentials;

  return `${getApiBaseUrl(subdomain)}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
};

const post = async <P, R>({ url, params }: { url: string; params?: P }): Promise<Result<R>> => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }

    throw new Error('Ошибка запроса');
  } catch (error) {
    console.error(`GreenApi POST ${url} error`, error);

    return {
      success: false,
      error,
    };
  }
};

const get = async <P, R>({
  url,
  params,
  abortController,
}: {
  url: string;
  params?: P;
  abortController?: AbortController;
}): Promise<Result<R>> => {
  try {
    const response = await fetch(
      `${url}${params && Object.keys(params).length > 0 ? new URLSearchParams(params).toString() : ''}`,
      {
        method: 'get',
        signal: abortController?.signal,
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
    console.error(`GreenApi GET ${url} error`, error);

    return {
      success: false,
      error,
    };
  }
};

const del = async <P, R>({ url, params }: { url: string; params?: P }): Promise<Result<R>> => {
  try {
    const response = await fetch(
      `${url}${params && Object.keys(params).length > 0 ? new URLSearchParams(params).toString() : ''}`,
      {
        method: 'delete',
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
    console.error(`GreenApi DELETE ${url} error`, error);

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
  receiveNotification: (params?: { receiveTimeout?: number }, abortController?: AbortController) =>
    get<
      {
        receiveTimeout?: number;
      },
      {
        receiptId: number;
        body: NotifiactionBody;
      } | null
    >({
      url: getApiUrl('receiveNotification'),
      params,
      abortController,
    }),
  deleteNotification: ({ receiptId }: { receiptId: number }) =>
    del<unknown, { result: boolean; reason: string }>({
      url: `${getApiUrl('deleteNotification')}/${receiptId}`,
    }),
  setSettings: (params: SetSettingsParams) =>
    post<SetSettingsParams, { saveSettings: boolean }>({
      url: getApiUrl('setSettings'),
      params,
    }),
};
