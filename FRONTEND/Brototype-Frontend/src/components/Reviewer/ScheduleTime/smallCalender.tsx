import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "./Utils";
import GlobalContext from "../../../context/GlobalContext";
const SmallCalender = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex,setSmallCalendarMonth,daySelected,setDaySelected } = useContext(GlobalContext)
    const handlePrevMonth = () => {
        setCurrentMonthIndex(currentMonthIndex - 1)
    }
    const handleNextMonth = () => {
        setCurrentMonthIndex(currentMonthIndex + 1)
    }
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex))
    },[currentMonthIndex])
    useEffect(() => {
        setCurrentMonthIndex(monthIndex)
    }, [monthIndex])
    const getDayClass = (day:any) =>{
        const format = "DD-MM-YY"
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const slcDay = daySelected && daySelected.format(format)
        if(nowDay===currDay){
            return 'bg-blue-500 rounded-full text-white'
        }else if(currDay === slcDay){
            return 'bg-blue-100 rounded-full text-blue-600 font-bold'
        }else{
            return "";
        }
    }
    return (
        <div className="mt-9">
            <header className="flex justify-between">
                <p className="text-gray-500 font-roboto">
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
                </p>
                <div>
                <button onClick={handlePrevMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
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
                    <span key={i} className="text-sm py-1 text-center" >
                        {day.format("dd").charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button key={idx} className={`py-1 w-full ${getDayClass(day)}`} onClick={()=>{
                                setSmallCalendarMonth(currentMonthIndex)
                                setDaySelected(day)
                            }}>
                                <span className="text-sm">{day.format('D')}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default SmallCalender;
