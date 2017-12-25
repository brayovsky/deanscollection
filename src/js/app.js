import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import clothesStoreApp from './reducers';
import Root from './components/Root'

let store = createStore(clothesStoreApp);

const areWeIn = () => console.log('in');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' component={Root} componentDidMount={areWeIn}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
