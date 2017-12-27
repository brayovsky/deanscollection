const posts = (state = {}, action) => {
  switch (action.type) {
    case 'FINISH_FETCHING_POSTS':
      return Object.assign({}, state, { posts: action.posts, isFetching: false, errorFetching: false })
    case 'FETCHING_POSTS':
      return Object.assign({}, state, {isFetching: true, errorFetching: false})
    case 'ERROR_FETCHING_POSTS':
      return Object.assign({}, state, {isFetching: false, errorFetching: true})
    default:
      return state
  } 
};

export default posts;
