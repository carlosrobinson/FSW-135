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


  // Get One Comment
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.find(
        {_id: req.params.commentId},
       (err, foundComment) => {
               if(err) {
                   res.status(500)
                   return next(err)
               }
               return res.status(201).send(foundComment)
           }
        )
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

  module.exports = commentRouter