import { Button, Navbar } from "react-bootstrap"
import { User } from "../types/user"
import Avatar from 'react-avatar';


type Props = {
  user:User,
  onLogout: () => void,
  }

function NavBarLoggedInView({user,onLogout}: Props) {

    async function logOut() {
        try {
            await fetch("http://localhost:3000/api/users/logout",{method:"POST"}) 
            onLogout()
        } catch (error) {
            alert(error)
            console.log(error)
        }
        
    }
  return (
    <>
    <Navbar.Text className="me-2">
      <Avatar name={user.username} round={true} size="25"/>
    </Navbar.Text>
    <Button onClick={logOut}>Logout</Button>
    </>
  )
}

export default NavBarLoggedInView