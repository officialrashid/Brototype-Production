import mongoose from "mongoose";


const courseSchema=new mongoose.Schema({

    courseName:String,
    courseDuration:String,
    category:String,
    courseImageUrl:String

})



const courseData= mongoose.model('courseData',courseSchema)

export {courseData}