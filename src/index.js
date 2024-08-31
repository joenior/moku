// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </BrowserRouter>
);