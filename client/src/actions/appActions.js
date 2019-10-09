import { SET_USER, ADD_POLL, ADD_POLLS, ADD_VOTE, ADD_VOTES } from '../reducers/appReducer'

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

export const addPoll = (poll) => {
  return {
    type: ADD_POLL,
    poll,
  }
}

export const addPolls = (polls) => {
  return {
    type: ADD_POLLS,
    polls,
  }
}

export const addVote = (vote) => {
  return {
    type: ADD_VOTE,
    vote,
  }
}

export const addVotes = (votes) => {
  return {
    type: ADD_VOTES,
    votes,
  }
}
