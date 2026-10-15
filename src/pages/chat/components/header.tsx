import { Icon24Smile } from '@vkontakte/icons';
import * as React from 'react';

type Props = {
  phone: number;
};

export const Header = React.memo(({ phone }: Props) => {
  return (
    <div className="bg-(--background-primary) border-b border-b-(--divider-secondary) py-(--spacing-m) px-(--spacing-l) flex items-center gap-(--spacing-m)">
      <div className="size-10 rounded-full bg-(--button-primary) flex items-center justify-center">
        <Icon24Smile color="var(--text-primary-inverse-static)" />
      </div>
      <h2 className="text-(--text-primary) font-(--font-body-size) leading-(--font-body-line-height) tracking-(--font-body-letter-spacing)">
        +{phone}
      </h2>
    </div>
  );
});
