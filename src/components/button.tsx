import * as React from 'react';

import clsx from 'clsx';

type Props = {
  stretched?: boolean;
} & React.ComponentProps<'button'>;

export const Button = React.memo(({ className, stretched, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'block rounded-xl p-3 bg-(--button-primary) text-(--text-primary-inverse-static) disabled:cursor-not-allowed disabled:opacity-60',
        stretched && 'w-full',
        className,
      )}
      {...props}
    />
  );
});
