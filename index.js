require('dotenv').config();

const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')

const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')

const MONGODB_URI = process.env.mongo

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
