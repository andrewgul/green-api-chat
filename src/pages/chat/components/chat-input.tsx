import * as React from 'react';
import { Button } from '../../../components/button';
import { Icon24ArrowUp } from '@vkontakte/icons';

const style = {
  boxShadow:
    '0px 4px 16px 0px var(--shadow-elevation-3-primary), 0px 0px 2px 0px var(--shadow-elevation-3-secondary)',
};

type Props = {
  message: string;
  onChange: (value: string) => void;
  onSend: VoidFunction;
  sending: boolean;
};

export const ChatInput = React.memo(({ message, onChange, onSend, sending }: Props) => {
  return (
    <div
      style={style}
      className="absolute right-0 left-0 bottom-0 px-(--spacing-common-l) pb-(--spacing-common-l)"
    >
      <div className="p-(--spacing-xs) bg-(--float-primary-flat) rounded-(--border-radius-common-l) relative">
        <input
          value={message}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Сообщение"
          className="outline-0 block w-full py-(--spacing-m-half) pl-(--spacing-common-l) pr-[calc(var(--spacing-common-l)+32px)] placeholder:text-(--text-tertiary) text-(--text-primary) font-(--font-body-size) leading-(--font-body-line-height) tracking-(--font-body-letter-spacing)"
        />
        {message.length > 0 && (
          <Button
            disabled={sending}
            onClick={onSend}
            className="absolute size-(--size-32) rounded-full! p-0! flex items-center justify-center top-1/2 -translate-y-1/2 right-(--spacing-common-l)"
          >
            <Icon24ArrowUp
              color={
                sending
                  ? 'var(--text-secondary-inverse-static)'
                  : 'var(--text-primary-inverse-static)'
              }
            />
          </Button>
        )}
      </div>
    </div>
  );
});
