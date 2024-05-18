import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Api from "../../../utils/baseUrl/reviewerBaseUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store";

const Slot = ({ isVisible, onClose, events, eventId ,reviewerId,reviewId}) => {
  const [slotEvent, setSlotEvent] = useState([])
  const [reviewSlots, setReviewSlots] = useState([])
  const advisorId: any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
  const bookReview = async (slotId: string, handleToast: Function) => {

    console.log(advisorId, slotId, 'rrrrr')
    console.log(eventId, 'eeee')
    const bookedEventId=slotId
console.log(reviewerId,'reviewerID')
const bookStatus=true

    const response = await Api.patch('/api/reviewer/update-particular-date-events', {reviewerId ,eventId,bookedEventId,advisorId,bookStatus,reviewId })

    console.log(response,'respose from booked');
    
    handleToast('Review Booked successfully')
  }

  const handleToast = (message: any, error: any) => {
    if (!error) {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3500
      });
      //setModal(false)
    }
    else {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000
      });



    }
  }




  useEffect(() => {
    //console.log(generateTimeSlots(),'vvdsds');


    //         const slots=events.filter((timeSlot:any)=>{
    //           return timeSlot.id==eventId
    //         })
    // console.log(slots);

    //setSlotEvent(slots)
    setReviewSlots(events)

    console.log(events, 'eventsss');


  }, [])



  if (!isVisible) return null
  return (
    <>
      {
        console.log(slotEvent, 'slottt')

      }
      <div className="fixed inset-0 bg-opacity-10   bg-black/60 flex justify-center  items-center overflow-y-scroll overflow-hidden z-40 ">
        <div className="border border-2px m-3 w-1/3 rounded-md bg-white"  >
          <div className="flex justify-between m-3 ">
            <div></div>
            <div onClick={() => { onClose() }} className="cursor-pointer"  >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:bg-gray-100 hover:border w-6 h-6 hover:rounded-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

            </div>
          </div>
          <div className="border border-2px m-3 rounded-md py-2 px-2 mt-2">
            <span className="font-roboto">Time slot(s) available</span>

          </div>
          {
            console.log(events, 'e')
          }
          {


            events?.map((slot) => {
              return (
                <div className="flex justify-between m-3 gap-4">
                  <div className="flex w-full ">
                    <div className="border border-gray-400 text-center w-1/2 ">
                      <div className=" border border-gray-300 m-2 py-1.5 bg-gray-300 rounded-sm">
                        <span  className="font-roboto">{slot.startTime}</span>

                      </div>

                    </div>
                    <div className="text-center py-1.5 mt-2" >
                      <span className="font-roboto">-</span>
                    </div>
                    <div className="border border-gray-400 text-center   w-1/2 ">
                      <div className=" border border-gray-300 m-2 py-1.5 bg-gray-300 rounded-sm">
                        <span className="font-roboto">{slot.endTime}</span>

                      </div>

                    </div>



                  </div>
                  <div className=' flex jusitify-center items-center'>
                    {


                      slot.booked && advisorId !== '123' ? <button className="bg-gray-500 text-black text-sm  rounded-md border border-bg-salte-500 px-6 py-2 " onClick={() => { bookReview(slot._id, handleToast) }} disabled={slot.booked}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </button> : advisorId === '123' ? <button className="bg-black text-white  rounded-md px-6 py-2 " onClick={() => { bookReview(slot._id, handleToast) }} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>

                      </button> : <button className="bg-black text-white  rounded-md px-6 py-2 " onClick={() => { bookReview(slot._id, handleToast) }} >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>

                      </button>
                    }

                  </div>



                </div>
              )
            })
          }


        </div>
      </div>
      <ToastContainer />

    </>
  )
}

export default Slot



