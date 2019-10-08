const users = {
  ['user1']: {
    id: 'user1',
    name: 'John Doe',
  },
  ['user2']: {
    id: 'user2',
    name: 'Jane Doe',
  }
}

module.exports = {
  setUser: (user) => {
    users[user.id] = user
  },

  getUser: (id) => users[id],
}
