import Mainbox from "../../../components/Admin/Dashboard/Mainbox"
import EnquiryBox from "../../../components/Admin/EnquiryBox"
import CourseBox from "../../../components/Admin/CourseBox"
import StudentBox from "../../../components/Admin/StudentBox"
import CounsellorBox from "../../../components/Admin/Dashboard/CounsellorBox"
import CounsellorCard from "./CounsellorCard"
import CourseCard from "../../../components/Admin/Dashboard/CourseCard"
import SearchBox from "../../../components/Admin/Dashboard/SearchBox"
import CounsellorFilter from "./CounsellorFilter"
import EnquiryGraph from "./EnquiryGraph"

const Main=()=>{


    return (
        <>



<Mainbox/>

<div className="flex mt-4 ">
<EnquiryBox/>
<CourseBox/>
<StudentBox/>
<CounsellorBox/>
</div>
<div className="bg-white rounded-md ml-2 mt-4">
  <div className=" ml-2">
  <div className="font-semibold text-lg ">
    <span>Enquiry Graph</span>
  </div>
  </div>
<div className="m-2">
  
  <EnquiryGraph/>
  
  </div>
</div>
<div className="flex    justify-center  m-4 ml-6 mt-0 mb-0 ">
</div>
<div className="border m-2 shadow-xl rounded-md mt-4 bg-white mr-0 " >
<CounsellorFilter/>

<div className="flex max-w-5/6 overflow-x-scroll">




<CounsellorCard/>





</div>


</div>

<div className=" border shadow-2xl m-2 rounded-md mt-6 bg-white mr-0">
  <div className=" m-2">
    <div className="">
      <span className="font-bold text-xl">Courses</span>
    </div>
     

  </div>
<SearchBox/>
  <div className="border-b mt-4">
    
  </div>
<div className="flex justify-around gap-">
<div className="grid grid-cols-3  gap-4">
   
 
<CourseCard/>
</div>
</div>

</div>
        
        </>
    )
}

export default Main