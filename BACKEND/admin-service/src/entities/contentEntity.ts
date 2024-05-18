import mongoose from "mongoose";

const contentSchema =new mongoose.Schema(
    {
        content:String,
        contentImage:String,
        active:{
            type:Boolean,
            default:false
        }

    },
    {
        timestamps:true
    }
  
)

const contentData=  mongoose.model('contentData',contentSchema)

export{contentData}