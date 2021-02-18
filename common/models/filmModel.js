const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  posterLink: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Film', schema)
