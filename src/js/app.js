import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import clothesStoreApp from './reducers';
import Root from './components/Root';
import { getAllCategories } from './actions/actions';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleWare = createLogger();
const store = createStore(
  clothesStoreApp, 
  applyMiddleware(thunkMiddleware, loggerMiddleWare));

store.dispatch(getAllCategories());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' component={Root}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
