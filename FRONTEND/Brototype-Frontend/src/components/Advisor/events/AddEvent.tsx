import { useState } from "react"
import { Formik,Form, Field,ErrorMessage,useField, useFormikContext } from "formik"
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import * as Yup from 'yup'
import "react-datepicker/dist/react-datepicker.css"
import { axiosInstance } from "../services/api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { editEvents } from "../../../redux-toolkit/coordinatorSlice";

const AddEvent=({isVisible,onClose,handleToast,editData})=>{


 
const dispatch=useDispatch()
    
  
  // const {setFieldValue}=useFormikContext()

  const coordinator=useSelector(state=>state.coordinator.coordinatorData)
  const [value, onChange] = useState('10:00')
  const [endTime,setEndTime]=useState('00:00')
  const [startTime,setStartTime]=useState('00:00')
  
 const  handleTime=(event:any,type:string)=>{
  if(type=='end'){
    setEndTime(event.target.value)
  }else{
    setStartTime(event.target.value)
  }
  

  }
      const [startDate,setStartDate]=useState(new Date())
      const [endDate,setEndDate]=useState(new Date())
      
 const  handleDate=(event:any,type:string)=>{
  if(type=='start'){
    setStartDate(event)
  }else{
    setEndDate(event)
  }
  

  }

      const initialState={
        eventType:editData?.eventType?editData.eventType:'',
        eventPlatform:editData?.eventPlatform?editData.eventPlatform:'',
        startDate:editData?.startDate?editData.startDate:'',
        endDate:editData?.endDate?editData.endDate:'',
        startTime:editData?.startTime?editData.startTime:'',
        endTime:editData?.endTime?editData.endTime:'',
        eventLocation:editData?.eventLocation?editData.eventLocation:'',
        eventDescription:editData?.eventDescription?editData.eventDescription:'' , 
        id:editData?._id?editData._id:'' 
      }

      const validationSchema=Yup.object({
        eventType:Yup.string().required('Event type is requird'),
        eventPlatform:Yup.string().required('Event platform is requird'),
        startDate:Yup.string().required('Start Date is requird'),
        endDate:Yup.string().required('End Date is requird'),
        startTime:Yup.string().required('Start Time is requird'),
        endTime:Yup.string().required('End Date is requird'),
        eventLocation:Yup.string().required('Event location is requird'),
        eventDescription:Yup.string().required('Event Description is requird')

      })
    if(!isVisible) return null
    return (
        <>
               <div className="fixed inset-0 bg-opacity-10   bg-black/60 flex justify-center items-center   overflow-y-scroll overflow-hidden z-40 ">
<Formik onSubmit={async (values,{resetForm,setStatus})=>{

  console.log(values,'hello');

  try {
    const response = await axiosInstance.post('/event/create-event', values);
    console.log(response, 'mmommm');
    resetForm();
    handleToast('Event created successfully');
  
    dispatch(editEvents(response.data.events))    
  } catch (error) {
    console.log(error, 'thisssss');
    if ((error as any).response) {
      handleToast('There was an error processing your request', error);
    } else if ((error as any).request) {
      handleToast('No response received from the server', error);
    } else {
      handleToast('An error occurred', error);
    }
  }

}} initialValues={initialState} validationSchema={validationSchema}>
 
    {({setFieldValue})=>(
        <Form className="  w-1/2 border border-2px rounded-md m-10 bg-white ">
        <div className=" ">
        <div className="flex justify-between m-7 mt-5 ml-6 mb-3">
           <div className="">
           <span className="text-xl"> New Event</span>
         </div>
        
         <div onClick={()=>{onClose()}} className="cursor-pointer   items-center flex justify-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:h-8 w-8   hover:rounded-full hover:bg-gray-200">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      
      
         </div>
      
        </div>
        <div className="border-t "></div>
        
      
        <div className="m-3 ml-6">
          <div className="mt-2">
            <div className="mb-2">
              <span className="text-gray-500">Event Type</span>
      
            </div>
             
      
      <Field type="text " className=" w-full mb-2 border border-2px py-3 px-2 rounded-md outline-black" name="eventType" placeholder="Enter your event type...."/>
      <ErrorMessage name="eventType" className="text-red-500 text-sm"/>
      
          </div>
          <div className="mt-2">
            <div className="mb-2">
              <span className="text-gray-500">Event Platform</span>
      
            </div>
             
      
      <Field type="text " name="eventPlatform"  className=" w-full mb-2 border border-2px py-3 name  px-2 rounded-md outline-black" placeholder="Enter your event platform...."/>
      <ErrorMessage name="eventPlatform" className="text-red-500 text-sm"/>
          </div>
          <div className="mt-2  ">
           
           
             
      {/* 
      <input type="text " className=" w-full mb-2 border border-2px py-3  px-2 rounded-md outline-black" placeholder="Enter your event time...."/> */}
      <div>
        <div className="flex gap-2">
        <div>
          <div>
          <span className="text-gray-500 ">Start date</span>
          </div>
          
      <DatePicker name="startDate" selected={editData.endDate?editData.endDate:startDate}   dateFormat='yyyy/MM/dd' onChange={(event) =>{handleDate(event,'start'),setFieldValue('startDate',event)} } />
      <div>
      <ErrorMessage name="startDate"  className="text-red-500 text-sm"/>
  
      </div>
      </div>
      
      
      <div>
      <div>
          <span className="text-gray-500 ">End date</span>
          </div>
      <DatePicker name="endDate" selected={editData.endDate?editData.endDate:startDate} dateFormat='yyyy/MM/dd' onChange={(event) =>{handleDate(event,'end'),setFieldValue('endDate',event)}}  />
      <div>
      <ErrorMessage name="endDate"  className="text-red-500 text-sm"/>
      </div>
      </div>
      <div>
          <div>
      
      <div className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
          <div>
              <label htmlFor="start-time" className="  text-md  text-gray-500 ">Start time</label>
              <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-2.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                      </svg>
                  </div>
                  <Field name="startTime"  value={editData.startTime} type="time" id="start-time" onChange={(e:any)=>{handleTime(e,'start'),setFieldValue('startTime',e.target.value)}}  className=" border leading-none border  text-black text-sm rounded-md  focus:ring-black-100 focus:border-black  w-full p-1.5 py-2 " min="09:00" max="18:00"  required />
              </div>
              <ErrorMessage  name="startTime" className="text-red-500 text-xs"/>
          </div>
          <div>
              <label htmlFor="end-time" className=" text-md text-gray-500">End time</label>
              <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-2.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                      </svg>
                  </div>
                  <Field name="endTime" type="time"  id="end-time"  value={editData.endTime} onChange={(e:any)=>{handleTime(e,'end'),setFieldValue('endTime',e.target.value)}} className=" border leading-none border text-gray-900 text-sm rounded-md focus:ring-black-100 focus:border-black w-full p-1.5 py-2  " min="09:00" max="18:00"    required />
              </div>
              <ErrorMessage name="endTime"   className="darK:text-red-500 text-xs"/>
          </div>
      </div>
      
          </div>
         
      
      </div>
      
        </div>
        
          </div>
          </div>
          
          <div className="mt-2">
            <div className="mb-2">
              <span className="text-gray-500">Event location</span>
      
            </div>
             
      
      <Field type="text " name="eventLocation"  className=" w-full mb-2 border border-2px py-3  px-2 rounded-md outline-black" placeholder="Enter your event location...."/>
      <ErrorMessage name="eventLocation" className="text-red-500 text-sm"/>
          </div>
          <div className="mt-2">
            <div className="mb-2">
              <span className="text-gray-500">Event Description</span>
      
            </div>
             
      <Field id=""  name="eventDescription"  rows={5} placeholder="Add description......" className="border w-full rounded-md outline-black px-2 py-2" ></Field>
      
      <ErrorMessage name="eventDescription" className="text-red-500 text-sm"/>
      
          </div>
         
      
          <div className="flex gap-2 justify-end mt-3" >
      
            <div >
              <button className="px-4 bg-black text-white rounded-md py-1" onClick={()=>{onClose()}}>Cancel</button>
      
            </div>
            <div>
               <button className="px-4 bg-black text-white rounded-md py-1" type="submit">Submit</button>
              
            </div>
      
          </div>
          
          
         
      
      
      
        </div>
        <div className="border-t mb-16">
      
        </div>
      
       
      
      
      
        </div>
        </Form>
    )}



 
</Formik>
  
  </div>
        
        
        </>
    )
}

export default AddEvent