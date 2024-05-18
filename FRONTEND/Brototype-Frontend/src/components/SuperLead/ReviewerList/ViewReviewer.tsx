
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfile, getReviewDetails, getReviewerProfile, getReviewerStatus, getStudentStatus } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
// import DeactivateAccount from '../profileInfo/DeactivateAccount';

const ViewReviewer = () => {
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId")
    const [profileInfo, setProfileInfo] = useState({});
    const [setPersonalInfo, setPersonalInfoUpdate] = useState(false);
    const [reviewerStatus, setReviewerStatus] = useState([])
    const [reviewDetails, setReviewDetails] = useState([]);
    const [pendingTopics, setPendingTopics] = useState(false);
    const [NexWeekUpdation, setNexWeekUpdation] = useState(false);
    const [PersonalWorkouts, setPersonalWorkouts] = useState(false);
    const [MiscellaneousWorkouts, setMiscellaneousWorkouts] = useState(false);
    const [Communication, setCommunication] = useState(false);
    const [ToatlScore, setTotalScore] = useState(false);
    const [week, setWeek] = useState("");
    const location = useLocation();
    const reviewerId = location.state && location.state.reviewerId;

    useEffect(() => {
        fetchReviewerProfile();
        fetchReviewerStatus();
    }, [setPersonalInfo, setPersonalInfoUpdate]);
    // const exampleData = {
    //     imageUrl: 'example-image-url',
    //     firstName: 'Muhammed',
    //     lastName: 'Rashid k',
    //     domain: 'Example Domain',
    //     batch: 'Example Batch',
    //     dateOfBirth: 'Example Date of Birth',
    //     age: 'Example Age',
    //     gender: 'Example Gender',
    //     email: 'example@email.com',
    //     phone: '123-456-7890',
    //     fathersName: 'Example Father',
    //     mothersName: 'Example Mother',
    //     fathersContact: '123-456-7891',
    //     mothersContact: '123-456-7892',
    //     houseName: 'Example House',
    //     village: 'Example Village',
    //     taluk: 'Example Taluk',
    //     district: 'Example District',
    //     state: 'Example State',
    //     pincode: 'Example Pincode',
    //     highestQualification: 'Example Qualification',
    //     yearOfPassing: 'Example Year',
    //     passPercentage: 'Example Percentage',
    //     schoolOrCollegeOrInstituteName: 'Example School/College/Institution',
    //     // ... other profileInfoInfo fields
    // };
    const fetchReviewerProfile = async () => {
        try {
            const response = await getReviewerProfile(reviewerId);
            console.log(response, "PPppp");

            if (response?.status==true) {
                // Assuming 'response.data.response' is an array
                const [profileInfoData] = response?.response;
                console.log(profileInfoData, "profileInfoSDtaa in superlead for reviewr");

                setProfileInfo(profileInfoData);
            } else {
                console.error("Failed to get profileInfo data:", response?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchReviewerStatus = async () => {
        try {
            const reviewerStatus = await getReviewerStatus()
            console.log(reviewerStatus?.response,"reviewrs status in suerleaddd");
            
            if (reviewerStatus.status === true) {
                setReviewerStatus(reviewerStatus?.response)
            }
        } catch (error) {

        }
    }
    // useEffect(() => {
    //     const fetchReviewDetails = async () => {

    //         try {
    //             const batchId = "657aa5093476c843c28a377d";
    //             const data = {
    //                 reviewerId,
    //                 batchId
    //             }
    //             const response = await getReviewDetails(data);
    //             if (response) {
    //                 console.log(response, "weekly review details cominggg");
    //                 setReviewDetails(response.response)
    //             } else {

    //             }
    //         } catch (err) {
    //             console.error("Error fetching extension details:", err);

    //         }
    //     };

    //     fetchReviewDetails();
    // }, []);
    // const openPendingTopicsModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setPendingTopics(true);
    // };

    // const openNextWeekUpdationModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setNexWeekUpdation(true);
    // };
    // const openPersonalWorkoutsModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setPersonalWorkouts(true);
    // };
    // const openMiscellaneousWorkoutModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setMiscellaneousWorkouts(true);
    // };
    // const openCommunicationModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setCommunication(true);
    // };
    // const openTotalScoreModal = (week: string) => {
    //     console.log(week, "{}{}{+++)()(*****");

    //     setWeek(week);
    //     setTotalScore(true);
    // };
    return (
        <>
        <section className="p-3 sm:p-5 mt- w-full mt-36 mb-0">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12 mb-0">

                <div className="bg-white border relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="relative">

                    <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/pages/profile-banner.png" alt="" className="w-full h-48" />


                        <div className="flex mb-0">
                            <div className="absolute top-36 left-8 w-26 bg-white rounded-md">
                                <img src={profileInfo?.imageUrl} alt="" className="w-28 h-28 rounded-md" />
                            </div>
                            <div className="m-40 mt-0 mb-0">
                                <p className="font-serif text-gray-500 pt-3 ">{profileInfo?.firstName} {profileInfo?.lastName}</p>
                                {reviewerStatus.map((status, idx) => (
                                    <React.Fragment key={idx}>
                                                    
                                    {reviewerId === status?._id && status?.isStatus === "Active" ? (
                                        // Render this block if the condition is true
                                        <div className="mt-0 mb-5">
                                        <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">Active</span>
                                    </div>
                                    ) : reviewerId === status?._id && status?.isStatus === "Terminate" ? (
                                        // Render this block if the else if condition is true
                                        <div className="mt-0 mb-5">
                                         <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                    </div>
                                    ) : reviewerId === status?._id && status?.isStatus === "Suspend" ? (
                                        <div className="mt-0 mb-5">
                                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer bg-gray-10 text-Outstanding ring-Outstanding font-roboto text-xs">Suspend</span>
                                    </div>
                                    ) : reviewerId === status?._id && status?.isStatus === "Quit" ? (
                                        <div className="mt-0 mb-5">
                                        <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Quit</span>
                                    </div>
                                    )  : null}
                                </React.Fragment>
                                ))}

                            </div>

                        </div>
                        {/* <div className="bg-custom-background"> */}
                            <div className='bg-white h-auto m-8 mt-0  ml-4  rounded-xl '>

                                <div className='ml-3 mt-5  w-full h-auto rounded-md border border-gray-300'>
                                    <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Personal Information</h1>
                                    {/* <span className="absolute font-roboto  mr-5 right-3 mt-24 inline-flex items-center rounded-md bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-700/10 cursor-pointer" >
                                        <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
                                         Edit Your Account
                                    </span> */}

                                    <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>First Name</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.firstName}</p>

                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Last Name</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.lastName}</p>

                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Email</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.email}</p>

                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Phone</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.phone}</p>

                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Gender</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.gender}</p>

                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Age</p>
                                            
                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.age}</p>

                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                    <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Skills</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.skills}</p>

                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Experience</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.experience}</p>

                                        </div>
                                  
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Preffered Domains For Review</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.PrefferedDomainsForReview}</p>

                                        </div>
                                 

                                    </div>
                                    <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                    <div className='flex flex-col'>
                                            <p className='text-sm text-gray-400 font-roboto'>Current Working Company</p>

                                            <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.CurrentWorkingCompanyName}</p>

                                        </div>
                       
                                    </div>
                  
                                </div>
                   
                            </div>
                        </div>

                    </div>
                </div>

            {/* </div> */}
        </section>

    </>
    );
}

export default ViewReviewer;
