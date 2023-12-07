import { RequestHandler } from "express";
import NoteModel from "../models/note";

export  const getNotes: RequestHandler = async (req, res,next) => {
    try {    
        const note = await NoteModel.find().exec()
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res,next) => {
    const id = req.params.id
    try {
        const note = await NoteModel.findById(id).exec()
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

export const createNote: RequestHandler = async (req, res,next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        const note = await NoteModel.create({title,text})
        res.status(201).json(note)
    } catch (error) {
        next(error)
    }
}