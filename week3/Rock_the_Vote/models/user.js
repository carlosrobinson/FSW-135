const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    membersince: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: false,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)