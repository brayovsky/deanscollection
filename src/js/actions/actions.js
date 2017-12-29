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

export const finishFecthingPosts = (response, activeCategory, page) => {
  return {
    type: actionTypes.FINISH_FETCHING_POSTS,
    response,
    activeCategory,
    page,
  }
}

export const showPostsFromThisCategory = (category, page, updating = false) => {
  return (dispatch) => {
    dispatch(fetchingPosts());
    // fetch posts async
    const postsEndpoint = urljoin(config.apiUrl, apiConstants.endpoints.posts);
    const params = category === 'all' ? {per_page: 12, page} : {per_page: 12, categories: category, page}
    callEndpoint(postsEndpoint, params).then((postsOrError) => {
      console.log('dgg', postsOrError);
      if (postsOrError.message && postsOrError.message === 'whoopsy'){
        dispatch(errorFetchingPosts());
      } else {
        const response = postsOrError;
        console.log(response);
        updating ? dispatch(finishFetchingConsequentPages(response, page)) : dispatch(finishFecthingPosts(response, category, page));
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

export const finishFetchCategories = (response) => {
  console.log('response is', response);
  return {
    type: actionTypes.FETCHED_ALL_CATEGORIES,
    response,
  };
}

export const activeCategoryChanged = (newCategory) => {
  return (dispatch) => {
    dispatch(showPostsFromThisCategory(newCategory, 1));
  }
}

export const fetchConsequentPages = (currentCategory, currentPage) => {
  return (dispatch) => {
    dispatch(showPostsFromThisCategory(currentCategory, ++currentPage, true));
  }
}

export const finishFetchingConsequentPages = (response, page) => {
  return {
    type: actionTypes.FINISH_FETCHING_CONSEQUENT,
    response,
    page,
  }
}

export const getAllCategories = () => {
  return (dispatch) => {
    dispatch(fetchingCategories());
    // fetch categories async
    const categoriesEndpoint = urljoin(config.apiUrl, apiConstants.endpoints.categories);
    callEndpoint(categoriesEndpoint).
    then((categoriesOrError) => {
      console.log('dgg', categoriesOrError);
      if (categoriesOrError.message && categoriesOrError.message === 'whoopsy'){
        dispatch(errorFetchingCategories());
      }
      else {
        const response = categoriesOrError;
        dispatch(finishFetchCategories(response));
      }
    });
  };
}
