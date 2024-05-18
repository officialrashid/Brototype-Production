import { useEffect, useState } from "react";
import { getReviewDetails } from "../../../utils/methods/get";
import PendingTopicsModal from "./PendingTopicsModal";
import NextWeekUpdationModal from "./NextWeekUpdationModal";
import PersonalWorkoutsModal from "./PersonalWorkoutsModal";
import MiscellaneousWorkoutModal from "./MiscellaneousWorkoutModal";
import CommunicationModal from "./EnglishReviewModal";
import TotalScoreModal from "./TotalScoreModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";



const ReviewResult = () => {
    const [reviewDetails, setReviewDetails] = useState([]);
    const [pendingTopics, setPendingTopics] = useState(false);
    const [NexWeekUpdation, setNexWeekUpdation] = useState(false);
    const [PersonalWorkouts, setPersonalWorkouts] = useState(false);
    const [MiscellaneousWorkouts, setMiscellaneousWorkouts] = useState(false);
    const [Communication, setCommunication] = useState(false);
    const [ToatlScore, setTotalScore] = useState(false);
    const [week, setWeek] = useState("");
    const batchId: any = useSelector((state: any) => state?.student?.studentData?.batchId);
    const studentId:string = useSelector((state: any) => state?.student?.studentData?.studentId);
    useEffect(() => {
        const fetchReviewDetails = async () => {

            try {
                const data = {
                    studentId,
                    batchId
                }
                const response = await getReviewDetails(data);
                if (response) {
                    console.log(response, "weekly review details cominggg");
                    setReviewDetails(response.response)
                    // setExtendRequests(response.response);
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
            <div className="border m-5 h-fit rounded-xl shadow-2xl bg-white">
                <div className='mx-auto p-2 mt-4'>
                    <table className="min-w-full text-sm text-center">
                        <thead className="text-xs text-gray-700 uppercase bg-custom-background shadow-xl dark:text-gray font-roboto">
                            <tr>
                                <th scope="col" className="w-1/4 px-5 py-6 rounded-s-md">
                                    Week
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Reviewer
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Advisor
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Date
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Status
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Pending Topics
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Next Week Updation
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Personal Workouts Review
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Miscellaneous Workouts Review
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    English Review
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6">
                                    Score
                                </th>
                                {/* <th scope="col" className="w-1/4 px-5 py-6">
                                    Score
                                </th> */}
                            </tr>
                        </thead>
                    </table>
                </div>
                {reviewDetails.length > 0 && (
                    <>
                    {reviewDetails.map((data, index) => (
                        <div className='mx-auto p-2 mb-2' key={index}>
                            <table className="w-full text-sm text-center divide-y divide-y-8 border table-fixed border-gray-400 rounded-md font-roboto">
                                <tbody>
                                    <tr key={index}>
                                        <td className="w-1/4 px-5 py-6">
                                            {data?.week}
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            {data.reviewerName}
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            {data.advisorName}
                                        </td>
                                        <td className="w-1/4 px-5 pr-10 py-6">
                                            {data.date}
                                        </td>
                                        <td className="w-1/4 px-5 right-32 py-6">
    
                                            <span
                                                style={{ marginLeft: '-4rem' }}
                                                className={`inline-flex items-center rounded-md ${data.reviewScore < 10 ? 'bg-blue-50' :
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
                                                {data.reviewScore < 10 && data.repeat===true
                                                    ? 'Repeat'
                                                    : data.reviewScore > 9 && data.reviewScore <= 10
                                                        ? 'Critical'
                                                        : data.reviewScore > 10 && data.reviewScore <= 12
                                                            ? 'Need Improvement'
                                                            : 'Task Done'}
                                            </span>
    
    
                                        </td>
    
    
                                        <td className="w-1/4 px-5 right-32 py-6">
                                            <span
                                                style={{ marginLeft: '-4rem' }}
                                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openPendingTopicsModal(data?.week)}>view</span>
                                        </td>
                                        <td className="w-1/4 px-5 py-6" >
                                            <span
                                                style={{ marginLeft: '-4rem' }}
                                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openNextWeekUpdationModal(data?.week)}>view</span>
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            <span
                                                style={{ marginLeft: '-4rem' }}
                                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openPersonalWorkoutsModal(data?.week)} >view</span>
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openMiscellaneousWorkoutModal(data?.week)}>view</span>
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openCommunicationModal(data?.week)}>view</span>
                                        </td>
                                        <td className="w-1/4 px-5 py-6">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openTotalScoreModal(data?.week)} >view</span>
                                        </td>
                                        {/* <td className="w-1/4 px-5 py-6">
                                            <span className={`inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 cursor-pointer`} onClick={() => openTotalScoreModal(data?.week)} >Repeat</span>
                                        </td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}  
                    </>
                )}
              
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

export default ReviewResult;
