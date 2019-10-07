const express = require('express')
const router = express.Router()
const WebSocket = require('ws')
const uuid = require('uuid/v4')

let polls = {}
let votes = {}

router.post('/poll', (req, res) => {
  const id = uuid()
  const { name } = req.body
  polls[id] = {
    id,
    name,
  }
  res.send(polls[id])
})

router.get('/poll/:id', (req, res) => {
  const poll = polls[req.params.id]
  if (!poll) {
    res.status(404).send('Poll not found')
    return
  }
  res.send(poll)
})

router.post('/poll/:id/cast', (req, res) => {
  // TODO cast vote here or in another endpoint
  const poll = polls[req.params.id]
  if (!poll) {
    res.status(404).send('Poll not found')
    return
  }

  const { vote } = req.body

  // link vote to user
  votes[poll.id] = vote

  req.wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(vote)
    }
  })

  res.status(200).send()
})

module.exports = router
