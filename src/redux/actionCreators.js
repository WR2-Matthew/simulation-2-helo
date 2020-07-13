import { GET_USER, GET_ALL_POSTS, CREATE_POST } from './constraints'

export function setUser(username, profilePicture, id) {
  return {
    type: GET_USER,
    payload: {
      user: { username, profilePicture, id }
    }
  }
}

export function setAllPosts(data) {
  return {
    type: GET_ALL_POSTS,
    payload: {
      posts: data
    }
  }
}

export function addCreatedPost(data) {
  return {
    type: CREATE_POST,
    payload: { posts: data }
  }
}