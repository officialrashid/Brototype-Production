import { useEffect } from "react"
import Api from "../../../utils/baseUrl/taskBaseUrl"
import { useDispatch, useSelector } from "react-redux"
import { getTasks } from "../../../redux-toolkit/reviewSlice"


const TaskView = ({ isVisible, onClose, currentWeek,studentId,domain }) => {
  const dispatch:any=useDispatch()
  const taskData:any = useSelector(state => state?.review?.tasks)
    console.log(taskData,'taskData');

  useEffect(() => {
  
    
    const fetchTask = async () => {
      console.log(currentWeek,studentId,domain,'dfwfwfw');
      
      try {
         const response:any = await Api.get(`/api/task/get-student-week-task?studentId=${studentId}&weekName=week${currentWeek}&domain=${domain}`)
         console.log(response.data.response.data
          ,'fsfs');

         dispatch(getTasks([response.data.response.data]))
        
         
      } catch (error) {
        
      }
    }
    fetchTask()
  },[])
  if (!isVisible) return null

  return (

    <>
   
          <div className="z-40 fixed inset-0  px bg-black/60 overflow-y-scroll  pl-96">

<div className="border m-4 rounded-md       bg-white w-3/5">
{
  taskData?.map((task:any)=>{
    return (

         <div className="border border-2px rounded-md m-3">
      <div className="flex justify-between">
      <div></div>
      <div className="mt-2 mr-3 cursor-pointer" onClick={onClose} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      </div>
      
      </div>
      <div>
      <div className="m-4 mt-0 ml-3 mb-0">
          <span className="font-bold">Personal Workouts</span>
          </div>
      </div>
      
      {task?.personal?.map((subTask,index)=>{
         
        return(
          <>
          
          <div className="m-3 mb-1 min-h-20 flex flex-wrap rounded-md  items-center px-2 break-words">
          <p className="max-w-full ">
          {index+1}.{ subTask.mainQuestion}
          
          </p>
          </div>
          {
            subTask?.questionNumbersAndAnswers?.map((subQus,subIndex)=>{
              return (
                <>
              
                <p className="max-w-full break-words px-8">
                {index+1}.{subIndex+1}.{subQus.nestedQuestion}
                {
                  
                }
                
                </p>
              
              
                <p className="max-w-full break-words px-8">Ans.{index+1}.{subIndex+1}  {
          subQus.answer
                }</p>
                </>
                

                
              )

            })
          }
           
           </>
          
          
        )

      })}
<div>
      <div className="m-4 mt-4 ml-3 mb-0">
          <span className="font-bold">Miscellaneous Workouts</span>
          </div>
      </div>

{task?.miscelleaneous?.map((subTask,index)=>{
         
         return(
           <>
           
           <div className="m-3 mb-1 min-h-20 flex flex-wrap rounded-md  items-center px-2 break-words">
           <p className="max-w-full ">
           {index+1}.{ subTask.mainQuestion}
           
           </p>
           </div>
           {
             subTask?.questionNumbersAndAnswers?.map((subQus,subIndex)=>{
               return (
                 <>
               
                 <p className="max-w-full break-words px-8">
                 {index+1}.{subIndex+1}.{subQus.nestedQuestion}
                 {
                   
                 }
                 
                 </p>
               
               
                 <p className="max-w-full break-words px-8">Ans.{index+1}.{subIndex+1}  {
           subQus.answer
                 }</p>
                 </>
                 
 
                 
               )
 
             })
           }
            
            </>
           
           
         )
 
       })}
       <div>
      <div className="m-4 mt-4 ml-3 mb-0">
          <span className="font-bold">Technical Workouts</span>
          </div>
      </div>

{task?.technical?.map((subTask,index)=>{
         
         return(
           <>
           
           <div className="m-3 mb-1 min-h-20 flex flex-wrap rounded-md  items-center px-2 break-words">
           <p className="max-w-full ">
           {index+1}.{ subTask.mainQuestion}
           
           </p>
           </div>
           {
             subTask?.questionNumbersAndAnswers?.map((subQus,subIndex)=>{
               return (
                 <>
               
                 <p className="max-w-full break-words px-8">
                 {index+1}.{subIndex+1}.{subQus.nestedQuestion}
                 {
                   
                 }
                 
                 </p>
               
               
                 <p className="max-w-full break-words px-8">Ans.{index+1}.{subIndex+1}  {
           subQus.answer
                 }</p>
                 </>
                 
 
                 
               )
 
             })
           }
            
            </>
           
           
         )
 
       })}
      </div>
   
    )
  })
}
</div>
      </div>
    </>
  )
}

export default TaskView