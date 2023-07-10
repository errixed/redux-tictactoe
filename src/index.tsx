import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { App } from './App';
import { Provider } from 'react-redux/es/exports'
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);