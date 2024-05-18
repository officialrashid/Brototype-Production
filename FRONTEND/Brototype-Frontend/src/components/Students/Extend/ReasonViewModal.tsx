import { useEffect, useState } from "react";
import { getRequestExtendDetails } from "../../../utils/methods/get";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const ReasonViewModal = ({ isVisible, isClose, extendId }) => {
  const [viewReason, setViewReason] = useState([]);
  const studentId:string = useSelector((state: any) => state?.student?.studentData?.studentId);
  useEffect(() => {
    const fetchExtendDetails = async () => {
      console.log(extendId,"this is extendidsss");
      
      try {
        const response = await getRequestExtendDetails(studentId);
        console.log(response,"respine in get reasonseeeee");
        
        if (response) {
          const extendedData = response.find((data:any) => {
            console.log(data,"daaa coming yarrr");
            
            if (data?.reviews?._id === extendId) {
                console.log(data, "oooo");
                setViewReason(data);
                return true; // Stop iteration once the item is found
            }
            return false; // Continue iteration
        });
        
     
        } else {
          isClose(); // Close the modal if there is an error
        }
      } catch (err) {
        console.error("Error fetching extension details:", err);
        isClose(); // Close the modal if there is an error
      }
    };

    fetchExtendDetails();
  }, [extendId, isClose]);

  if (!isVisible) return null;

  return (
    <>
    {
      console.log(viewReason
        ,"viewrweasoneee")
      
    }
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
            <div><span className="font-semibold font-roboto text-md mb-2">Extend Reason</span></div>
          </div>
          <div className="m-5 mt-6">
            <div className="">
              <textarea
                cols={30}
                rows={10}
                value={viewReason?.reviews?.extendReason}
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
};

export default ReasonViewModal;
