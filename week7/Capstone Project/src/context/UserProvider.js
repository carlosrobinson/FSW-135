import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { user: JSON.parse(localStorage.getItem('user')) || {}, 
    token: localStorage.getItem('token') ||"",
    issue: [],
    errMsg: '',
    comment: []
 }
    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then (res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,   
                    token
                }))
            })
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then (res => { 
                    const {user, token} = res.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    setUserState(prevUserState => ({
                        ...prevUserState,
                        user,   
                        token
                    }))
            })
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() { 
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserState({
          user: {},
          token: "",
          issue: [],
          comment: []
        });
      }

      function getUserIssue(){
        userAxios.get("/api/issue")
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              issue: res.data
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      } 

      function getUserComment(){
        userAxios.get("/api/comment")
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              comment: res.data
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      } 




      function addIssue(newIssue) {
          userAxios.post('/api/issue', newIssue)
          .then(res => {
              setUserState(prevState => ({
                  ...prevState,
                  issue: [...prevState.issue, res.data]
              }))
          })
          .catch(err => console.log(err.response.data.errMsg))
      }

      function addLike(event) {
        const btnPar = event.target.parentNode
        const id = btnPar.id
        userAxios.put(`/api/issue/like/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addDisLike(event) {
        const btnPar2 = event.target.parentNode
        const id = btnPar2.id
        userAxios.put(`/api/issue/dislike/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addIssue, resetAuthErr, getUserIssue, addLike, addDisLike, getUserComment } }>
            { props.children }
        </UserContext.Provider>
    )
}