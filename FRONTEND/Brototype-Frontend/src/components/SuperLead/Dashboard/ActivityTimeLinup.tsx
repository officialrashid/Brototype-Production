import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getActivityTimeLineup } from '../../../utils/methods/get';

const ActivityTimeLinup = () => {
  const [activity, setActivity] = useState([]);
  const superleadId = useSelector((state) => state?.superlead?.superleadData?.superleadId);

  useEffect(() => {
    const fetchActivityTimeLineup = async () => {
      try {
        const response = await getActivityTimeLineup(superleadId);
        console.log(response, "response in frontend");
        if (response?.response?.status === true) {
          setActivity(response?.response?.events);
        }
      } catch (error) {
        // error handling
      }
    };
    fetchActivityTimeLineup();
  }, []);

  const markAsComplete = (index) => {
    // Implement logic to mark event as complete
    // For example, you can update the state or make an API call
    console.log("Marking event as complete:", index);
  };

  return (
    <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
      {activity.length > 0 ? (

        <>
          {activity.map((data, index) => (
            <div key={index} className={`w-72 h-18 ml-4 mt-3 rounded-xl`}>
              <ol className={`absolute ml-2 border-s border-gray-400 dark:border-gray-400`}>
                <li className="mb-16 ms-4">
                  <div className={`absolute -start-1.5 mt-7 h-3 w-3 rounded-full border border-white bg-${data.label} dark:border-blue-900 dark:bg-blue-700`}></div>
                  <a href="#" className="inline-flex items-center px-4 py-2 text-sm"> </a>
                </li>
              </ol>

              <div className="flex flex-row gap-5 w-28rem">
                <div className="flex flex-row gap-5 w-38rem ">
                  <div className="flex flex-col ml-8 mt-5">
                    <h1 className={`font-roboto text-sm mt-2 text-black`}>{data.title}</h1>
                    <h1 className={`font-roboto text-sm mt-1 text-gray-400 tex-sm`}>Meeting For Advisors</h1>
                  </div>
                </div>
                <div className="flex flex-row mt-5 ml-5">
                  <h1 className={`font-roboto text-sm mt-2 text-gray-400 tex-sm`}>{data.startTime}</h1>
                  {/* <span className="font-roboto text-xs inline-flex items-center h-6 rounded-md bg-pink-50 px-3 py-1  font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer ml-5 mt-2" onClick={() => markAsComplete(index)}>
        Complete
     </span> */}
                </div>

              </div>
            </div>

          ))}


        </>
      ) : (
        <div className=" mb-0 mt-0 mr-0 ml-32 mt-24  flex flex-col ">
          <div className="ml-4">
            <img src="https://assets.calendly.com/assets/frontend/media/empty_image-f1d91552a38a1ee7e843.svg" alt="" className="w-56 h-56" />
          </div>
          <div className="ml-8 ">
            <p className="font-roboto text-sm ">No events scheduled for this date</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default ActivityTimeLinup;
