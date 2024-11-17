import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Home } from 'pages/Home';
import { Providers } from 'providers';

export type Path = string;

export const createRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Providers />}>
        <Route index element={<Home />} />
      </Route>
    ),
  );
