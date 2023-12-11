import { Button, Form, Modal } from 'react-bootstrap'
import { User, logInCredentials } from "../types/user"
import { useForm } from 'react-hook-form'



type Props = {
    onDismiss:()=>void,
    onLogin:(user:User)=>void,
}


function Login({onDismiss,onLogin}: Props) {

    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<logInCredentials>()

    async function onSubmit(credential:logInCredentials) {
        try {
                const res = await fetch("http://localhost:3000/api/users/login",
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method:"POST",
                  body:JSON.stringify(credential)
              
              })
                onLogin(await res.json())
                
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }




  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Group className="mb-3" controlId="username">
                   <Form.Label>Username</Form.Label>
                   <Form.Control isInvalid={!!errors.username} type="username" placeholder="Enter Username" {...register("username",{required:"required"})} />
                   <Form.Control.Feedback type="invalid">
                       {errors.username?.message}
                   </Form.Control.Feedback>
               </Form.Group>
    
               <Form.Group className="mb-3" controlId="password">
                   <Form.Label>Password</Form.Label>
                   <Form.Control isInvalid={!!errors.password} type="password" placeholder="Password" {...register("password",{required:"required"})} />
                   <Form.Control.Feedback type="invalid">
                       {errors.password?.message}
                   </Form.Control.Feedback>
               </Form.Group>
               <Button className=' bg-slate-800' type="submit" disabled={isSubmitting}>Login</Button>
           </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className=' bg-red-800' onClick={onDismiss}>Close</Button>
        </Modal.Footer>

        
    </Modal>
  )
}

export default Login
