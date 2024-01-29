import React from 'react';
import routes from './routes';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import ScrollToTop from '@/helpers/ScrollToTop';

const GetRoutes = () => {
  return useRoutes(routes);
};

const SetRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GetRoutes />
    </BrowserRouter>
  );
};

export default SetRoutes;
