import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { getAllStudents, getAllSuperleads, getGroupMembersDetails, getGroupMessages } from "../../../utils/methods/get";
import ActionModal from "./ActionModal";
import { updateGroupMembers } from "../../../utils/methods/patch";
import { toast } from "react-toastify";
import { RootState } from "../../../redux-toolkit/store";
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const GroupInformationModal = ({ isVisible, onClose, changeModalStatus, groupId, groupDetails }: { isVisible: boolean; onClose: () => void; changeModalStatus: () => void; groupId: string; groupDetails: any; }) => {
  if (!isVisible) {
    return null
  }
  const superleadUniqueId = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
  console.log(superleadUniqueId,"superleadUiqueIdssss");
  
  const [selectedChatDetails, setSelectedChatDetails] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const student: any = useSelector((state: any) => state?.chat?.chatOppositPersonData)
  const studentId: any = useSelector((state: RootState) => state?.student?.studentData?.studentId);
  const [allMesage, setAllMessage] = useState([])
  const [grouInfoOrNot, setGroupInfoOrNot] = useState(true)
  const [members, setMembers] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [reload, setReload] = useState(false)
  const [addGroupMembers, setAddGroupMembers] = useState(false)
  const [chatParticipantsDetails, setGroupParticipantsDetails] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  let actionChaterId = null;
  useEffect(() => {
    const fetchGroupMembersDetails = async () => {
      try {
        const response = await getGroupMembersDetails(groupId)
        console.log(response, "group memeberssssssss");

        if (response?.status == true) {
          setMembers(response?.response?.participants)
          setAdmins(response?.response?.admins)
        } else {
          setMembers([])
        }

      } catch (error) {

      }
    }
    fetchGroupMembersDetails()
  }, [reload,addGroupMembers])
  useEffect(() => {
    const fetchGroupChatProfiles = async () => {
      try {
        const students = await getAllStudents(superleadUniqueId);
        const superleads = await getAllSuperleads();
        console.log(students,"studetsssssssssss");
        console.log(superleads?.result,"responseeee suerlessdeee");
        if (students?.status === true && superleads?.status === true) {
          const combinedResponses = [...students?.response,...superleads?.result];
          console.log(combinedResponses, "llllll");

          setGroupParticipantsDetails(combinedResponses);
          combinedResponses.map((chatDetails, index) => {

            if (chatDetails.studentId === studentId) {
              setAdmins(prevState => [...prevState, chatDetails.studentId])
            }
          })
        }

      } catch (error) {
        console.error('Error fetching group chat profiles:', error);
      }
    };

    fetchGroupChatProfiles();
  }, []);
  useEffect(() => {
    const fetchGroupMessages = async () => {
      try {
        const data = {
          groupId: student?._id,
          senderId: studentId,

        }
        console.log(data, "bvvcfgvghh");

        const response = await getGroupMessages(data)
        console.log(response, "dnbfdfbdf response in group messagessss");

        if (response.getMessages.status === true) {
          setAllMessage(response.getMessages.messages)

        } else {
          setAllMessage([])

        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchGroupMessages();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
     e.preventDefault()
     console.log(selectedChatDetails,"selectedChatDetails");
     console.log(participants,"participants");
     const data = {
      groupId : groupId,
      participantsDetails: selectedChatDetails,
      participants : participants
     }

     const response = await updateGroupMembers(data)
     console.log(response,"group memebersss updateddd");
     if(response?.updateGroupMembers?.status===true){
       toast.success("Members Added Successfully")
       setAddGroupMembers(false)
       setReload(true)
     }else{
      toast.error("Members Added Not Successfully")
      setAddGroupMembers(false)
      setReload(true)
     }
  }

  const handleCheckboxChange = (chatDetails: any) => {
    const index = selectedChatDetails.findIndex((item) =>
      (item.studentId && item.studentId === chatDetails.studentId) ||
      (item.superleadId && item.superleadId === chatDetails.superleadId)
    );

    if (index === -1) {
      // If the chatDetails is not already selected, add it to the selectedChatDetails state
      setSelectedChatDetails(prevState => [...prevState, chatDetails]);
      // Also add the corresponding studentId or superleadId to the participants state
      setParticipants(prevState => [...prevState, chatDetails.studentId || chatDetails.superleadId]);
    } else {
      // If the chatDetails is already selected, remove it from the selectedChatDetails state
      const updatedSelectedChatDetails = [...selectedChatDetails];
      updatedSelectedChatDetails.splice(index, 1);
      setSelectedChatDetails(updatedSelectedChatDetails);

      // Remove the corresponding studentId or superleadId from the participants state if it exists
      const updatedParticipants = participants.filter(id =>
        id !== chatDetails.studentId && id !== chatDetails.superleadId
      );
      setParticipants(updatedParticipants);
    }
  };
  const changeActionModalStatus = () => {
    if (modalStatus === true) {
      console.log("keriiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

      setModalActive(false)
      setModalStatus(false)
      setReload((prevState) => !prevState);
    } else {
      setModalStatus(true)
      setReload((prevState) => !prevState);
    }
  }

  return (
    <>
      <section className="w-2/3 ml-48 items-center justify-center p-3 sm:p-5 mt-32 absolute z-50 mb-0" onClick={() => changeActionModalStatus()}>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden border bg-white shadow-md sm:rounded-lg">
            {grouInfoOrNot === true ? (
              <div className="flex gap-2 m-5 items-center justify-center">
                <h1 className="font-roboto text-white cursor-pointer  text-center flex items-center justify-center font-meduim text-sm w-full h-10 bg-Average rounded-md" onClick={() => setGroupInfoOrNot(true)}>Group Info</h1>
                <h1 className="font-roboto text-black cursor-pointer text-center flex items-center justify-center font-meduim text-sm w-full h-10 bg-gray-100 rounded-md" onClick={() => setGroupInfoOrNot(false)}>Members</h1>
              </div>
            ) : (
              <div className="flex gap-2 m-5 items-center justify-center">
                <h1 className="font-roboto text-black cursor-pointer text-center flex items-center justify-center font-meduim text-sm w-full h-10 bg-gray-100 rounded-md" onClick={() => setGroupInfoOrNot(true)}>Group Info</h1>
                <h1 className="font-roboto text-white cursor-pointer  text-center flex items-center justify-center font-meduim text-sm w-full h-10 bg-Average rounded-md" onClick={() => setGroupInfoOrNot(false)}>Members</h1>
              </div>
            )}
            {grouInfoOrNot === true ? (
              <form className="mb-0 mt-0">

                <>

                  <div className="flex border-b">
                    <div className="m-7 mb-4 mt-5 ">
                      <img
                        src={groupDetails.profile ?? "https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"}
                        alt={groupDetails.profile ?? "https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"}
                        className="h-auto mb-0 w-20 rounded-md"
                      />
                    </div>
                    <div className="m-10 mb-0 ml-0 mr-0">
                      <label htmlFor="file-upload" className="text-md mb-2 cursor-pointer font-roboto font-semibold">{groupDetails.groupName}
                      </label>
                      <p className="m-4 mb-0 mt-1  ml-0 text-sm text-gray-500 font-roboto font-medium">{groupDetails.description}</p>
                      <input type="file" id="file-upload" className="hidden" />

                    </div>
                  </div>


                </>
                <div className="mb-0 mt-0">
                  <h1 className="mb-0 pb-0 text-sm font-roboto m-5">Medias</h1>
                  <div className="flex gap-5 w-96 h-32 mb-0 ml-2 mt-0">
                    {allMesage.map((message, index) => (
                      <React.Fragment key={index}>
                        {message?.type === "imageChat" ? (
                          <div className="flex mb-0">
                            <img src={message?.content} alt="" className="w-72 h-32 object-cover font-roboto m-3 mb-0 text-white rounded-md" />
                          </div>
                        ) : message?.type === "videoChat" ? (
                          <div className="flex mb-0">
                            <video controls className="w-72 h-32 object-cover font-roboto m-3 mb-0 text-white rounded-md">
                              <source src={message.content} type="video/mp4" />
                            </video>
                          </div>
                        ) : null}
                      </React.Fragment>
                    ))}

                  </div>

                </div>
                <div className="flex m-5 mb-0 mt-8 gap-3">

                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="mb-4 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                    Back
                  </button>

                </div>
              </form>


            ) : (
              <>
              {addGroupMembers === true ? (
                <form className="mb-0 mt-0">
                  <div className="">
                    <div className="flex gap-4 m-5 mb-3 mt-3">
                      <div className="w-full md:w-2/4">
                        <form className="flex items-center">
                          <label htmlFor="simple-search" className="sr-only">Search</label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="simple-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto"
                              required=""
                              placeholder='Search...'
                            />
                          </div>
                        </form>
                      </div>
                      <div className="w-full md:w-2/4">
                        <form className="flex items-center">
                          <label htmlFor="simple-search" className="sr-only">Search</label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            </div>
                            <h1 className="font-roboto text-black cursor-pointer  text-center flex items-center justify-center font-meduim text-sm w-full h-8 bg- border rounded-md" onClick={() => setAddGroupMembers(false)}>Back</h1>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-sm text- text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ml-16">
                          <tr className='text-sm font-roboto'>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-10 py-3">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Select
                            </th>
                          </tr>
                        </thead>
                        <tbody>
  
                          {chatParticipantsDetails
                         
                            .filter(chatDetails => !members.some(member => member?.chaterId === chatDetails?.superleadId || member?.chaterId === chatDetails?.studentId))
                            .map((chatDetails, index) => (
                              <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                                  <img className="w-8 h-8 rounded-full" src={chatDetails.imageUrl} alt={chatDetails.firstName} />
                                  <div className="ps-3">
                                    <div className="text-sm font-roboto">{chatDetails.firstName} {chatDetails.lastName}</div>
                                  </div>
                                </td>
                                {chatDetails?.studentId ? (
                                  <td className="px-6 py-4 text-sm font-roboto item text-center">student</td>
                                ) : chatDetails.superleadId ? (
                                  <td className="px-6 py-4 text-sm font-roboto item text-center">superlead</td>
                                ) : null}
                                <td className="px-6 py-4 text-sm font-roboto item text-center">
                                  <input type="checkbox" name="selected" id="selected" onClick={() => handleCheckboxChange(chatDetails)} />
                                </td>
                              </tr>
                            ))}
            
                          {/* Render participants already in the group */}
                          {chatParticipantsDetails
                            .filter(chatDetails => members.some(member =>member.chaterId === chatDetails.superleadId || member.chaterId === chatDetails.studentId))
                            .map((chatDetails, index) => (
                              <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                                  <img className="w-8 h-8 rounded-full" src={chatDetails.imageUrl} alt={chatDetails.firstName} />
                                  <div className="ps-3">
                                    <div className="text-sm font-roboto">{chatDetails.firstName} {chatDetails.lastName}</div>
                                  </div>
                                </td>
                                {chatDetails?.studentId ? (
                                  <td className="px-6 py-4 text-sm font-roboto item text-center">student</td>
                                ) : chatDetails.superleadId ? (
                                  <td className="px-6 py-4 text-sm font-roboto item text-center">superlead</td>
                                ) : null}
                              <td className="px-6 py-4 text-xs font-roboto item text-center font-italic">
                                  <p>already added to the group</p>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex m-5 mb-0 mt-2 gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                      className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                      Update
                    </button>
                  </div>
                </form>
              ) : (
                <form className="mb-0 mt-0">
                  <div className="">
                    <div className="flex gap-4 m-5 mb-3 mt-3">
                      <div className="w-full md:w-2/4">
                        <form className="flex items-center">
                          <label htmlFor="simple-search" className="sr-only">Search</label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="simple-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto"
                              required=""
                              placeholder='Search...'
                            />
                          </div>
                        </form>
                      </div>
                      <div className="w-full md:w-2/4">
                        <form className="flex items-center">
                          <label htmlFor="simple-search" className="sr-only">Search</label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            </div>
                            <h1 className="font-roboto text-black cursor-pointer  text-center flex items-center justify-center font-meduim text-sm w-full h-8 bg- border rounded-md" onClick={() => setAddGroupMembers(true)}>Add New Members</h1>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-sm text- text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ml-16">
                          <tr className='text-sm font-roboto'>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-10 py-3">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Select
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member, index) => (
                            <React.Fragment key={index}>
                              <p className="text-white">{actionChaterId = member.chaterId}</p> {/* Assigns member.chaterId to actionChaterId */}
                              <tr key="" className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                                  <img className="w-8 h-8 rounded-full" src={member?.imageUrl} />
                                  {member?.chaterId === studentId ? (
                                    <div className="ps-3">
                                      <div className="text-sm font-roboto">Your Account</div>
                                    </div>
                                  ) : (
                                    <div className="ps-3">
                                      <div className="text-sm font-roboto">{member?.firstName} {member?.lastName}</div>
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-sm font-roboto item text-center">
                                  student
                                </td>
                                {admins.includes(member.chaterId) ? (
                                  <td className="px-6 py-4 text-sm font-roboto item text-center">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 cursor-pointer">Admin</span>
                                  </td>
                                ) : (
                                  <React.Fragment>
                                    {admins.includes(studentId) && (
                                      <td className="px-6 py-4 text-sm font-roboto item text-center">
                                        {member.chaterId === actionChaterId && (
                                          <>
                                            <button
                                              type='button'
                                              className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                              onClick={() => setModalActive(true)}
                                            >
                                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                              </svg>
                                            </button>
            
                                            <ActionModal isVisible={modalActive} onClose={() => setModalActive(false)} chaterId={member?.chaterId} groupId={groupId} changeActionModalStatus={changeActionModalStatus} />
                                          </>
                                        )}
            
                                      </td>
                                    )}
                                  </React.Fragment>
                                )}
            
                              </tr>
            
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex m-5 mb-0 mt-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                      Back
                    </button>
                  </div>
                </form>
              )}
            </>
            
            )}

          </div>
        </div>
      </section>
      {/* <DeactivateAccount />  */}
    </>
  );
}

export default GroupInformationModal;

