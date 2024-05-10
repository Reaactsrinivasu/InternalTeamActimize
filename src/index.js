import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './Theme';
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
