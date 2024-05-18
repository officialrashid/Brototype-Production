import { useEffect, useState } from "react"
import AllSearchTab from "../AllSearchTab"
import BranchHead from "./BranchHead"
import BranchModal from "./BranchModal"
import BranchRow from "./BranchRow"
import { getBranchData } from "../../../redux-toolkit/branchSlice"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Branch=()=>{
    const [deleteModal,setDeleteModdal]=useState(false)
    const [editData,setEditData]=useState([])
    const [branchPage,setBranchPage]=useState(false)
    const [visible,setModalVisible]=useState(false)
    const [counsellorPage,setCounsellorPage]=useState(false)
    const handleBranchModal=()=>{
        console.log('called');
        
    
    setModalVisible(true)
    
    }
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
 


    const dispatch=useDispatch()
    const branches=useSelector(state=>state.branchReducer?.branchData)
  useEffect(()=>{
    setBranchPage(true)
    const branchData=async()=>{
  
      const response= await axiosInstance.get('/branch/all-branches')
  
      dispatch(getBranchData(response.data))
  
    }
    branchData()
  },[branches])


  const editFn=(id:string)=>{
console.log(id,'iddd');
 
     const filteredData=branches.filter(data=>{
      return data.id===id
     })
    console.log(filteredData);
    setEditData(filteredData)
    
  handleBranchModal()
  }
  const handleCloseModal=()=>{
    setEditData([])
  }

 

 
         let buttonContent='+ Add branches'
    return (
        <>
           <div className="bg-white rounded-md h-fit mt"> 
         <div className="">
  
</div>
         
        <div className="ml-3  ">
            <div className="mb-3 ">
            <span className="font-bold text-xl mt-8">Branches </span>
            </div>
        </div>
        <div className="m-3">
        <AllSearchTab  counsellorPage={counsellorPage}  content={buttonContent} branchPage={branchPage}  handleModal={()=>{handleBranchModal()}}/>
        </div>
         <div className="m-2 mt-4 ">
        <BranchHead/>
        <BranchRow branchData={branches} editFn={editFn} showToastMessage={showToastMessage} />
        </div>
        </div>
        <BranchModal isVisbile={visible} handleCloseModal={handleCloseModal} editData={editData} onClose={()=>{setModalVisible(false)}} showToastMessage={showToastMessage} />
        <ToastContainer />
        </>
        
    )
}

export default Branch