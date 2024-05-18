import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import ScheduledHead from "./ScheduledHead"
import ScheduledRow from "./ScheduledRow"
import axios from "axios"
import Api from "../../../utils/baseUrl/reviewerBaseUrl"
import { getReviewData } from "../../../redux-toolkit/reviewSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux-toolkit/store"
import ReviewSearchBar from "./RevieSearchBar"

const Scheduled=()=>{

    const  reviewDatas=useSelector(state=>state?.review?.reviewData);
    const [filteredData,setFilteredData]=useState(reviewDatas)
    const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
   ;
    console.log(reviewDatas,"svhdsvhjsdhjdsfhjdshjfdsfsdgfjhdsfjsfs");
    
const dispatch=useDispatch()
    useEffect(()=>{
   const   getStudentDetails=async ()=>{
        const studentData=await axios.get(`http://brototypes.com/review/assigned-reviews?coordinatorId=${advisorId}&type=schedule`)
         console.log(studentData,'studenrntttthbcbhajbcjabjt');
         
       dispatch(getReviewData(studentData.data))

 
        

     }

getStudentDetails()

    },[])

    const searchFn=(searInp:string)=>{

        console.log(searInp,'hellloo');

       const searchData=reviewDatas.filter((data:any)=>
     {
        console.log(data.name);
        
         return    data.name.toLowerCase().includes(searInp.toLowerCase())

        }
           
        
        
    )
       setFilteredData(searchData) 


    }
    return (
        <>
      

         

         
        

        <div className="m-2 mt-0">
<ReviewSearchBar searchFn={searchFn}/>
        </div>

             
        <div className="m-2">
        <ScheduledHead/>
       {reviewDatas?.length? <ScheduledRow reviewData={filteredData}/>:<div className="text-center mt-12"><h1 className="font-bold text-lg">There is no scheduled reviews</h1></div>}
  
            </div>
            <div className="m-2">
                <div></div>
            
        </div>
          
       

  
     
        
        </>
    )
}

export default Scheduled