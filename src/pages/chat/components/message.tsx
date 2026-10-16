import * as React from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';

import { type Message as MessageType } from '@/stores/chats';

const yourMessageStyle = {
  background:
    'linear-gradient(239deg, var(--bubbles-background-bubble-gradient-step-1-a) 0%, var(--bubbles-background-bubble-gradient-step-2-a) 50%, var(--bubbles-background-bubble-gradient-step-3-a) 100%)',
};
const otherMessageStyle = {
  background:
    'linear-gradient(239deg, var(--bubbles-background-bubble-gradient-step-1-b) 0%, var(--bubbles-background-bubble-gradient-step-2-b) 50%, var(--bubbles-background-bubble-gradient-step-3-b) 100%)',
};

type Props = {
  message: MessageType;
};

export const Message = React.memo(({ message }: Props) => {
  const isYours = message.sender === 'you';

  return (
    <div className={clsx('px-4 py-1 flex', isYours ? 'justify-end' : 'justify-start')}>
      <div
        style={isYours ? yourMessageStyle : otherMessageStyle}
        className="px-(--spacing-common-m-half) py-(--spacing-m-half) rounded-(--border-radius-local-bubble-regular)"
      >
        <span className="text-(--text-primary)">{message.message}</span>
        <div className="flex justify-end mt-1">
          <span className="text-bubble-tag text-(--bubbles-text-time)">
            {format(message.sentAt, 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
});
