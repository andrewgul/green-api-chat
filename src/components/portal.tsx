import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = React.PropsWithChildren<{
  container?: Element;
}>;

export const Portal = ({ children, container = document.body }: Props) => {
  return createPortal(children, container);
};
