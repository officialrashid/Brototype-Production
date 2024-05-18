import { useState } from "react"
import AddForm from "./AddForm"
import BoxTab from "./Box-tab"



const SubNav=()=>{

  const [showModal,setShowModal]=useState(false)
    return (
        <>t
        {/* <nav className='mt-8'>
                <ul className='flex  flex-wrap  justify-center space-x-24'>
                    <li> <span>BCE-141 All Students</span></li>
                    <li>
    <label className="flex items-center space-x-2">
      <input type="radio"  checked name="radio-group"  className=" accent-black form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black"  />
      <span>Mock</span>
    </label>
  </li>
  <li>
    <label className="flex items-center space-x-2">
      <input type="radio" name="radio-group" className=" accent-black form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black"/>
      <span>Fumigation</span>
    </label>
  </li>
                     <li> <a href="http://"> <span>Passed students</span></a></li>
                    <li> <a href="http://"> <span>Failed students</span></a></li>
                    <li> <button className='border border-gray-400 px-2 py-2 rounded-lg text-black flex items-center hover:bg-black hover:text-white'><span className='text-sm' >Add student</span></button></li>
                    

                </ul>
            </nav> */}
<BoxTab/>

            <nav className=" mt-8 font-roboto"> 
            <ul className="flex flex-grid flex-wrap  justify-between m-4">
              <li>
                <button className="border border-black px-5 py-2 text-black rounded-md hover:bg-black hover:text-white" onClick={()=>{setShowModal(true)}} > Add student</button>
              </li>
              <li>
                <button className="border border-black px-3 py-2 text-black rounded-md hover:bg-black hover:text-white"> Passed student</button>
              </li>
              <li>
                <button className="border border-black px-3 py-2 text-black rounded-md hover:bg-black hover:text-white">Failed student</button>
              </li>
              <li className='relative'>
               <input type="search" name="" id="" className=" pl-2 placeholder-left w-full  border border-black px-16 py-2 rounded-md placeholder-left w-full outline-none focus:border-red-700 appearance-none"  placeholder="search"/>
              
              </li>
              
            </ul>

            </nav>
      
<AddForm isVisible={showModal} onClose={()=>{setShowModal(false)}}  />

        
        </>
    )
}


export default SubNav