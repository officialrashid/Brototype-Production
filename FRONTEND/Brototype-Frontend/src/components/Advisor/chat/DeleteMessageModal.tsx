
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { deleteMessage } from "../../../utils/methods/delete";
import { linkHorizontal } from "d3";
interface ActionModalProps {
    isVisible: boolean;
    onClose: any;
    socket:any;
    messageId: string;
    chatId:string;
    type:string
    changeActionModalStatus: any // Adjust the type of changeModalStatus as needed
}
const DeleteMessageModal: React.FC<ActionModalProps> = ({ isVisible, onClose,socket, messageId, chatId, type ,changeActionModalStatus }) => {
console.log(chatId,"dnckjdncd chat id form dlete emodalll");
console.log(messageId,"0000000000");

    const handleEvent = async (event: any, action: string) => {
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
                    const data = {
                        chatId,
                        messageId,
                        action
                    }
                    socket.emit('deleteMessage', data);
                
                  

                    // if(response?.response?.status===true && response?.response?.message==="Admin added successfully"){
                    //     toast.success("admin added successfully")
                    //     changeActionModalStatus()
                    //     onClose()
                    // }else if(response?.response?.status===true && response?.response?.message==="Participant deleted successfully"){
                    //     toast.success("Participant deleted successfully")
                    //     changeActionModalStatus()
                    //     onClose()
                    // }else{
                    //     toast.error("participant status not updated")
                    // }

                }
            }
            )

        } catch (error) {

        }

    }
    if (isVisible) {
        return (
            <>
                <div className="absolute z-50 right-5 mt- " >
                    <div className="grid-cols-1 bg-white w-48 h-auto shadow-xl z-40">

                        <div className="w-full h-8 hover:bg-gray-200">
                            <p className="font-serif text-sm m-4 mb-0 pt-1 mt-0" onClick={(event) => { handleEvent(event, type) }}>Delete</p>
                        </div>


                    </div>
                </div>

            </>
        );
    } else {
        return null;
    }
};

export default DeleteMessageModal;
