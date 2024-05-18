import { timeStamp } from "console";
import mongoose from "mongoose";


const companySchema= new mongoose.Schema({
    placementCount:Number,
    studentCount:Number,
    academicCounselllorCount:Number,
    CourseCount:Number,
    branches:[{_id:{
       type: mongoose.Schema.Types.ObjectId,auto:true
    },branchLocation:String},{timeStamp:true}],
    courseCategory:Array
})

const companyData= mongoose.model('companyData',companySchema)


export {companyData}