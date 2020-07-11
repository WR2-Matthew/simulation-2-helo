import { GET_USER } from './constraints'

export function setUser(username, profilePicture, id) {
  return {
    type: GET_USER,
    payload: {
      user: username, profilePicture, id
    }
  }
}