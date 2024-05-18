import mongoose from "mongoose";


export const connectDb=async (mongoUri:any)=>{
    try{
        await mongoose.connect(mongoUri)
        console.log("mongodb database connected");
        

    }
    catch(error){
        console.log('Error connecting to the mongoDB database:',error);
        process.exit(1)
        
    }

}