import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { I18nextProvider } from 'react-i18next';
import { store } from './app/store';
import { App } from './app/app';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import i18n from './app/i18n';
import './index.css';

Sentry.init({
  dsn: 'https://986d9dc3ccbf4c49980050b17929c2f9@o509572.ingest.sentry.io/5604308',
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
