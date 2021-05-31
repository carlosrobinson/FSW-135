import React from 'react'



export default function Comment(props){
    const {topic, _id } = props
  
  
    return (
      <div className="issue" key={_id}  >
        <h1>{ topic }</h1>
      </div>
    ) 
  }
  