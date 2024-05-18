import { useState } from "react"
import BranchModal from "../../branches/BranchModal"


const AllSearchTab=({content,branchPage,handleModal,counsellorPage,handleCounsellor,handleContentModal,contentPage,handleCourseModal,coursePage})=>{

  const manageModal=()=>{
    console.log('reete7te7t7t7t7');
  

    console.log('all searchtabghuhuhihhihhihh');
   
    if(branchPage){
      console.log('branch modal callled');
      handleModal()
    
    }
    if(counsellorPage){
      console.log('counsellor called');
      handleCounsellor()
      
    }

    if(contentPage){
handleContentModal()    }

if(coursePage){
  console.log('Course page again called ');
  
  handleCourseModal()
  
}
    
  }
 

  
    return (
        <>
               
               <div className="flex justify-between  ">
  {/* <div className="m-3  mt-4">

 <input type="search" className="border border-2px outline-none py-0.5 px-6"/>
  </div> */}
  <div className=" mt-0">
  <div className="relative">
    <div className="absolute m-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
<div>
  <input type="search"  className="py-2 px-10 rounded-md border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... "/>
</div>
  </div>
</div>
  <div className="mt-2 flex gap-5 ">
    <div className="border h-fit py-1 px-2 rounded-md bg-white cursor-pointer "   onClick={()=>{manageModal()}} >
{content}
</div>
 <div className="border h-fit py-1 px-2 rounded-md bg-white" >
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

</div> 
 <div className="border h-fit py-1 px-2 rounded-md bg-white" >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>

</div>  

      
    

    </div>
     
   
  </div>


        
        </>
    )
}


export default AllSearchTab