import routes from './routes';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ScrollToTop from '@/helpers/ScrollToTop';
import { Provider, createStore } from 'jotai';

const GetRoutes = () => {
  return useRoutes(routes);
};

const myStore = createStore();

const SetRoutes = () => {
  return (
    <Provider store={myStore}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <ScrollToTop />
          <GetRoutes />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
};

export default SetRoutes;
