import * as React from 'react';

import clsx from 'clsx';

type Props = React.ComponentProps<'input'>;

export const Input = React.memo(({ className, ...props }: Props) => {
  return (
    <input
      className={clsx(
        'block w-full py-(--spacing-s-half) px-(--spacing-m) rounded-(--border-radius-common-m) bg-(--background-tertiary) text-(--text-primary)',
        className,
      )}
      {...props}
    />
  );
});
