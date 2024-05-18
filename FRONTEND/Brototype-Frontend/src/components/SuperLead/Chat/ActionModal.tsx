import { useNavigate } from "react-router-dom";
import { updateGroupParticipantStatus, updateStudentStatus } from "../../../utils/methods/patch";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useState } from "react";
import { useSelector } from "react-redux";
interface ActionModalProps {
    isVisible: boolean;
    onClose: any
    chaterId: string; // Assuming studentId is of type string, adjust as necessary
    groupId: string
    changeActionModalStatus: any // Adjust the type of changeModalStatus as needed
  }
const ActionModal: React.FC<ActionModalProps> = ({ isVisible, onClose,chaterId,groupId,changeActionModalStatus }) => {

const navigate = useNavigate()

    const handleEvent= async (event:any,action:string)=>{
        try {
            event.stopPropagation()
          
                Swal.fire({
                    title: "Are you sure?",
                    text: "Do you want to perform this action?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                const groupParticipantAction = {
                    groupId,
                    chaterId,
                    action
                }
               const response = await updateGroupParticipantStatus(groupParticipantAction)
               console.log(response," response in statsu updated");
               
                if(response?.response?.status===true && response?.response?.message==="Admin added successfully"){
                    toast.success("admin added successfully")
                    changeActionModalStatus()
                    onClose()
                }else if(response?.response?.status===true && response?.response?.message==="Participant deleted successfully"){
                    toast.success("Participant deleted successfully")
                    changeActionModalStatus()
                    onClose()
                }else{
                    toast.error("participant status not updated")
                }
               
            }
        }
        )
               
        } catch (error) {
            
        }
   
    }
    if (isVisible) {
        return (
            <>
            <div className="absolute z-50 right-5 mt-3 " >
                <div className="grid-cols-1 bg-white w-48 h-auto shadow-xl z-40">
                   
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event)=>{handleEvent(event,"admin")}}>Make Group Admin</p>
                    </div>
                    <div className="w-full h-8 hover:bg-gray-200">
                        <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0"onClick={(event)=>{handleEvent(event,"delete")}}>Remove From Group</p>
                    </div>
                  
                </div>
            </div>
           
            </>
        );
    } else {
        return null;
    }
};

export default ActionModal;
