import React, { useContext, useEffect, useState } from "react";
import useMutation from "../../../hooks/useMutation";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudents, getAllSuperleads } from "../../../utils/methods/get";
import { createGroupChat } from "../../../utils/methods/post";
import { toast } from "react-toastify";
import GlobalContext from "../../../context/GlobalContext";



const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const CreateGroupChat = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void; }) => {
  if (!isVisible) {
    return null
  }
  const { setUnreadReload } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const [next, setNext] = useState(false);
  const [chatParticipantsDetails, setGroupParticipantsDetails] = useState<any[]>([]);
  const [selectedChatDetails, setSelectedChatDetails] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const [participants,setParticipants] = useState<any[]>([]);
  const [admins,setAdmins] = useState<any[]>([]);
  const superleadId: any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
  const superleadUniqueId = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
  const validationSchema = Yup.object().shape({
    selectedFile: Yup.mixed()
      .required('Please select a group image'),
    groupName: Yup.string()
      .required('Group Name is required'),
    description: Yup.string()
      .required('Description is required')
  });

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: '/api/superlead/profile-update' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    formik.setFieldValue('selectedFile', file); // Set to undefined if file is undefined
  };

  useEffect(() => {
    const fetchGroupChatProfiles = async () => {
      try {
        const students = await getAllStudents(superleadUniqueId);
        const superleads = await getAllSuperleads();

        if (students?.status === true && superleads?.status === true) {
          const combinedResponses = [...superleads.result, ...students.response];
          console.log(combinedResponses,"llllll");
          
          setGroupParticipantsDetails(combinedResponses);
          combinedResponses.map((chatDetails,index)=>{
            
             if(chatDetails.superleadId===superleadId){
                  handleCheckboxChange(chatDetails)
                  setAdmins(prevState => [...prevState, chatDetails.superleadId])
             }
          })
        }

      } catch (error) {
        console.error('Error fetching group chat profiles:', error);
      }
    };

    fetchGroupChatProfiles();
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedFile: undefined,
      groupName: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.selectedFile) {
          formik.setFieldError('selectedFile', 'Please select an image');
          return;
        }
        console.log(values);
        console.log(selectedChatDetails);
        console.log(participants);
        console.log(admins);
        
        const formData = new FormData();
        formData.append('groupChatProfile', values.selectedFile as unknown as File);
        formData.append('groupName', values.groupName);
        formData.append('description', values.description);
        formData.append('createrId',superleadId);
        selectedChatDetails.forEach((chatDetail, index) => {
          formData.append(`participantsDetails[${index}]`, JSON.stringify(chatDetail));
        });
        participants.forEach((participantsId, index) => {
          formData.append(`participants[${index}]`, participantsId);
        });
        admins.forEach((adminsId, index) => {
          formData.append(`admins[${index}]`, adminsId);
        });
        const response = await createGroupChat(formData)
        console.log(response,"response in group chateee");
        if(response?.createGroupChat?.status===true){
          toast.success("Group Created Successfully")
           setUnreadReload(true)
        }else{
          toast.error("Group Not Created,Please Try Again")
        }
        onClose()
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    },
  });

  const handleCheckboxChange = (chatDetails:any) => {
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

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNext(true);
  };
  return (
    <>
      <section className=" inset-0  w-2/3 ml-96 items-center justify-center p-3 sm:p-5 mt-72 absolute z-50">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden border bg-white shadow-md sm:rounded-lg">
            <h1 className="font-roboto m-5 mb-0 ml-8 font-semibold text-sm">{next ? 'Add Members' : 'Create Group Chat'}</h1>
            <form className="mb-0 mt-0">
              {!next && (
                <>
                  <div className="flex border-b">
                    <div className="m-7 mb-4 mt-5">
                      <img
                        src={formik.values.selectedFile ? URL.createObjectURL(formik.values.selectedFile) : "https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"}
                        alt=""
                        className="h-aut mb-0 w-20 rounded-md"
                      />
                    </div>
                    <div className="m-10 mb-0 ml-0 mr-0">
                      <label htmlFor="file-upload" className="text-xs mb-2 cursor-pointer rounded-md bg-dark-highBlue px-3 py-1.5 text-sm font-medium font-roboto text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Upload Group Profile
                      </label>
                      <p className="m-4 mb-0  ml-0 text-xs text-gray-400">Allowed JPG, GIF or PNG. Max size of 800K</p>
                      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                      {formik.touched.selectedFile && formik.errors.selectedFile && (
                        <ErrorText>{formik.errors.selectedFile}</ErrorText>
                      )}
                    </div>
                  </div>
                  <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="m-3 ml-0 mr-0 w-full">
                      <label htmlFor="groupName" className="m-2 font-serif text-xs">Enter a Group Name</label>
                      <input
                        type="text"
                        id="groupName"
                        name="groupName"
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2
                        p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        value={formik.values.groupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.groupName && formik.errors.groupName && (
                        <ErrorText>{formik.errors.groupName}</ErrorText>
                      )}
                    </div>
                    <div className="m-3 ml-0 mr-0 w-full">
                      <label htmlFor="description" className="m-2 font-serif text-xs">Enter a Description</label>
                      <input
                        type="description"
                        id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.description && formik.errors.description && (
                        <ErrorText>{formik.errors.description}</ErrorText>
                      )}
                    </div>
                  </div>
                </>
              )}
              {next && (
                <div className="">
                  <div className="flex gap-4 m-5 mb-3 mt-3">
                    <div className="w-full md:w-2/6">
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto" required=""
                            placeholder='Search...'
                          />
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
                        {chatParticipantsDetails.map((chatDetails, index) => (
                          <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="flex items-center px-6 py-4 whitespace-nowrap">
                              <img className="w-8 h-8 rounded-full" src={chatDetails.imageUrl} alt={chatDetails.firstName} />
                              {chatDetails.superleadId || chatDetails.studentId === superleadId ? (
                                <div className="ps-3">
                                  <div className=" text-sm font-roboto">Your Account</div>
                                </div>
                              ) : (
                                <div className="ps-3">
                                  <div className=" text-sm font-roboto">{chatDetails.firstName} {chatDetails.lastName}</div>
                                </div>
                              )}

                            </td>
                            {chatDetails?.studentId ? (
                              <td className="px-6 py-4 text-sm font-roboto item text-center">
                                student
                              </td>
                            ) : chatDetails.superleadId ? (
                              <td className="px-6 py-4 text-sm font-roboto item text-center">
                                superlead
                              </td>
                            ) : null}
                            {chatDetails.superleadId || chatDetails.studentId === superleadId ? (
                              <td className="px- py-4 text-sm font-roboto item text-center" >
                                <input
                                  type="checkbox"
                                  name="selected"
                                  id="selected"
                                  checked={isChecked} // Set checked state based on state variable
                                  // onChange={() => setIsChecked(!isChecked)} // Toggle isChecked state when checkbox is clicked
                                />
                              </td>
                            ) : (
                              <td className="px- py-4 text-sm font-roboto item text-center" >
                                <input type="checkbox" name="selected" id="selected" onClick={() => handleCheckboxChange(chatDetails)} />
                              </td>
                            )}

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="flex m-5 mb-0 mt-2 gap-3">
                {next === true ? (
                  <>
                    <button
                      type="submit"
                      onClick={formik.handleSubmit}
                      className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif"
                    >
                      {uploading ? "Uploading..." : "Save Changes"}
                    </button>
                    {uploadError && (
                      <ErrorText>
                        {uploadError}
                      </ErrorText>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={(e) => handleNextClick(e)}
                      className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif"
                    >
                      {uploading ? "Uploading..." : "Next"}
                    </button>


                  </>
                )}
                {next === true ? (
                  <button
                    type="button"
                    onClick={() => setNext(false)}
                    className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* <DeactivateAccount /> */}
    </>
  );
}

export default CreateGroupChat;
