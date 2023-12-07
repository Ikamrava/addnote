import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import noteRoutes from './routes/note';


const app = express();

app.use(express.json())

app.use("/api/notes",noteRoutes)


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