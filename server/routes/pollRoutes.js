const WebSocket = require('ws')
const uuid = require('uuid/v4')

let polls = {}
let votes = {}

const getVoteForPollAndUser = (pollId, userId) => {
  return Object.values(votes).find(vote => vote.pollId === pollId && vote.userId === userId)
}

module.exports.setup = function(router) {
  /**
   * @swagger
   * /poll:
   *    post:
   *      description: Create new poll
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - in: body
   *          name: poll form
   *          description: Poll's data
   *          required: true
   *          schema:
   *            type: object
   *            $ref: '#/definitions/PollForm'
   *      responses:
   *        200:
   *          description: poll
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/Poll'
   */
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

  /**
   * @swagger
   * /poll/{pollId}:
   *    get:
   *      description: Get poll
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - $ref: '#/parameters/pollId'
   *      responses:
   *        200:
   *          description: poll
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/Poll'
   */
  router.get('/poll/:id', (req, res) => {
    const poll = polls[req.params.id]
    if (!poll) {
      res.status(404).send('Poll not found')
      return
    }
    res.send(poll)
  })

  /**
   * @swagger
   * /poll/{pollId}/vote:
   *    post:
   *      description: Cast a vote on a poll
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - $ref: '#/parameters/pollId'
   *        - in: body
   *          name: vote form
   *          description: Vote's data
   *          required: true
   *          schema:
   *            type: object
   *            $ref: '#/definitions/VoteForm'
   *      responses:
   *        200:
   *          description: vote
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/Vote'
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
        pollId: poll.id,
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

    res.send(vote)
  })
}
