const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')


// Get All Comment
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })


  // Get One Comment by user id
commentRouter.get("/user/:commentId", (req, res, next) => {
    Comment.find({user: req.params.commentId},(err, comment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })

  // Add new Comment
commentRouter.post("/", (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedComment)
    })
  })

  //add Like by user Id
  commentRouter.put('/like/:commentID', (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentID },
      { $inc: { likes: 1 }},
      { new: true },
      (err, updatedComment) => {
        if(err) {
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )
  })

    // Dislike an Issue
commentRouter.put('/dislikes/:commentID', (req, res, next) => {
  Comment.findOneAndUpdate(
    {_id: req.params.commentID},
    {$inc: {dislikes: 1}},
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedComment)
    }
  )
})

  // Delete Comment
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
      { _id: req.params.commentId },
      (err, deletedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully delete comment: ${deletedComment._id}`)
      }
    )
  })


  // Update Comment
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )
  })

module.exports = commentRouter
