const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
    }
})

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 8, (err,hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

module.exports = mongoose.model("User", userSchema)