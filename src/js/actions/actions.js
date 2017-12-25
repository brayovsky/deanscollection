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

export const viewSpecificCategory = (category) => {
  return {
    type: actionTypes.VIEW_SPECIFIC_CATEGORY,
    category,
  }
};

export const viewAllCategories = () => {
  return {
    type: actionTypes.VIEW_ALL_CATEGORIES,
    category: 'all',
  }
};

export const finishFetchCategories = (categories) => {
  return {
    type: actionTypes.FETCH_ALL_CATEGORIES,
    allCategories: categories,
  };
}

export const getAllCategories = () => {
  return (dispatch) => {
    // Get all categories
    const categoriesEndpoint = urljoin(config.apiUrl, apiConstants.endpoints.categories);
    const allCategories = callEndpoint(categoriesEndpoint).
    then((categories) => {
      dispatch(categories);
    });
  };
}
