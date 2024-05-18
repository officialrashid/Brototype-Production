import { useNavigate } from "react-router-dom";
import { updateStudentStatus } from "../../../utils/methods/patch";
import { toast } from "react-toastify";
import ConfirmPlacedModal from "./ConfirmPlacedModal";
import Swal from 'sweetalert2';
import { useState } from "react";
interface ActionModalProps {
    isVisible: boolean;
    onClose: () => void;
    studentId: string; // Assuming studentId is of type string, adjust as necessary
    changeModalStatus: () => void; // Adjust the type of changeModalStatus as needed
  }
const ActionModal: React.FC<ActionModalProps> = ({ isVisible, onClose,studentId,changeModalStatus }) => {
    const [modalActive, setModalActive] = useState(false)
const navigate = useNavigate()

    const handleEvent= async (event:any,action:string)=>{
        try {
            event.stopPropagation()
            if(action==='View'){
              navigate('/superlead/viewStudent',{ state: { studentId } }) 
            }else if(action==='Placed'){
                 
                setModalActive(true)
            }else{
                Swal.fire({
                    title: "Are you sure?",
                    text: "Do you want to perform this action?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                const studentStatusData = {
                    studentId,
                    action
                }
               const response = await updateStudentStatus(studentStatusData)
                if(response.status===true){
                    toast.success("status update succeessfully")
                    changeModalStatus()
                }else{
                    toast.warn("student not found")
                }
            }
        }
        )
    }
               
        } catch (error) {
            
        }
   
    }
    if (isVisible) {
        return (
            <>
            <div className="absolute z-50 right-5 " >
                <div className="grid-cols-1 bg-white w-48 h-auto shadow-xl z-40">
                    <div className="w-full h-8 hover:bg-gray-200 mb-0" onClick={(event)=>{handleEvent(event,"View")}}>
                        <p className="font-serif text-sm m-4 mb-0 pt-1">View</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event)=>{handleEvent(event,"Active")}}>Active</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0"onClick={(event)=>{handleEvent(event,"Terminate")}}>Terminate</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event)=>{handleEvent(event,"Suspend")}}>Suspend</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event)=>{handleEvent(event,"Quit")}}>Quit</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event)=>{handleEvent(event,"Placed")}}>Placed</p>
                    </div>
                </div>
            </div>
           
               <ConfirmPlacedModal isVisible={modalActive} onClose={() => { setModalActive(false)}} studentId={studentId}  />
            </>
        );
    } else {
        return null;
    }
};

export default ActionModal;
