


const ReviewSearchBar=({searchFn})=>{
    return (
        <>
              <div className="flex justify-between  ">
  {/* <div className="m-3  mt-4">

 <input type="search" className="border border-2px outline-none py-0.5 px-6"/>
  </div> */}
  <div className=" mt-0">
  <div className="relative">


    <div className="absolute m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</div>
<div>
  <input type="search" onChange={(event)=>{searchFn(event.target.value)}} className="py-2 px-10 rounded-md border border-slate-200 outline-none   dark:focus:ring-black dark:focus:border-black " placeholder="hello search....... "/>
</div>
  </div>
</div>

     
   
  </div>
        </>
    )
}

export default ReviewSearchBar