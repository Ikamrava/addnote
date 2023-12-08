
import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './types/note'
import axios from 'axios'

function App() {
  const [notes,setNotes] = useState<Note[]>([])

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
  {!notes ? <p>Loading...</p> :
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.title}</li>
        ))}
      </ul>
    </div>}
      
    </>
  )
}

export default App
