import { useState } from "react"
import ModalAcademic from "../ModalAcademic"


const CounsellorFilter=()=>{
    const [visible,setModalVisible]= useState(false)
    return (
        <>
          <div className=" border-b mt-2 flex justify-between items-center">
 <div className="m-2">
    <span className="font-bold text-xl">Members</span>
 </div>
 <div className="flex m-2 gap-4">
    <div className="">
    <span className="font-semibold">Active</span>
 </div>
  <div className="">
    <span className="text-gray-400">Popular</span>
 </div>
  <div className="">
    <span className="text-gray-400">Newest</span>
 </div>
 <div className="border border-2px rounded-md flex items-center px-2  cursor-pointer py-1" onClick={()=>{setModalVisible(true)}}>
    <span className="text-black text-md " >+  Add counsellor  </span>
 </div>
 </div>
 
</div>
     <ModalAcademic isVisible={visible} onClose={()=>{setModalVisible(false)}}/>   
        </>
    )
}


export default CounsellorFilter