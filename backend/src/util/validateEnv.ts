import {cleanEnv} from 'envalid';
import {port, str} from 'envalid/dist/validators';


export default cleanEnv(process.env, {
    MONGODB_DATABASE: str(),
    PORT:port(),
    SESSION_SECRET:str(),

})
