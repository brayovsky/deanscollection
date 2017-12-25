const categories = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ALL_CATEGORIES':
      return Object.assign({}, state, { allCategories: action.allCategories })
    case 'VIEW_ALL_CATEGORIES':
      return Object.assign({}, state, { activeCategory: 'all' })
    case 'VIEW_SPECIFIC_CATEGORY':
      return Object.assign({}, state, { activeCategory: action.category })
    default:
      return state
  }
};

export default categories;
