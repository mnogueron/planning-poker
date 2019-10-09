const polls = {
  ['poll1']: {
    id: 'poll1',
    name: 'Test poll 1',
    description: 'Description for test poll 1',
    timestamp: 1570516427630,
    userId: 'user1'
  },
  ['poll2']: {
    id: 'poll2',
    name: 'Test poll 2',
    description: 'Description for test poll 2',
    timestamp: 1570416460606,
    userId: 'user1'
  },
  ['poll3']: {
    id: 'poll3',
    name: 'Test poll 3',
    description: 'Description for test poll 3',
    timestamp: 1570416477471,
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
      .sort((a, b) => b.timestamp - a.timestamp)
  },
}
