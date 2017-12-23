import { combineReducers } from 'redux';
import categories from './categories';
import pages from './pages';

const clothesStoreApp = combineReducers({
  categories,
  pages,
});

export default clothesStoreApp;
