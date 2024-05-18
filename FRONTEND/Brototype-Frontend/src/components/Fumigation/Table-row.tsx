import MarkModal from "./Mark-modal"

import { useState } from "react"

const TableRow=()=>{
  const [markModal,setMarkModal]=useState(false)
    
    return (
        <>
    {/* <div className='mx-auto p-2 mb-2'>
  <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 ">
    <thead className="text-md text-gray-700 bg-gray-100 shadow-2xl dark:text-gray-800">
      <tr>
        <th scope="col" className="w-1/4 px-4 py-6  text-center " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
          Mohmmad rashid
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center">
          918921974845
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
        mohmmshid@gamil.com
            </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
         Mechanical Engineering
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center ">
          <button className='bg-black px-4 py-2 text-white rounded-lg  '  >Add</button>
        </th>
       
      </tr>
    </thead>
  </table>
</div> */}
<div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transition duration-700 ease-in-out transform hover:scale-101.5">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-teal-700 px-4 py-2  text-white rounded-lg' onClick={()=>{setMarkModal(true)}} >Add</button>
      </th>
    </tr>
  </thead>
</table>       
</div>
<MarkModal  />
        </>
    )
   
    
    
    
}

export default TableRow