
import { useEffect, useState } from 'react'



import NavBar from './components/NavBar'
import NoteLoggedInView from './components/NoteLoggedInView'
import { Container } from 'react-bootstrap'
import Signup from './components/Signup'
import Login from './components/Login'
import { User } from './types/user'
import LoggedOutView from './components/LoggedOutView'

function App() {
  const [loggedUser,setLoggedUser] = useState<User|null>(null)
  const [showSignup,setShowSignup] = useState(false)
  const [showLogin,setShowLogin] = useState(false)

  async function fetchData(input:RequestInfo,init?:RequestInit) {
    const res = await fetch(input,init)
    if(res.ok){
      return res
    }else{
      const errorBody =await res.json()
      const errorMessage = await errorBody.error;
      throw Error(errorMessage)
      
    }
    
  }

  async function getLoggedInUser():Promise<User> {
    const res = await fetchData("http://localhost:3000/api/users",{method:"GET"})
    return res.json()
    
  }

  useEffect(()=>{
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser()
        setLoggedUser(user)        
      } catch (error) {
        console.log(error)
      }
    }
    fetchLoggedInUser()
    
  },[])
    
  return (
    <>
    <NavBar loggedInUser = {loggedUser} onSignUpClicked ={()=>{setShowSignup(true)}} onSignInClicked={()=>{setShowLogin(true)}} onSignOutSuccess={()=>{setLoggedUser(null)}}/>
    <Container className=' mt-3'>
      {
        loggedUser ? <NoteLoggedInView/> : <LoggedOutView/>
      }
     
    </Container>
    {showSignup &&
        <Signup  onDismiss ={()=>{setShowLogin(false)}} onSignup={(user)=>{
          setLoggedUser(user)
          setShowSignup(false)
        }}/>          
      }
      {showLogin &&
        <Login  onDismiss ={()=>{setShowLogin(false) }} onLogin={(user)=>{
          setLoggedUser(user)
          setShowLogin(false)}}/>          
      }
  
    </>
  )
}

export default App
