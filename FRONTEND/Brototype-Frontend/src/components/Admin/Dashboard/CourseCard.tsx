import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCourseData } from "../../../redux-toolkit/courseSlice"



const CourseCard=({})=>{
const dispatch=useDispatch()
const courseDetails=useSelector(state=>state.courseReducer?.courseData)

console.log();

  useEffect(()=>{
    const courseDetails= async ()=>{
    try{
      const response = await axiosInstance.get('/course/get-all-courses')
      console.log(response,'course');
       dispatch(getCourseData(response.data))
      
  }catch(error){

  }
    }
    courseDetails()

  },[])
    return (
        <>

        {
          courseDetails?.map((course:any)=>{
            return (
              <div className=" border w-fit rounded-md shadow-xl m-2 mt-10 mb-6 mt-0">
              <div className="bg-green-200  m-4  rounded-md border  ">
            
            <img src={course.courseImage} className="h-40 w-60 rounded-md" alt="" />
              </div>
              <div className="m-4">
                <div className="">
                  <span className="font-extrabold">{course.courseName}</span>
                </div>
              <div>
                <span className="text-gray-600">week-{course.courseDuration}</span>
              </div>
            
              </div>
            
            </div>

            )
          })
        }

        
        
        </>
    )
}

export default CourseCard