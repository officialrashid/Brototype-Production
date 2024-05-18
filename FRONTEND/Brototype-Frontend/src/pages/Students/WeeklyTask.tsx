import React from 'react';
import Task from "../../components/Students/StudentTask/Task"
const WeeklyTask = () => {
    return (
        <div className="h-auto flex-1  bg-custom-background">
        <div className='bg-white h-48rem m-8 rounded-xl w-67.3rem'>
        <div className=" grid grid-cols-5 cursor-pointer">
            <Task/>
            {/* <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/> */}
        </div>
        </div>
        </div>
    );
}

export default WeeklyTask;
