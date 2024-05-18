import { useNavigate } from 'react-router-dom';
import { getReviewDetails } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Task = () => {
  const studentId = useSelector((state) => state?.student?.studentData?.studentId);
  const batchId: any = useSelector((state: any) => state?.student?.studentData?.batchId);
  const navigate = useNavigate();
  const [taskView, setTaskView] = useState([]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const data = { studentId, batchId };
        const response = await getReviewDetails(data);
        if (response.status === true) {
          setTaskView(response.response);
        } else {
          // Handle the case where response status is false
        }
      } catch (error) {
        console.error("Error fetching review details:", error);
        // Handle the error, show a message, or take appropriate action
      }
    };
    fetchReviewDetails();
  }, [studentId, batchId]);

  const handleViewTask = (weekName:string) => {
    const currentIndex = Object.keys(Mernstack[0]).indexOf(weekName);
    const previousWeekName = Object.keys(Mernstack[0])[currentIndex - 1];
    
    if (currentIndex === 0) {
      // If the current week is the first week, navigate to viewTask directly
      navigate('/student/viewTask', { state: { weekName } });
    } else {
      const foundWeek = taskView.find((data) => data.week === previousWeekName && data.status === true);
      if (foundWeek && foundWeek.status === true) {
        // If the previous week has been completed, navigate to viewTask
        navigate('/student/viewTask', { state: { weekName } });
      } else {
        // If the previous week hasn't been completed, show a warning message
        toast.warn(`Please complete ${previousWeekName} before accessing ${weekName}`);
      }
    }
  };
  
  const Mernstack = [
    {
      week1: [],
      week2: [],
      week3: [],
      week4: [],
      week5: [],
      week6: [],
      week7: [],
      week8: [],
      week9: [],
      week10: [],
      // Add more weeks as needed
    },
  ];
  let lastWeekName: string;
  return (
    <>
      {Mernstack.map((weeksObject, index) => (
        Object.keys(weeksObject).map((weekName, weekIndex) => {
      
          const isStatusTrue = Array.isArray(taskView) && (
            // For the first week, consider it as unlocked by default


            taskView.some((item, index) => {
          
              if (item.week === weekName && item.status===true) {
               
                
                lastWeekName = weekName; // Update the last week name
          
                
                return true;
              }
              return false;
            })

          );
          let nextWeekName = null;
          if (lastWeekName) {
            const lastWeekIndex = parseInt(lastWeekName.match(/\d+/)[0]); // Extract the week number
       
            
            const nextWeekIndex = lastWeekIndex + 1;
            nextWeekName = `week${nextWeekIndex}`;
          }

          return (
            <div key={`${index}-${weekName}`} className="ml-5 mr-5 mt-5 border border-gray-300 flex gap-4 h-fit rounded-2xl px-8 py-2 bg-white shadow-md">
              <div onClick={() => handleViewTask(weekName)}>
                <span className="font-roboto text-sm">{weekName}</span>
              </div>
              <div>
                {isStatusTrue || weekName === nextWeekName|| weekName === 'week1'  ? (
                  <img src="/padlock.png" alt="" className="w-5 h-5 item item-center ml-5" />
                ) : (
                  <img src="/lock.png" alt="" className="w-5 h-5 item item-center ml-5" />
                )}
              </div>

            </div>
          );
        })
      ))}
    </>
  );
};

export default Task;
