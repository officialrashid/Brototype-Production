const TodoTask=()=>{
    return (
        <>

  <div className="border border border-gray-200 rounded-lg m-6 ">
    <div className="border-b border-1px flex mt-4  justify-between  ">
      <div className="flex gap-2 mb-4">
        <div className="mt-4 ml-4" >
        <img src="/profile.jpeg" alt="" className="rounded-full w-8 h-8"  />


        </div>
        <div className="mt-5 ml-2">
          <span className="font-roboto">John</span>
        </div>
       


      </div>
      <div className="mr-4 mt-4 cursor-pointer">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

      </div>

    </div>
    <div className="border-b border-gray-200 mt-3 ">
      <div className="mb-4">
         <span className="ml-4  font-roboto text-gray-400">Today learn core nodejs</span>

      </div>
     

    </div>
    <div className=" flex m-4 justify-between ">

      <div className="bg-custom-background px-2 py-1 rounded-sm flex">
        <span className="font-roboto text-gray-500">9:30 am-10:30 am</span>

      </div>
      <div className="flex gap-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>


        </div>
        <div>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>


        </div>


      </div>

    </div>
  </div>
        
        </>
    )
}

export default TodoTask