import PublicLayout from '@/layouts/Public';
import Page404 from '@/pages/Page404';
import Login from '@/pages/Login';

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
    ],
  },
];

export default routes;
