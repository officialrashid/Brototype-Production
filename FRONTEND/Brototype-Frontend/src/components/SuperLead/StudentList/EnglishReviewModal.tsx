import React, { useEffect, useState } from "react";
import { getReviewDetails } from "../../../utils/methods/get";

const CommunicationModal = ({ isVisible, isClose, week, studentId, batchId }) => {
  const [Communication, setCommunication] = useState([]);

  useEffect(() => {
    const fetchPendingTopics = async () => {
      try {
        const data = {
          studentId,
          batchId,
        };
        const response = await getReviewDetails(data);
console.log(response,"pending topics modal compngg");

        if (response ) {
            console.log("777777777");
            
          const weekData = response?.response?.find((data: { week: any; }) => data.week === week);
           console.log(weekData);
           
          if (weekData && weekData.CommunicationReview) {
            console.log(weekData.CommunicationReview);
            
            setCommunication(weekData.CommunicationReview);
          } else {
            console.log("{}{}{}{}{");
            
            isClose();
          }
        } else {
          isClose();
        }
      } catch (error) {
        // Handle error case
      }
    };

    // Invoke the useEffect
    fetchPendingTopics();
  }, [ isClose]);

  if (!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
                <div className="border border-gray-200 m-5 rounded-lg shadow-2xl w-2/5 bg-white">
                    <div className="flex justify-between">
                        <div></div>
                        <div className="ml- mr-4 mt-4">
                            <span onClick={() => { isClose() }} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <div><span className="font-semibold font-roboto text-md mb-2">Communication Reviews</span></div>
                    </div>
                    <div className="m-5 mt-6">
                        <div className="">
                            <textarea
                                cols={30}
                                rows={10}
                               value={Communication.join("\n")||""}
                                readOnly
                                className="w-full px-5 py-2 border-gray-200 shadow-xl outline-black border border-gray-400 font-roboto"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between m-6">
                        <div></div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommunicationModal;
