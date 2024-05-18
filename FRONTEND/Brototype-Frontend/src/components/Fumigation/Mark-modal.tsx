import { useEffect, useState } from "react"
import moment from "moment"
import { Formik,ErrorMessage,Form,Field} from "formik"
import * as Yup from 'yup'
import axios from "axios"
import { useSelector } from "react-redux"




const MarkModal=({isVisible,onClose,studentId,activeTab,batchId})=>{


console.log(studentId,activeTab,batchId,'helloooo');

let fumigationType='mock'
if(activeTab!==1){
  fumigationType='final'

}


// useEffect(()=>{
//   console.log("useeffect czllledddddddddd");
  

//   axios.get('http://localhost:3002/api/fumigation/get-students-mark',{params:{studentId,batchId,fumigationType}}).then(res=>{
//     console.log(res.data.response,"my useeffetttttttttttttt");
    
//   }).catch(err=>{
//     console.log(err,'error in use');
    
//   })

// },[])

const markData=useSelector(state=>state.batch.studentMark)
 console.log(markData," mark in marrk modalllllllllllllllllll");


let [arrayRecord,setArrayRecord]=useState({})
  let [patternRecord,setPatternRecord]=useState({})
  let [oopsRecord,setOopsRecord]=useState({})
let [commnRecord,setCommnRecord]=useState({})


    if(markData.length){

      for(let data of markData){
        if(data.examType==='Array'){
          arrayRecord=data
          
          console.log(arrayRecord,'array');
          
        }
        if(data.examType==='Pattern'){
         patternRecord=data
        }
        if(data.examType==='Communication'){
        commnRecord=data
        }
        if(data.examType==='Oops'){
         oopsRecord=data
        }
      }

    }



  const arrayInitialValues={
    arrayStartTime: arrayRecord? arrayRecord.startTime:"",
    arrayEndTime: arrayRecord? arrayRecord.endTime:""
  }

const timeDifference=(arrayStartTime,arrayEndTime)=>{


  const startTime=moment(arrayStartTime,'hh:mm')
  const endTime=moment(arrayEndTime,'hh:mm')

  const difference=endTime.diff(startTime,'minutes')
  return difference<=30

}
  
  const validationSchema=Yup.object({
  
    arrayStartTime:Yup.string().matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/,
    'Please enter a valid time in 12-hour format (e.g., 11:00 am)').required('Array start time is required'),
    arrayEndTime:Yup.string().matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/,
    'Please enter a valid time in 12-hour format (e.g., 11:00 am)').required('Array end time is required').test('timeDifference','the difference must be less than or equal to 30 minutes',function(value){

      return timeDifference(this.parent.arrayStartTime,value)

    }).test("is-greater", "end time should be greater", function(value) {
      const { arrayStartTime } = this.parent;
      return moment(value, "HH:mm").isAfter(moment(arrayStartTime, "HH:mm"));
    }),
    
  })

  const patternInitialValues={
    patternStartTime:patternRecord? patternRecord.startTime:"",
   patternEndTime:patternRecord? patternRecord.endTime:""
  }




  const patternValidationSchema=Yup.object({
  
    patternStartTime:Yup.string().matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/,
    'Please enter a valid time in 12-hour format (e.g., 11:00 am)').required('Pattern start time is required'),
    patternEndTime:Yup.string().matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/,
    'Please enter a valid time in 12-hour format (e.g., 11:00 am)').required('Pattern end time is required').test('timeDifference','the difference must be less than or equal to 30 minutes',function(value){

      return timeDifference(this.parent.patternStartTime,value)

    }).test("is-greater", "end time should be greater", function(value) {
      const { patternStartTime } = this.parent;
      return moment(value, "HH:mm").isAfter(moment(patternStartTime, "HH:mm"));
    }),
    
  })


  const oopsInitialValues={
    oopsMark:oopsRecord?oopsRecord.mark:''
  }
  const commnInitialValues={
    commnMark:commnRecord?commnRecord.mark:''
  }

  const oopsValidationSchema=Yup.object({
  
   oopsMark:Yup.number().required("OOps mark is required"),
    
    
  })

  const commnValidationSchema=Yup.object({
  
    commnMark:Yup.number().required("communication mark is required"),
     
     
   })
  const [arrayStartTime,setArrayStartTime]=useState('')
  const [arrayEndTime,setArrayEndTime]=useState('')
  const [patternStartTime,setPatternStartTime]=useState('')
  const [patternEndTime,setPatternEndTime]=useState('')
  const [oopsMark,setOopsMark]=useState('')
  const [commnMark,setCommnMark]=useState('')
  const [patternField,setPatternField]=useState(false)
  const [arrayField,setArrayField]=useState(true)
  const [oopsField,setOopsField]=useState(false)
  const [commnField,setCommnField]=useState(false)

  //
 
  const [submittedArrayMark, setSubmittedArrayMark] = useState(false);
  const [submittedPatternMark, setSubmittedPatternMark] = useState(false);
  const [submittedOopsMark, setSubmittedOopsMark] = useState(false);
  const [submittedCommnMark, setSubmittedCommnMark] = useState(false);
