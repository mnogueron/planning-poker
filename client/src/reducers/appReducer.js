export const SET_USER = 'SET_USER'

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
      
    default:
      return state
  }
}
