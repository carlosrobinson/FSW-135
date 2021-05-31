import React from 'react'
import Comments from './Comments'

export default function CommentList(props){
  const { comment } = props
  console.log(comment)
  return (
    <div className="commment-list">
      { comment.map(comment => <Comments {...comment} key={comment._id}/>) }
    </div>
  )
} 
