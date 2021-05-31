const express = require("express")
const commentsRouter = express.Router()
const Comment = require('../models/comment.js')


// Get All Comment
commentsRouter.get("/", (req, res, next) => {
    Comment.find((err, comment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })


  // Get One Comment by user id
commentsRouter.get("/user/:commentId", (req, res, next) => {
    Comment.find({user: req.params.commentId},(err, comment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })

  // Add new Comment
commentsRouter.post("/", (req, res, next) => {
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
  commentsRouter.put('/like/:commentID', (req, res, next) => {
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
commentsRouter.put('/dislikes/:commentID', (req, res, next) => {
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
commentsRouter.delete("/:commentId", (req, res, next) => {
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
commentsRouter.put("/:commentId", (req, res, next) => {
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

module.exports = commentsRouter
