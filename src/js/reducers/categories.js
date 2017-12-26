const categories = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHED_ALL_CATEGORIES':
      return Object.assign({}, state, { allCategories: action.allCategories, isFetching: false, errorFetching: false })
    case 'FETCHING_CATEGORIES':
      return Object.assign({}, state, {isFetching: true, errorFetching: false})
    case 'ERROR_FETCHING_CATEGORIES':
      return Object.assign({}, state, {isFetching: false, errorFetching: true})
    default:
      return state
  }
};

export default categories;
