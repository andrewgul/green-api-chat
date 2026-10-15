import clsx from 'clsx';
import * as React from 'react';

type Props = React.ComponentProps<'input'>;

export const Input = React.memo(({ className, ...props }: Props) => {
  return (
    <input
      className={clsx(
        'block w-full p-2 rounded-md bg-(--background-tertiary) text-(--text-primary)',
        className,
      )}
      {...props}
    />
  );
});
