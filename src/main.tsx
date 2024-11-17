import '@total-typescript/ts-reset/array-includes';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from 'react-router-dom';
import { createRouter } from 'router';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={createRouter()} />
  </React.StrictMode>,
);
