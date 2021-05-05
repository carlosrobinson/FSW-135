const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Authentication", authSchema)