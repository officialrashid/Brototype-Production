import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import CreateTask from "../Scheduled/CreateTask";
import Api from "../../../utils/baseUrl/taskBaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { getTaskData, viewMiscellaneousTask, viewPersonalTask, viewTask, viewTechnicalTask } from "../../../redux-toolkit/taskSlice";

const TasksPage = () => {
  const dispatch=useDispatch()
  //const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
  const taskData=useSelector((state:any)=>state?.task?.taskData)
  //const viewTaskData=useSelector((state:any)=>state?.task?.viewTaskData)
//const [editData,setEditData]=useState(Array)



  
  const advisorId='654ec0e69db7d1bfd50ca00b'
  const handleToast=(message:any,error:any)=>{
    if(!error){
      toast.success(message, {
        position: 'top-center',
        autoClose: 3500
      });
//setModal(false)
    }
    else{
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000
      });


    
   }
  }
    const technicalTasks:any=[]
    const [activeTask,setActiveTask]=useState(0)
    const [editModal,setEditModal]=useState(false)
    const [editTaskData,setEditTaskData]=useState(Array)

    const editData=async (type:string,week:string)=>{
      console.log(type,week);
      
      const response=await Api.get(`/api/task/get-advisor-created-task?technicalLeadId=${advisorId}&week=${week}&taskType=${type}`)
      if(response.data){

        console.log(response.data.response.response,'edit dataaaaaaa');
        if(type=='personalWorkouts'){
          dispatch(viewPersonalTask(response.data.response.response))
          setEditTaskData(response.data.response.response)
          setEditTaskData([{_id:response.data.response.response[0]._id,mainQuestion:response.data.response.response[0].personalWorkouts,subQuestion:response.data.response.response[0].personalWorkoutNestedQuestions,taskType:'personal',week:response.data.response.response[0].week}])

          

        }else if(type=='technicalWorkouts'){
          console.log('techhhhhh');
          
          dispatch(viewTechnicalTask(response.data.response.response))
        setEditTaskData([{_id:response.data.response.response[0]._id,mainQuestion:response.data.response.response[0].technicalWorkouts,subQuestion:response.data.response.response[0].technicalWorkoutNestedQuestions,taskType:'technical',domain:response.data.response.response[0].domain,week:response.data.response.response[0].week}])

        }else{
          dispatch(viewMiscellaneousTask(response.data.response.response))
          setEditTaskData(response.data.response.response)
          setEditTaskData([{_id:response.data.response.response[0]._id,mainQuestion:response.data.response.response[0].technicalWorkouts,subQuestion:response.data.response.response[0].technicalWorkoutNestedQuestions,taskType:'miscellaneous',week:response.data.response.response[0].week}])


        }
       

      }
      

    }
   

    const deleteFn=async (id:string)=>{
      console.log(id,'deleeeeee');
      
     try{
      const response=await Api.get(`/task-service/${id}`)
      if(response.data){
        handleToast('Deleted successfully','')
      
      }

     }catch(error)
     {
      handleToast('Deleted successfully !!!!',error)

     }

    }

    useEffect(()=>{
      console.log('tasks page useEffect called');
      
      const getTasks=async ()=>{
       // const response= await Api.get(`/api/task/get-advisor-created-task?technicalLeadId=654ec0e69db7d1bfd50ca00b&week=week1&taskType=personalWorkouts`)
       const response =await Api.get(`api/task/get-all-created-task/${advisorId}`)

       if(response.data.response){
        console.log(response.data.response,'res');
        dispatch(getTaskData([response.data.response]))
     
       }
      }
      getTasks()
    },[])

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
    activeTask==1?taskData[0].personal.length?taskData[0].personal.map((task)=>{
      {
        task
        console.log(task, 'personalllll');
        
      }
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{setEditModal(true),editData('personalWorkouts',task.week)}}>
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{deleteFn(task._id)}}>
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
    activeTask==2?taskData[0].technical.length?taskData[0].technical.map((task)=>{
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{setEditModal(true),editData('technicalWorkouts',task.week)}}>
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{deleteFn(task._id)}} >
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
    activeTask==3?taskData[0].miscellaneous.length?taskData[0].miscellaneous.map((task)=>{
        return (
            <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
              {task.week}
              </span>
            </div>
            <div className="flex gap-2">
             
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{setEditModal(true),editData('miscellaneousWorkouts',task.week) }}>
                  Edit
                </button>
       
                <button className={`bg-black rounded-md px-3 py-1 text-white`} onClick={()=>{deleteFn(task._id)}} >
                Delete
                </button>
          
            </div>
          </div>
        </div>
         )
    }):<div><h1 className="text-center font-bold text-lg">There is no tasks</h1></div>:""
   }
     <CreateTask isVisible={editModal} onClose={()=>{setEditModal(false)}} editTaskData={editTaskData} taskType={'tec'}/>
     <ToastContainer/>
      </>
     
    );
  };
  
  export default TasksPage
  