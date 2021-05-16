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
    issue: [] }
    const [userState, setUserState] = useState(initState)

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
            .catch (err => console.log(err.resp.data.errMsg))
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
            .catch (err => console.dir(err.res.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserState({
          user: {},
          token: "",
          issue: [],
        });
      }

      function getUserTodos(){
        userAxios.get("/api/todo/user")
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              todos: res.data
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
          .catch(err => console.log(err.res.data.errMsg))
      }

    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addIssue} }>
            { props.children }
        </UserContext.Provider>
    )
}