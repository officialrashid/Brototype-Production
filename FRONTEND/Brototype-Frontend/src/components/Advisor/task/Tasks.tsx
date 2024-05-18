



const Tasks=()=>{
    return (
   
        <div className="m-7 border border-1px rounded-md shadow-xl  bg-white">
          <div className="flex justify-between m-2 items-center py-2">
            <div>
              <span className='"'>
               Week-5
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
}

export default Tasks