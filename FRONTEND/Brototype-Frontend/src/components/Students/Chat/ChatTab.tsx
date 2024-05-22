import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatRecipients, getMessages, getRecipientsUnreadMessageCount } from "../../../utils/methods/get";
import { setchatOppositPersonData } from "../../../redux-toolkit/chatOppositPersonDataReducer";
import { RootState } from "../../../redux-toolkit/store";
import { createChat } from "../../../utils/methods/post";
import ChatMediaModal from "./ChatMediaModal";
import React from "react";
import GlobalContext from "../../../context/GlobalContext";
import { setGroupUnreadMsgCountZero, setUnreadMsgCountZero } from "../../../utils/methods/patch";
// import { useSocket } from "../../../hooks/useSocket";
const ChatTab = ({ socket }: { socket: any }) => {

    const dispatch = useDispatch();

    const studentId: any = useSelector((state: RootState) => state?.student?.studentData?.studentId);
    const [chatUser, setChatUser] = useState<any[]>([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
    const [allMessage, setAllMessage] = useState([]);
    const [lastMessage, setLastMessage] = useState({});
    const [unreadMsgCount, setUnreadMsgCount] = useState([])
    const { chatId, setChatId, unreadReload, setUnreadReload,setClicked } = useContext(GlobalContext);
    const [unreadChaterId, setUnreadChaterId] = useState<string>("");
    const [online, setOnline] = useState([])
    useEffect(() => {
        const fetchAllChatRecipients = async () => {
            try {
                const response = await getAllChatRecipients(studentId);
                console.log(response, "response in get all chat reciprir");

                if (response.status === true) {
                    setChatUser(prevChatUser => [...prevChatUser, ...response.recipients]);
                    // handleStudentClick(0, response.recipients[0]);

                }
            } catch (error) {
                console.error("Error fetching chat recipients:", error);
            }
        };
        fetchAllChatRecipients();
    }, [studentId]);
    useEffect(()=>{
       setClicked(false)
    },[])
    useEffect(() => {
        if (!socket || !studentId) return;

        socket.on("getOnlineUser", (users: any) => {
            // console.log(users, "online usersssss comingggc");
            setOnline(users)
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            socket.emit("getCurrentOnlineUser");
        });

        return () => {
            socket.off("getOnlineUser");
        };
    }, [socket, studentId]);
    useEffect(() => {
        const fetchRecipientsUnreadMessageCount = async () => {
            try {
                const response = await getRecipientsUnreadMessageCount(studentId)
                if (response?.getUnreadMsgCount?.status === true) {
                    setUnreadMsgCount(response?.getUnreadMsgCount?.unreadCounts)
                    setUnreadReload(false)
                } else {
                    setUnreadMsgCount([])
                    setUnreadReload(false)
                }
            } catch (error) {

            }
        }
        fetchRecipientsUnreadMessageCount()
    }, [studentId, unreadReload, socket])
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (chatUser.length > 0) { // Check if chatUser array is not empty
                    // Iterate through chatUser array to fetch messages for each chat user
                    for (const user of chatUser) {
                        const data = {
                            initiatorId: studentId,
                            recipientId: user.chaterId // Access chaterId from each chat user object
                        };
                        const response = await getMessages(data);
                        if (response.getMessages.status === true) {
                            // Update state for each chat user separately
                            setAllMessage(prevState => [...prevState, response.getMessages.messages]);
                            setLastMessage(response.getMessages.lastMessage);
                        } else {
                            setAllMessage([]);
                            setLastMessage({});
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [chatUser, studentId]);


    const handleStudentClick = async (index: number, chatUser: any) => {
        console.log(chatUser,"{}{}{{");
        
        try {
            if (chatUser?.groupName) {
                setSelectedStudentIndex(index);
                dispatch(setchatOppositPersonData(chatUser));
                setUnreadChaterId(chatUser?._id);
                setClicked(true)
                socket.emit("joinRoom", chatUser?._id);
                setUnreadMsgCountZeroFunction(chatUser, chatUser?._id, "group")
            } else {
                setSelectedStudentIndex(index);
                dispatch(setchatOppositPersonData(chatUser?.details));
                setUnreadChaterId(chatUser?.details?.chaterId);
                console.log(chatUser,"This is Chat USer logs");
                
                const chatData = {
                    initiatorId: studentId,
                    recipientId: chatUser?.details?.chaterId,
                    chaters: chatUser.details
                };
                // Initialize newChatId variable
                console.log(chatData,"lllll");
                
                const response = await createChat(chatData);
                let newChatId = null;
                if (response?.response?.data?._id || response?.chatExists?.response?._id) {
                    newChatId = response?.response?.data?._id || response?.chatExists?.response?._id;
                    console.log(newChatId,"emitteee");
                    
                    socket.emit("joinRoom", response?.response?.data?._id || response?.chatExists?.response?._id);
                    setUnreadMsgCountZeroFunction(chatUser, newChatId, "oneToOne")
                }
            }

        } catch (err) {
            console.error("Error handling student click:", err);
        }
    };
    useEffect(() => {
        if (socket) {
            const handleReceivedMessage = (data: any) => {
                console.log(data, "Received notification");
                setUnreadReload(true);
            };

            // Attach the event listener for "notification" event
            socket.on("notification", handleReceivedMessage);

            // Clean up the event listener when the component unmounts
            return () => {
                socket.off("notification", handleReceivedMessage);
            };
        }
    }, [socket, setUnreadReload]);
    const setUnreadMsgCountZeroFunction = async (chatUser: any, chatId: string, type: string) => {
        if (type === "oneToOne") {
            const data = {
                initiatorId: studentId,
                recipientId: chatUser?.details?.chaterId,
                chatId: chatId,
                type: type
            };
            const res = await setUnreadMsgCountZero(data);
            if (res.response.status === true && res.response.message === "Unread message count zero updated successfully") {
                setUnreadReload(true)
            }
        } else {
            const data = {
                groupId: chatId,
                senderId: studentId,
                type: type
            }
            const res = await setGroupUnreadMsgCountZero(data)
            if (res?.response?.status === true && res?.response?.message === "Group member unread message count zero updated successfully") {
                setUnreadReload(true)
            }

        }

    }
    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            {chatUser.map((user: any, index: number) => (
                <div
                    key={index}
                    className={`flex justify-between bg-${selectedStudentIndex === index ? 'dark' : 'light'}-highBlue m-5 rounded-md`}
                    onClick={() => handleStudentClick(index, user)}
                >
                    {user?.groupName ? (
                        <div className="flex gap-2 m-2 mt-">
                            <div className="border h-8 w-8 rounded-full mt-2">
                                <img src={user?.profile} alt="" className="rounded-full w-full h-full object-cover" />
                            </div>
                            <div className="mt-1 mb-0">
                                <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                    {user?.groupName}
                                </span>
                                <div>

                                    <span className={`text-gray-600 font-roboto text-xs ${selectedStudentIndex === index ? 'text-white' : 'text-black'}`}>
                                        {user.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 m-2 mt-">
                            <div className="border h-8 w-8 rounded-full mt-2 relative">
                                {user.details.imageUrl ? (
                                    <img src={user.details.imageUrl} alt="" className="rounded-full w-full h-full object-cover" />
                                ) : (
                                    <img src="/defaultPhoto.png" alt="" className="rounded-full w-full h-full object-cover" />
                                )}

                                {online.some(onlineUser => onlineUser.chaterId === user?.details?.chaterId && onlineUser.isOnline === true) ? (
                                    <div className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-400 border-2 border-white"></div>
                                ) : (
                                    <div className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-red-400 border-2 border-white"></div>
                                )}
                            </div>
                            <div className="mt-1 mb-0">
                                <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                    {user.details.firstName} {user.details.lastName}
                                </span>
                                <div>
                                    {online.some(onlineUser => onlineUser.chaterId === user?.details?.chaterId && onlineUser.isOnline === true) ? (
                                        <div>
                                            <span className="text-gray-600 text-sm font-roboto">Active Now</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-gray-600 text-sm font-roboto">Offline</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Render unread message count for the clicked user */}
                    {unreadMsgCount.map((unread: any) => (
                        <React.Fragment key={unread.chaterId}>
                            {(user?.details?.chaterId === unread.chaterId || user?._id === unread.chaterId) && user?.details?.chaterId !== unreadChaterId && unread.unreMsgCount > 0 ? (

                                <div className="m-2 mr-3 m-0">
                                    <div className="">
                                        <span className={`text-gray-600 text-sm font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-black'}`}>6m</span>
                                        <div className={`rounded-full text-xs item items-center flex justify-center font-roboto w-6 h-6 mt-1 ${selectedStudentIndex === index ? 'bg-white text-black' : 'bg-Average text-white'}`}>
                                            {unread.unreMsgCount}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                null
                            )}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>

    );
};

export default ChatTab;
