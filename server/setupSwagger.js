const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    info: {
      title: 'Planning poker API',
      version: '1.0.0',
      description: 'Planning poker Express API with autogenerated swagger doc',
    },
    basePath: '/api',
  },
  apis: ['./routes/*.js', './swagger-definitions/*.yaml'],
}

const specs = swaggerJSDoc(options)

module.exports = specs