//







  const handlePatternField=()=>{



        
setPatternField(true)
setArrayField(false)
setOopsField(false)
 setCommnField(false)   
  }
  const handleArrayField=()=>{
        
    setPatternField(false)
    setArrayField(true)
    setOopsField(false)
     setCommnField(false)  
      }
const handleOopsField=()=>{
        
  setPatternField(false)
  setArrayField(false)
  setOopsField(true)
  setCommnField(false)  
            
          }
          
const handleCommnField=()=>{
        
  setPatternField(false)
  setArrayField(false)
  setOopsField(false)
   setCommnField(true)  
                
              }





    if(!isVisible) return null
    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center    overflow-hidden z-10 font-roboto">
  <div className="w-[600px] flex flex-col max-h-[80vh]  " >
   

   
    
    <div className="bg-white p-2 rounded-lg border border-gray-500  ">
      
    <div className="flex justify-end  px-7 py-2 ">
    <button className="text-xl text-gray-500 " onClick={() => onClose()}>
      X
    </button>
    
   </div>
    <div className="flex items-center justify-center " >
        <span className="text-lg font-bold"> {markData.length>3?'Update Fumigation Mark':'Add Fumigation Mark'}</span>
    </div>
    <div>
    <ul className=" flex gap-[2.5vw] m-7">
        <li>
            <span><button
            type="submit"
            onClick={handleArrayField}       className={`shadow-xl text-black  hover:text-white hover:bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-md px-5 py-2.5 text-center border border-black dark:bg-white dark:hover-bg-black dark:focus:ring-black ${arrayField?'bg-black text-gray-500 ring-2 ring-black':' '}`}
          >
            Array
          </button></span>
        </li>
        <li>
            <span><button
            type="submit"
            onClick={handlePatternField}  
            className={`shadow-xl text-black bg-gray-400 hover:text-white hover:bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-md px-5 py-2.5 text-center border border-black dark:bg-white dark:hover-bg-black dark:focus:ring-black ${patternField?'bg-black text-gray-500 ring-2 ring-black':' '}`}
          >
            Pattern
          </button></span>
        </li>
        <li>
            <span><button
            type="submit"
            onClick={handleOopsField}     className={`shadow-xl text-black bg-gray-400 hover:text-white hover:bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-md px-5 py-2.5 text-center border border-black dark:bg-white dark:hover-bg-black dark:focus:ring-black ${oopsField?'bg-black text-gray-500 ring-2 ring-black':' '}`}
          >
            OOPs
          </button></span>
        </li>
        <li>
            <span><button
            type="submit"
            onClick={handleCommnField}   className={`shadow-xl text-black bg-gray-400 hover:bg-black focus:ring-2 hover:text-white focus:outline-none focus:ring-black font-medium rounded-lg text-md px-5 py-2.5 text-center border border-black dark:bg-white dark:hover-bg-black dark:focus:ring-black ${commnField?'bg-black text-gray-500 ring-2 ring-black':' '}`}
           >
            Communication
          </button></span>
        </li>
       
        
    </ul>
   </div>
      

        {
          
          patternField&&

        <Formik initialValues={patternInitialValues} validationSchema={patternValidationSchema}  onSubmit={async (values,{resetForm,setStatus})=>{

          try {
            console.log(values,"pattern");
            let {patternStartTime,patternEndTime}=values
            const startTime = patternStartTime;
            const endTime = patternEndTime
            let type:string="Pattern"
            let invigilatorId="1234444"
                  let response= await  axios.patch('http://localhost:3002/api/fumigation/add-students-mark',{startTime,endTime,type,fumigationType,invigilatorId,studentId,batchId})
                 
                  console.log(response);
            
                  if(response.status){
                    resetForm();
                  setStatus('staus updated sucessfully')
               
                  }
                  
                
            
                  
                } catch (err) {
      
                }

        }} >

          {({status})=>(   <Form className="space-y-6 m-6" action="#"   >
          <div >
<Field
  type="text"
  name="patternStartTime"
  id="patternStartTime" 
  
  className="shadow-xl mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
  placeholder="Enter a  start time in this format HH:MM"

/>
<ErrorMessage name="patternStartTime" component="div" className="text-red-500" />
</div>

<div >
<Field
  type="text"
  name="patternEndTime"
  id="patternEndTime"
  className="shadow-xl font-roboto mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
  placeholder="Enter a  end time in this format HH:MM"

/>
<ErrorMessage name="patternEndTime" component="div" className="text-red-500" />
</div>

<div className="flex justify-end">
          <button 
            type="submit" 
            
            className="shadow-xl font-roboto text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
          >
      {patternRecord?'Update':'Submit'}
          </button>
        </div>

        
        {status && <div  className="success-message">{status}</div>} 
       
      </Form>
      )}
       
     
      </Formik>
         
        }


        {

          arrayField&&<>
          <Formik initialValues={arrayInitialValues} validationSchema={validationSchema} onSubmit={async (values, {resetForm,setStatus})=>{

try {
  console.log(values,"valuessssssssssssssss");
  let type:string="Array"

  let {arrayStartTime,arrayEndTime}=values
 
const startTime = arrayStartTime;
const endTime =  arrayEndTime

  
     let invigilatorId="1234444"
        let response= await  axios.patch('http://localhost:3002/api/fumigation/add-students-mark',{type,fumigationType,studentId,startTime,endTime,invigilatorId,batchId})
       
        console.log(response,'arraymark');
  
        if(response.status){
          resetForm();
          setStatus('staus updated sucessfully')
        }
        
      
  
        //
      } catch (err) {
        // Handle any errors here
      }
          

}}>
          <Form className="space-y-6 m-6" action="#" >
          <div >
<Field
  type="text"
  name="arrayStartTime"
  id="arrayStartTime"
  className={`shadow-xl mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black ` } 
  placeholder="Enter a start a time"
 
/>
<ErrorMessage name="arrayStartTime" component="div" className="text-red-500" />
</div>

<div >
<Field
  type="text"
  name="arrayEndTime"
  id="arrayEndTime"
  className="shadow-xl font-roboto mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
  placeholder="Enter a end time"
  
/>
<ErrorMessage name="arrayEndTime" component="div" className="text-red-500" />
</div>
<div className="flex justify-end">
          <button 
            type="submit" 
           
            className="shadow-xl text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
          >
            {arrayRecord?'Update':'Submit'}
          </button>
        </div>
        </Form>
        </Formik>
          
          </>
        }

       {
  commnField&&
  <> 
  <Formik initialValues={commnInitialValues} validationSchema={commnValidationSchema} onSubmit={async (values,{resetForm,setStatus})=>{

try {
  console.log(values,'communicationnnnnn');
  let {commnMark}=values
  let type:string="Communication"

  
 
 let startTime=''
 let endTime=''

  
     let invigilatorId="1234444"
        let response= await  axios.patch('http://localhost:3002/api/fumigation/add-students-mark',{type,fumigationType,studentId,startTime,endTime,invigilatorId,batchId,mark:commnMark})
       
        console.log(response);
  
        if(response.status){
          resetForm();
          setStatus('Communication Mark added successfully!!!!!!')
        }
        
      
  
        //
      } catch (err) {
        // Handle any errors here
      }


          

}}>
  <Form className="space-y-6 m-6" action="#" >
  <div >
<Field
  type="text"
  name="commnMark"
  id="commnmark"
  className="shadow-xl font-roboto mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
  placeholder="Enter a communication mark out of 10"

/>
<ErrorMessage name="commnMark" component="div" className="text-red-500" />
</div>
<div className="flex justify-end">
          <button 
            type="submit" 
          
            className="shadow-xl text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
          >
             {commnRecord?'Update':'Submit'}
          </button>
        </div>
        </Form>
        </ Formik>

  </>

       }
         {
  oopsField&&

  <>
  <Formik  initialValues={oopsInitialValues} validationSchema={oopsValidationSchema} onSubmit={async (values,{setStatus,resetForm})=>{




 let invigilatorId="1234444"
console.log(values,"ooops");





try {
  console.log(values,'communicationnnnnn');
  let {oopsMark}=values
  let type:string="Oops"

  
 
      let startTime=''
      let endTime=''

  
     let invigilatorId="1234444"
        let response= await  axios.patch('http://localhost:3002/api/fumigation/add-students-mark',{type,fumigationType,studentId,startTime,endTime,invigilatorId,batchId,mark:oopsMark})
       
        console.log(response);
  
        if(response.status){
          resetForm();
          setStatus('OOPs  Mark added successfully!!!!!!')
        }
        
      
  
        //
      } catch (err) {
        // Handle any errors here
      }










          

}}>
  <Form className="space-y-6 m-6" action="#" >
  
  <div >
<Field
  type="text"
  name="oopsMark"
  id="oopsMark"
  className="shadow-xl font-roboto mb-4 focus:outline-black bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
  placeholder="Enter a oops mark out of 10"

/>
<ErrorMessage name="oopsMark" component="div" className="text-red-500" />
</div>
<div className="flex justify-end">
          <button 
            type="submit" 
           
            className="shadow-xl font-roboto text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
          >
         {oopsRecord?'Update':'Submit'}
          </button>
        </div>
             
      </Form>
      </Formik>
        
        </>


       }


    
   
    </div>
  </div>
</div>






        </>
    )
}

export default MarkModal