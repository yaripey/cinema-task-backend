const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sessionID: {
    type: String,
    required: true
  },
  seat: {
    type: String,
    required: true
  },
  row: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Ticket', schema)
