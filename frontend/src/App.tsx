
import { useEffect, useState } from 'react'



import NavBar from './components/NavBar'
import NoteLoggedInView from './components/NoteLoggedInView'
import { Container } from 'react-bootstrap'
import Signup from './components/Signup'
import Login from './components/Login'
import { User } from './types/user'

function App() {
  const [loggedUser,setLoggedUser] = useState<User|null>(null)
  const [showSignup,setShowSignup] = useState(false)
  const [showLogin,setShowLogin] = useState(false)

  async function getLoggedInUser() {
    try {
      const res = await fetch("http://localhost:3000/api/users",{method:"GET"})
      const data = await res.json()
      setLoggedUser(data)
      console.log(loggedUser)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    try {
      getLoggedInUser()
      
    } catch (error) {
      console.log(error)
    }
    
  },[])
    








 

  



  return (
    <>
    <NavBar loggedInUser = {loggedUser} onSignUpClicked ={()=>{setShowSignup(true)}} onSignInClicked={()=>{setShowLogin(true)}} onSignOutSuccess={()=>{setLoggedUser(null)}}/>
    <Container className=' mt-3'>
      <NoteLoggedInView />
      {showSignup &&
        <Signup  onDismiss ={()=>{}} onSignup={()=>{}}/>          
      }
      {showLogin &&
        <Login  onDismiss ={()=>{setShowLogin(false) }} onLogin={()=>{setLoggedUser(loggedUser)}}/>          
      }
    </Container>
  
    </>
  )
}

export default App
