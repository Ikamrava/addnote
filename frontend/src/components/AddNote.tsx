
import { Button, Form, Modal } from 'react-bootstrap'
import { Note } from '../types/note'
import { useForm } from 'react-hook-form'

type Props = {
    onDismiss:()=>void
    onNoteSaved : (note:Note)=>void
    noteToEdit?:Note
}

function AddNote({onDismiss,onNoteSaved,noteToEdit}:Props) {

    async function createNote(note:Note):Promise<Note> {
        const response = await fetch('http://localhost:3000/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        return response.json();
    }

    async function updateNote(_id:string,note:Note){
        const response = await fetch(`http://localhost:3000/api/notes/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        return response.json();
    }



    const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm<Note>({
        defaultValues:{
            title:noteToEdit?.title || "",
            text:noteToEdit?.text || "",
        }

    })

    async function onSubmit(input:Note) {
        try {
            let noteResponse: Note
            if(noteToEdit){
                noteResponse = await updateNote(noteToEdit._id,input)
            }else{
                noteResponse = await createNote(input)
            }
            
            onNoteSaved(noteResponse)
            
        } catch (error) {
            console.log(error)
            alert("Error creating note")
        }
        
    }

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>{noteToEdit ? "Update Note":"Add Note"}</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>
                        {noteToEdit ? "Update Note":"Add Note"}
                        </Form.Label>
                        <Form.Control isInvalid={!!errors.title} type="text" placeholder="Enter Title" {...register("title",{required:"required"})} />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Description</Form.Label>
                        <Form.Control  as="textarea" rows={5} placeholder="Enter Description" {...register("text")} />
                        
                    </Form.Group>
                    <Button type="submit"  className=' bg-slate-700' disabled={isSubmitting}>Save Note</Button>
                </Form>
            </Modal.Body>
        <Modal.Footer>
            <Button type="button" className=" bg-red-400" onClick={onDismiss}>Close</Button>
        </Modal.Footer>


    </Modal>
  )
}

export default AddNote