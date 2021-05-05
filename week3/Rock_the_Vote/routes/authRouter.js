const express = require("express")
const authRouter = express.Router()
const Author = require('../models/author.js')


// Get All Authors
authRouter.get("/", (req, res, next) => {
    Author.find((err, author) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(author)
    })
  })


  // Get One Author
authRouter.get("/:authorId", (req, res, next) => {
    Author.find(
        {_id: req.params.authorId},
       (err, foundAuthor) => {
               if(err) {
                   res.status(500)
                   return next(err)
               }
               return res.status(201).send(foundAuthor)
           }
        )
     })

  // Add new Author
authRouter.post("/", (req, res, next) => {
    const newAuthor = new Author(req.body)
    newAuthor.save((err, savedAuthor) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedAuthor)
    })
  })

  // Delete Author
authRouter.delete("/:authorId", (req, res, next) => {
    Author.findOneAndDelete(
      { _id: req.params.authorId },
      (err, deletedAuthor) => {
        if(err){
          res.status(500) 
          return next(err)
        }
        return res.status(200).send(`Successfully delete author: ${deletedAuthor.name}`)
      }
    )
  })


  // Update Author
authRouter.put("/:authorId", (req, res, next) => {
    Author.findOneAndUpdate(
      { _id: req.params.authorId },
      req.body,
      { new: true },
      (err, updatedAuthor) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedAuthor)
      }
    )
  })

  module.exports = authRouter