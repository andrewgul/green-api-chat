import { Outlet } from 'react-router';
import { ModalProvider } from '../providers/modal';

export const RootLayout = () => (
  <ModalProvider>
    <Outlet />
  </ModalProvider>
);
