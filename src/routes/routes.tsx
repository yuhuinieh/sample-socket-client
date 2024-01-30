import { Suspense, lazy } from 'react';
import PublicLayout from '@/layouts/Public';
import PrivateLayout from '@/layouts/Private';
import Page404 from '@/pages/Page404';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import SockectProvider from '@/contexts/SockectContext';

// Page
const Chat = lazy(async () => import('@/pages/chat'));

const routes = [
  {
    path: '/*',
    element: <Page404 />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/chat',
        element: (
          <SockectProvider>
            <Chat />
          </SockectProvider>
        ),
      },
    ],
  },
];

export default routes;
