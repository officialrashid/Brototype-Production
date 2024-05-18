import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { createEvents } from '../../../utils/methods/post';
import { toast } from 'react-toastify';
import { updateEvents } from '../../../utils/methods/patch';
import { deleteEvents } from '../../../utils/methods/delete';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Formik } from 'formik';
import CustomModal from './CustomModal';
const EventModal = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [datesAfterWeek, setDatesAfterWeek] = useState([]);
    const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
    const navigate = useNavigate();
    const labelsClasses = ["yellow", "orange", "blue", "red"];
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent,dates,dayId,customType,selectedCustomWeek } = useContext(GlobalContext);
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [startTime, setStartTime] = useState(selectedEvent ? selectedEvent.startTime || "09:00am" : "09:00am");
    const [endTime, setEndTime] = useState(selectedEvent ? selectedEvent.endTime || "09:30am" : "09:30am");
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [customModal,setCustomModal] = useState(false)
    const [selectedLabel, setSelctedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[2]
    );
    const [validationError, setValidationError] = useState(null);
    const validationSchema = Yup.object().shape({
        startTime: Yup.string()
          .required('Start time is required')
          .matches(
            /^(0[1-9]|1[0-2]):[0-5][0-9](am|pm)$/,
            'Invalid start time format. Valid examples: 09:00am, 01:00pm'
          ),
        endTime: Yup.string()
          .required('End time is required')
          .matches(
            /^(0[1-9]|1[0-2]):[0-5][0-9](am|pm)$/,
            'Invalid end time format. Valid examples: 09:00am, 01:00pm'
          )
          .test({
            name: 'startEndTimeOrder',
            message: 'End time must be greater than start time and have a 30-minute gap',
            test: function (endTime) {
              const { startTime } = this.parent;
      
              if (startTime && endTime) {
                const [startHour, startMinute, startPeriod] = startTime.match(
                  /^(1[0-2]|0?[1-9]):([0-5][0-9])([ap]m)$/
                ).slice(1);
      
                const [endHour, endMinute, endPeriod] = endTime.match(
                  /^(1[0-2]|0?[1-9]):([0-5][0-9])([ap]m)$/
                ).slice(1);
      
                if (startPeriod === 'am' && endPeriod === 'pm') {
                  return true;
                }
      
                if (startPeriod === 'pm' && endPeriod === 'am') {
                  return false;
                }
      
                // Compare hours and minutes
                const startTotalMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
                const endTotalMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
      
                // Check if there is a 30-minute gap
                return endTotalMinutes - startTotalMinutes >= 30;
              }
      
              return false;
            },
          }),
      });
      
    
    console.log(daySelected,"dmcbjdbd111@@@@@@");
    
    
    
    

    const handleSubmit = async (e) => {
        console.log(dates,"dates in Event modalllllllllll2222222");
        
        e.preventDefault();

        try {
            await validationSchema.validate({
                startTime,
                endTime,
                // Add other fields if needed
            });
            const events:any = []
            const dayIds :any =[]
            if (dates && dayId && customType) {
                // If dates exist, push each date from dates array into the events array
                dates.forEach((evt) => {
                    events.push(evt);
                });
                // Push the selected event into the events array
                events.push(dayjs(daySelected).format("DD-MM-YYYY"));
                dayId.forEach((day)=>{
                    dayIds.push(day)
                })
                dayIds.push(daySelected?.valueOf())
            } else {
                // If dates don't exist, push only the selected event into the events array
                events.push(dayjs(daySelected).format("DD-MM-YYYY"));
                dayIds.push(daySelected?.valueOf())
            }
       
            const calendarEvent = {
                reviewerId,
                startTime,
                endTime,
                label: selectedLabel,
                day: dayIds,
                id: selectedEvent ? selectedEvent.id : Date.now(),
                date: daySelected ? events: "", // Format the date
                weekly:selectedCustomWeek
              };
              console.log(calendarEvent,"dnbcdbhcdbhvdhcdhgc");
              
            if (selectedEvent) {
                const response = await updateEvents(calendarEvent);
                if (response.status === true) {
                    toast.success("Events updated successfully");
                    // dispatchCalEvent({ type: 'update', payload: calendarEvent });
                    setStartTime("")
                    setEndTime("")
                } else {
                    toast.warn("Event already added at this time and date");
                }
            } else {
                const response = await createEvents(calendarEvent);
                if (response.data.status === true) {
                    toast.success("Event added successfully");
                    // dispatchCalEvent({ type: 'push', payload: calendarEvent });
                    setStartTime("")
                    setEndTime("")
                } else {
                    toast.warn("Event already added at this time");
                }
            }

            // Clear validation error on successful submission
            setValidationError(null);
            setShowEventModal(false);
        } catch (error) {
            // Set validation error
            setValidationError(error.message);
            // toast.error(error.message);
        }
    };

    const handleDelete = async (selectedEvent) => {
        const data = {
            id: selectedEvent.id,
            reviewerId
        };

        const response = await deleteEvents(data);
        console.log(response, "response");
    };
    // useEffect(() => {
    //     const calculateRepeatedDates = (daysToRepeat, numberOfWeeks) => {
    //         const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //         const dates = [];
    //         let currentDate = moment(); 
    
    //         const weekdayIndices = daysToRepeat.map(day => weekdays.indexOf(day));
    
    //         for (let i = 0; i < 7 * numberOfWeeks; i++) { 
    //             const date = currentDate.clone().add(i, 'days');
    //             const weekdayName = date.format('dddd');
    //             if (weekdayIndices.includes(weekdays.indexOf(weekdayName))) {
    //                 const formattedDate =  dayjs(date).format("DD-MM-YYYY")
    //                 dates.push(formattedDate);
    //             }
    //         }
    //         console.log(dates, `Dates for the next ${numberOfWeeks} weeks repeating ${daysToRepeat.join(' and ')}`);
    //     };

    //     calculateRepeatedDates(['Monday', 'Tuesday'], 2);
    // }, []);

    const handleCustomModalChange = () => {
        setCustomModal(true);
    }
    
    return (
        <>
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons-outlined text-gray-400'>
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    handleDelete(selectedEvent)
                                    dispatchCalEvent({
                                        type: "delete", payload: selectedEvent
                                    })
                                    setShowEventModal(false)
                                }}
                                className='material-icons-outlined text-gray-400 cursor-pointer mr-3'
                            >
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className='material-icons-outlined text-gray-400'>
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className='p-3 pb-0'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <h1 className='font-roboto font-bold ml-10 mt-5 '>Shedule Your Time</h1>
                        <span className='material-icons-outlined text-gray-400 mb-4'>
                            schedule
                        </span>
                        <div className='flex flex-3 mb-0 '>
                            <p className='font-roboto'>{daySelected.format("dddd, MMMM DD")}</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    name='startTime'
                                    placeholder="09:00am"
                                    value={startTime}
                                    required
                                    className='pl-2 border-0 text-gray-600 text-sm font-roboto pb-2 w-16 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                               
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name='endTime'
                                    placeholder="10:30am"
                                    value={endTime}
                                    required
                                    className='pl-2 border-0 text-gray-600 text-sm font-roboto pb-2 w-16 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 '
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                                 
                            </div>
                
                        </div>
                   
                        <div className='mb-0 pb-0'> </div>
                        <span>
                <p className='text-xs underline' onClick={handleCustomModalChange}>Doesn't Repeat</p>
            </span>
                        <span className='material-icons-outlined text-gray-400'>
                            bookmark_border
                        </span>
                        
                        <div className='flex gap-x-2'>
                            {labelsClasses.map((lblClass, i) => (
                                <span key={i}
                                    onClick={() => setSelctedLabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className='material-icons-outlined text-white text-sm'>
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
               
                    </div>
                    {/* Add this block to display the validation error */}
                    {validationError && (
                        <div className="text-red-500 font-roboto text-s mt-3">{validationError}</div>
                    )}
                </div>
                <footer className='flex justify-end w-100 border-t p-3 mt-5'>
                    <button type='submit'
                        onClick={handleSubmit}
                        className='bg-black hover:bg-gray-600 px-6 py-2 rounded text-white'>
                        save
                    </button>
                </footer>
            </form>
        </div>
        <CustomModal isVisible={customModal} isClose={() => { setCustomModal(false) }} selectedDate={dayjs(daySelected).format("DD-MM-YYYY")} />

        </>
    );
}

export default EventModal;
