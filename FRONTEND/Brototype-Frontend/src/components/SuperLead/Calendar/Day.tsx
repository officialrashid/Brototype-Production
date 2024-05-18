import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { getActivityEvents, getScheduleEvents } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

interface DayProps {
  day: any;
}

const Day: React.FC<DayProps> = ({ day }) => {
  const [dayEvents, setDayEvents] = useState<any[]>([]);
  const { reviewerId } = useSelector((state: any) => state?.reviewer?.reviewerData);
  const { superleadId } = useSelector((state: any) => state?.superlead?.superleadData);
  const { setDaySelected, setShowEventModal, setSelectedEvent, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    const fetchScheduleEvents = async () => {
      try {
  
        const response = await getActivityEvents(superleadId);
      
      
        if (response) {
       
          filterAndSetDayEvents(response.response[0].events);
        }
      } catch (err) {
        console.error("Error fetching schedule events:", err);
      }
    };

    fetchScheduleEvents();
  }, [day, superleadId, showEventModal]); // Fetch events whenever the displayed month changes or superleadId changes

  const filterAndSetDayEvents = (eventsToFilter: any[]) => {
    const currentDate = day.format("DD-MM-YYYY");

    const events = eventsToFilter.filter(evt => {
      const eventDays = Array.isArray(evt.day) ? evt.day : [evt.day];
      const eventDates = evt.date;
       console.log(eventDates,"lllllll");
       
      const isEventInCurrentDay = eventDays.some((eventDay: number) => {
        const dayTimestamp = new Date(eventDay);
        console.log(dayTimestamp,"dayTimestamp dayTimestamp");
        
        return dayjs(dayTimestamp).isSame(day, 'day');
      });

      const isDateMatch = eventDates.includes(currentDate);

      return isEventInCurrentDay && isDateMatch;
    });


    setDayEvents(events)
  };

  const getCurrentDayClass = () => {
    return dayjs().isSame(day, 'day') ? 'bg-blue-600 text-white rounded-full w-7' : '';
  };

  return (
    <div className='border border-custom-background flex flex-col font-roboto h-48'>
      <header className='flex flex-col items-center'>
        <p className='text-sm mt-1'>{day.format("ddd").toUpperCase()}</p>
        <p className={`text-sm p-1 mt-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
      <div className='flex-1 cursor-pointer' onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        <div className='event-container' style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {dayEvents?.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`bg-${evt.label} p-1 mr-2 text-white text-xs rounded mb-1 truncate`}
            >
              {evt.title}<br></br>
              {evt.startTime} - {evt.endTime}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Day;
