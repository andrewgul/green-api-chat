import { createBrowserRouter, redirect } from 'react-router';
import { StartPage } from '../pages/start';
import { ChatLayout } from '../components/chat-layout';
import { ChatPage } from '../pages/chat';

export const router = createBrowserRouter([
  {
    path: '/start',
    Component: StartPage,
  },
  {
    path: '/chat',
    Component: ChatLayout,
    children: [
      {
        path: '/chat/:chatId',
        Component: ChatPage,
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/chat'),
  },
]);
