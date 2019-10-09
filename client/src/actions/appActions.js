import { SET_USER } from '../reducers/appReducer'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}
