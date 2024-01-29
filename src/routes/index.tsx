import routes from './routes';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider, createStore } from 'jotai';
import { CookiesProvider } from 'react-cookie';

const GetRoutes = () => {
  return useRoutes(routes);
};

const myStore = createStore();

const SetRoutes = () => {
  return (
    <Provider store={myStore}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <GetRoutes />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
};

export default SetRoutes;
