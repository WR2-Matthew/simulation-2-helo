import { GET_USER, GET_ALL_POSTS, CREATE_POST } from './constraints'

const initialState = {
  user: null,
  posts: []
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, action.payload);
    case GET_ALL_POSTS:
      return Object.assign({}, state, action.payload);
    case CREATE_POST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  };
};