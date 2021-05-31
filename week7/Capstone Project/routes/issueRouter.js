const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')


// Get All Issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issue)
    })
  }) 

  // Get issue by user id
  issueRouter.get('/user/:userId', (req, res, next) => {
    Issue.find({user: req.params.userId},(err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })
 

  // Get One Issue
  issueRouter.get("/:issueId", (req, res, next) => {
    Issue.find(
        {_id: req.params.issueId},
       (err, issues) => {
               if(err) {
                   res.status(500)
                   return next(err)
               }
               return res.status(201).send(issues)
           }
        )
     })

  // Add new Issue
  issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedIssue)
    })
  })
  

// Like a Issue
  issueRouter.put("/like/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      { $inc: { likes: 1} },
      { new: true },
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })

  // Dislike an Issue
issueRouter.put("/dislike/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    {_id: req.params.issueId},
    {$inc: {dislikes: 1}},
    {new: true},
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
    }
  )
})




  // Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueId },
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully delete issue: ${deletedIssue._id}`)
      }
    )
  })


  // Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })

  module.exports = issueRouter