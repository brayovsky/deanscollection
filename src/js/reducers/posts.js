const posts = (state = {}, action) => {
  switch (action.type) {
    case 'FINISH_FETCHING_POSTS':
      return Object.assign({}, state, { 
        posts: action.posts,
        isFetching: false,
        errorFetching: false,
        activeCategory: action.activeCategory,
        page: Number(action.page),
      })
    case 'FETCHING_POSTS':
      return Object.assign({}, state, {isFetching: true, errorFetching: false})
    case 'ERROR_FETCHING_POSTS':
      return Object.assign({}, state, {isFetching: false, errorFetching: true})
    case 'FINISH_FETCHING_CONSEQUENT':
      return Object.assign({}, state, {
        posts: state.posts.concat(action.posts),
        page: Number(action.page),
        isFetching: false,
        errorFetching: false,
      })
    default:
      return state
  } 
};

export default posts;
