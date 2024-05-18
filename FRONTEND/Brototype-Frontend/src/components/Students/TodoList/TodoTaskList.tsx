import { useState } from "react"
import TodoTask from "./TodoTask"
import TodoModal from "./TodoModal"

// ToDoTask

const TodoTaskList=()=>{

  const [newTask,setNewtask]=useState(false)
    return (
        <>
        <div className="border border-2px w-1/3 m-4 mt-5 rounded-lg bg-white">
  <div className="border-b">
    <div className="flex justify-between m-4">
      <div>
        <span className="font-bold font-roboto">Task</span>
      </div>
      <div>...</div>
    </div>


  </div>
  <div className="flex justify-between m-6">
    <div >
    <ul className="flex gap-4 cursor-pointer ">
      <li className=" text-gray-500  border-b-2 text-black border-black hover:border-black hover:text-black font-roboto">Active</li>
        <li className="text-gray-500 border-b-transparent border-b-2 hover:border-black hover:text-black font-roboto">Finished</li>
    </ul>
      
    </div>
    <div>
      <button className="bg-black text-white rounded-md px-4 py-1 font-roboto" onClick={()=>{setNewtask(true)}}>+</button>
    </div>
    
  </div>
  <div className="ml-6 ">
      <span className="font-roboto">Today</span>
    </div>
  <TodoTask/>
  <TodoTask/>
  <TodoTask/>
  <TodoTask/>
  <TodoTask/>






  </div>
  <TodoModal isVisible={newTask} onclose={()=>{setNewtask(false)}}/>

        
        </>
    )
}

export default TodoTaskList