import routes from './routes';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ScrollToTop from '@/helpers/ScrollToTop';

const GetRoutes = () => {
  return useRoutes(routes);
};

const SetRoutes = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <BrowserRouter>
        <ScrollToTop />
        <GetRoutes />
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default SetRoutes;
