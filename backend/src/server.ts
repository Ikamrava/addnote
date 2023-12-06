import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import env from "./util/validateEnv"


const app = express();
const port = env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!');
})

mongoose.connect(env.MONGODB_DATABASE)
.then(() => {
    console.log("connected to mongodb")
    app.listen(port, () => {
        console.log("server started")
    })
})
.catch(err => {
    console.log(err)
})


