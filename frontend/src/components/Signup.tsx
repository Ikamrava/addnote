
import { useForm } from 'react-hook-form'
import { SignUpCredentials, User } from '../types/user'
import { Button, Form, Modal } from 'react-bootstrap'

type Props = {
    onDismiss:()=>void,
    onSignup:(user:User)=>void,

}

function Signup({onDismiss,onSignup}: Props) {

    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<SignUpCredentials>()

    async function onSubmit(credential:SignUpCredentials) {
        try {
                const res = await fetch("http://localhost:3000/api/users/signup",
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method:"POST",
                  body:JSON.stringify(credential)
              
              })
                onSignup(await res.json())
                
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }
  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
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
               <Form.Group className="mb-3" controlId="email">
                   <Form.Label>Email</Form.Label>
                   <Form.Control isInvalid={!!errors.email} type="email" placeholder="Enter Email" {...register("email",{required:"required"})} />
                   <Form.Control.Feedback type="invalid">
                       {errors.email?.message}
                   </Form.Control.Feedback>
               </Form.Group>
               <Form.Group className="mb-3" controlId="password">
                   <Form.Label>Password</Form.Label>
                   <Form.Control isInvalid={!!errors.password} type="password" placeholder="Password" {...register("password",{required:"required"})} />
                   <Form.Control.Feedback type="invalid">
                       {errors.password?.message}
                   </Form.Control.Feedback>
               </Form.Group>
               <Button className=' bg-slate-800' type="submit" disabled={isSubmitting}>Signup</Button>
           </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className=' bg-red-800' onClick={onDismiss}>Close</Button>
        </Modal.Footer>

        
    </Modal>

  )
}

export default Signup