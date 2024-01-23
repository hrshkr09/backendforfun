import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{

    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! BD HOST : ${connectionInstance.connection.host}`)
    }catch(error){

        console.log("MONGODB CONNECTION FAILED: ",error);
        process.exit(1)// Reaqd about this line more

    }
}

export default connectDB