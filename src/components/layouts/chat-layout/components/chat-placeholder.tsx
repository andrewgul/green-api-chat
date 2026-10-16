import * as React from 'react';

export const ChatPlaceholder = React.memo(() => {
  return (
    <div className="grow w-full flex items-center justify-center">
      <p className="text-md text-(--text-tertiary) py-(--spacing-m) px-(--spacing-l) bg-(--background-primary) rounded-(--border-radius-common-m)">
        Выберите или создайте чат
      </p>
    </div>
  );
});
