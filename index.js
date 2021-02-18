require('dotenv').config();

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const app = express()

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

server.applyMiddleware({app});

app.listen({port: process.env.PORT || 4000}, () => {
  console.log('Server ready')
})
