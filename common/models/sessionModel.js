const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  }, 
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  filmID: {
    type: String,
    required: true
  },
  seats: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Session', schema)
