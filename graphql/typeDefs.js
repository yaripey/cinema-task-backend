const { gql } = require('apollo-server')

const typeDefs = gql`
  type Film {
    id: ID!
    name: String!
    description: String!
    posterLink: String!
    sessions: [Session]
  }

  type Session {
    id: ID!
    date: String!
    time: String!
    film: Film!
    seats: [[String!]!]!
  }

  type Hall {
    id: ID!
    name: String!
    seats: [[String!]!]!
  }

  type Ticket {
    id: ID!
    session: Session!
    seat: String!
    row: String!
  }

  type Query {
    allFilms: [Film!]
    getFilm(id: ID!): Film
    getFilmSessions(id: ID!): [Session!]
    getTicket(id: ID!): Ticket
    getHalls: [Hall!]
  }

  type Mutation {
    newFilm(
      name: String!
      description: String!
      posterLink: String!
    ): Film

    deleteFilm(
      id: ID!
    ): Boolean

    newSession(
      date: String!
      time: String!
      filmID: String!
      hallID: String!
    ): Session

    deleteSession(
      id: ID!
    ): Boolean

    newHall(
      name: String!
      seats: [[String!]!]!
    ): Hall

    buyTickets(
      sessionID: String!
      tickets: [String!]! 
    ): [Ticket!]
  }
`

module.exports = { typeDefs }
