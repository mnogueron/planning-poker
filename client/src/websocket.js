import { addVote } from './actions/dataActions'
import { w3cwebsocket as Websocket } from 'websocket'

let ws

export const close = () => {
  if (ws) {
    ws.close()
  }
}

export const connect = (userId, dispatch) => {
  ws = new Websocket('ws://localhost:9000')

  ws.onopen = () => {
    ws.send(`[Link userId]${userId}`)
  }

  ws.onmessage = (message) => {
    if (message.data.startsWith('[New vote]-')) {
      const vote = JSON.parse(message.data.replace('[New vote]-', ''))
      dispatch(addVote(vote))
    }
  }
}
