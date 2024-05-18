import { useEffect, useState } from "react";
import ExtendModal from "../Extend/ExtendModal";
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from "react-redux";
import { getAdvisorDetails, getRequestExtendDetails, getStudentReview } from "../../../utils/methods/get";
import { updateMeetUrl } from "../../../utils/methods/patch";
import { changeFrame } from "../../../redux-toolkit/reviewSlice";
const UpcomingReviews = () => {
  const studentId: string = useSelector((state: any) => state?.student?.studentData?.studentId);
  const [extendRequests, setExtendRequests] = useState([])
  const [newRequest, setNewRequets] = useState(false)
  const [studentReview, setStudentReview] = useState({})
  const [advisorId, setAdvisorId] = useState("")
  const [reviewId, setReviewId] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("keriyannuuuuu");
    ReactGA.pageview(window.location.pathname);
  }, []);

  const trackreview = (selectedWeek: string) => {
    // Track a custom event when a week is selected
    ReactGA.event({
      category: 'Weekly Performance Graph',
      action: 'Week Selected',
      label: selectedWeek,
      value: 1
    });

    console.log("afterrrr");


  };

  useEffect(() => {
    const fetchExtendDetails = async () => {
      try {
        const response = await getRequestExtendDetails(studentId);
        if (response) {
          console.log(response.response, "upcoming review extend deatils");

          setExtendRequests(response.response);
        } else {

        }
      } catch (err) {
        console.error("Error fetching extension details:", err);

      }
    };

    fetchExtendDetails();
  }, []);

  useEffect(() => {
    const fetchStudentReview = async () => {
      try {
        const combinedData: any = [];
        const response = await getStudentReview(studentId)
        console.log(response, "+++++++++++???????????????000000?????????");
        // for (const data of response) {
        // Fetch advisor details for each review
        const advisorDetails = await getAdvisorDetails(response.coordinatorId);
        if (advisorDetails.status === true && advisorDetails.response.length > 0) {
          // Combine review data with advisor details
          console.log("kidannittillaaaaaaaaa");

          const reviewData = {
            response,
            advisorName: `${advisorDetails.response[0].firstName} ${advisorDetails.response[0].lastName}`,
            phone: advisorDetails.response[0].phone
          };
          // Push the combined data to the array
          console.log(combinedData, "PPPPPPP99*&^^%%5555555####");

          combinedData.push(reviewData);
        }
        // }
        setStudentReview(combinedData)
      } catch (error) {

      }
    }
    fetchStudentReview()
  }, [])

  const handleMeetStart = async (coordinatorId: string, reviewId: string, meetingLink: string) => {

    dispatch(changeFrame(true))
    const response = await updateMeetUrl(coordinatorId, reviewId, meetingLink)
  }
  const handleExtend = (advisorId: string, reviewId: string) => {
    setAdvisorId(advisorId)
    setReviewId(reviewId)
    setNewRequets(true)
  }
  return (
    <>
      <div className="border m-5 h-fit rounded-xl shadow-sm bg-white">
        <ExtendModal isVisible={newRequest} isClose={() => { setNewRequets(false) }} advisorId={advisorId} reviewId={reviewId} />

        <div className='mx-auto p-2 mt-4 '>
          <table className="w-full text-sm text-left  table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-custom-background shadow-xl dark:text-gray font-roboto">
              <tr>
                <th scope="col" className="w-1/4 px-5 py-6 text-center  rounded-s-md">
                  Week
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                  Date
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                  StartTime
                </th>
                <th scope="col" className="w-1/4 px-5 py-6  text-center">
                  Advisor
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                  contact
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                  Chat
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center">
                  Extend
                </th>
                <th scope="col" className="w-1/4 px-5 py-6 text-center rounded-e-md ">
                  Status
                </th>

              </tr>
            </thead>
          </table>
        </div>
        {studentReview.length > 0 ? (
 <div className='mx-auto p-2 mb-2 '>
 <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 rounded-md font-roboto ">
   <thead className="text-md text-gray-700 bg-gray-100 shadow-2xl dark:text-gray-800">
     <tr className="">
       <th scope="col" className="w-1/4 px-4 py-6  text-center " style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>Week 1

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center">{studentReview[0]?.response?.reviews?.scheduledDate}

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
         {studentReview[0]?.response?.reviews?.startTime}

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>{studentReview[0]?.advisorName}

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>{studentReview[0]?.phone}

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center ">
         {studentReview[0]?.response?.reviews?.meetingLink != null ? (
           <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={(() => handleMeetStart(studentReview[0]?.response?.coordinatorId, studentReview[0]?.response?.reviews?._id, ""))}>Join Meet</span>
         ) : (
           <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={(() => handleMeetStart(studentReview[0]?.response?.coordinatorId, studentReview[0]?.response?.reviews?._id, `https://8x8.vc/vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e/${studentId}`))}>Start Meet</span>
         )}

       </th>
       <th scope="col" className="w-1/4 px-4 py-6 text-center">
         {/* {!extendRequests.some(item => item.currentWeek === "week6" && item.requestCount === 1 || item.requestCount === 2) ? ( */}
         <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { handleExtend(studentReview[0]?.response?.coordinatorId, studentReview[0]?.response?.reviews._id) }}>Request</span>
         {/* ) : "---"} */}
       </th>


       {studentReview[0]?.response?.reviews?.reviewStatus === "scheduled" ? (
         <th scope="col" className="w-1/4 px-4 py-6 text-center  ">
           <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">Not Completed</span>
         </th>
       ) : (
         <th scope="col" className="w-1/4 px-4 py-6 text-center  ">
           <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">Completed</span>
         </th>
       )}


     </tr>
   </thead>
 </table>
</div>
        ):(
          <div className="m-4">
          <h1 className="item text-center font-roboto">No Scheduled Review</h1>
          </div>
        )}
       
     



      </div>

    </>

  );
}

export default UpcomingReviews;




