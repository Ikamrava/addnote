import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import noteRoutes from './routes/note';
import userRoutes from "./routes/user"
import morgan from "morgan"
import cors from "cors"
import session from "express-session";
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";


const app = express();
app.use(cors())


app.use(morgan("dev"))

app.use(express.json())
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 
    },
    rolling:true,
    store:MongoStore.create({
        mongoUrl:env.MONGODB_DATABASE
    })

}))

app.use("/api/notes",noteRoutes)
app.use("/api/users",userRoutes)


app.use((req, res,next)=>{
    next(Error ("EndPoint not found"))

})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request, res:Response , next:NextFunction)=> {
    console.log(error)
    let errorMessage = "Something went wrong"
    if( error instanceof Error) {
        errorMessage = error.message
    }
    res.status(500).json({error: errorMessage})
})

export default app;