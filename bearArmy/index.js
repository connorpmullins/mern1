import React from 'react';
import ReactDOM from 'react-dom';

// main app - will be inside 'containers folder'
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './store';

// this renders the app into our main html node (<div id="app"></div>)
ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
)
