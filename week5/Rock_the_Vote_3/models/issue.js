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
    upVote: {
      type: Number,
      required: false,
    }
  });

module.exports = mongoose.model("Issue", issueSchema)