const categories = (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_ALL_CATEGORIES':
      return Object.assign({}, state, { category: 'all' })
    case 'VIEW_SPECIFIC_CATEGORY':
      return Object.assign({}, state, { category: action.category })
    default:
      return state
  }
};

export default categories;
