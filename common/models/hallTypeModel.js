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
  seats: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Hall', schema)
