import { actionTypes } from '../constants/actionTypes';
import { callEndpoint } from '../utils/api';
import config from '../config';
import urljoin from 'url-join';
import apiConstants from '../constants/api'
import categories from '../reducers/categories';

export const viewNextPage = (currentPage) => {
  return {
    type: actionTypes.VIEW_NEXT_PAGE,
    prevPage: currentPage,
    nextPage: ++currentPage,
  }
};

export const viewPreviousPage = (currentPage) => {
  return {
    type: actionTypes.VIEW_PREV_PAGE,
    nextPage: currentPage,
    prevPage: --currentPage,
  }
};

export const fetchingPosts = () => {
  return {
    type: actionTypes.FETCHING_POSTS,
  }
}

export const errorFetchingPosts = () => {
  return {
    type: actionTypes.ERROR_FETCHING_POSTS,
  }
}

export const finishFecthingPosts = (posts, activeCategory) => {
  return {
    type: actionTypes.FINISH_FETCHING_POSTS,
    posts,
    activeCategory,
  }
}

export const showPostsFromThisCategory = (category) => {
  return (dispatch) => {
    dispatch(fetchingPosts());
    // fetch posts async
    const postsEndpoint = urljoin(config.apiUrl, apiConstants.endpoints.posts);
    const params = category === 'all' ? {per_page: 9} : {per_page: 9, categories: category}
    callEndpoint(postsEndpoint, params).then((postsOrError) =>{
      if (postsOrError.message && postsOrError.message === 'whoopsy'){
        dispatch(errorFetchingPosts());
      } else {
        const posts = postsOrError;
        dispatch(finishFecthingPosts(posts, category));
      }
    });
  }
};

export const fetchingCategories = () => {
  return {
    type: actionTypes.FETCHING_CATEGORIES,
  }
}

export const errorFetchingCategories = () => {
  return {
    type: actionTypes.ERROR_FETCHING_CATEGORIES,
  }
}

export const finishFetchCategories = (categories) => {
  return {
    type: actionTypes.FETCHED_ALL_CATEGORIES,
    allCategories: categories,
  };
}

export const activeCategoryChanged = (newCategory) => {
  return (dispatch) => {
    dispatch(showPostsFromThisCategory(newCategory));
  }
}

export const getAllCategories = () => {
  return (dispatch) => {
    dispatch(fetchingCategories());
    // fetch categories async
    const categoriesEndpoint = urljoin(config.apiUrl, apiConstants.endpoints.categories);
    callEndpoint(categoriesEndpoint).
    then((categoriesOrError) => {
      if (categoriesOrError.message && categoriesOrError.message === 'whoopsy'){
        dispatch(errorFetchingCategories());
      }
      else {
        const categories = categoriesOrError;
        dispatch(finishFetchCategories(categories));
      }
    });
  };
}
