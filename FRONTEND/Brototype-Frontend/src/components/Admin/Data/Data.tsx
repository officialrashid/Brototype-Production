import { useEffect, useState } from "react"
import AllSearchTab from "../AllSearchTab"
import DataHead from "./DataHead"
import DataRow from "./DataRow"
import { getCompanyData } from "../../../redux-toolkit/companySlice"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Data=()=>{
    let content='+ Add'
    const dispatch=useDispatch()
    
   // const[companyData,setCompanyData]=useState([])
    
    useEffect(()=>{
        const data=async ()=>{
           try{
            const response=await axiosInstance.get('/company/company-all-data')

            if(response){
                console.log(response.data,'companyDataaaaaaaaaaaaa');
                
               dispatch(getCompanyData(response.data))
                

            }

           }
           catch(error){


           }

        }
        data()

    },[])
    const handleToast=(message:any,error:any)=>{
        if(!error){
          toast.success(message, {
            position: 'top-center',
            autoClose: 3000
          });
  
        }
        else{
          toast.error(message, {
            position: 'top-center',
            autoClose: 3000
          });
  
  
        
       }
      }
    const companyData=useSelector(state=>state.companyReducer.companyData)

    console.log(companyData,'coma');
    

    return (
        <>
            <div className="bg-white rounded-md h-fit mt"> 
         <div className="">
  
</div>
         
        <div className="ml-3  ">
            <div className="mb-3 ">
            <span className="font-bold text-xl mt-8">Reviews </span>
            </div>
        </div>
        <div className="m-3">
        <AllSearchTab content={content}/>
        </div>
        <div className="m-2 mt-4 ">
        <DataHead/>
        <DataRow companyData={companyData} handleToast={handleToast} />
        </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default Data

