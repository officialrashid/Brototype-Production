import { useState } from "react"
import Slots from "../schedule /Slot"


const Reviewers=()=>{

    const [active,setActiveTab]=useState(false)
    const [modal,setModal]=useState(false)
    return (

        <>
        <div className="w-full">
        <div className="border border-2px  rounded-md py-2" onClick={()=>{setActiveTab(true)}}>
      <div className="flex justify-between m-2">
        <div><span className="font-bold"> Muhammed Riyas</span> </div>
        <div> <span> {!active?<svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg> : <svg fill="#ffffff" height="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg>}</span></div>
      </div>
    </div>
    {
        active?<div className=" border border-2px rounded-md m-3">

        <div className="flex justify-between">
          <div className="border border-gray-400 m-10 rounded-sm w-1/2 bg-gray-300 " onClick={()=>{setModal(true)}}>
      
         <div  className="flex justify-between m-2 py-2">
           <div className="border border-gray-400 w-1/2 rounded-md mr-2 text-center py-1.5   bg-white shadow-lg ">
            <span className="font-semibold">10:00 am</span>
           </div>
            <div className="py-1.5">
              <span>-</span>
      
           </div>
            <div className="border border-gray-400  w-1/2 rounded-md ml-2 text-center py-1.5 bg-white shadow-lg ">
              <span className="font-semibold" >12:00 pm</span>
      
           </div>
         </div>
        </div>
        <div className="border border-gray-400 m-10 rounded-sm w-1/2 bg-gray-300 ">
      
         <div  className="flex justify-between m-2 py-2">
           <div className="border border-gray-400 w-1/2 rounded-md mr-2 text-center py-1.5   bg-white shadow-lg ">
            <span className="font-semibold">10:00 am</span>
           </div>
            <div className="py-1.5">
              <span>-</span>
      
           </div>
            <div className="border border-gray-400  w-1/2 rounded-md ml-2 text-center py-1.5 bg-white shadow-lg ">
              <span className="font-semibold" >12:00 pm</span>
      
           </div>
         </div>
      </div>
         
      
      </div>
      </div>:''
    }
    

        </div>
        <Slots isVisible={modal}  onClose={()=>{setModal(false)}} />
        
        
        
        
        </>
    )
   
}

export default Reviewers