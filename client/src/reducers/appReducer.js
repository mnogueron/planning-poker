export const ADD_POLL = 'ADD_POLL'
export const ADD_POLLS = 'ADD_POLLS'
export const SET_VOTE = 'SET_VOTE'

const initialState = {
  polls: {},
  votes: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      }

    case ADD_POLLS:
      return {
        ...state,
        ...action.polls.reduce((acc, poll) => ({ ...acc, [poll.id]: poll }), {}),
      }

    case SET_VOTE:
      return {
        ...state,
        [action.vote.id]: action.vote,
      }

    default:
      return state
  }
}
