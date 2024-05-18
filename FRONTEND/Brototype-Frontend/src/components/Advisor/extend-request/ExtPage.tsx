import { useDispatch, useSelector } from "react-redux"
import SearchBar from "../components/SearchBar"
import ReviewSearchBar from "../schedule /RevieSearchBar"
import ExtHead from "./ExtHead"
import ExtRow from "./ExtRow"
import { useEffect, useState } from "react"

import Api from "../../../utils/baseUrl/reviewBaseUrl"
import { getExtendRequestData } from "../../../redux-toolkit/reviewSlice"
import { ToastContainer, toast } from 'react-toastify';

const ExtPage=()=>{
    const dispatch=useDispatch()
    //const  extendReqDatas=useSelector(state=>state?.review?.extendReqData)
    const extendReqDatas=[]
   // const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
    const advisorId="65ed8fc3afcda5149bbf0166"
    const extendData=useSelector((state)=>state)
    const [filteredData,setFilteredData]=useState(extendReqDatas)
     const searchFn=(searInp:string)=>{

        console.log(searInp,'hellloo');

       const searchData=extendData.filter((data:any)=>
     {
        console.log(data.name);
        
         return    data.name.toLowerCase().includes(searInp.toLowerCase())

        }
           
        
        
    )
       setFilteredData(searchData) 


    }


    useEffect(()=>{

        const getExtendRequests=async()=>{

const response=await Api.get(`/review/extend-requests/${advisorId}`)
console.log(response.data,'data');
dispatch(getExtendRequestData(response.data))

        }
        getExtendRequests()

    },[])
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


    return (
        <>
       
        <div className="m-2 mt-0">
       <ReviewSearchBar searchFn={searchFn}/>
        </div>
        <div className="m-2 mt-6 ">
        <ExtHead/>
        {!extendReqDatas.length? <ExtRow  extData={filteredData} handleToast={handleToast}/>:<div className="text-center mt-12"><h1 className="font-bold text-lg">There is no extend requests</h1></div>}
       
  
     

        </div>

  
        <ToastContainer />
 
        
        </>
    )
}

export default ExtPage