import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAdvisorData } from "../../../redux-toolkit/advisorReducer"

const LogOutModal=({isVisible,onClose})=>{
    if(!isVisible) return null
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem(`advisorAccessToken`)
        localStorage.removeItem("advisorCustomToken")
        localStorage.removeItem('role')
        localStorage.removeItem('advisorIdToken')
        dispatch(setAdvisorData(""))
        navigate('/advisorIn')
    }
    return (
        <>

<div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center   overflow-y-scroll  overflow-hidden z-40"  >
    
    
    <div className=" border border-t m-5 rounded-lg p-2 bg-white w-1/3  ">
<div className="flex justify-between p-2 ">
<span className="text-lg font-semibold-200  " >Log out Confirmation</span>
<span className="text-xl font-semibold-200 mt text-gray-400 cursor-pointer"  ><svg onClick={()=>{onClose()}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-6 mt-1">
<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</span>
</div>


<div className=" ml-2 mt-4">
 <p> <span className="text-md"> Are you sure you want to log out ?</span></p>

</div>
<div className=" flex justify-end">
 <div></div>
 <div className="flex gap-3 m-2" >
   <p className="mt-2"><span className="text-md font-md cursor-pointer" onClick={()=>{onClose()}}>Cancel</span></p>
   

   <button className="px-6 py-2 bg-red-800 rounded-md text-white"onClick={()=>handleLogout()}>Log out</button>

 </div>
   
 </div>

</div> 

    </div>
        
        </>
    )
}

export default LogOutModal