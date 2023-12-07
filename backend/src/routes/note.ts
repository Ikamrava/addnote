
import *  as NoteController from "../controller/notecontroller"
import express from 'express';

const router = express.Router()
router.get('/', NoteController.getNotes )
router.post('/', NoteController.createNote )
router.get('/:id', NoteController.getNote )

export default router