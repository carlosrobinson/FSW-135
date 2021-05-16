import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){
  const { issue } = props
  return (
    <div className="todo-list">
      { issue.map(issue => <Issue {...issue} key={issue._id}/>) }
    </div>
  )
} 