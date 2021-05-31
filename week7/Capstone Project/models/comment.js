const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    userID:  {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    username: {
        type: String,
        required: true
    },
    issueID: {
        type: Schema.Types.ObjectId,
        ref: "Issues",
        required: true 
    },
    postDate: {
      type: Date,
      default: Date.now
    }
}) 

module.exports = mongoose.model("Comment", commentSchema)