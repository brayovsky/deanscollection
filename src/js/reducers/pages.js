const pages = (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_NEXT_PAGE':
      return Object.assign({}, state, {
        nextPage: action.nextPage,
        prevPage: action.prevPage,
    })
    case 'VIEW_PREV_PAGE':
      return Object.assign({}, state, {
        nextPage: action.nextPage,
        prevPage: action.prevPage,
    })
    default:
      return state
  }
};
  
export default pages;
