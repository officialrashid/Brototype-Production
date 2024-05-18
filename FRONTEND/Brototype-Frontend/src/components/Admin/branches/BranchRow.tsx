import { useState } from "react"
import DeleteModal from "../Delete"



const BranchRow=({branchData,editFn,showToastMessage})=>{
  const [isVisbile,setIsVisible]=useState(false)
  const [deleteId,setdeleteId]=useState('')

  const handleEditBranch=()=>{

  }
  
    return (
        <>
        {
          branchData?.map(branch=>{
            return (
              <div className='mx-auto pt-2 mb-2 bg-white '  >
              <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
                <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
                  <tr className="   ">
                    <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                   {branch.branchName}
                    </th>
                    <th scope="col" className="w-1/4 px-4 py-6 text-center">
                    12-03-2023
                   
                    </th>
                   
                    <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                    <button className="bg-black text-white px-6 rounded-md  py-1" onClick={()=>{editFn(branch.id)}} >Edit</button>
                    </th>
                    <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
                    <button className="bg-black text-white px-4 rounded-md  py-1" onClick={()=>{setIsVisible(true),setdeleteId(branch.id)}}  >Delete</button>
                    </th>
                   
                  </tr>
                </thead>
              </table>
            </div>

            )
          })
        }

        <DeleteModal isVisible={isVisbile} showDeleteModal={()=>{setIsVisible(false)}} id={deleteId} handleToastmessage={showToastMessage}/>
        </>
    )

}

export default BranchRow

