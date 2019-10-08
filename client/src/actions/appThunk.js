import axios from 'axios'
import { addPoll, addPolls, addVotes } from './appActions'

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
