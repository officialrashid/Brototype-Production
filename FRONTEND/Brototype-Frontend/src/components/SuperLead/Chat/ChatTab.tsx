import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatRecipients, getMessages, getRecipientsUnreadMessageCount } from "../../../utils/methods/get";
import { setchatOppositPersonData } from "../../../redux-toolkit/chatOppositPersonDataReducer";
import { createChat } from "../../../utils/methods/post";
import { useSocket } from "../../../hooks/useSocket";
import GlobalContext from "../../../context/GlobalContext";
import { setGroupUnreadMsgCountZero, setUnreadMsgCountZero } from "../../../utils/methods/patch";

const ChatTab = ({ socket }: { socket: any }) => {
    const dispatch = useDispatch();
    const superleadId = useSelector((state) => state?.superlead?.superleadData?.superleadId);
    const [chatUser, setChatUser] = useState<any[]>([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState<number | null>(null);
    const [allMessage, setAllMessage] = useState<any[]>([]);
    const [lastMessage, setLastMessage] = useState<any>({});
    const { chatId, setChatId, unreadReload, setUnreadReload, setClicked } = useContext(GlobalContext);
    const [unreadMsgCount, setUnreadMsgCount] = useState<any[]>([]);
    const [unreadChaterId, setUnreadChaterId] = useState<string>("");
    const [chatType, setChatType] = useState("")
    const [online, setOnline] = useState([])
    useEffect(() => {
        const fetchChatData = async () => {
            try {
                if (superleadId) {
                    const response = await getAllChatRecipients(superleadId);
                    if (response?.status === true && response?.recipients) {
                        setChatUser(response.recipients);
                        setUnreadReload(false)
                    }
                }
            } catch (error) {
                console.error("Error fetching chat recipients:", error);
            }
        };
        fetchChatData();
    }, [superleadId,unreadReload, socket]);
    


    useEffect(() => {
        const fetchRecipientsUnreadMessageCount = async () => {
            try {
                const response = await getRecipientsUnreadMessageCount(superleadId)


                if (response?.getUnreadMsgCount?.status === true) {
                    setUnreadMsgCount(response?.getUnreadMsgCount?.unreadCounts)
                    setUnreadReload(false)
                } else {
                    setUnreadMsgCount([])
                    setUnreadReload(false)
                }
            } catch (error) {
                console.error("Error fetching recipients' unread message count:", error);
            }
        }
        fetchRecipientsUnreadMessageCount()
    }, [superleadId, unreadReload, socket])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (chatUser.length > 0) {
                    const messagesPromises = chatUser.map(async (user) => {
                        const data = {
                            initiatorId: superleadId,
                            recipientId: user.chaterId
                        };
                        const response = await getMessages(data);
                        if (response.getMessages?.status === true) {
                            setAllMessage((prevMessages) => [...prevMessages, response.getMessages.messages]);
                            setLastMessage(response.getMessages.lastMessage);
                        }
                    });
                    await Promise.all(messagesPromises);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [chatUser, superleadId]);

    const handleStudentClick = async (index: number, chatUser: any) => {
        try {
            if (chatUser?.groupName) {
                setSelectedStudentIndex(index);
                dispatch(setchatOppositPersonData(chatUser));
                socket.emit("joinRoom", chatUser?._id);
                setChatId(chatUser?._id);
                setUnreadChaterId(chatUser?._id);
                setClicked(true);
                setChatType("group");
                setUnreadMsgCountZeroFunction(chatUser, chatUser._id, "group")
            } else {
                setSelectedStudentIndex(index);
                dispatch(setchatOppositPersonData(chatUser.details));
                setUnreadChaterId(chatUser?.details?.chaterId);
                setClicked(true);
                setChatType("oneToOne");
                const chatData = {
                    initiatorId: superleadId,
                    recipientId: chatUser?.details?.studentId || chatUser?.details?.chaterId ||  chatUser?.details?.reviewerId,
                    chaters: chatUser.details
                };
                const response: any = await createChat(chatData);
                let newChatId = null; // Initialize newChatId variable
                if (response?.response?.data?._id || response?.chatExists?.response?._id) {
                    newChatId = response?.response?.data?._id || response?.chatExists?.response?._id;
                    socket.emit("joinRoom", newChatId);
                    setChatId(newChatId);
                    setUnreadMsgCountZeroFunction(chatUser, newChatId, "oneToOne")
                }
            }
        } catch (err) {
            console.error("Error handling student click:", err);
        }
    };
    useEffect(() => {
        if (!socket || !superleadId) return;

        socket.on("getOnlineUser", (users: any) => {
            // console.log(users, "online usersssss comingggc");
            setOnline(users)
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            socket.emit("getCurrentOnlineUser");
        });

        return () => {
            socket.off("getOnlineUser");
        };
    }, [socket, superleadId]);
    const setUnreadMsgCountZeroFunction = async (chatUser: any, chatId: string, type: string) => {
        if (type === "oneToOne") {
            const data = {
                initiatorId: superleadId,
                recipientId: chatUser?.details?.studentId || chatUser?.details?.chaterId ||  chatUser?.details?.reviewerId,
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
                senderId: superleadId,
                type: type
            }
            const res = await setGroupUnreadMsgCountZero(data)
            if (res?.response?.status === true && res?.response?.message === "Group member unread message count zero updated successfully") {
                setUnreadReload(true)
            }
        }
    }


    useEffect(() => {
        if (socket) {
            const handleReceivedMessage = (data: any) => {
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


    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            {chatUser.map((user: any, index: number) => (
                <div
                    key={index}
                    className={`flex justify-between bg-${selectedStudentIndex === index ? 'dark' : 'light'}-highBlue m-5 rounded-md`}
                    onClick={() => handleStudentClick(index, user)}
                >
                    {user.groupName ? (
                        <div className="flex gap-2 m-2 mt-">
                            <div className="border h-8 w-8 rounded-full mt-2">
                                <img src={user.profile} alt="" className="rounded-full" />
                            </div>
                            <div className="mt-1 mb-0">
                                <span className={`text-sm font-medium font-roboto ${selectedStudentIndex === index ? 'text-white' : 'text-dark'}`}>
                                    {user.groupName}
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
                                <img src={user.details.imageUrl} alt="" className="rounded-full" />
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
                                        <span className={`text-gray-600 font-roboto text-xs ${selectedStudentIndex === index ? 'text-white' : 'text-black'}`}>
                                            Active Now
                                        </span>
                                    ) : (
                                        <span className={`text-gray-600 font-roboto text-xs ${selectedStudentIndex === index ? 'text-white' : 'text-black'}`}>
                                            Offline
                                        </span>
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
