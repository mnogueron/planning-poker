import { ADD_POLL, ADD_POLLS } from '../reducers/pollReducer'

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
