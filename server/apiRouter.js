const express = require('express')
const router = express.Router()
const WebSocket = require('ws')
const uuid = require('uuid/v4')

let polls = {}
let votes = {}

const getVoteForPollAndUser = (pollId, userId) => {
  return Object.values(votes).find(vote => vote.pollId === pollId && vote.userId === userId)
}

router.post('/poll', (req, res) => {
  const { name, userId } = req.body
  const poll = {
    id: uuid(),
    name,
    userId,
  }
  polls[poll.id] = poll
  res.send(polls[poll.id])
})

router.get('/poll/:id', (req, res) => {
  const poll = polls[req.params.id]
  if (!poll) {
    res.status(404).send('Poll not found')
    return
  }
  res.send(poll)
})

/**
 * POST request to cast a vote
 */
router.post('/poll/:id/vote', (req, res) => {
  const poll = polls[req.params.id]
  if (!poll) {
    res.status(404).send('Poll not found')
    return
  }

  const { value, userId } = req.body

  let vote = getVoteForPollAndUser(poll.id, userId)
  if (vote) {
    vote.value = value
  }
  else {
    vote = {
      id: uuid(),
      value,
      userId,
    }
  }
  // link vote to user
  votes[vote.id] = vote

  req.wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(vote)
    }
  })

  res.status(200).send()
})

module.exports = router
