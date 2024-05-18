import mongoose from "mongoose";  
import dotenv from 'dotenv'


dotenv.config()

const config={
    mongo:{
        uri:process.env.REVIEW_MONGO_URL
    }
}

const connectDB=async (config:any)=>{

    try{
        await mongoose.connect(config.mongo.uri)
        console.log('Database connected successfully');
        

    }catch(error){

        console.log(error);
        

    }

    
    
}

export {config,connectDB}