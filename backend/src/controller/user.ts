import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt"
import session from "express-session";

export const getAuthenticatedUser: RequestHandler = async(req,res,next)=>{
    const authenticatedUserId = req.session.userId
    console.log(authenticatedUserId)
    try {
        if(!authenticatedUserId){
            throw createHttpError(401,'User not authenticated')
        }
        const user = await UserModel.findById(authenticatedUserId).select('+email').exec()
        res.status(200).json(user)
    
        
    } catch (error) {
        next(error)
        
    }
}

interface SignUpBody {
  username?:string
  email?: string;
  password?: string;
}
export const signUp: RequestHandler<unknown,unknown,SignUpBody,unknown> = async(req,res,next)=>{
    const {username,email,password} = req.body
  try {
    if(!username || !email || !password){
      throw createHttpError(400,'Missing required fields')
    }

    const existingUser = await UserModel.findOne({username}).exec()
    if(existingUser){
        throw createHttpError(409,'Username already taken')
    }

    const existingEmail = await UserModel.findOne({email}).exec()
    if(existingEmail){
        throw createHttpError(409,'Email already exist')
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await UserModel.create({
        username,
        email,
        password : hashedPassword
    })
    req.session.userId = newUser._id

    res.status(201).json(newUser)
    
  } catch (error) {
    next(error)
  }

}


interface LoginBody {
    username?:string
    password?:string
}

export const login: RequestHandler<unknown,unknown,LoginBody,unknown> = async(req,res,next)=>{
    const username = req.body.username
    const password = req.body.password

    try {
        if(!username || !password){
            throw createHttpError(400,'Missing required fields')
        }

        const user = await UserModel.findOne({username}).select("+password +email").exec()

        if(!user){
            throw createHttpError(401,'Invalid credentials')
        }
        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            throw createHttpError(401,'Invalid credentials')
        }
        req.session.userId = user._id
        console.log('Before setting userId:', req.session);
        req.session.userId = user._id;
        console.log('After setting userId:', req.session);
        return res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

export const logout:RequestHandler = async(req,res,next)=>{
    req.session.destroy(error =>{
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}
