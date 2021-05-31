import React, {useContext, useState} from 'react'
import UserIssueList from './UserIssueList'

import { UserContext } from '../context/UserProvider.js'




export default function Public(props){
  const [displayIssue, setIssue] = useState(false)
  const {_id} =props
  const { 
    issue,
    comment,
    getUserIssue,
    getUserComment 
  } = useContext(UserContext)

  function toggleIssues () {
    setIssue(prevState => !prevState)
    if(!displayIssue){
      getUserIssue(_id)
      getUserComment(_id)
    }
  }



  return (

    <div className="public" id={_id} key={_id}>
      <br/>
        {displayIssue ?
        <>

          <UserIssueList 
            issue={issue} 
            key={issue._id} 
            getUserIssue={getUserIssue} 
            comment={comment} 
            getUserComment={getUserComment}
          />  
          </>
          : 
          <>
        <button onClick={toggleIssues}>Veiw Issue & Comments</button> 
        </>
        }
    </div> 
  )
}
 