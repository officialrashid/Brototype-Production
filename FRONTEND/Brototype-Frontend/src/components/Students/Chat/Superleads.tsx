import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatSuperleads, getAllSuperleads } from "../../../utils/methods/get";
import { setchatOppositPersonData } from "../../../redux-toolkit/chatOppositPersonDataReducer";
import { createChat } from "../../../utils/methods/post";
import { RootState } from "../../../redux-toolkit/store";
import { useSocket } from "../../../hooks/useSocket";
import { Socket } from "socket.io-client";

const Students = ({socket}:{socket:any}) => {
    // const socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = useSocket();
    const dispatch = useDispatch();
    const studentId: string | null = useSelector((state: RootState) => state?.student?.studentData?.studentId);
    const chaterData: any | null = useSelector((state: RootState) => state?.student?.studentData);

    const [superleads, setSuperleads] = useState([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

    useEffect(() => {
        const fetchSuperleads = async () => {
            try {
                const response = await getAllChatSuperleads();
                console.log(response,"*******(()))((*******))))");
                
                if (response.status === true) {
                    setSuperleads(response.response);
                    // handleStudentClick(0, response.result[0]);
                }
            } catch (error) {
                console.error("Error fetching superleads:", error);
            }
        };
        fetchSuperleads();
    }, []);

    const handleStudentClick = async (index: number, superlead: any) => {
        try {
            setSelectedStudentIndex(index);
            dispatch(setchatOppositPersonData(superlead));
            const initiatorData:any = {
                initiatorId : chaterData.studentId,
                profileUrl : chaterData.imageUrl,
                name : chaterData.name,
                phone : chaterData.phone,
             
            }
            const chatData = {
                initiatorId: studentId,
                recipientId: superlead._id || superlead.chaterId,
                chaters: superlead,
                initiatorData : initiatorData
            };
            const response = await createChat(chatData);
             console.log(response,"responseresponse");
             
            if (response?.response?.data?._id || response?.chatExists?.response?._id) {
                  console.log("join room event emittedd",response?.response?.data?._id || response?.chatExists?.response?._id);
                  
                socket.emit("joinRoom", response?.response?.data?._id || response?.chatExists?.response?._id);
            }
        } catch (error) {
            console.error("Error handling student click:", error);
        }
    };

    useEffect(() => {
        if (socket) {
            const handleReceivedMessage = (data: any) => {
                console.log("Received message:", data);
                // Handle received message here
            };

            socket.on("received", handleReceivedMessage);

            return () => {
                // Clean up socket listener when component unmounts
                socket.off("received", handleReceivedMessage);
            };
        }
    }, [socket]);

    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            {superleads.map((superlead: any, index: number) => (
                <div
                    key={superlead._id}
                    className={`flex justify-between bg-${selectedStudentIndex === index ? 'dark' : 'light'}-highBlue m-5 rounded-md`}
                    onClick={() => handleStudentClick(index, superlead)}
                >
                    <div className="flex gap-2 m-2 mt-">
                        <div className="border h-8 w-8 rounded-full mt-2 ">
                            {superlead.profileUrl ? (
                            <img src={superlead.profileUrl} alt="" className="rounded-full w-full h-full object-cover" />
                            ):(
                                <img src="/defaultPhoto.png" alt="" className="rounded-full w-full h-full object-cover" />
                            )}

                        </div>
                        <div className="mt-1 mb-0">
                            <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                {superlead.name}
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
