import { createBrowserRouter, redirect } from 'react-router';
import { ChatPage } from '../pages/chat';
import { StartPage } from '../pages/start';

export const router = createBrowserRouter([
  {
    path: '/start',
    Component: StartPage,
  },
  {
    path: '/chat',
    Component: ChatPage,
  },
  {
    path: '*',
    loader: () => redirect('/chat'),
  },
]);
