import { createBrowserRouter, redirect } from 'react-router';

import { ChatLayout, ChatPlaceholder } from '@/components/layouts/chat-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { ChatPage } from '@/pages/chat';
import { StartPage } from '@/pages/start';

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
