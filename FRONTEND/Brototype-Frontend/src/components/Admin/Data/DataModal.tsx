import { Form,Field,Formik,ErrorMessage } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup'
import { editCompanyData } from "../../../redux-toolkit/companySlice"
const DataModal=({isVisible,onClose,editData,handleModalClose,handleToast})=>{
  const companyData=useSelector(state=>state.companyReducer.companyData)
  const dispatch=useDispatch()
  const initalValues={
    students:companyData.length?companyData[0].studentCount:'',
    placements:companyData.length?companyData[0].placementCount:'',
    courses:companyData.length?companyData[0].courseCount:'',
    counsellors:companyData.length?companyData[0].counsellorsCount:''

  }
  const validationSchema=Yup.object({
    students:Yup.string().required('student count  is required'),
    placements:Yup.number().required('placement count is required'),
    courses:Yup.number().required('course count is required'),
    counsellors:Yup.number().required('counsellor count is required'),
    

    
})

    if(!isVisible) return null
    return (
        <>
        <Formik  initialValues={initalValues} validationSchema={validationSchema} onSubmit={async (values,{resetForm,setStatus})=>{


       try
       {
        console.log(editData,'editddararar');
        
          const response= await axiosInstance.post(`/company/edit-company-data/${editData}`,values)
          if(response){
            resetForm()
            console.log(response,'update dataaaata');
           dispatch( editCompanyData(response.data))
           handleModalClose()
           handleToast('successfully edited')
          }
       }
       catch (error){

       }

        }}>
          <Form>
        <div className="bg-black/60 z-40 fixed p  inset-0 flex justify-center    overflow-y-scroll overflow-hidden items-center">
<div className="border m-2 rounded-md bg-white mt-10 h-fit w-1/2">
  <div className="flex justify-between m-4 mb-0">
    <div>

    </div>
     <div onClick={()=>{onClose()}}  className="cursor-pointer hover:bg-slate-200 hover:w-6 h-6 hover:rounded-full hover:flex hover:justify-center hover:items-center"><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</div>
  </div>
  <div className="m-4 mt-1 mb-6 text-center">
    <span className="font-bold text-xl">Add Academic Councellor details</span>
  </div>

  <div className="m-4 mt-3 flex gap-2 mb-6">
  <div className="w-full">
      <Field type="text" name="students" id="" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the number of students"/>
      <ErrorMessage name="students"  component="div" className="text-red-500 " />
  </div>
   <div className="w-full ml-">
   
   <div className="w-full">
    <Field type="text"  name="placements"   className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the number of students placed"/>
    <ErrorMessage name="counsellors"  component="div" className="text-red-500 " />
  </div>

    
   </div>
 

  
  </div>

    <div className="m-4 mt-3 flex gap-2 mb-6">
  <div className="w-full">
      <Field type="text" name="courses" id="" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the number of  courses"/>
      <ErrorMessage name="courses"  component="div" className="text-red-500 " />
  </div>
   <div className="w-full ml-">
   
   <div className="w-full">
    <Field type="text"   name="counsellors" className="outline-black border border-gray-400 rounded-md h-10 w-full px-2 text-md" placeholder="Enter the number of academic counsellors"/>
    <ErrorMessage name="placements"  component="div" className="text-red-500 " />
  </div>

    
   </div>
 

  
  </div>
  <div className=" flex justify-center items-center  mb-4 ">
        <div>

        </div>
        <div>
          <button className="bg-black text-white px-4 py-1 rounded-md" type="submit">Submit</button>
          
          </div>

      </div>
</div>
</div>
</Form>
</Formik>

        
        </>
    )
}

export default DataModal