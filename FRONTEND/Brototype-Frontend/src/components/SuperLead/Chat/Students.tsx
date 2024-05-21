import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatStudents, getAllStudents } from "../../../utils/methods/get";
import { setchatOppositPersonData } from "../../../redux-toolkit/chatOppositPersonDataReducer";
import { createChat } from "../../../utils/methods/post";
import { useSocket } from "../../../hooks/useSocket";
import { Socket } from "socket.io-client";

const Students = ({socket}:{socket:any}) => {
    // const socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = useSocket();
    const dispatch = useDispatch();
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
    const superleadId: any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
    const chaterData: any = useSelector((state: any) => state?.superlead?.superleadData);
    console.log(chaterData,"LLLLLL");
    
    const [students, setStudents] = useState([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getAllChatStudents();
            console.log(response,"response form get all students");
            
            if (response.response.status === true) {
                setStudents(response.response.response);
                // handleStudentClick(0, response.response[0]);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentClick = async (index: number, student: any) => {
        try {
            if (!socket) {
                console.error("Socket is null. Connection might not be established.");
                return;
            }

            setSelectedStudentIndex(index);
            dispatch(setchatOppositPersonData(student));
            const initiatorData:any = {
                initiatorId : chaterData.superleadId,
                profileUrl : chaterData.imageUrl,
                name : chaterData.name,
                phone : chaterData.phone,
             
            }
      
            const chatData = {
                initiatorId: superleadId,
                recipientId: student.studentId || student.chaterId || student.reviewerId || student._id,
                chaters: student,
                initiatorData : initiatorData
            };
            const response = await createChat(chatData);
            console.log(response,"response response in hateee");
            
            if (response?.response?.data?._id || response?.chatExists?.response?._id) {
                console.log("emitted join roommmmm");
                
                socket.emit("joinRoom", response?.response?.data?._id || response?.chatExists?.response?._id);
            }
        } catch (err) {
            console.error("Error handling student click:", err);
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleReceivedMessage = (data: any) => {
            console.log("Received message:", data);
            // Handle received message here
        };

        socket.on("received", handleReceivedMessage);

        return () => {
            // Clean up socket listener when component unmounts
            socket.off("received", handleReceivedMessage);
        };
    }, [socket]);

    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            {students.map((student, index) => (
                <div
                    key={student.studentId}
                    className={`flex justify-between bg-${selectedStudentIndex === index ? 'dark' : 'light'}-highBlue m-5 rounded-md`}
                    onClick={() => handleStudentClick(index, student)}
                >
                    <div className="flex gap-2 m-2 mt-">
                        <div className="border h-8 w-8 rounded-full mt-2 ">
                            {student?.profileUrl ? (
                            <img src={student?.profileUrl ?? "/defaultPhoto.png"} alt="" className="w-full h-full rounded-full object-cover" />
                            ):(
                                <img src="/defaultPhoto.png" alt="" className="w-full h-full rounded-full object-cover" />    
                            )}


                        </div>
                        <div className="mt-1 mb-0">
                            <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                {student.name}
                            </span>

                            <div>
                                <span className={`text-gray-600 font-roboto text-xs ${selectedStudentIndex === index ? 'text-white' : 'text-black'}`}>
                                    Hello good morning
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="m-4">
                        <span className="text-gray-600 text-sm font-roboto text-white">6m</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Students;