{/* <div class="flex border m-2 ">
  
  
  <div class="border-r w-1/2 ">
    <div class="m-2">
  <div class="relative">
    <div class="absolute m-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
<div>
  <input type="search"  class="     w-full py-2.5 px-10 rounded-md border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... ">
</div>
  </div>
</div>
    
    
  <div class="flex justify-between ">
    
    <div class="flex gap-2 m-2 mt-4">
      
     <div class="border h-10 w-10 rounded-full "></div>
  <div class="mt-2"><span class="text-md  font-semibold">John Doe</span>
  <div>
    <span class="text-gray-600">Hello good mrng</span>
  </div>
  </div>


  </div>
  <div class="m-4">
    <span class="text-gray-600 text-sm">6m</span>
  </div>

  </div>
  <div class="flex justify-between">
    <div class="flex gap-2 m-2">
     <div class="border h-10 w-10 rounded-full "></div>
  <div class="mt-2"><span class="text-md  font-semibold">John Doe</span>
  <div>
    <span class="text-gray-600">Hello good mrng</span>
  </div>
  </div>


  </div>
  <div class="m-4">
    <span class="text-gray-600 text-sm">6m</span>
  </div>

  

  
  
  
 
</div>
</div>


<div class="  border-r w-full ">
    <div class="border-b ">
  <div class="flex justify-between">
    <div class="flex gap-2 m-2 ">
     <div class="border h-12 w-12 rounded-full  mt-3"></div>
  <div class="mt-5"><span class="text-md  font-semibold">John Doe</span>
  <div   w-34 overflow-auto">
    <span class="text-gray-600 text-sm overflow-hidden">last seen at  8:98 pm </span>
  </div>
  </div>


  </div>
  <div class="m-4 mt-8 flex gap-4">
   <div class="border w-8 h-8 flex items-center justify-center rounded-full">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>


   </div>
   <div class="border w-8 h-8 flex items-center justify-center rounded-full">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>



   </div>
   <div class="mt-1">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>


   </div>
  </div>

  </div>

</div>
<div class="py-44"></div>

<div class="">
    <div class=" m-3 rounded-md ">
    <div class=" flex ">


      <!-- hee -->
           <div class="relative top-0 w-full">

  
     
  <textarea
    class="border px-2 h-10 py-2 resize-none overflow-hidden outline-none max-h-80 absolute bottom-0 rounded-md w-full"
    oninput="this.style.height = ''; this.style.height = Math.min(this.scrollHeight, 1200) + 'px';"
    placeholder="Type a message"
    
  ></textarea>


</div>

      <!-- helle -->
      <div class="m-1 cursor-pointer">
         <div class=" flex gap-1">
      <div class="flex items-center justify-center h-8 w-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>
</div>
<div class="flex items-center justify-center h-8 w-8">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>

</div>
<div class="border h-8 w-8 flex items-center justify-center bg-gray-300 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
</div>
    </div>
        
      </div>

 
  
  
    </div>

   

   
  </div>
  
</div>


</div>

 <div class="">
  <div class="flex justify-center m-14 mb-4">
    <div class="border w-36 h-36 rounded-full mt-14 ">

  </div>

  </div>
  
  <div class="flex justify-center">
    <span>Sachin K siby</span>
   

  </div>
   <div class="flex justify-center">
      <span class="text-gray-400">+918921974845</span>
    </div>
     <div class="flex justify-center gap-3">
     <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

    </div>
     <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

    </div>

</div>
</div>




</div>

<div class="border m-2 w-fit rounded-sm">
  <div class="flex justify-between m-2 cursor-pointer">
    <div></div>
     
    <div class="hover:bg-gray-200  w-4 h-4 rounded-full flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="grey"  class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</div>


  </div>
  <ul class="m-2 " >
    <li><input type="checkbox" name="" id="" class="accent-black">  New jchid</li>
    <li><input type="checkbox" name="" id="" class="accent-black">  New oiod</li>
    <li><input type="checkbox" name="" id="" class="accent-black">  New kddi</li>
    <li><input type="checkbox" name="" id="" class="accent-black">  New dhdo</li>
     <li><input type="checkbox" name="" id="" class="accent-black">  New dhdo</li>  <li><input type="checkbox" name="" id="" class="accent-black">  New dhdo</li>
  </ul>


</div>





 

   




 















<div class="border m-4 rounded-md ">
  <div class="flex justify-between m-2 mb-4 mt-3">
    <div></div>
     <div class="hover:bg-gray-200 w-6 h-6 rounded-full cursor-pointer"><span><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-slate-400 hover:stroke-black">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span></div>
  </div>
<div >
  <div class="border border-2px m-2 rounded-md py-2">
  <div class="flex justify-between m-2 ">
    <div><span class="font-bold"> Update  review status</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div class="flex justify-between">
  <div class="border border-black py-1.5 m-4   rounded-md w-full">
  <div class="flex gap-4 m-2 justify-around">
    <div>
    <input type="radio" class=" accent-black" checked>
    <span>Not Completed</span>

    </div>
    <div>
    <input type="radio" class=" accent-black">
    <span> completed</span>

    </div>
 
  </div>
</div>
<div class="m-3">

<button class="bg-black text-white py-2 px-5 rounded-md m-2">submit</button>

</div>
</div>


</div>
 <div class="border border-2px m-2 rounded-md py-2">
  <div class="flex justify-between m-2  ">
    <div><span class="font-bold"> Update  student Manifest</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
     <div class="w-full">

  <textarea name="" id="" cols="37" rows="8" class="border border-gray-400 rounded-sm outline-black  w-full" placeholder="Enter pending topics " wid></textarea>
</div>
<div class="w-full">

  <textarea name="" id="" cols="37" rows="8" class="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></textarea>
</div>
    

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
     <div class="w-full">

  <textarea name="" id="" cols="37" rows="8" class="border border-gray-400 rounded-sm outline-black  w-full" placeholder="Enter pending topics " wid></textarea>
</div>
<div class="w-full">

  <textarea name="" id="" cols="37" rows="8" class="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></textarea>
</div>
    

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="border border-2px m-2 rounded-md py-2">
  <div class="flex justify-between m-2 ">
    <div><span class="font-bold"> Update  review status</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div class="border border-black py-1.5 m-4   rounded-md">
  <div class="flex gap-4 m-2 justify-around">
    <div>
    <input type="radio" class=" accent-black" checked>
    <span>Rescheduled</span>

    </div>
    <div>
    <input type="radio" class=" accent-black">
    <span>Cancelled</span>

    </div>
 
  </div>
</div>
<div class="m-4">
  <div class="flex gap-3"> 
      <div class=" w-full">
    <input type="text" class="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>
     <div class=" w-full">
   <input type="text" class="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  ">
  </div>

  </div>

</div>
<div class="flex justify-between m-2">
  <div></div>
  <div>
      <button class="bg-black text-white py-2 px-5 rounded-md m-3">submit</button>
<button class="bg-black text-white py-2 px-5 rounded-md m-3">Cancel</button>

  </div>

</div>



</div>



 








<div class="border-l-4 rounded-md border border-gray-400  m-3 bg-gray-100  ">
  <div class="flex justify-between m-3 mb-0">
    <div><span>Onlne-meeting</span></div>
  <div><span class="text-xs">December 23, 2023</span></div>

  </div>
  <div class="m-3 mt-0 mb-0">
    <span>Your online meeting with your student is scheduled</span>
  </div>
   <div class="m-3 mt-0">
    <span>Maradu, Kochi</span>
  </div>
  
</div>






















<div class="w-1/2 m-3">



</div>
<div class="border m-3 justify-between w-fit py-1.5 rounded-md border-b-4 border-b-green-600" >
<div class="m-2.5 ">
  <div class="flex gap-16">
    <div class="  flex gap-1 -md">
  <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-6 h-6">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>
</div>
<div>
  <span class="text-md font-medium">Submitted Successfully</span>
</div>
</div>
  <div class="cursor-pointer hover:bg-gray-200 h-6 w-6 flex items-center justify-center rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

  </div>
</div>
</div>

</div>
<div class="border m-3 justify-between w-fit py-1.5 rounded-md border-b-4 border-b-red-600" >
<div class="m-2.5 ">
  <div class="flex gap-16">
    <div class="  flex gap-2 -md">
  <div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  class="text-red-600 w-5 h-6">
 
  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="currentColor"/>
</svg>
</div>
<div>
  <span class="text-md font-medium">Error occured !!!!</span>
</div>
</div>
  <div class="cursor-pointer hover:bg-gray-200 h-6 w-6 flex items-center justify-center rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="w-5 h-5 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

  </div>
</div>
</div>

</div>

<svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>




 */}
