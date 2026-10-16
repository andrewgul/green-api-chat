import * as React from 'react';

export const ChatPlaceholder = React.memo(() => {
  return (
    <div className="grow w-full flex items-center justify-center">
      <p className="text-md text-(--text-tertiary)">Выберите или создайте чат</p>
    </div>
  );
});
