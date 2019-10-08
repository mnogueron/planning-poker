import axios from 'axios'
import { addPoll, addPolls } from './pollActions'

export const fetchPoll = (pollId) => {
  return async (dispatch) => {
    const result = await axios.get(`http://localhost:9000/api/poll/${pollId}`)
    debugger
    dispatch(addPoll(result.data))
  }
}
