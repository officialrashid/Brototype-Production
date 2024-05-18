
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfile, getReviewDetails, getStudentStatus } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import PendingTopicsModal from './PendingTopicsModal';
import NextWeekUpdationModal from './NextWeekUpdationModal';
import PersonalWorkoutsModal from './PersonalWorkoutsModal';
import MiscellaneousWorkoutModal from './MiscellaneousWorkoutModal';
import CommunicationModal from './EnglishReviewModal';
import TotalScoreModal from './TotalScoreModal';

const ViewStudent = () => {
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId")
    const [profileInfo, setProfileInfo] = useState({});
    const [setPersonalInfo, setPersonalInfoUpdate] = useState(false);
    const [studentStatus, setStudentStatus] = useState([])
    const [reviewDetails, setReviewDetails] = useState([]);
    const [pendingTopics, setPendingTopics] = useState(false);
    const [NexWeekUpdation, setNexWeekUpdation] = useState(false);
    const [PersonalWorkouts, setPersonalWorkouts] = useState(false);
    const [MiscellaneousWorkouts, setMiscellaneousWorkouts] = useState(false);
    const [Communication, setCommunication] = useState(false);
    const [ToatlScore, setTotalScore] = useState(false);
    const [week, setWeek] = useState("");
    const location = useLocation();
    const studentId = location.state && location.state.studentId;
    const batchId = "657aa5093476c843c28a377d";
    useEffect(() => {
        fetchStudentProfile();
        fetchStudentStatus();
    }, [setPersonalInfo, setPersonalInfoUpdate]);
    const exampleData = {
        imageUrl: 'example-image-url',
        firstName: 'Muhammed',
        lastName: 'Rashid k',
        domain: 'Example Domain',
        batch: 'Example Batch',
        dateOfBirth: 'Example Date of Birth',
        age: 'Example Age',
        gender: 'Example Gender',
        email: 'example@email.com',
        phone: '123-456-7890',
        fathersName: 'Example Father',
        mothersName: 'Example Mother',
        fathersContact: '123-456-7891',
        mothersContact: '123-456-7892',
        houseName: 'Example House',
        village: 'Example Village',
        taluk: 'Example Taluk',
        district: 'Example District',
        state: 'Example State',
        pincode: 'Example Pincode',
        highestQualification: 'Example Qualification',
        yearOfPassing: 'Example Year',
        passPercentage: 'Example Percentage',
        schoolOrCollegeOrInstituteName: 'Example School/College/Institution',
        // ... other profileInfo fields
    };
    const fetchStudentProfile = async () => {
        try {
            const response = await getProfile(studentId);
            console.log(response, "PPppp");

            if (response?.data?.status) {
                // Assuming 'response.data.response' is an array
                const [profileData] = response.data.response;
                console.log(profileData, "profileSDtaa in superlead");

                setProfileInfo(profileData);
            } else {
                console.error("Failed to get profile data:", response?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchStudentStatus = async () => {
        try {
            const studentStatus = await getStudentStatus(superleadUniqueId)
            if (studentStatus.status === true) {
                setStudentStatus(studentStatus?.response?.response)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        const fetchReviewDetails = async () => {

            try {
                const batchId = "657aa5093476c843c28a377d";
                const data = {
                    studentId,
                    batchId
                }
                const response = await getReviewDetails(data);
                if (response) {
                    console.log(response, "weekly review details cominggg");
                    setReviewDetails(response.response)
                } else {

                }
            } catch (err) {
                console.error("Error fetching extension details:", err);

            }
        };

        fetchReviewDetails();
    }, []);
    const openPendingTopicsModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setPendingTopics(true);
    };

    const openNextWeekUpdationModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setNexWeekUpdation(true);
    };
    const openPersonalWorkoutsModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setPersonalWorkouts(true);
    };
    const openMiscellaneousWorkoutModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setMiscellaneousWorkouts(true);
    };
    const openCommunicationModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setCommunication(true);
    };
    const openTotalScoreModal = (week: string) => {
        console.log(week, "{}{}{+++)()(*****");

        setWeek(week);
        setTotalScore(true);
    };
    return (
        <>
        <div className="flex justify-center mr-0 mt-36">
            <div className="m-8 mr-0 flex h-1/4 w-1/4 items-center justify-center border bg-white shadow rounded-md">
                <div className="flex flex-col items-center w-full">
                    <div className="m-6 mb-0 ml-0 mr-0 h-24 w-24 ">
                        <img src="https://s3.ap-south-1.amazonaws.com/brototype-students-profile/657aaa012a15acfff364bb5a/7154d64c-72ee-43a9-abf8-7c071ff2bffd" alt="" className="h-full w-full object-cover rounded-md" />
                    </div>
                    <div className="mt-2">
                        <p className="m-4 mb-0 mt-3 mr-0 text-center font-roboto text-sm font-semibold text-gray-600">{profileInfo.firstName} {profileInfo.lastName}</p>
                    </div>
                    <div>
                        <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3">{profileInfo.domain}</span>
                    </div>
                    <div className="mt-5 mb-0 ml-4 w-full">
                        <p className="font-roboto font-meduim mb- ml-3 text-gray-600">Details</p>
                        <div className="border-b mt-3"></div>
                        <div className="mt-5">
                            <ul className="max-w-md space-y-1 text-gray-600 list-none list-inside dark:text-gray-400 text-sm font-roboto ml-3">
                                <li className="item items-start">
                                    Name: {profileInfo.firstName} {profileInfo.lastName}
                                </li>
                                <li className="item items-start pt-2">
                                    Batch: {profileInfo.batch}
                                </li>
                                <li className="item items-start pt-2">
                                    Domain: {profileInfo.domain}
                                </li>
                                <li className="item items-start pt-2">
                                    Age: {profileInfo.age}
                                </li>
                                <li className="item items-start pt-2">
                                    Gender: {profileInfo.gender}
                                </li>
                                <li className="item items-start pt-2">
                                    Date of Birth: {profileInfo.dateOfBirth}
                                </li>
                                <li className="item items-start pt-2">
                                    Phone: {profileInfo.phone}
                                </li>
                                <li className="item items-start pt-2">
                                    Email: {profileInfo.email}
                                </li>
                                <li className="item items-start pt-2">
                                    Father's Name: {profileInfo.fathersName}
                                </li>
                                <li className="item items-start pt-2">
                                    Mother's Name: {profileInfo.mothersName}
                                </li>
                                {studentStatus.map((status, idx) => (
                                    <React.Fragment key={idx}>
                                                    
                                    {studentId === status.studentId && status.isStatus === "Active" ? (
                                        // Render this block if the condition is true
                                        <td className="px-0 py-3" key={idx}>
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">Active</span>
                                        </td>
                                    ) : studentId === status.studentId && status.isStatus === "Terminate" ? (
                                        // Render this block if the else if condition is true
                                        <td className="p-0 py-4" key={idx}>
                                            <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                        </td>
                                    ) : studentId === status.studentId && status.isStatus === "Suspend" ? (
                                        <td className="p-0 py-4" key={idx}>
                                            <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                        </td>
                                    ) : studentId === status.studentId && status.isStatus === "Quit" ? (
                                        <td className="p-0 py-4" key={idx}>
                                            <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                        </td>
                                    ) : studentId === status.studentId && status.isStatus === "Placed" ? (
                                        <td className="p-0 py-4" key={idx}>
                                            <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                        </td>
                                    ) : null}
                                </React.Fragment>
                                ))}

                            </ul>
                        </div>
                        <div className="flex items-center justify-center gap-2 m-5">
                            <button type="button" className="focus:outline-none text-white bg-Average hover:bg-Average focus:ring-4 focus:ring-Average font-medium rounded-lg text-xs font-roboto px-5 py-2 mb-2 dark:bg-Average dark:hover:bg-Average dark:focus:ring-Average">Edit</button>
                            <button type="button" className="focus:outline-none text-red-500 hover:text-white bg-red-100 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2 mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Suspended</button>
                        </div>
                    </div>
                </div>
            </div>


            <section className=" w-2/4 p-3 sm:p-5  ">
                <div className="mx-auto max-w-screen-xl ml-0 mr-0 mt-3 ">

                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ">
                        <h1 className='font-roboto m-5 ml-8 font-semibold mb-0'>Review Results</h1>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-2 border-b dark:border-gray-700">
                        
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-between md:space-x-3 flex-shrink-0 m-7 mb-2 mt-3  mr-4 ">
                            <div className="w-full md:w-10">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <p className='text-sm font-roboto'>10</p>
                                        </div>
                                        <select type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none" required="">
                                            <option value="10 text-sm font-roboto">60</option>
                                            <option value="10 text-sm font-roboto">60</option>
                                            <option value="10 text-sm font-roboto">60</option>
                                            <option value="10 text-sm font-roboto">60</option>
                                        </select>
                                    </div>


                                </form>
                            </div>

                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 mt-3">
                                <div className="w-full md:w-2/6">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto" required="" placeholder='Search...' />
                                        </div>


                                    </form>
                                </div>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-1.5 px-4 text-sm font-roboto font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Actions
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                        </div>
                                    </div>

                                    <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-1.5 text-sm font-roboto font-medium  font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs font-roboto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr className=''>
                                        <th scope="col" className="px-4 py-3 ">Week</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Advisor</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Reviewer</th>
                                        <th scope="col" className="px-8 py-3 item text-center">date</th>
                                        <th scope="col" className="px-4 py-3 item text-center">pending Topics</th>
                                        <th scope="col" className="px-4 py-3 item text-center">next Week Updation</th>
                                        <th scope="col" className="px-4 py-3 item text-center">personal Workout Review</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Miscellaneus Workouts Review</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Communication Review</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Score</th>
                                        <th scope="col" className="px-4 py-3 item text-center ">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reviewDetails.map((data, index) => (
                                    <tr className="border-b dark:border-gray-700 item text-center">
                                      <td className="px-4 py-3 text-ms font-roboto">{data.week}</td>
                                        <td className="px-4 py-3 text-ms font-roboto">{data.advisor}</td>
                                        <td className="px-4 py-3 text-sm font-roboto">{data.reviewer}</td>
                                        <td className="px-4 py-3 text-sm font-roboto">{data.date}</td>
                                        <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openPendingTopicsModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openNextWeekUpdationModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openPersonalWorkoutsModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openMiscellaneousWorkoutModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openCommunicationModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3">
                                            <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot"onClick={() => openTotalScoreModal(data?.week)}>View</span>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                            <span
                                           
                                            className={`text-xs inline-flex items-center rounded-md font-roboto  ${data.reviewScore < 10 ? 'bg-blue-50' :
                                                data.reviewScore > 9 && data.reviewScore <= 10 ? 'bg-orange-50' :
                                                    data.reviewScore > 10 && data.reviewScore <= 12 ? 'bg-yellow-50' : 'bg-green-50'
                                                } px-2 py-1 text-xs font-medium ${data.reviewScore < 10 ? 'text-blue-700' :
                                                data.reviewScore > 9 && data.reviewScore <= 10 ? 'text-orange-700' :
                                                    data.reviewScore > 10 && data.reviewScore <= 12 ? 'text-yellow-700' : 'text-green-700'
                                                } ring-1 ring-inset ${data.reviewScore < 10 ? 'ring-blue-700/10' :
                                                data.reviewScore > 9 && data.reviewScore <= 10 ? 'ring-orange-700/10' :
                                                    data.reviewScore > 10 && data.reviewScore <= 12 ? 'ring-yellow-700/10' : 'ring-green-700/10'
                                                } cursor-pointer`}
                                           
                                        >
                                            {data.reviewScore < 10
                                                ? 'Repeat'
                                                : data.reviewScore > 9 && data.reviewScore <= 10
                                                    ? 'Critical'
                                                    : data.reviewScore > 10 && data.reviewScore <= 12
                                                        ? 'Need Improvement'
                                                        : 'Task Done'}
                                        </span>
                                        </td>
                                    </tr>
                                       ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

        </div>
         <PendingTopicsModal
         isVisible={pendingTopics}
         isClose={() => setPendingTopics(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
     <NextWeekUpdationModal
         isVisible={NexWeekUpdation}
         isClose={() => setNexWeekUpdation(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
     <PersonalWorkoutsModal
         isVisible={PersonalWorkouts}
         isClose={() => setPersonalWorkouts(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
     <MiscellaneousWorkoutModal
         isVisible={MiscellaneousWorkouts}
         isClose={() => setMiscellaneousWorkouts(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
     <CommunicationModal
         isVisible={Communication}
         isClose={() => setCommunication(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
           <TotalScoreModal
         isVisible={ToatlScore}
         isClose={() => setTotalScore(false)}
         week={week}
         studentId={studentId}
         batchId={batchId}
     />
</>
    );
}

export default ViewStudent;
