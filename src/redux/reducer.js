import { GET_USER } from './constraints'

const initialState = {
  user: null
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  };
};