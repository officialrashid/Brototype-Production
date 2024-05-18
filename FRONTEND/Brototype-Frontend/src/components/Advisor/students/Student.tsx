import { useDispatch, useSelector } from "react-redux"
import SearchBar from "../components/SearchBar"
import { useEffect, useState } from "react"
import { getStudentData } from "../../../redux-toolkit/studentSlice"



const Student=()=>{

const dispatch=useDispatch()


const studentData=useSelector(state=>state.students.studentData)

const [filteredData,setFilteredData]=useState(studentData)
const getSearch=(value:string)=>{
  console.log(value),'searchInput';
  let filter
 filter = studentData.filter(reviewer=>{return  reviewer.name.toLowerCase().includes(value.toLowerCase())})
  
   

setFilteredData(filter)

}

const students=[
  {"reviewerId":"1","name":"John john","mobileNumber":"9876543210"},
  {"reviewerId":"2","name":"Alice","mobileNumber":"9876543211"},
  {"reviewerId":"3","name":"Bob","mobileNumber":"9876543212"},
  {"reviewerId":"4","name":"Emily","mobileNumber":"9876543213"},
  {"reviewerId":"5","name":"Michael","mobileNumber":"9876543214"},
  {"reviewerId":"6","name":"Sarah","mobileNumber":"9876543215"},
  {"reviewerId":"7","name":"David","mobileNumber":"9876543216"},
  {"reviewerId":"8","name":"Jessica","mobileNumber":"9876543217"},
  {"reviewerId":"9","name":"Daniel","mobileNumber":"9876543218"},
  {"reviewerId":"10","name":"Emma","mobileNumber":"9876543219"}
]



useEffect(()=>{

  dispatch(getStudentData(students))


},[])


    return (
        <>
        <SearchBar getSearch={getSearch} />

{
  filteredData.length?<div className="text-center m-20 font-bold"><h1>There is no students</h1></div>:<div className="grid grid-cols-4 m-2 gap-2">

  {
   
    filteredData?.map((student:any)=>{
return (
  <div className="border border-2px  rounded-lg w-full bg-white">
  <div className=" border-b  h-20 bg-slate-400  rounded-t-lg">
    

  </div>
   <div className=" h-24 w-24  border  rounded-full -mt-12 mx-auto   bg-white relative dark:bg-slate-200  overflow-hidden">
   <svg className=" h-32 w-32 text-gray-400 absolute -top-1 -left-4  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      
     

  </div>
  <div className="m-3 mb-0 text-center">
    <div><span>{student.name}</span></div>
    
    
 
  </div>
 <div className="flex justify-center m-1.5 gap-1">
   <div><span>BCE-55</span></div>
     <div className=""><span className="">|</span></div>

    <div><span>Cyber security</span></div>
    <div className=""><span className="">|</span></div>
    <div><span>Regular</span></div>

</div>
  <div className="border-t rounded-b-lg ">
    <div className=" flex ">
      <div className="  w-1/2 text-center  ">

      <div className="flex justify-around m-3">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

        </div>

      </div>
      
      
     </div>
      <div className="border-l w-1/2 text-center">
        <div className="flex justify-around m-3">
        <div>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>


        </div>

      </div>
      
      </div>
    </div>

  </div>

 
 
</div>
 

)

  })
}

    

</div>
}
        
        </>
    )
}


export default Student