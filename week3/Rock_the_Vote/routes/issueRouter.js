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


  // Get One Issue
  issueRouter.get("/:issueId", (req, res, next) => {
    Issue.find(
        {_id: req.params.issueId},
       (err, foundIssue) => {
               if(err) {
                   res.status(500)
                   return next(err)
               }
               return res.status(201).send(foundIssue)
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

  // Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueId },
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully delete issue: ${deletedIssue.title}`)
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