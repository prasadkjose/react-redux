//Import Actions
export const GET_POSTS_ASYNC = "GET_POSTS_ASYNC";
export const GET_POSTS_SUCCESS_ASYNC = "GET_POSTS_SUCCESS_ASYNC";
export const GET_POSTS_FAILURE_ASYNC = "GET_POSTS_FAILURE_ASYNC";
// reducer for 'posts' State
export const initialState = {
  posts: [],
  loading: false,
  hasError: false,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_ASYNC:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS_ASYNC:
      return { posts: action.payload, loading: false, hasError: false };
    case GET_POSTS_FAILURE_ASYNC:
      return { ...state, loading: false, hasError: true };
    default:
      return state;
  }
}
