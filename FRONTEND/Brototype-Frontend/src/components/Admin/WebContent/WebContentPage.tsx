import { useEffect, useState } from "react"
import AllSearchTab from "../AllSearchTab"
import TableHead from "../TableHead"
import TableRow from "../TableRow"
import ContentModal from "./ContentModal"
import { useDispatch, useSelector } from "react-redux"
import { getContentData } from "../../../redux-toolkit/contentSlice"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const WebContentPage=()=>{
  const [editData,setEditData]=useState([])
    const dispatch=useDispatch()
    const content=useSelector(state=>state.contentReducer.contentData)
    const[counsellorPage,setCounsellorPage]=useState(false)
    const[branchPage,setBranchPage]=useState(false)
    const [contentModal,setContentModal]=useState(false)
    let buttonContent:string='+ Add content'
    const [contentPage,setContentPage]=useState(false)

      const handleContentModal=()=>{
        setContentModal(true)

       
      }

      useEffect(()=>{
        setContentPage(true)

        const contentData=async ()=>{
           const response=await axiosInstance.get('/content/all-contents')
           if(response){
            dispatch(getContentData(response.data))
           }

        }
        contentData()

      },[])
      const showToastMessage = (message:string,error:any) => {
      
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
            <span className="font-bold text-xl mt-8">Reviews </span>
            </div>
        </div>
        <div className="m-3">
        <AllSearchTab content={buttonContent} handleContentModal={handleContentModal} handleModal={()=>{}} counsellorPage={counsellorPage} branchPage={branchPage}  handleCounsellor={()=>{}} contentPage={contentPage}/>
        </div> 
         <div className="m-2 mt-4 ">
        <TableHead/>
        <TableRow content={content}/>
        </div>
        </div>
        <ContentModal  showToastMessage={showToastMessage} isVisible={contentModal} editData={editData} onClose={()=>{setContentModal(false)}} editImageFile={''}/>
        <ToastContainer />
        </>
    )
}


export default WebContentPage