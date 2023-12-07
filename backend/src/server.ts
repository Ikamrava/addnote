
import mongoose from 'mongoose';
import app from "./app"
import env from "./util/validateEnv"



const port = env.PORT

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


