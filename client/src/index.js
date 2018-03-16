
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import 'materialize-css/dist/css/materialize.min.css';

import axios from "axios";
window.axios = axios;
const Store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
