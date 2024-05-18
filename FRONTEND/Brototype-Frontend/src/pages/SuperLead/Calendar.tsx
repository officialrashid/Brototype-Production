import { useState, useContext, useEffect } from "react";
import Calendar from "../../components/SuperLead/Calendar/Calender";
import GetMonth from "../../components/SuperLead/Calendar/GetMonth";
import SidebarCalender from "../../components/SuperLead/Calendar/SidebarCalender";
import { getMonth } from "../../components/SuperLead/Calendar/Utils";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/SuperLead/Calendar/EventModal";
const Calender = () => {
  const { monthIndex,showEventModal } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {/* <Sidebar /> */}
      <div className="h-auto flex-1 bg-custom-background mt-32 ">
      <div className="m-48 mt-0 mb-0">
        {showEventModal &&<EventModal />}
     
        <div className="h-auto w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1100px] flex flex-col ml-5 bg-white mt-5 ">
          <Calendar />
          <div className="flex flex-1 bg-white ">
            <SidebarCalender />
            
            <GetMonth month={currentMonth} />
          </div>
        </div>


      </div>
      </div>
    </>
    
  );
};

export default Calender;
