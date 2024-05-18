import { useEffect, useState } from "react"
import CourseModal from "../../pages/Dashboard/CourseModal"
import { useDispatch, useSelector } from "react-redux"
import { getCourseData } from "../../../redux-toolkit/courseSlice"





const CourseRow=({handleEditModal,deleteButton})=>{
  const dispatch=useDispatch()
  const courseData=useSelector(state=>state.courseReducer?.courseData)
  console.log(courseData,'inside course rowwwwww');
  
  const [editModal,setEditModal]=useState(false)
  const handle=(id:string)=>{
    console.log('clickkkkk');
    
    handleEditModal(id)
  }
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
   
      courseData.map((data:any)=>{
        return (
          <>
          <div className='mx-auto pt-2 mb-4 bg-white  mt-2 '>
          <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
            <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
              <tr className="   ">
                <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                <img src={data.courseImage} className="h-10  ml-6"/>
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center">
                {data.courseName}
               
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                {data.courseDuration}
                    </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
               what
                </th>
               
               
                <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                <button className="bg-black text-white px-6 rounded-md  py-1" onClick={()=>{handle(data.id)}} >Edit</button>
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
                <button className="bg-black text-white px-4 rounded-md  py-1"   onClick={()=>{deleteButton(data.id)}}>Delete</button>
                </th>
               
              </tr>
            </thead>
          </table>
        </div>
        {/* <CourseModal isVisible={editModal}  onClose={} editData={editData} editImageFile={editImage}/> */}

</>

        )
      })
        


       
    )
}

export default CourseRow