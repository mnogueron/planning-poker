export const ADD_POLL = 'ADD_POLL'
export const ADD_POLLS = 'ADD_POLLS'
export const ADD_VOTE = 'ADD_VOTE'
export const ADD_VOTES = 'ADD_VOTES'
export const SET_USER = 'SET_USER'

const initialState = {
  user: null,
  polls: {},
  votes: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case ADD_POLL:
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.poll.id]: action.poll,
        },
      }

    case ADD_POLLS:
      return {
        ...state,
        polls: {
          ...state.polls,
          ...action.polls.reduce((acc, poll) => ({ ...acc, [poll.id]: poll }), {}),
        },
      }

    case ADD_VOTE:
      return {
        ...state,
        votes: {
          ...state.votes,
          [action.vote.id]: action.vote,
        },
      }

    case ADD_VOTES:
      return {
        ...state,
        votes: {
          ...state.votes,
          ...action.votes.reduce((acc, vote) => ({...acc, [ vote.id ]: vote}), {}),
        },
      }

    default:
      return state
  }
}
