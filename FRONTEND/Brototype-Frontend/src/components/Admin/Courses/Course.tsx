import { useEffect, useState } from "react"
import AllSearchTab from "../AllSearchTab"
import CourseHead from "./CourseHead"
import CourseRow from "./CourseRow"
import { useDispatch, useSelector } from "react-redux"
import { getCourseData } from "../../../redux-toolkit/courseSlice"
import CourseModal from "../../../pages/Admin/Dashboard/CourseModal"
import DeleteCourse from "./DeleteCourse"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Course=()=>{
    const [deleteModal,setDeleteModal]=useState(false)
    const [deletCourseId,setdeleteCourseId]=useState('')
    let buttonContent='+ Add Course'
    const  handleCourseModal=()=>{
      console.log('this is from seracjjj')
    setCoursesModal(true)
    }
    const [coursesModal,setCoursesModal]=useState(false)
    const [coursePage,setCoursePage]=useState(false)
    const dispatch=useDispatch()
   const courseData=useSelector(state=>state.courseReducer.courseData)
   const [course,setCourse] =useState(false)
   //
   const [editData,setEditData]=useState([])
   const [editImage,setEditImage]=useState({url:'',type:'image/jpg'}) 
   const handleEditModal=  (id:string)=>{
 console.log(id,'handleModal');
 
     const filteredData:any= courseData.filter((data:any)=> id===data.id)
     console.log(filteredData,'filterrr'); 
     setEditData(filteredData)
     setEditImage({url:filteredData[0].courseImage,type:'image/jpg'})
     //setEditModal(true)
     setCoursesModal(true)
     
   }
   ///

   const handleCloseModal=()=>{
    setEditData([])
    setEditImage({url:'',type:'image/jpg'})
   }

   const closeCourseModal=()=>{
    console.log('close course modal');
    
    setCoursesModal(false)
   }
    useEffect(()=>{
       
      setCoursePage(true)
        const courseData=async ()=>{

          const response=await axiosInstance.get('/course/all-courses')
          if(response){

            dispatch(getCourseData(response.data))
       
          }

        }
    },[courseData])
     const handleDelete=(id:string)=>{
      console.log('delete modal active',id);

      setdeleteCourseId(id)
      console.log(deletCourseId,'deleteid');
      
         
      setDeleteModal(true)
     
      
     }
     const handleToast=(message:any,error:any)=>{
      if(!error){
        toast.success(message, {
          position: 'top-center',
          autoClose: 3000
        });

      }
      else{
        toast.error(message, {
          position: 'top-center',
          autoClose: 3000
        });


      
     }
    }
  
    return (
        <>
           <div className="bg-white rounded-md h-fit mt"> 
         <div className="">
  
</div>
         
        <div className="ml-3  ">
            <div className="mb-3 ">
            <span className="font-bold text-xl mt-8">Courses </span>
            </div>
        </div>
        <div className="m-3">
        <AllSearchTab content={buttonContent} handleCourseModal={handleCourseModal} coursePage={coursePage}  />
        </div>
         <div className="m-2 mt-6 ">
        <CourseHead/>
        <CourseRow courseData={courseData} handleEditModal={handleEditModal} deleteButton={handleDelete} />
        </div>
        </div>
        <CourseModal handleToast={handleToast}   isVisible={coursesModal}   onClose={closeCourseModal} editData={editData} editImageFile={editImage} handleCloseModal={handleCloseModal}/>
        <DeleteCourse handleToast={handleToast} isVisible={deleteModal}  showDeleteModal={()=>{setDeleteModal(false)}} id={deletCourseId} />
        <ToastContainer />
       </>
    )  
  
}



export default Course