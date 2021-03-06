const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
        
    },
    imgUrl: {
        type: String,
        required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    postDate: {
      type: Date,
      default: Date.now
    },
  });

module.exports = mongoose.model("Issue", issueSchema)