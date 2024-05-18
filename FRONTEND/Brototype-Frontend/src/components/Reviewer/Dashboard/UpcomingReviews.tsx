import { useEffect, useState } from "react";
// import ExtendModal from "../Extend/ExtendModal";
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from "react-redux";
import { getAdvisorDetails, getRequestExtendDetails, getReviews } from "../../../utils/methods/get";
import { updateMeetUrl } from "../../../utils/methods/patch";
import { changeFrame } from "../../../redux-toolkit/reviewSlice";
const UpcomingReviews = () => {
  const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
  const [reviewes, setReviewes] = useState([])
  const dispatch = useDispatch()
  let meetingUrl : string ;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const combinedData:any = []; // Array to store combined review and advisor data
        const response = await getReviews(reviewerId);
        console.log(response, "lll");
        if (response?.response?.status === true) {
          // Iterate through each review
          for (const data of response?.response?.reviewes) {
            // Fetch advisor details for each review
            const advisorDetails = await getAdvisorDetails(data.advisorId);
            console.log(advisorDetails, "advisorDetails response");
            // Check if advisor details were fetched successfully
            if (advisorDetails.status === true && advisorDetails.response.length > 0) {
              // Combine review data with advisor details
              const reviewData = {
                data,
                advisorName: `${advisorDetails.response[0].firstName} ${advisorDetails.response[0].lastName}`,
                phone: advisorDetails.response[0].phone
              };
              // Push the combined data to the array
              combinedData.push(reviewData);
            }
          }
          console.log(combinedData,"combinedData combineataaaa");
          
          // Set the combined data to state
    setReviewes(combinedData);
        } else {
          setReviewes([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
  const handleMeetStart = async (advisorId:string,reviewId:string,meetingUrl:string) =>{
    dispatch(changeFrame(true))
        const response = await updateMeetUrl(advisorId,reviewId,meetingUrl)
  }
  return (
    <>
      <div className="border m-5 h-fit rounded-xl shadow-sm bg-white">

        <div className='mx-auto p-2 mt-4 '>
          <table className="w-full text-sm text-left  table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-custom-background shadow-xl dark:text-gray font-roboto">
              <tr>
                {/* <th scope="col" className="w-1/4 px-5 py-6 text-center  rounded-s-md">
                  Week
                </th> */}
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
                  Meeting Link
                </th>

                <th scope="col" className="w-1/4 px-5 py-6 text-center rounded-e-md ">
                  Status
                </th>

              </tr>
            </thead>
          </table>
        </div>
        {reviewes.map((data: any, index: number) => (
           <>
          
           
          <div className='mx-auto p-2 mb-2 '>

            <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 rounded-md font-roboto ">

              <thead className="text-md text-gray-700 bg-gray-100 shadow-2xl dark:text-gray-800">
                <tr className="">

                  <th scope="col" className="w-1/4 px-4 py-6 text-center">{data.data.date}

                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                    {data.data.startTime}

                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>{data.advisorName}

                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>{data.phone}

                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                    
                    <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer"onClick={(()=>handleMeetStart(data?.data?.advisorId,data?.data?.reviewId,data.data.meetingUrl))}>Join Meet</span>
                  </th>
                  {data.data.status === true ? (
                    <th scope="col" className="w-1/4 px-4 py-6 text-center  ">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">Completed</span>
                    </th>
                  ) : (
                    <th scope="col" className="w-1/4 px-4 py-6 text-center  ">
                      <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">Not Complete</span>
                    </th>
                  )}


                </tr>
              </thead>


            </table>

          </div>
          </>
        ))}

      </div>

    </>

  );
}

export default UpcomingReviews;






