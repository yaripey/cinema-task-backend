const Film = require('../common/models/filmModel')
const Session = require('../common/models/sessionModel')
const Hall = require('../common/models/hallTypeModel')
const Ticket = require('../common/models/ticketModel')

const uuid = require('uuid')

const resolvers = {
  Film: {
    sessions: ({id}) => {
      return Session.find({filmID: id})
    }
  },

  Session: {
    film: ({filmID}) => {
      return Film.findOne({id: filmID})
    }
  },

  Query: {
    allFilms: () => {
      return Film.find({})
    },

    getFilm: async function(root, args) {
      return Film.findOne({id: args.id})
    },

    getFilmSessions: (root, args) => {
      return Session.findAll({filmID: args.id});
    },

    getHalls: () => {
      return Hall.find({})
    }
  },

  Mutation: {
    newFilm: (root, args) => {
      const film = new Film({...args, id: uuid.v4()})
      return film.save()
    },

    deleteFilm: (root, args) => {
      Film.deleteOne({ id: args.id }, (err) => {console.log('test', err)})
      return true
    },

    newSession: async (root, args) => {
      const chosenHall = await Hall.findOne({id: args.hallID})
      const session = new Session({
        filmID: args.filmID,
        time: args.time,
        date: args.date,
        seats: chosenHall.seats,
        id: uuid.v4()})
      return session.save()
    },

    newHall: (root, args) => {
      const hall = new Hall({...args, id: uuid.v4()})
      return hall.save()
    },

    buyTickets: async (root, args) => {
      const finalTickets = await createTickets(args.sessionID, args.tickets)
      return await finalTickets
    }
  }
}



const createTickets = async (sessionID, tickets) => {
  const session = await Session.findOne({id: sessionID})
  const saveTickets = tickets.map(ticketRowSeat => {
    const [row, seat] = ticketRowSeat.split('-');
    session.seats[parseInt(row)][parseInt(seat)] = 'u';
    const ticket = new Ticket({
      id: uuid.v4(),
      sessionID: session.id,
      seat,
      row,
    });
    return ticket.save();
  })
  
  const savedTicketsResolved = await Promise.all(saveTickets)
  const finalTickets = savedTicketsResolved.map(t => ({
    id: t.id,
    seat: t.seat,
    row: t.row,
    session
  }))
  session.markModified('seats')
  await session.save()
  return finalTickets
}


module.exports = { resolvers }
