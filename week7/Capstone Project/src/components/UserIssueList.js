import React from 'react'
import UserIssue from './UserIssue.js'

export default function UserIssueList(props){
  const { issue, _id } = props
  console.log(issue)
  return (
    <div className="user-list" id={_id}>
      { issue.map(issue => <UserIssue {...issue} key={issue._id}/>) }
    </div>
  )
}  