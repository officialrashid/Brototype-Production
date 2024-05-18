import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import moment from 'moment';

const CustomModal = ({ isVisible, isClose, selectedDate }) => {
    if (!isVisible) {
        return null; 
    }

    const [number, setNumber] = useState(1);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [specifRangeSelected,setSpecificRangeSelected] = useState("Week")
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent ,setDates,setDayId ,setCustomType,setSelectedCustomWeek} = useContext(GlobalContext);


    const handleDayClick = (day) => {
        const index = selectedDays.indexOf(day);
        if (index === -1) {
            setSelectedDays([...selectedDays, day]);
        } else {
            setSelectedDays(selectedDays.filter(item => item !== day));
        }
    };

    const handleNumber = (event) => {
        const number = event.target.value;
        setNumber(number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       

        const calculateDates = (selectedDays, numberOfWeeks, selectedDate) => {
            const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const selectedDates: any = [];
            const dayId:any = []
         
            const currentDate = moment(selectedDate, "DD-MM-YYYY");

            const selectedDayIndices = selectedDays.map(day => weekdays.indexOf(day));

            let weeksCount = 0;
            let daysAdded = 0;
           
            while (weeksCount < numberOfWeeks) {
                for (let i = 0; i < 7; i++) {
                    const date = currentDate.clone().add(daysAdded + i, 'days');
                    const weekdayName = date.format('dddd');
                    const weekdayIndex = weekdays.indexOf(weekdayName);

                    if (selectedDayIndices.includes(weekdayIndex)) {
                        const formattedDate = date.format("DD-MM-YYYY");
                        selectedDates.push(formattedDate);
                        dayId.push(date.valueOf())
                    }
                }
                weeksCount++;
                daysAdded += 7;
            }

            console.log(selectedDates);
            console.log(dayId,'day iddsssssssss');
            setDates(selectedDates)
            setDayId(dayId)
            setCustomType(specifRangeSelected)
            setSelectedCustomWeek(selectedDays)
            isClose()
        };
        const calculateDayDates = (countOfDay: number, selectedDate: any) => {
            const currentDate = moment(selectedDate, "DD-MM-YYYY");
            const dates: string[] = [];
            const dayId:any = []
            for (let i = 1; i <= countOfDay; i++) {
                const futureDate = currentDate.clone().add(i, 'days');
                const formattedDate = futureDate.format("DD-MM-YYYY");
                dates.push(formattedDate);
                dayId.push(futureDate.valueOf())
            }
            console.log(dates,"dsfsbfbsjhfgsgfhsgsfshj");
            console.log(dayId,"{}{}{}{}{}{}{}");
            
            setDates(dates)
            setDayId(dayId)
            setCustomType(specifRangeSelected)
            setSelectedCustomWeek(number)
            isClose()
        };
        
        const calculateMonthlyDates = (countOfMonth: number, selectedDate: any) => {
            const currentDate = moment(selectedDate, "DD-MM-YYYY");
            const dates: string[] = [];
            const dayId:any = []
            for (let i = 1; i <= countOfMonth; i++) {
                const futureDate = currentDate.clone().add(i, 'months');
                const formattedDate = futureDate.format("DD-MM-YYYY");
                dates.push(formattedDate);
                dayId.push(futureDate.valueOf())
            }
             console.log(dates,"monthly date comingggg yarrrrr");
             setDates(dates)
             setDayId(dayId)
             setCustomType(specifRangeSelected)
             setSelectedCustomWeek(number)
             isClose()
         
        };
        

        if(specifRangeSelected==="Week"){
            calculateDates(selectedDays, number, selectedDate);
        }else if(specifRangeSelected==="Day"){
            calculateDayDates(number,selectedDate)
        }else if(specifRangeSelected==="Monthly"){
            calculateMonthlyDates(number,selectedDate)
        }
        
    };
    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleOptionClick = (event:string) => {
        setIsMenuOpen(false); // Close the menu when an option is clicked
        setSpecificRangeSelected(event)
    };

    const handleClickOutsideMenu = (event) => {
        if (isMenuOpen && !event.target.closest('.relative')) {
            setIsMenuOpen(false); // Close the menu when a click occurs outside
        }
    };
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xs flex h-auto w-full items-center justify-center z-40">
                <form className="w-1/4 rounded-lg bg-white shadow-2xl">
                    <div className="p-3 pb-0 ">
                        <div className=" items-end gap-y-7 ">
                            <p className="font-roboto text-sm font-semibold ml-2">Custom recurrence</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="repeat-input" className="text-sm pt-6 pl-5 font-roboto">Repeat every</label>
                        <input
                            className="w-10 h-8 bg-gray-100 m-5 mt-4 mb-5 text-center text-md font-roboto rounded-md"
                            value={number} 
                            type="number"
                            onChange={(e) => handleNumber(e)}
                        />

                        <div className="relative inline-block text-left mt-2">

                        <button type="button" className="item items-center mt-2  inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-100 px-3 h-8 text-xs font-serif font-medium  text-gray-900   hover:bg-gray-50" onClick={handleMenuToggle} aria-expanded={isMenuOpen} aria-haspopup="true">
                            {specifRangeSelected}
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                            {isMenuOpen && (
                            <div className="absolute right-0 font-roboto  z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">

                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={()=>handleOptionClick("Day")}>Day</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={()=>handleOptionClick("Week")}>Week</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2" onClick={()=>handleOptionClick("Monthly")}>Monthly</a>
                            </div>
                        </div>
                             )}
                        </div>



                   

                        </div>
                       {specifRangeSelected==="Week" ? (
                          <div className="mb-5">
                            <label htmlFor="repeat-input" className="text-xs pt-4 pl-5 font-roboto">Repeat on</label>
                            <div className="flex mt-3 ml-5 gap-3 font-roboto">
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                    <div
                                        key={day}
                                        className={`w-6 h-6 ${selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} rounded-full cursor-pointer`}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        <p className="text-center text-xs pt-1">{day.charAt(0)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                       ):null}
                   
                        <footer className="w-full mt-5 flex justify-end border-t p-3 gap-3 font-roboto">
                            <button type="button" className="rounded bg-black px-5 py-1 text-white hover:bg-gray-600" onClick={isClose}>Cancel</button>
                            <button type="submit" className="rounded bg-black px-6 py-1 text-white hover:bg-gray-600" onClick={handleSubmit}>Save</button>
                        </footer>
                </form>
            </div>
        </>
    );
}

export default CustomModal;
