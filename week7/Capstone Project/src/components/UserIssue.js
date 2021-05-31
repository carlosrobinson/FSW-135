import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider.js'

export default function UserIssue(props){

  const { title, description, imgUrl, postDate, likes, dislikes, _id } = props

  const { 
    username,
    addLike, 
    addDisLike,
    getUserIssue
  } = useContext(UserContext)

  function getLIssue(e) {
    addLike(e)
    getUserIssue(_id)

  }

  function getDIssue(e) {
    addDisLike(e)
    getUserIssue(_id)
  }

  return (
    <div className="issue" id={_id} key={_id} > 
      <br/>
      <h1>{username}</h1>
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <img src={imgUrl} alt='Pic' width={300}/>
      <h3>{likes}</h3>
      <h3>{dislikes}</h3>
      <h3>{postDate}</h3>
      <> 
      <button onClick={getLIssue} >Like</button> 
      <button onClick= {getDIssue} >DisLike</button> 
      <br/>

      </>
    </div>
  ) 
}