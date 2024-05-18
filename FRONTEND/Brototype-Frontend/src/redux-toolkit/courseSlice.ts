import { createSlice } from "@reduxjs/toolkit";


const courseSlice=createSlice({
    name:'courseData',
    initialState:{
        courseData:[]
    },
    reducers:{
        getCourseData:(state,action)=>{
            state.courseData=action.payload.map((data:any)=>{
                return {id:data._id,courseName:data.courseName,courseDuration:data.courseDuration,courseImage:data.courseImageUrl}
            })
        },
    
    editCourseData:(state:any,action:any)=>{
      
       
        let index=state.courseData.findIndex((data:any)=>data.id===action.payload._id)
        console.log(index,'indexxxxx');
        state.courseData[index]={
            id:action.payload.id=action.payload._id,
            courseName:action.payload.courseName,
            courseDuration:action.payload.courseDuration,
            courseImage:action.payload.courseImageUrl

        }
        
    },
    deleteCourse:(state:any,action:any)=>{
console.log(action.payload,'actionnnn');

        state.courseData=state.courseData.filter((course:any)=>{
            return course.id !== action.payload

        })

    },
    addCourse:(state:any,action:any)=>{
        console.log('addcourse action called',action.payload);
        
        state.courseData.push({
            id:action.payload.id=action.payload._id,
            courseName:action.payload.courseName,
            courseDuration:action.payload.courseDuration,
            courseImage:action.payload.courseImageUrl})
    }
}
})

export const {getCourseData,deleteCourse,editCourseData,addCourse} =courseSlice.actions
export default courseSlice.reducer