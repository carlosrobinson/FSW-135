const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    user:  {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issues: {
        type: Schema.Types.ObjectId,
        ref: "Issues",
        required: true
    }

})

module.exports = mongoose.model("Comment", commentSchema)