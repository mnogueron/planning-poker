const votes = {
  ['vote1']: {
    id: 'vote1',
    pollId: 'poll1',
    userId: 'user1',
    value: '1',
  },
  ['vote2']: {
    id: 'vote2',
    pollId: 'poll1',
    userId: 'user2',
    value: '1/2',
  },
}

module.exports = {
  getVoteForPollAndUser: (pollId, userId) => {
    return Object.values(votes).find(vote => vote.pollId === pollId && vote.userId === userId)
  },

  getVotesForPoll: (pollId) => {
    return Object.values(votes).filter(vote => vote.pollId === pollId)
  },

  setVote: (vote) => {
    votes[vote.id] = vote
  },
}
