import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatReviewers, getAllStudents } from "../../../utils/methods/get";
import { setchatOppositPersonData } from "../../../redux-toolkit/chatOppositPersonDataReducer";
import { createChat } from "../../../utils/methods/post";
import { useSocket } from "../../../hooks/useSocket";
import { Socket } from "socket.io-client";

const Students = ({socket}:{socket:any}) => {
    // const socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = useSocket();
    const dispatch = useDispatch();
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
    const superleadId: any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
    const [reviewers, setReviewers] = useState([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getAllChatReviewers();
            console.log(response,"response in chateeee in reviewreeeee");
            
            if (response.status === true) {
                setReviewers(response.response);
                // handleStudentClick(0, response.response[0]);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentClick = async (index: number, reviewer: any) => {
        try {
            if (!socket) {
                console.error("Socket is null. Connection might not be established.");
                return;
            }

            setSelectedStudentIndex(index);
            dispatch(setchatOppositPersonData(reviewer));
            const chatData = {
                initiatorId: superleadId,
                recipientId: reviewer.studentId || reviewer.chaterId || reviewer.reviewerId,
                chaters: reviewer
            };
            const response = await createChat(chatData);
            console.log(response,"response response in hateee");
            
            if (response?.response?.data?._id || response?.chatExists?.response?._id) {
                console.log("emitted join roommmmm",response?.response?.data?._id || response?.chatExists?.response?._id);
                
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
            {reviewers.map((reviewer, index) => (
                <div
                    key={reviewer.reviewerId}
                    className={`flex justify-between bg-${selectedStudentIndex === index ? 'dark' : 'light'}-highBlue m-5 rounded-md`}
                    onClick={() => handleStudentClick(index, reviewer)}
                >
                    <div className="flex gap-2 m-2 mt-">
                        <div className="border h-8 w-8 rounded-full mt-2 ">
                            <img src={reviewer.imageUrl} alt="" className="rounded-full " />
                        </div>
                        <div className="mt-1 mb-0">
                            <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                {reviewer.firstName} {reviewer.lastName}
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
