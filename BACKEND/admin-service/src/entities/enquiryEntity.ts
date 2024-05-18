import mongoose from "mongoose";


const enquirySchema=new mongoose.Schema({
    name:String,
    email:String,
    mobileNumber:Number,
    qualification:String,
    preferredLocation:String
})


const enquiryData= mongoose.model('enquiryData',enquirySchema)

export {enquiryData}