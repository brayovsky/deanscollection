import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';

const clothesStoreApp = combineReducers({
  categories,
  posts,
});

export default clothesStoreApp;
