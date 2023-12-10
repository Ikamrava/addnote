import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt"

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
        res.status(201).json(user)

    } catch (error) {
        next(error)
    }
}