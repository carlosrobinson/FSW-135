import React from 'react'


export default function Issue(props){

  const { title, description, imgUrl, likes, dislikes, _id } = props
  return (
    <div className="issue" id={_id} key={_id} >
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <h3>{likes}</h3>
      <h3>{dislikes}</h3>
      
      <img src={imgUrl} alt='Pic' width={300}/>
    </div>
  ) 
}
