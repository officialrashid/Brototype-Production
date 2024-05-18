import { useNavigate } from "react-router-dom";
import { updateAdvisorStatus } from "../../../utils/methods/patch";
import { toast } from "react-toastify";

const ActionModal = ({ isVisible, onClose,advisorId,changeModalStatus }) => {
const navigate = useNavigate()

    const handleEvent= async (event:any,action:string)=>{
        try {
                event.stopPropagation()
                const advisorStatusData = {
                    advisorId,
                    action
                }
               const response = await updateAdvisorStatus(advisorStatusData)
               console.log(response,"lll");
               
                if(response?.response?.status===true){
                    toast.success("status update succeessfully")
                    changeModalStatus()
                }else{
                    toast.warn("advisor not found")
                }
               
        } catch (error) {
            
        }
   
    }
    if (isVisible) {
        return (
            <div className="absolute z-50 right-5  " >
                <div className="grid-cols-1 bg-white w-48 h-auto shadow-xl z-40">
            
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
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ActionModal;
