import { LOGOUT, SET_USER } from './actionTypes'

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case LOGOUT:
      return {
        ...initialState
      }
      
    default:
      return state
  }
}
