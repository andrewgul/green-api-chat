import * as React from 'react';

import { GreenApi } from '@/lib/green-api';
import { normalizeApiTimestamp } from '@/lib/utils';
import { addMessage, setSettings, useChatsStore } from '@/stores/chats';

const POLL_DELAY = 500;
/** пауза после ошибки, чтобы не долбить API при 401/429 и проблемах с сетью */
const ERROR_POLL_DELAY = 5000;

export const useChatPolling = () => {
  const settingsSet = useChatsStore(({ settingsSet }) => settingsSet);

  React.useEffect(() => {
    GreenApi.setSettings({
      webhookUrl: '',
      outgoingWebhook: 'yes',
      stateWebhook: 'yes',
      incomingWebhook: 'yes',
    }).then((result) => {
      if (result.success && result.data.saveSettings) {
        setSettings();
      }
    });
  }, []);

  React.useEffect(() => {
    if (!settingsSet) {
      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;
    let abortController: AbortController | null = null;

    const scheduleNext = (delay: number) => {
      if (!cancelled) {
        timeoutId = setTimeout(fetchNotifaction, delay);
      }
    };

    const fetchNotifaction = async () => {
      timeoutId = null;

      abortController = new AbortController();
      const notification = await GreenApi.receiveNotification({}, abortController);

      if (cancelled) {
        return;
      }

      if (!notification.success) {
        scheduleNext(ERROR_POLL_DELAY);
        return;
      }

      if (notification.data) {
        const { body, receiptId } = notification.data;

        // в очереди бывают не только входящие сообщения (stateInstanceChanged, outgoing* и т.д.),
        // у них нет messageData — обрабатываем только входящие текстовые
        if (body.typeWebhook === 'incomingMessageReceived' && body.senderData && body.messageData) {
          const { messageData } = body;
          const text =
            messageData.typeMessage === 'textMessage'
              ? messageData.textMessageData?.textMessage
              : messageData.typeMessage === 'extendedTextMessage'
                ? messageData.extendedTextMessageData?.text
                : undefined;

          if (text !== undefined) {
            addMessage(body.senderData.chatId, {
              id: body.idMessage,
              message: text,
              sender: 'other',
              sentAt: normalizeApiTimestamp(body.timestamp),
            });
          }
        }

        // удаляем любое уведомление, иначе необработанное навсегда застрянет в начале очереди
        await GreenApi.deleteNotification({ receiptId });
      }

      scheduleNext(POLL_DELAY);
    };

    fetchNotifaction();

    return () => {
      cancelled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      abortController?.abort();
    };
  }, [settingsSet]);
};
