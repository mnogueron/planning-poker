import { SET_USER, LOGOUT } from '../reducers/actionTypes'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}
