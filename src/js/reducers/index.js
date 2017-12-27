import { combineReducers } from 'redux';
import categories from './categories';
import pages from './pages';
import posts from './posts';

const clothesStoreApp = combineReducers({
  categories,
  pages,
  posts,
});

export default clothesStoreApp;
