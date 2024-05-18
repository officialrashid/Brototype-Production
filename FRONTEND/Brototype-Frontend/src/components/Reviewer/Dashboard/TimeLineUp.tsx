import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../ScheduleTime/Utils";
import GlobalContext from "../../../context/GlobalContext";
import { getAdvisorDetails, getTimeLineUp } from "../../../utils/methods/get";
import { useSelector } from "react-redux";

interface Event {
  startTime: string;
  endTime: string;
  advisor: string;
  status: boolean;
  date: string;
}

const TimeLineUp: React.FC = () => {
  const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  const handleSelectedDate = (e: React.MouseEvent<HTMLButtonElement>, day: Dayjs) => {
    e.preventDefault();
    setSelectedDate(day);
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    const fetchTimeLineup = async () => {
      console.log(selectedDate.valueOf(),"[][][][]");
      

      const dayTimeLine = selectedDate.format("DD-MM-YYYY");
      const data = {
        reviewerId,
        dayTimeLine,
      };
      const events = await getTimeLineUp(data);
      console.log(events, "response vannu makkaleee ev");
      if(events.status===true){
        console.log("set aaayannuu");
        const combinedData:any = []; // Array to store combined review and advisor data
        const formattedDate = selectedDate.format("DD-MM-YYYY");
        const filteredEvents = events.allBookedEvents;
        console.log(filteredEvents ,"filteredEvents filteredEvents t");
        for (const data of filteredEvents) {
          // Fetch advisor details for each review
          const advisorDetails = await getAdvisorDetails(data.advisorId);
          console.log(advisorDetails, "advisorDetails response");
          // Check if advisor details were fetched successfully
          if (advisorDetails.status === true && advisorDetails.response.length > 0) {
            // Combine review data with advisor details
            const timeLineUpData = {
              data,
              advisorName: `${advisorDetails.response[0].firstName} ${advisorDetails.response[0].lastName}`,
              phone: advisorDetails.response[0].phone
            };
            // Push the combined data to the array
            combinedData.push(timeLineUpData);
          }
        }
        console.log(combinedData,"combned daartaaaa");
        
        setFilteredEvents(combinedData)
      }else if(events.status===false){
        console.log("ketttt");
        
        setFilteredEvents([]);
      }
  
    };
    fetchTimeLineup();
  }, [selectedDate]);

  const getDayClass = (day: Dayjs) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    } else {
      return '';
    }
  };

  return (
    <>
      <div className="w-46rem  h-24rem bg-white ml-4 rounded-xl border border-gray-300 hover hover:border-2 border-gray-300 mt-3 ">
        <div className="flex">
          <h1 className="text-md ml-8 font-roboto font-semibold mt-3">Schedule</h1>
          <div className="relative group ml-33rem mt-1">
            {/* Dropdown button with dropdown icon */}
            <span
              className="text-white px-2 py-2 rounded-full flex items-cente top-3 right-3r text-sm font-roboto font-"
            >
              RequestLeave
            </span>
            <div className="w-80 h-72 bg-white right-0 mt-10 rounded-xl   border-gray-300 absolute overflow-y-auto ">
              <div className="mt-2">
                <h1 className="text-md  font-roboto font-semibold text-balck- ml-5">Today's Lineup</h1>
              </div>

              {filteredEvents.length > 0 ? (
                filteredEvents.map((evt, index) => (
                  <div key={index} className={`w-72 h-18 border ${evt.data.status ? 'border-blue-100' : 'border-blue-100'} ml-4 mt-3 rounded-xl`}>
                    <ol className={`absolute ml-2  border-s  ${evt.data.status ? 'border-green-500' : 'border-red-500'} dark:border-blue-700 ${filteredEvents.length === 0 ? 'h-0' : (index === filteredEvents.length - 1 ? 'h-10' : '')}`}>
                      <li className="mb-16 ms-4 ">
                        <div className={`absolute -start-1.5 mt-7 h-3 w-3 rounded-full border ${evt.data.status ? 'border-white bg-green-500 dark:border-blue-900 dark:bg-blue-700' : 'border-white bg-red-500 dark:border-gray-900 dark:bg-gray-700'}`}></div>
                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm"> </a>
                      </li>
                    </ol>
                    <div className="flex items-start">
                      <div className={`bg-blue-100 h-18 w-20 rounded-md`}>
                        <p className="mt-1 ml-4 text-sm font-roboto text-blue-600">{evt.data.startTime}</p>
                        <p className="ml-9 text-sm font-roboto text-blue-600">-</p>
                        <p className="mb-2 ml-4 text-sm font-roboto text-blue-600">{evt.data.endTime}</p>
                      </div>
                      <div className="flex flex-col ml-2 mt-5">
                        <h1 className={`font-roboto text-sm mt-2 text-black`}>{evt.advisorName} Booked This Event</h1>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" mb-0 mt-0 mr-0 ml-24 mt-4  flex flex-col ">
                  <div className="ml-4">
                  <img src="https://assets.calendly.com/assets/frontend/media/empty_image-f1d91552a38a1ee7e843.svg" alt="" className="w-36 h-36" />
                  </div>
                  <div className=" mr-8 ">
                    <p className="font-roboto text-sm ">No events scheduled for this date</p>
                  </div>
                 
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 w-96 ml-3">
          <header className="flex justify-between">
            <p className="text-gray-500 font-roboto ml-5">
              {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
            </p>
            <div>
              <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 ">
                  chevron_left
                </span>
              </button>
              <button onClick={handleNextMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                  chevron_right
                </span>
              </button>
            </div>
          </header>
          <div className="grid grid-cols-7 grid-rows-6 font-roboto">
            {currentMonth[0].map((day, i) => (
              <span key={i} className="text-sm py-1 text-center">
                {day.format("dd").charAt(0)}
              </span>
            ))}
            {currentMonth.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <button key={idx} className={`py-3 w-full ${getDayClass(day)}`} onClick={() => {
                    setSmallCalendarMonth(currentMonthIndex)
                    setDaySelected(day)
                  }}>
                    <span className="text-sm" onClick={(e) => handleSelectedDate(e, day)}>{day.format('D')}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeLineUp;
