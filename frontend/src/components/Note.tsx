import React from 'react'
import { Note as NoteType} from '../types/note'
import { Card } from 'react-bootstrap'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

type Props = {
   note:NoteType
}

function Note({note}: Props) {
    const {title,text,createdAt,updatedAt,_id} = note
    const deleteHandler = async () => {
       const res = await axios.delete(`http://localhost:3000/api/notes/${_id}`)
       console.log(res)
       if(res.status === 204){
        window.location.reload()
       }
    }

    const formatedDate = (date:string):string => {
        return new Date(date).toLocaleDateString("en-UK",{
            day:"numeric",
            month:"short",
            year:"numeric",
            hour:"numeric",
            minute:"numeric"
        })
    }

    let date:string
    if(updatedAt>createdAt){
        date = "Updated : " + formatedDate(updatedAt)
    }else{
        date = "Created : " + formatedDate(createdAt)
    }

  return (
    <Card className="bg-slate-300 shadow-lg" >
        <Card.Body className=' h-44'>
            <Card.Title className=' capitalize '>
            {title}
            </Card.Title>
            <Card.Text className='overflow-hidden'>
                {text}
            </Card.Text>
            
        </Card.Body>
        <Card.Footer className='  bg-slate-800 mb-2 text-white flex justify-between  '>
                <div className=' text-sm'>{date}</div>
                <div className=' flex gap-2'>
                <div className=' cursor-pointer text-white'><CiEdit size={20} /></div>
                <div className=' cursor-pointer text-red-600' onClick={deleteHandler}><AiOutlineDelete size={20}/></div>
                </div>
               
                
        </Card.Footer>

        
    </Card>
  )
}

export default Note