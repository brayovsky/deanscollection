import { combineReducers } from 'redux';
import categories from './categories';
import pages from './pages';
// import { routerReducer } from 'react-router-redux';

const clothesStoreApp = combineReducers({
  categories,
  pages,
});

export default clothesStoreApp;
