const express = require("express")
const userRouter = express.Router()
const User = require('../models/user.js')


// Get All Users
userRouter.get("/", (req, res, next) => {
    User.find({user: req.params.userID},(err, user) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(user)
    })
  })

    // Get One User
    userRouter.get("/:userId", (req, res, next) => {
      User.find(
          {_id: req.params.userId},
         (err, foundUser) => {
                 if(err) {
                     res.status(500)
                     return next(err)
                 }
                 return res.status(201).send(foundUser)
             }
          )
       })

  // Add new User
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedUser)
    })
  })

  // Delete User
userRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete(
      { _id: req.params.userId },
      (err, deletedUser) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully delete user: ${deletedUser._id}`)
      }
    )
  })


  // Update User
userRouter.put("/:userId", (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true },
      (err, updatedUser) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedUser)
      }
    )
  })

  userRouter.put('/like/:userID', (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $inc: { likes: 1 }},
      { new: true },
      (err, updatedUser) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedUser)
      }
    )
  })

  module.exports = userRouter