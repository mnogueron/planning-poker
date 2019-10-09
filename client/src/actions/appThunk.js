import axios from 'axios'
import { addPoll, addPolls, addVote, addVotes, setUser } from './appActions'

export const loginUser = (name) => {
  return async (dispatch) => {
    const result = await axios.post(`http://localhost:9000/api/user`, {
      name,
    })
    dispatch(setUser(result.data))
  }
}

export const fetchPoll = (pollId) => {
  return async (dispatch) => {
    const result = await axios.get(`http://localhost:9000/api/poll/${pollId}`)
    dispatch(addPoll(result.data))
    await dispatch(fetchVotes(pollId))
  }
}

export const fetchVotes = (pollId) => {
  return async (dispatch) => {
    const result = await axios.get(`http://localhost:9000/api/poll/${pollId}/votes`)
    dispatch(addVotes(result.data))
  }
}

export const fetchPolls = () => {
  return async (dispatch) => {
    const result = await axios.get(`http://localhost:9000/api/polls`)
    dispatch(addPolls(result.data))
  }
}

export const castVote = (pollId, value) => {
  return async (dispatch, getState) => {
    const { user } = getState().app
    const result = await axios.post(`http://localhost:9000/api/poll/${pollId}/vote`, {
      value,
      userId: user.id,
    })
    dispatch(addVote(result.data))
  }
}

export const createPoll = (name, description) => {
  return async (dispatch, getState) => {
    const { user } = getState().app
    const result = await axios.post(`http://localhost:9000/api/poll`, {
      name,
      description,
      userId: user.id,
    })
    dispatch(addPoll(result.data))
  }
}
