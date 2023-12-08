
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Note as NoteType} from './types/note'
import Note from './components/Note'
import { Button, Container, Row } from 'react-bootstrap'
import AddNote from './components/AddNote'

function App() {
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


  

  return (
    <>
    <Container className=' mt-3'>
      <Button className=' bg-slate-700'  onClick={() => setShowAdd(true)}>Add Note</Button>
      <Row xs={1} md={2} lg={3} xl={4} className='justify-content-center gap-2 '>
        {notes && notes.length > 0 ? notes.map((data) =>
         <Note  key={data._id} note={data}/>) : <p>Loading...</p>}
      </Row>
        {
        showAdd && <AddNote onDismiss={() => setShowAdd(false)}/>
        }
    
    </Container>
  
    </>
  )
}

export default App
