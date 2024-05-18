import { useState, useContext, useEffect } from "react";
import Calendar from "../../components/Reviewer/ScheduleTime/Calender";
import GetMonth from "../../components/Reviewer/ScheduleTime/GetMonth";
import SidebarCalender from "../../components/Reviewer/ScheduleTime/SidebarCalender";
import { getMonth } from "../../components/Reviewer/ScheduleTime/Utils";
import Sidebar from "../../components/Reviewer/Sidebar/sidebar";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/Reviewer/ScheduleTime/EventModal";
const Calender = () => {
  const { monthIndex,showEventModal } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <Sidebar />
      <div className="h-auto flex-1 bg-custom-background ">
        {showEventModal &&<EventModal />}
     
        <div className="h-auto w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1100px] flex flex-col ml-5 bg-white mt-5 ">
          <Calendar />
          <div className="flex flex-1 bg-white ">
            <SidebarCalender />
            
            <GetMonth month={currentMonth} />
          </div>
        </div>


      </div>
    </>
    
  );
};

export default Calender;
