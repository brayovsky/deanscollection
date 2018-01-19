import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import clothesStoreApp from './reducers';
import Root from './components/Root';
import { getAllCategories, showPostsFromThisCategory } from './actions/actions';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleWare = createLogger();
const store = createStore(
  clothesStoreApp, 
  applyMiddleware(thunkMiddleware, loggerMiddleWare));

store.dispatch(getAllCategories());
store.dispatch(showPostsFromThisCategory('all', 1));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/:category?' component={Root}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
