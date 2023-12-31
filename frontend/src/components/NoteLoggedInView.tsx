import { useEffect, useState } from 'react'
import AddNote from '../components/AddNote'
import { Note as NoteType} from '../types/note'
import { Button, Row } from 'react-bootstrap'
import axios from 'axios'
import Note from '../components/Note'




function NoteLoggedInView() {

    const [noteToEdit,setNoteToEdit] = useState<NoteType | null>(null)
    const [notes,setNotes] = useState<NoteType[]>([])
    const [showAdd,setShowAdd] = useState(false)

    const fetchNotes = async () => {
        const response = await axios.get("http://localhost:3000/api/notes")
        setNotes(response.data)
        console.log(response.data)
        }
      
        useEffect(() => {
          fetchNotes()
        },[])

  async function deleteNote(note:NoteType) {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${note._id}`)
      setNotes(notes.filter(data => data._id !== note._id))
      
    } catch (error) {
      console.log(error)
      alert("Error deleting note")
    }
  }

  return (
    <>
    <Button className=' bg-slate-700 mb-4'  onClick={() => setShowAdd(true)}>Add Note</Button>
      <Row xs={1} md={2} lg={3} xl={4} className='justify-content-center gap-2 '>
        {notes && notes.length > 0 ? notes.map((data) =>
         <Note onDeleteNote={deleteNote} onEditClicked={(note) => {setNoteToEdit(note)}}
               key={data._id} note={data}/>) : <p>Loading...</p>}
      </Row>
        {
        showAdd && <AddNote onDismiss={() => setShowAdd(false)} onNoteSaved={(newNote)=>{
          setShowAdd(false)
          setNotes([...notes,newNote])
        }}/>
        }
        
    {noteToEdit && <AddNote
        onDismiss={() => setNoteToEdit(null)}
        noteToEdit={noteToEdit}
        onNoteSaved={(updatedNote)=>{
        setNoteToEdit(null)
        setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note))
       }}/>
      }
     
      </>
  )
}

export default NoteLoggedInView