const express = require("express")
const authRouter = express.Router()
const User = require('../models/user.js')
const Issue = require('../models/issue.js')
const jwt = require('jsonwebtoken')




  // Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error('Username Already Exists'))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser })
    })
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  const failedLogin = 'Username or Password is Incorrect'
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    } 
    if(!user){
      res.status(403)
      return next(new Error(failedLogin))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if(err) {
        res.status(403)
        return next(new Error(failedLogin))
      }
      if(!isMatch) {
        res.status(403)
        return next(new Error(failedLogin))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
})

// //Issue
// authRouter.post("/issue", (req, res, next) => {
//   Issue.findOne({ title: req.body.title.toLowerCase() }, (err, issue) => {
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     if(issue){
//       res.status(403)
//       return next(new Error('Issue Already Exists'))
//     }
//     const newIssue = new Issue(req.body)
//     newIssue.save((err, savedIssue) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       const token = jwt.issue(savedIssue.toObject(), process.env.SECRET)
//       return res.status(201).send({ token, issue: savedIssue })
//     })
//   })
// })



  module.exports = authRouter