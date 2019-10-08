const polls = {
  ['poll1']: {
    id: 'poll1',
    name: 'Test poll 1',
    description: 'Description for test poll 1',
    userId: 'user1'
  },
  ['poll2']: {
    id: 'poll2',
    name: 'Test poll 2',
    description: 'Description for test poll 2',
    userId: 'user1'
  },
  ['poll3']: {
    id: 'poll3',
    name: 'Test poll 3',
    description: 'Description for test poll 3',
    userId: 'user1'
  }
}

module.exports = {
  setPoll: (poll) => {
    polls[poll.id] = poll
  },

  getPoll: (id) => {
    return polls[id]
  },

  getPolls: () => {
    return Object.values(polls)
  },
}
