
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import Notification from "../dashboard/Notification"
import TopPerformers from "../dashboard/TopPerformers"

const CalendarComp=()=>{
    return (
        <>
          <div className=" m-4 mt-0  mr-0 ">
       
       
        <div className="  ">
            <TopPerformers/>
        </div>
        <div className="mt-7  ">
      
        <Notification/>
            
        </div>
        <div className="mt-8    ">
        <Calendar/>

        </div>
       
        </div>

      

        
        </>
    )
}

export default CalendarComp