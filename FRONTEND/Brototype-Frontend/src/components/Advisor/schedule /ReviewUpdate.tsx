

const ReviewUpdate=()=>{
    <>

<div className="border m-4 rounded-md ">
  <div className="flex justify-between m-2 mb-4 mt-3">
    <div></div>
     <div><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span></div>
  </div>
<div >
  <div className="border border-2px m-2 rounded-md py-2">
  <div className="flex justify-between m-2 ">
    <div><span className="font-semibold font-roboto"> Update  review status</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div className="flex justify-between">
  <div className="border border-black py-1.5 m-4   rounded-md w-full">
  <div className="flex gap-4 m-2 justify-around font-roboto">
    <div>
    <input type="radio" className=" accent-black" checked/>
    <span className="font-roboto">Not Completed</span>

    </div>
    <div>
    <input type="radio" className=" accent-black"/>
    <span className="font-roboto"> completed</span>

    </div>
 
  </div>
</div>
<div className="m-3">

<button className="bg-black text-white py-2 px-5 rounded-md m-2 font-roboto">submit</button>

</div>
</div>


</div>
 <div className="border border-2px m-2 rounded-md py-2">
  <div className="flex justify-between m-2  ">
    <div><span className="font-bold font-roboto"> Update  student Manifest</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black font-roboto text-xs" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black ont-roboto text-xs" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
     <div className="w-full">

  <textarea name="" id="" cols={37} rows={8} className="border border-gray-400 rounded-sm outline-black  w-full" placeholder="Enter pending topics " wid></textarea>
</div>
<div className="w-full">

  <textarea name="" id="" cols={37} rows={8} className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></textarea>
</div>
    

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
     <div className="w-full">

  <textarea name="" id="" cols={37} rows={8} className="border border-gray-400 rounded-sm outline-black  w-full" placeholder="Enter pending topics " wid></textarea>
</div>
<div className="w-full">

  <textarea name="" id="" cols={37} rows={8} className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></textarea>
</div>
    

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="border border-2px m-2 rounded-md py-2">
  <div className="flex justify-between m-2 ">
    <div><span className="font-bold"> Update  review status</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div className="border border-black py-1.5 m-4   rounded-md">
  <div className="flex gap-4 m-2 justify-around">
    <div>
    <input type="radio" className=" accent-black" checked/>
    <span>Rescheduled</span>

    </div>
    <div>
    <input type="radio" className=" accent-black"/>
    <span>Cancelled</span>

    </div>
 
  </div>
</div>
<div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div>
<div className="flex justify-between m-2">
  <div></div>
  <div>
      <button className="bg-black text-white py-2 px-5 rounded-md m-3">submit</button>
<button className="bg-black text-white py-2 px-5 rounded-md m-3">Cancel</button>

  </div>

</div>



</div>


    
    
    </>

}

export default ReviewUpdate