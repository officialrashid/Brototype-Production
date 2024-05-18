import { useState } from "react"
import CourseModal from "./CourseModal"
import { useSelector } from "react-redux"



const SearchBox=({handleToast})=>{

    const [Visible,setModalVisible]=useState(false)
    const courseDetails=useSelector(state=>state.courseReducer?.courseData)
   const handleCloseModal=()=>{
      setModalVisible(false)
    }
    return (
        <>
          <div className=" flex justify-between m-2 ">
      <div>
     <div className="relative">


    <div className="absolute m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
<div>
  <input type="search" className="     py-2 px-10 rounded-md border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... "/>
</div>
  </div>
  </div>
  <div className="flex gap-3">
{/* 
    <div className="border rounded-md flex">
      <span className="m-2 ">Alphabetical </span>

    </div>
    <div className="border rounded-md flex">
      <span className="m-2 text-gray-400">All categories</span>

    </div>
    <div className="border rounded-md flex">
      <span className="m-2 text-gray-400">Popular </span>

    </div> */}
     <div className="border rounded-md flex">
       <span className="m-1 ml-2 mr-0 text-gray-400 text-xl">+</span>
      <span className="m-2 " onClick={()=>{setModalVisible(true)}} > Add course </span>

    </div>
    <div>
      
    </div>

  </div>

  </div>
  <CourseModal handleModal={handleCloseModal} isVisible={Visible} handleToast={handleToast}  onClose={()=>{setModalVisible(false)}} />
        
        </>
    )
}

export default SearchBox