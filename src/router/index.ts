import { createBrowserRouter, redirect } from 'react-router';
import { StartPage } from '../pages/start';
import { ChatLayout } from '../components/chat-layout';
import { ChatPage } from '../pages/chat';
import { RootLayout } from '../components/root-layout';
import { ChatPlaceholder } from '../components/chat-placeholder';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/start',
        Component: StartPage,
      },
      {
        path: '/chat',
        Component: ChatLayout,
        children: [
          {
            index: true,
            Component: ChatPlaceholder,
          },
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
    ],
  },
]);
