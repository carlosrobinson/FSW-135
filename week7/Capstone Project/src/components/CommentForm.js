import React from 'react'

export default function Form(props){
    const {topic} =props
    return (
     <div>
        <textarea
        type= "text"
        name="topic"
        value={topic}
        />
        <button></button>
    </div>
    )
}