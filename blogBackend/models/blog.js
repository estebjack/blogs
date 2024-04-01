const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    autor: String,
    url: String,
    votes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)


