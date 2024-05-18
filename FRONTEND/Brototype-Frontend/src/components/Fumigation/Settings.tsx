import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { setOtpData } from "../../redux-toolkit/otpReducer";



const SettingsModal=({isVisible,closeModal})=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleModalClick = (event:any) => {
        // Stop the event propagation when clicking inside the modal
        event.stopPropagation();
      };

     const handleLogout = () =>{
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to perform logout action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
           localStorage.removeItem(`invigilatorAccessToken`)
           localStorage.removeItem("invigilatorCustomToken")
           localStorage.removeItem('role')
          //  localStorage.removeItem('studentIdToken')
           dispatch(setOtpData(""))
           navigate('/invigilator')
        }
      }
      )
     }
    if(!isVisible) return null
    return (
        <>
      

        <div className=" flex inset-0 justify-between font-roboto fixed mr-24 z-20  " onClick={()=>{closeModal()}}>
            
<div>

</div>
<div className=" border border-gray-300 w-fit  p-2 rounded-md  mt-20 h-fit bg-white "  onClick={(event)=>{handleModalClick(event)}}>
  <div className=" border-b border-gray-300">
    <h1 className="font-bold">Account Settings</h1>

  </div>
  <div className="p-2">
    <ul className="my-4 cursor-pointer">
      <li className="my-1 inline-flex  "  > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
</svg><span className="font-semibold"> Profile</span>
</li>
      
      
    </ul>
  </div>

  <div className="  border-t border-gray-300 text-md font-bold cursor-pointer ">
     <h1 onClick={()=>handleLogout()}>Log out</h1>
  </div>
</div>

        </div>


        
        </>
    )
}


export default SettingsModal