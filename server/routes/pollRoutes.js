const WebSocket = require('ws')
const uuid = require('uuid/v4')
const { setPoll, getPoll, getPolls } = require('../data-storage/polls')
const { setVote, getVoteForPollAndUser, getVotesForPoll } = require('../data-storage/votes')
const { getUser } = require('../data-storage/users')

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
    setPoll(poll)
    res.send(poll)
  })

  /**
   * @swagger
   * /polls:
   *    get:
   *      description: Get all polls
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: polls
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                item:
   *                  type: object
   *                  $ref: '#/definitions/Poll'
   */
  router.get('/polls', (req, res) => {
    res.send(getPolls())
  })

  /**
   * @swagger
   * /poll/{id}:
   *    get:
   *      description: Get poll
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - $ref: '#/parameters/id'
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
    const poll = getPoll(req.params.id)
    if (!poll) {
      res.status(404).send('Poll not found')
      return
    }
    res.send(poll)
  })

  /**
   * @swagger
   * /poll/{id}/vote:
   *    post:
   *      description: Cast a vote on a poll
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - $ref: '#/parameters/id'
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
    const poll = getPoll(req.params.id)
    if (!poll) {
      res.status(404).send('Poll not found')
      return
    }

    const { value, userId } = req.body
    const user = getUser(userId)

    if (!user) {
      res.status(400).send('Invalid user')
      return
    }

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

    setVote(vote)

    const resVote = {
      ...vote,
      user,
    }
    // broadcast the new vote to all clients apart from the creator
    req.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && client.userId !== userId) {
        client.send(`[New vote]-${JSON.stringify(resVote)}`)
      }
    })

    res.send(resVote)
  })

  /**
   * @swagger
   * /poll/{id}/votes:
   *    get:
   *      description: Get poll's votes
   *      tags: [Poll]
   *      produces:
   *        - application/json
   *      parameters:
   *        - $ref: '#/parameters/id'
   *      responses:
   *        200:
   *          description: votes
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                item:
   *                  type: object
   *                  $ref: '#/definitions/Vote'
   */
  router.get('/poll/:id/votes', (req, res) => {
    const poll = getPoll(req.params.id)
    if (!poll) {
      res.status(404).send('Poll not found')
      return
    }

    const votes = getVotesForPoll(poll.id)
    res.send(votes.map(vote => ({
      ...vote,
      user: getUser(vote.userId),
    })))
  })
}
