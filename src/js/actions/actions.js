import { actionTypes } from '../constants/actionTypes';

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
