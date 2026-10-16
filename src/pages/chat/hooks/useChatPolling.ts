import * as React from 'react';
import { GreenApi } from '../../../lib/green-api';
import { addMessage, setSettings, useChatsStore } from '../../../stores/chats';
import { normalizeApiTimestamp } from '../../../lib/utils';

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
    if (settingsSet) {
      return;
    }

    let timeoutId: number | null = null;
    let abortController: AbortController | null = null;

    const fetchNotifaction = async () => {
      timeoutId = null;

      abortController = new AbortController();
      const notification = await GreenApi.receiveNotification({}, abortController);

      if (notification.success && notification.data) {
        if (notification.data?.body.messageData.typeMessage === 'textMessage') {
          const { body } = notification.data;
  
          addMessage(body.senderData.chatId, {
            id: body.idMessage,
            message: body.messageData.textMessageData.textMessage,
            sender: 'other',
            sentAt: normalizeApiTimestamp(body.timestamp),
          });
        }

        await GreenApi.deleteNotification({ receiptId: notification.data.receiptId });
      }

      timeoutId = setTimeout(() => {
        fetchNotifaction();
      }, 500);
    };

    fetchNotifaction();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      abortController?.abort();
    };
  }, [settingsSet]);
};
