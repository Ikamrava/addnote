import { Button } from "react-bootstrap"


type Props = {
    onSignupClicked:()=>void,
    onLoginClicked:()=>void
}

function NavBarLogedOut({onSignupClicked,onLoginClicked}: Props) {
  return (
   <>
   <Button onClick={onSignupClicked}>Sign Up</Button>
   <Button onClick={onLoginClicked}>Log in</Button>
   </>
  )
}

export default NavBarLogedOut