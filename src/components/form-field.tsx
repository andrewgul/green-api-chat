import * as React from 'react';

type Props = {
  label: string;
  htmlFor?: string;
} & React.PropsWithChildren;

export const FormField = ({ label, htmlFor, children }: Props) => {
  return (
    <div className="py-2">
      <label className="block text-(--text-secondary) mb-2 text-sm" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
};
