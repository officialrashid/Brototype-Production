
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBranchData } from "../../redux-toolkit/branchSlice"


const ModalAcademic=({isVisible,onClose})=>{
  const dispatch=useDispatch()

  const branches=useSelector(state=>state.branchReducer?.branchData)
  console.log(branches);
  
 

    useEffect(()=>{

   const branchData= async ()=>{
    console.log('branchhhh');
    

    const response= await axiosInstance.get('/branch/all-branches')

    console.log(response);
    if(response){
      dispatch(getBranchData(response.data))
    }
   

   }
   branchData()
      
    },[])


    if(!isVisible) return null
    return (
        <>
<div className="bg-black/60 z-40 fixed p  inset-0 flex justify-center    overflow-y-scroll overflow-hidden items-center">
<div className="border m-2 rounded-md bg-white mt-10 h-fit w-1/2">
  <div className="flex justify-between m-4 mb-0" onClick={()=>{onClose()}}>
    <div>

    </div>
     <div className="cursor-pointer hover:bg-slate-200 hover:w-6 h-6 hover:rounded-full hover:flex hover:justify-center hover:items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</div>
  </div>
  <div className="m-4 mt-1 mb-6 text-center">
    <span className="font-bold text-xl">Add Academic Councellor details</span>
  </div>
  <div className="m-4 mt-3 flex gap-2">
    <input type="text" name="" id="" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the name of academic counsellor"/>
       <input type="text" name="" id="" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the mobile number"/>
  </div>
    <div className="m-4 mt-3 flex gap-2 mb-10">
  <div className="w-full">
      <input type="text" name="" id="" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the email of academic counsellor"/>
  </div>
   <div className="w-full ml-">
      <form>
      <select name="" id="" className="bg-gray-50 border border-gray-400 p-2 rounded-md w-full focus:ring-black focus:border-black outline-black text-gray-800">
        <option value="" selected> Select a hub loaction</option>
        {
        branches.map(branch=>{
          return (
            <option value="" >{branch.branchName}</option>
          )
        })
        }
        
       
      </select>
    </form>
   </div>
  </div>
</div>
</div>
        
        </>
    )
}

export default ModalAcademic