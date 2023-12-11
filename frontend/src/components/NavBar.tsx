import Navbar from 'react-bootstrap/Navbar';
import { User } from "../types/user"
import { Container } from 'react-bootstrap';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLogedOut from './NavBarLogedOut';

type Props = {
    loggedInUser: User | null;
    onSignUpClicked: () => void;
    onSignInClicked: () => void;
    onSignOutSuccess: () => void;


}

function NavBar({loggedInUser,onSignUpClicked,onSignInClicked,onSignOutSuccess}: Props) {
  return (
    <Navbar expand="lg" bg="primary" variant="primary" sticky='top'>
      <Container>
      <Navbar.Brand href="#">Note App</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Navbar.Text className='ms-auto'>
          {
            loggedInUser ? 
            <NavBarLoggedInView user={loggedInUser} onLogout={onSignOutSuccess}/>:
            <NavBarLogedOut onSignupClicked={onSignUpClicked} onLoginClicked={onSignInClicked}/>
          }
        </Navbar.Text>
      </Navbar.Collapse>


      </Container>
    </Navbar>
  )
}

export default NavBar