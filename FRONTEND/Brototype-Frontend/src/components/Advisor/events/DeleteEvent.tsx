

const DeleteEvent=({deleteModal,showDeleteModal,deleteFn})=>{

if(!deleteModal) return null
   return (
    
    <>
   <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center   overflow-y-scroll  overflow-hidden z-40"  >
    
    
    <div className=" border border-t m-5 rounded-lg p-2 bg-white w-1/3  ">
<div className="flex justify-between p-2 ">
<span className="text-xl font-semibold-200  " >Delete Confirmation</span>
<span className="text-xl font-semibold-200 mt text-gray-400 cursor-pointer" onClick={()=>{showDeleteModal()}} >X</span>
</div>

<div className="border-t mt-3.5">

</div>

<div className=" ml-2 mt-4">
 <p> <span className="text-md"> Are you sure you want to delete ?</span></p>

</div>
<div className=" flex justify-end">
 <div></div>
 <div className="flex gap-3 m-2" >
   <p className="mt-2"><span className="text-md font-md cursor-pointer" onClick={()=>{showDeleteModal()}}>Cancel</span></p>
   

   <button className="px-6 py-2 bg-red-800 rounded-md text-white" onClick={()=>{deleteFn()}} >Delete</button>

 </div>
   
 </div>
 <div className=" border-t mb-14">

 
</div>
</div> 

    </div>


    </>)
}

export default DeleteEvent