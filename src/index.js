import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import store from './store';
// import action from './store/actions';

import './css/index.css';
import './css/custom.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

//Run Authentication Check
// store.dispatch(action.checkAuth());

//Redux Persistor
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);