import * as React from 'react';

import { type Message as MessageType } from '@/stores/chats';

import { Message } from './message';

type Props = {
  messages: MessageType[];
};

export const Messages = React.memo(({ messages }: Props) => {
  return (
    <div className="pb-20 grow flex flex-col justify-end">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
});
