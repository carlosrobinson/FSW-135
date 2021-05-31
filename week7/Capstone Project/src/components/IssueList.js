import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){

  const { issue} = props
  console.log(issue)

  return (
    <div className="issue-list">
      { issue.map(issue => <Issue {...issue} key={issue._id}/>) }
    </div>
  )
} 
