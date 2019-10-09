import axios from 'axios'
import { setUser } from './appActions'

export const loginUser = (name) => {
  return async (dispatch) => {
    const result = await axios.post(`http://localhost:9000/api/user`, {
      name,
    })
    dispatch(setUser(result.data))
  }
}
