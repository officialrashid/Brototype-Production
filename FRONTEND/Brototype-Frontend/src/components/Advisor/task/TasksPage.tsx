import { useState } from "react";
import Tasks from "./Tasks";

const TasksPage = () => {
    const technicalTasks:any=[]
    const [activeTask,setActiveTask]=useState(0)
  
    return (
      <>
       
        <div className="m-4 bg-white  border border-gray-300 rounded-md shadow-lg personal-workout relative"  onClick={() => {
                    setActiveTask(1);
                  }}>
          <div className="flex justify-between items-center m-4 ">
            <div>
              <span className="font-bold ">Personal workouts</span>
            </div>
            <div className="flex gap-3">
           
               
            
  
              <div className="data-collapse-target=collapse-1">
                <svg
                  className="w-8 h-8"
                 
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" />
                    <path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
   {
    activeTask==1?technicalTasks.length?technicalTasks.map((task)=>{
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                Delete
                </button>
          
            </div>
          </div>
        </div>
        )
    }):<div><h1 className="text-center font-bold text-lg">There is no tasks</h1></div>:""
   }
  
        <div className="m-4 bg-white mt-2 border border-gray-300 rounded-md shadow-lg " onClick={() => { setActiveTask(2) }}>
          <div className="flex justify-between items-center m-4">
            <div> <span className="font-bold ">Technical Workouts</span> </div>
            <div className="flex gap-3">
   
               
            
  
              <div className="data-collapse-target=collapse-1">
                <svg  className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" /><path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" /></g></svg>
              </div>
            </div>
          </div>
        </div>
        {
    activeTask==2?technicalTasks.length?technicalTasks.map((task)=>{
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                Delete
                </button>
          
            </div>
          </div>
        </div>
        )
    }):<div><h1 className="text-center font-bold text-lg">There is no tasks</h1></div>:""
   }
        <div className="m-4 bg-white mt-2 border border-gray-300 rounded-md shadow-lg " onClick={() => { setActiveTask(3) }}>
          <div className="flex justify-between items-center m-4">
            <div> <span className="font-bold ">Miscellaneous Workouts</span> </div>
            <div className="flex gap-3">
               
          
             
               
            
  
              <div className="data-collapse-target=collapse-1">
                <svg onClick={() => { setActiveSubTask(3) }} className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" /><path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" /></g></svg>
              </div>
            </div>
          </div>
        </div>
        {
    activeTask==3?technicalTasks.length?technicalTasks.map((task)=>{
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} >
                Delete
                </button>
          
            </div>
          </div>
        </div>
        )
    }):<div><h1 className="text-center font-bold text-lg">There is no tasks</h1></div>:""
   }
        
      </>
    );
  };
  
  export default TasksPage
  