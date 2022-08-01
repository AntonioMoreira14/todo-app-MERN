const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  msg: {
    type: String,
    trim: true
  }})

module.exports = mongoose.model('Todo', TodoSchema)