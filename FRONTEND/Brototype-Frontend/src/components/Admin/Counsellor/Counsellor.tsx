import { useEffect, useState } from "react"
import AllSearchTab from "../AllSearchTab"
import TableHeadCoun from "./TableHeadCoun"
import TableRowCoun from "./TableRowCoun"
import ModalAcademic from "../ModalAcademic"



const Counsellor=()=>{
    const [counsellorPage,setCounsellorPage]=useState(false)
    const [branchPage,setBranchPage]=useState(false)
    const [counsellorModal,setCounsellorModal]=useState(false)

    const handleCounsellor=()=>{
        setCounsellorModal(true)

    }
    useEffect(()=>{
        setCounsellorPage(true)

    })
    let buttonContent='+ Add counsellor'
    return (
        <>
           <div className="bg-white rounded-md h-fit mt"> 
         <div className="">
  
</div>
         
        <div className="ml-3  ">
            <div className="mb-3 ">
            <span className="font-bold text-xl mt-8">Academic counsellors </span>
            </div>
        </div>
        <div className="m-3">
        <AllSearchTab content={buttonContent} counsellorPage={counsellorPage} branchPage={branchPage} handleModal={()=>{}} handleCounsellor={()=>{handleCounsellor()}}/>
        </div>
         <div className="m-2 mt-4 ">
        <TableHeadCoun/>
        <TableRowCoun/>
        </div>
        </div>

        <ModalAcademic isVisible={counsellorModal}  onClose={()=>{setCounsellorModal(false)}} />
        </>
    )
}


export default Counsellor