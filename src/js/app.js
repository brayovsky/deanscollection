import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import clothesStoreApp from './reducers';
import HomeSplash from './components/HomeSplash';

let store = createStore(clothesStoreApp);

ReactDOM.render(
  <Provider store={store}>
    <HomeSplash />
  </Provider>,
  document.getElementById('root')
);
