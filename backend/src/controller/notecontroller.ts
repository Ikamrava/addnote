import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"Invalid note id")
        }
        const note = await NoteModel.findById(id).exec()
        if(!note) {
            throw createHttpError(404,"Note not found")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

type CreateNoteBody = {
    title?: string
    text?: string
}

export const createNote: RequestHandler<unknown,unknown,CreateNoteBody,unknown> = async (req, res,next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        if(!title) {
            throw createHttpError(400,"Note must have a title")
        }

        const note = await NoteModel.create({title,text})
        res.status(201).json(note)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res,next) => {
    const id = req.params.id
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"Invalid note id")
        }
        const note = await NoteModel.findByIdAndDelete(id).exec()
        if(!note) {
            throw createHttpError(404,"Note not found")
        }
        res.sendStatus(204).json("The note has been deleted")
    } catch (error) {
        next(error)
    }
}

type UpdateNoteBody = {
    title?: string
    text?: string
}
type UpdateNoteParams = {
    id:string
}

export const updateNote: RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> = async (req, res,next) => {
    const id = req.params.id
    const newTitle = req.body.title
    const newText = req.body.text   
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"Invalid note id")
        }
        if(!newTitle) {
            throw createHttpError(400,"Note must have a title")
        }

        const note = await NoteModel.findById(id).exec()
        if(!note) {
            throw createHttpError(404,"Note not found")
        }
        note.title = newTitle
        note.text = newText
        const updatedNote = await note.save()
        res.status(200).json(updatedNote)

    } catch (error) {
        next(error)
    }
}