import { useState } from "react"


const Chat=()=>{
  

    const [profile,setProfile]=useState(false)
   
    return (
        <>
<div className="flex border ">
  
  
  <div className="border-r w-1/2 bg-white rounded-l-md ">
    <div className="m-2">
  <div className="relative">
    <div className="absolute m-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
<div>
  <input type="search" className="    w-full py-2.5 px-10 rounded-md border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... "/>
</div>
  </div>
</div>
    
    
  <div className="flex justify-between ">
    <div className="flex gap-2 m-2 mt-4">
      
     <div className="border h-10 w-10 rounded-full "></div>
  <div className="mt-2"><span className="text-md  font-semibold">John Doe</span>
  <div>
    <span className="text-gray-600">Hello good mrng</span>
  </div>
  </div>


  </div>
  <div className="m-4">
    <span className="text-gray-600 text-sm">6m</span>
  </div>

  </div>
  <div className="flex justify-between">
    <div className="flex gap-2 m-2">
     <div className="border h-10 w-10 rounded-full "></div>
  <div className="mt-2"><span className="text-md  font-semibold">John Doe</span>
  <div>
    <span className="text-gray-600">Hello good mrng</span>
  </div>
  </div>


  </div>
  <div className="m-4">
    <span className="text-gray-600 text-sm">6m</span>
  </div>

  

  
  
  
 
</div>
</div>


<div className="  border-r w-full bg-white ">
    <div className="border-b ">
  <div className="flex justify-between">
    <div className="flex gap-2 m-2 ">
     <div className="border h-12 w-12 rounded-full  mt-3"></div>
  <div className="mt-5"><span className="text-md  font-semibold">John Doe</span>
  <div>
    <span className="text-gray-600 text-sm">last seen 8:98 pm</span>
  </div>
  </div>


  </div>
  <div className="m-4 mt-8 flex gap-4">
   <div className="border w-8 h-8 flex items-center justify-center rounded-full">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>


   </div>
   <div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>


   </div>
  </div>

  </div>

</div>
<div className="py-72"></div>

  <div className=" m-3 rounded-md ">
    <div className=" flex ">


  
           <div className="relative top-0 w-full">

  
     
  <textarea
    className="border px-2 h-10 py-2 resize-none overflow-hidden outline-none max-h-40  absolute bottom-0 rounded-md w-full"
    
    placeholder="Type a message.."
  ></textarea>


</div>

   
      <div className="m-1 cursor-pointer">
         <div className=" flex gap-1">
      <div className="flex items-center justify-center h-8 w-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>
</div>
<div className="flex items-center justify-center h-8 w-8">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>

</div>
<div className="border h-8 w-8 flex items-center justify-center bg-gray-300 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
</div>
    </div>
        
      </div>

 
  
  
    </div>

   

   
  </div>


</div>

 <div className=" bg-white rounded-r-md">
  <div className="flex justify-center m-14 mb-4">
    <div className="border w-36 h-36 rounded-full mt-14 ">

  </div>

  </div>
  
  <div className="flex justify-center">
    <span>Sachin K siby</span>
   

  </div>
   <div className="flex justify-center">
      <span className="text-gray-400">+918921974845</span>
    </div>
     <div className="flex justify-center gap-3">
     <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

    </div>
     <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

    </div>

</div>
</div>




</div>

        </>
    )
}

export default Chat