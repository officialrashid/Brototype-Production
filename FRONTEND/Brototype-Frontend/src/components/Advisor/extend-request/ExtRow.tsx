import { useState } from "react"
import ReqModal from "./ReqModal"
import ExtActionModal from "./ExtActionModal"
import ExtRejectModal from "./ExtActionModal"
import ExtApproveModal from "./ExtApproveModal"
import axios from "axios"
import Api from "../../../utils/baseUrl/reviewBaseUrl"
import { useSelector } from "react-redux"




const ExtRow=({extData,handleToast})=>{
  const advisorId: any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
  const [reqModal,setReqModal]=useState(false)
  const [action,setActionModal]=useState(false)
  const [approve,setApprove]=useState(false)

  const rejectFn=async()=>{

    const response=await Api.get(`/review/change-extend-request-status?coordinatorId=${advisorId}&reviewId=${68886}&type=reject`)
    if(response.data.success){
      handleToast("Request rejected",)

    }

  }
  const approveFn=async ()=>{

  try{
    handleToast("Request approved successfully",)
//     const response=await Api.get(`/review/change-extend-request-status?coordinatorId=${advisorId}&reviewId=${7868}&type=approve`)
//     if(response.data.success){
//       handleToast("Request approved successfully",)
//     }
// else{
//   let error=true
//   handleToast('There is an error while udating',error)
// }
  }catch(error){
    handleToast('There is an error occured',error)

  }
    
  }

    return (
        <>
             <div className='mx-auto pt-2 mb-2 mt-2 font-roboto' >
  <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
    <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
      <tr className="   ">
        <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
sachin
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center">
            hello
       
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
haiiii
            </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       what
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       what
        </th>
       
        <th scope="col" className="w-1/4 px-4 py-6 text-center ">
        <button className="bg-black text-white px-6 rounded-md  py-1" onClick={()=>{setReqModal(true)}}>View</button>
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
        <button className="bg-black text-white px-4 rounded-md  py-1"  onClick={()=>{setApprove(true)}}>Approve</button>
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
        <button className="bg-black text-white px-4 rounded-md  py-1"onClick={()=>{setActionModal(true)}}  >Reject</button>
        </th>
       
      </tr>
    </thead>
  </table>
</div>
     <ReqModal isVisible={reqModal} onClose={()=>{setReqModal(false)}}/>   
     <ExtRejectModal  isVisible={action} onClose={()=>{setActionModal(false)}} rejectFn={rejectFn}/>
     <ExtApproveModal isVisible={approve} onClose={()=>{setApprove(false)}} approveFn={approveFn}/>

        </>
    )
}

export default ExtRow