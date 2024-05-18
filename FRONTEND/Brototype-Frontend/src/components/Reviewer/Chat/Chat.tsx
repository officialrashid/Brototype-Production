import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGroupMessages, getMessages } from "../../../utils/methods/get";
import Students from "./Superleads";
import ChatTab from "./ChatTab";
import { useSocket } from "../../../hooks/useSocket";
import { Socket } from "socket.io-client";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import { storeChatAudio } from "../../../utils/methods/post";
import { RootState } from "../../../redux-toolkit/store";
import ChatMediaModal from "./ChatMediaModal";
import GroupInformationModal from "./GroupInformation";
import { Smile } from "lucide-react";
import Emoji from "./emoji/emojis"
import GlobalContext from "../../../context/GlobalContext";



const Chat = () => {
    const socket: Socket<DefaultEventsMap,DefaultEventsMap> | null = useSocket();
    console.log(socket, 'sockettttt');

    const student: any = useSelector((state: any) => state?.chat?.chatOppositPersonData)
    console.log(student, "students stdenst");
    const dispatch = useDispatch()
    const reviewerId:any = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
    const tabs = ['chat', 'all', 'students', 'advisors', 'reviewers', 'leads'];
    const [activeTab, setActiveTab] = useState('chat'); // Initial active tab is 'chat'
    const [message, setMessage] = useState("")
    const [allMesage, setAllMessage] = useState([])
    const [lastMessage, setLastMessage] = useState([])
    const [recordedAudioBlob, setRecordedAudioBlob] = useState<any>(null);
    const [selectMedia, setSelectMedia] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [reload, setReload] = useState(false)
    const [chatType, setChatType] = useState("")
    const messageRef = useRef<any>(null);
    const scroll = useRef()
    const [groupInfo, setGroupInfo] = useState(false)
    const [groupId, setGroupId] = useState("")
    // const { isOnline, setIsOnline } = useContext(GlobalContext);
    const [online,setOnline] = useState([])
    const [showEmojis, setShowEmojis] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const inputRef = useRef(null);
    const { setUnreadReload } = useContext(GlobalContext);
    useEffect(() => {
        if (!socket || !reviewerId) return;

        socket.on("getOnlineUser", (users: any) => {

            setOnline(users)
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            socket.emit("getCurrentOnlineUser");
        });
 
        return () => {
            socket.off("getOnlineUser");
        };
    }, [socket, reviewerId]);
    socket?.on("currentOnlineUser", (users: any) => {

        setOnline(users)
    });
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [allMesage])
    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMesage]);
    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;

    }, [cursorPosition])
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    const handleTabClick = (currentTab: string) => {
        const currentIndex = tabs.indexOf(currentTab);
        const nextIndex = (currentIndex) % tabs.length; // Get the index of the next tab
        setActiveTab(tabs[nextIndex]); // Set the next tab as active
    };
    const handleMessageChange = (event: string, type: string) => {
        try {
            if (type === "textChat") {
                const message = event?.target?.value
                setChatType("textChat")
                setMessage(message)
            } else if (type === "imageChat") {
                const message = event
                setChatType("imageChat")
                setMessage(message)
            }

        } catch (error) {

        }
    }



    const handleSubmit = async (type: string) => {
        try {
            if (!message) {
                // Handle error: Empty message
                return;
            }
            setShowEmojis(false)
            if (type === "oneToOne") {
                const messageData = {
                    senderId: reviewerId,
                    receiverId: student.superleadId || student.chaterId || student.studentId,
                    content: message,
                    type: chatType
                };
                // Emit message to the server
                socket?.emit('message', messageData);
                setRecordedAudioBlob(null);
                // Listen for response from the server
                socket?.on('messageResponse', (response: { status: boolean; message: any; }) => {
         

                    if (response.status === true) {
                  
                        console.log("Message sent successfully");

                        setMessage(""); // Clear the message input field
                        setUnreadReload(true)
                    } else {
                        console.error("Failed to send message:", response.message);
                    }
                });
            } else if (type === "groupChat") {
                const groupMessageData = {
                    groupId: student?._id,
                    senderId: reviewerId,
                    content: message,
                    type: chatType
                }
                socket?.emit('groupMessage', groupMessageData);
                socket?.on('groupMessageResponse', (response: { status: boolean; message: any; }) => {
                    if (response.status === true) {
                        console.log("Message sent successfully");

                        setMessage(""); // Clear the message input field
                    } else {
                        console.error("Failed to send message:", response.message);
                    }
                });
            }

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {


            try {
                const data = {
                    initiatorId: reviewerId,
                    recipientId: student?.chaterId || student.superleadId || student.studentId
                }
                const response = await getMessages(data)
                if (response.getMessages.status === true) {
                    setAllMessage(response.getMessages.messages)
                    setLastMessage(response.getMessages.lastMessage)
                } else {
                    setAllMessage([])
                    setLastMessage([])
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchMessages();
        // Listen for changes to 'reload' state, if 'reload' changes, fetch messages again
  
    }, [student?.superleadId, student?.chaterId, reviewerId, reload,student?.studentId]);


    useEffect(() => {
        const fetchGroupMessages = async () => {
            try {
                const data = {
                    groupId: student?._id,
                    senderId: reviewerId,

                }
                const response = await getGroupMessages(data)
                if (response.getMessages.status === true) {
                    setAllMessage(response.getMessages.messages)
                    setLastMessage(response.getMessages.lastMessage)
                } else {
                    setAllMessage([])
                    setLastMessage([])
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchGroupMessages();
    }, [student?.superleadId, student?.chaterId, reviewerId, reload,student?.studentId]);
    // Only trigger when superleadId or student?.chaterId changes
    useEffect(() => {
        if (socket) {
            const handleReceivedMessage = (data: any) => {
                setAllMessage(prev => {
                    console.log('Previous state:', prev);
                    const newState = [...prev, data.content];
                    console.log('New state:', newState);
                    return newState;
                });
           
                setUnreadReload(true)
            };

            socket.on("received", handleReceivedMessage);

            return () => {
                // Clean up socket listener when component unmounts
                socket.off("received", handleReceivedMessage);
            };
        }
    }, [socket]);
    useEffect(() => {
        if (socket) {
            const handleDeletedMessage = (data: any) => {
                if (data.status === true && data.message === "message deleted successfullt") {
                    // Filter out the deleted message from the state array
                    setAllMessage(prevMessages => prevMessages.filter(message => message._id !== data.messageId));
                    // Optionally, you can also set reload to true if you want to refetch messages
                    setReload(false);
                    setReload(true);
                }
            };

            socket.on("messageDeleted", handleDeletedMessage);

            return () => {
                // Clean up socket listener when component unmounts
                socket?.off("messageDeleted", handleDeletedMessage);
            };
        }
    }, [socket]);
    const isSender = (message: any) => {
        return message.senderId === reviewerId;
    };
    const addAudioElement = async (blob: any, type: string) => {

        if (type === "oneToOne") {
            setRecordedAudioBlob(blob);
            const url = URL.createObjectURL(blob);
            const audio = document.createElement("audio");
            audio.src = url;
            audio.controls = true;
            document.body.appendChild(audio);
            const audioFile = new File([blob], "audio.mp3", { type: "audio/mpeg" });
            const formData = new FormData();
            formData.append("audio", audioFile);
            formData.append("senderId", reviewerId);
            const response = await storeChatAudio(formData)
            if (response?.status === true) {
                const voiceChat = response?.chatData?.audioUrl
                const messageData = {
                    senderId: reviewerId,
                    receiverId: student.superleadId || student.chaterId || student.studentId,
                    content: voiceChat,
                    type: "voiceChat"
                };
                socket.emit('message', messageData);
                setRecordedAudioBlob(null);

                // Listen for response from the server
                socket.on('messageResponse', (response: { status: boolean; message: any; }) => {


                    if (response.status === true) {
                        console.log("Message sent successfully");

                        setMessage(""); // Clear the message input field
                    } else {
                        console.error("Failed to send message:", response.message);
                    }
                });
            }
        } else if (type === "group") {
            setRecordedAudioBlob(blob);
            const url = URL.createObjectURL(blob);
            const audio = document.createElement("audio");
            audio.src = url;
            audio.controls = true;
            document.body.appendChild(audio);
            const audioFile = new File([blob], "audio.mp3", { type: "audio/mpeg" });
            const formData = new FormData();
            formData.append("audio", audioFile);
            formData.append("senderId", reviewerId);
            const response = await storeChatAudio(formData)
  

            if (response?.status === true) {
                const voiceChat = response?.chatData?.audioUrl
                const groupMessageData = {
                    groupId: student?._id,
                    senderId: reviewerId,
                    content: voiceChat,
                    type: "voiceChat"
                }
      

                socket?.emit('groupMessage', groupMessageData);
                setRecordedAudioBlob(null);

                // Listen for response from the server
                socket?.on('groupMessageResponse', (response: { status: boolean; message: any; }) => {


                    if (response.status === true) {
                        console.log("Message sent successfully");

                        setMessage(""); // Clear the message input field
                    } else {
                        console.error("Failed to send message:", response.message);
                    }
                });
            }
        }
    };
    const changeModalStatus = () => {
        if (modalStatus) {
            setSelectMedia(false)
            setModalStatus(false)
            setReload((prevState) => !prevState);
        } else {
            setModalStatus(true)
            setReload((prevState) => !prevState);
        }
    }
    const handleGroupInfo = (groupId: string) => {
        setGroupId(groupId)
        setGroupInfo(true)
    }
    const handleShowEmojis = () => {
        inputRef.current.focus()
        setShowEmojis(!showEmojis)
    }

    const pickEmoji = (emojiObject: any) => {
        const { emoji } = emojiObject;
        console.log(emoji, "Selected Emoji");
    
        if (inputRef.current) {
            const ref: any = inputRef.current;
            ref.focus();
            const start = message.substring(0, ref.selectionStart);
            const end = message.substring(ref.selectionStart);
            const msg = start + emoji + end;
            setMessage(msg);
            setChatType("emojiChat");
            setCursorPosition(start.length + emoji.length);
    
            // Delay focusing on the input to ensure it's rendered
        
        }
    }
    return (
        <>
            <GroupInformationModal isVisible={groupInfo} onClose={() => { setGroupInfo(false) }} changeModalStatus={changeModalStatus} groupId={groupId} groupDetails={student} />
            <div className="flex border shadow-md  mt-10  m-10  mr-4 ml-4 item  h-38rem" onClick={() => changeModalStatus()}>
                <div className="border-r w-1/2 bg-white ">
                    <div className="m-5 flex gap-3">
                        <div>
                            <img src="/profile.jpeg" alt="" className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="relative">
                            <div className="absolute m-3 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 stroke-slate-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <div>
                                <input type="search" className=" font-roboto   w-full py-1 px-10 rounded-full border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... " />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 m-10 mt-0 mb-0">
                        {tabs.map(tab => (
                            <p key={tab} className={`text-sm font-roboto cursor-pointer ${activeTab === tab ? 'underline font-bold text-dark-highBlue' : ''}`} onClick={() => handleTabClick(tab)}>{tab}</p>
                        ))}
                    </div>
                    {activeTab === "students" ? (

                        <Students socket={socket} />
                    ) : activeTab === "chat" ? (

                        <ChatTab socket={socket}  />
                    ) : null}


                </div>

                {student && (
                    <div className="border-r w-full bg-white h-20 mb-0" >
                        <div className="border-b">
                            <div className="flex justify-between">
                                <div className="flex gap-2 m-2">
                                    {student.groupName ? (
                                        <div className="border h-12 w-12 rounded-full  mt-3" onClick={() => handleGroupInfo(student?._id)}>
                                            <img src={student?.profile} alt="" className="rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="border h-12 w-12 rounded-full  mt-3">
                                            <img src={student?.imageUrl} alt="" className="rounded-full" />
                                        </div>
                                    )}

                                    <div className="mt-5"><span className="text-md  font-semibold font-roboto">{student?.firstName} {student?.lastName} {student?.groupName}</span>

                                        <div>
                                            {online.some(onlineUser => onlineUser?.chaterId === student.chaterId && onlineUser?.isOnline) ? (
                                                <div>
                                                    <span className="text-gray-600 text-sm font-roboto">Active Now</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="text-gray-600 text-sm font-roboto">Last Seen {student.lastSeen}</span>
                                                </div>
                                            )}
                                        </div>

                                    </div>


                                </div>
                                <div className="m-4 mt-8 flex gap-4">
                                    <div className="border w-8 h-8 flex items-center justify-center rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>


                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>


                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="h-31rem bg-custom-background mt-0" style={{ maxHeight: "800px", overflowY: "scroll" }}>

                            <div className="grid grid-cols-1 mb- ">
                                {allMesage.map((message: any, index: number) => (
                                    message.type === "textChat" ? (
                                        <>
                                            {message.senderFirstName && message.senderLastName ? (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-3 ${isSender(message) ? 'justify-end ml-48' : 'justify-start mr-48'}`}
                                                >
                                                    <div className={`w-fit ${isSender(message) ? 'bg-Average' : "bg-white"} mb-0 h-auto rounded-sm`}>
                                                        <p className={`text-xs font-roboto m-3 ${isSender(message) ? 'text-white' : 'text-black'}`}>
                                                            {isSender(message) ? 'You' : `${message?.senderFirstName} ${message?.senderLastName}`}
                                                        </p>

                                                        <p className={`text-sm font-roboto m-3 mt-0 ${isSender(message) ? 'text-white' : "text-black"}`}>{message?.content}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-3 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`w-fit ${isSender(message) ? 'bg-Average' : "bg-white"} mb-0 h-10 rounded-sm`}>
                                                        <p className={`text-sm font-roboto m-3 ${isSender(message) ? 'text-white' : "text-black"}`}>{message?.content}</p>
                                                    </div>
                                                </div>
                                            )}

                                        </>
                                    ) : message.type === "voiceChat" ? (
                                        <>
                                            {message.senderFirstName && message.senderLastName ? (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-10 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className="">
                                                        <p className={`text-xs font-roboto m-3 ${isSender(message) ? 'text-white' : 'text-black'}`}>
                                                            {isSender(message) ? 'You' : `${message?.senderFirstName} ${message?.senderLastName}`}
                                                        </p>

                                                        <audio controls className="m-1">
                                                            <source src={message.content} type="audio/mpeg" />
                                                        </audio>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-5 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className="mb-0 h-16 w-2/1 rounded-full">
                                                        <audio controls className="m-1">
                                                            <source src={message.content} type="audio/mpeg" />
                                                        </audio>
                                                    </div>
                                                </div>
                                            )}

                                        </>
                                    ) : message.type === "imageChat" ? (
                                        <>
                                            {message.senderFirstName && message.senderLastName ? (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-10 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className="">
                                                        <p className={`text-xs font-roboto m-3 ${isSender(message) ? 'text-white' : 'text-black'}`}>
                                                            {isSender(message) ? 'You' : `${message?.senderFirstName} ${message?.senderLastName}`}
                                                        </p>
                                                        <img src={message?.content} alt="" className="w-72 h-auto font-roboto m-3 text-white  rounded-md" />

                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    key={index}
                                                    className={`flex gap-5 m-5 mb-0 mt-10 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    {/* <div className=" mb-0 mt-10 h-10 rounded-sm"> */}

                                                    <img src={message?.content} alt="" className="w-72 h-auto font-roboto m-3 text-white  rounded-md" />

                                                    {/* </div> */}
                                                </div>
                                            )}

                                        </>
                                    ) : message.type === "videoChat" ? (
                                        <div
                                            key={index}
                                            className={`flex gap-5 m-5 mb-0 mt-10 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <video controls className="w-fit h-60 object-contain ">
                                                <source src={message.content} type="video/mp4" />
                                                {/* Add additional <source> elements for other video formats if needed */}
                                            </video>
                                        </div>
                                    ) : message?.type === "documentChat" ? (
                                        <div
                                            key={index}
                                            className={`flex gap-5 m-5 mb-0 mt-10 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {/* Display PDF */}
                                            <embed src={message?.content} type="application/pdf" width="500" height="600" />

                                            {/* Or, display DOC */}
                                            {/* <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(message.content)}`} width="500" height="600" frameborder="0"></iframe> */}
                                        </div>
                                    ) : message?.type === "emojiChat" ? (
                                        <>
                                        {message?.senderFirstName && message?.senderLastName ? (
                                            <div
                                                key={index}
                                                className={`flex gap-5 m-5 mb-0 mt-3 ${isSender(message) ? 'justify-end ml-48' : 'justify-start mr-48'}`}
                                            >
                                                <div className={`w-fit ${isSender(message) ? 'bg-Average' : "bg-white"} mb-0 h-auto rounded-sm`}>
                                                    <p className={`text-xs font-roboto m-3 ${isSender(message) ? 'text-white' : 'text-black'}`}>
                                                        {isSender(message) ? 'You' : `${message?.senderFirstName} ${message?.senderLastName}`}
                                                    </p>

                                                    <p className={`text-xl font-roboto m-3 mt-0 ${isSender(message) ? 'text-white' : "text-black"}`}>{message?.content}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                key={index}
                                                className={`flex gap-5 m-5 mb-0 mt-3 ${isSender(message) ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`w-fit ${isSender(message) ? 'bg-Average' : "bg-white"} mb-0 h-10 rounded-sm`}>
                                                    <p className={`text-xl font-roboto m-3 ${isSender(message) ? 'text-white' : "text-black"}`}>{message?.content}</p>
                                                </div>
                                            </div>
                                        )}

                                    </>
                                    ) : null
                                ))}
                                <div ref={scroll}></div>
                                <p className="text-custom-background ">example chat</p>
                                <p className="text-custom-background ">example chat</p>
                            </div>
                            <div className={`absolute bottom-40 ml-4 emoji-list ${showEmojis ? '' : 'hidden'}`}>
                                <Emoji pickEmoji={pickEmoji} />
                            </div>
                        </div>

                        <div className=" m-3 mt-0 rounded-md  ">
                            <div className=" flex ">

                            <div className="relative w-full bottom-6">
                                    {chatType === 'imageChat' ? (
                                        <div className="relative">
                                            <textarea
                                                className="font-roboto border  px-2 h-auto py-2 resize-none overflow-hidden outline-none max-h-40 absolute rounded-md w-full"
                                                placeholder="Type a message.."
                                                onChange={(e) => handleMessageChange(e, "textChat")}
                                            />
                                            <img
                                                src={message}
                                                alt="Chat Image"
                                                className="absolute w-auto max-h-24"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="relative">
                                                <textarea
                                                    className="font-roboto border px-10 h-10 py-2 resize-none overflow-hidden outline-none max-h-40 rounded-md w-full"
                                                    placeholder="Type a message.."
                                                    value={message}
                                                    ref={inputRef}
                                                    onChange={(e) => handleMessageChange(e, "textChat")}
                                                />

                                                {/* Example of positioning EmojiPicker relatively */}
                                                <div className="absolute bottom-3.5 left-3">
                                                    <Smile color="gray" size={20} onClick={handleShowEmojis} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {student.groupName ? (
                                    <div className="m-1 mt-0 cursor-pointor  relative  bottom-6">
                                        <div className="flex gap-1">

                                            <div className="rounded-md"

                                            >

                                                <div className=" rounded-md">
                                                    <VoiceRecorder
                                                        onRecordingComplete={addAudioElement}
                                                        setRecordedAudioBlob={setRecordedAudioBlob}
                                                        type="group"
                                                    />
                                                </div>
                                            </div>
                                            <div className=" rounded-full shadow-xl bg-gray-200 cursor-pointer" onClick={() => setSelectMedia(true)}>
                                                <div className="flex items-center justify-center h-8 w-8">
                                                    <img src="/MediaIcon.svg" alt="" className="w-fit h-10 mt-2" />
                                                </div>
                                            </div>
                                            {/* <div className="flex rounded-full" > */}
                                            <div className="border h-10 w-16 cursor-pointer flex items-center justify-center ml-1 rounded-full bg-gray-200 shadow-xl" onClick={() => handleSubmit("groupChat")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rounded-full">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.768 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                </svg>

                                                {/* </div> */}

                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="m-1 mt-0 cursor-pointor  relative  bottom-6">
                                        <div className="flex gap-1">

                                            <div className="rounded-md"

                                            >

                                                <div className=" rounded-md">
                                                    <VoiceRecorder
                                                        onRecordingComplete={addAudioElement}
                                                        setRecordedAudioBlob={setRecordedAudioBlob}
                                                        type="oneToOne"
                                                    />
                                                </div>
                                            </div>
                                            <div className=" rounded-full shadow-xl bg-gray-200 cursor-pointer" onClick={() => setSelectMedia(true)}>
                                                <div className="flex items-center justify-center h-8 w-8">
                                                    <img src="/MediaIcon.svg" alt="" className="w-fit h-10 mt-2" />
                                                </div>
                                            </div>
                                            {/* <div className="flex rounded-full" > */}
                                            <div className="border h-10 w-16 cursor-pointer flex items-center justify-center ml-1 rounded-full bg-gray-200 shadow-xl" onClick={() => handleSubmit("oneToOne")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rounded-full">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.768 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                </svg>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ChatMediaModal isVisible={selectMedia} onClose={() => { setSelectMedia(false) }} changeModalStatus={changeModalStatus} handleMessageChange={handleMessageChange} />
        </>

    )
}
export default Chat