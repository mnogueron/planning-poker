const uuid = require('uuid/v4')

const users = {}

module.exports.setup = function (router) {

  /**
   * @swagger
   * /user:
   *    post:
   *      description: Create new user
   *      tags: [User]
   *      produces:
   *          - application/json
   *      parameters:
   *        - in: body
   *          name: user form
   *          description: User's data
   *          required: true
   *          schema:
   *            type: object
   *            $ref: '#/definitions/UserForm'
   *      responses:
   *        200:
   *          description: user
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/User'
   */
  router.post('/user', (req, res) => {
    const { name } = req.body
    const user = {
      id: uuid(),
      name,
    }
    users[user.id] = user
    res.send(user)
  })

  /**
   * @swagger
   * /user/{id}:
   *    get:
   *      description: Get a user
   *      tags: [User]
   *      produces:
   *          - application/json
   *      parameters:
   *        - $ref: '#/parameters/id'
   *      responses:
   *        200:
   *          description: user
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/User'
   */
  router.get('/user/:id', (req, res) => {
    const user = users[req.params.id]

    if (!user) {
      res.status(404).send('User not found')
      return
    }

    res.send(user)
  })
}
