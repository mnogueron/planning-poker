import { ADD_POLL, ADD_POLLS, ADD_VOTE, ADD_VOTES, LOGOUT } from './actionTypes'

const initialState = {
  polls: {},
  votes: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

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

    case LOGOUT:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
