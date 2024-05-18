import { Formik,Form, Field,ErrorMessage } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from 'yup'
import { axiosInstance } from "../services/api/apiClient"

const ProfileEditModal=({isVisible,onClose})=>{

  const coordinatorData=useSelector(state=>state.coordinator.coordinatorData)
console.log(coordinatorData,'account');
  const [ profileImagePre,setProfileImagePre]=useState('')
  const inititalValues={
    fullName:coordinatorData?.fullName?coordinatorData.fullName:'',
    emailId:coordinatorData?.emailId?coordinatorData.emailId:'',
    mobileNumber:coordinatorData?.mobileNumber?coordinatorData.mobileNumber:'',
    coordinatorProfile:'',
    id:coordinatorData?.id?coordinatorData.id:''

  }
  const handleImageInput=(event:any)=>{

    console.log(event.currentTarget.files[0]);
    setProfileImagePre(URL.createObjectURL(event.target.files[0]))
    

  }
  const validationSchema=Yup.object({
    fullName:Yup.string().required('Your name is requird'),
    emailId:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Your email ID is required'),
    mobileNumber:Yup.string().matches(/^\d{10}$/, 'number must be 10 digits').required('mobile number is required'),
    coordinatorProfile:Yup.mixed().required('image is required').test('fileType','Invalid file format',value=>{
      if(!value) return true 
      return ['image/jpg','image/jpeg','image/png','image/webp','image/svg+xml'].includes((value as any).type)
  })
    
  })


  if(!isVisible) return null
    return (
        <>
        <div className="z-40 fixed inset-0 flex  justify-center items-center overflow-hidden  bg-black/60 overflow-y-scroll">
          <Formik onSubmit={
            async (values,{resetForm,setStatus})=>{


              console.log(values,'inside form');

              try{   
                // console.log('hello form  submitted',values) ;
            
                const formData=new FormData()
            
                formData.append('emailId',values.emailId)
                formData.append('mobileNumber',values.mobileNumber)
                formData.append('coordinatorProfile',values.coordinatorProfile)
                formData.append('fullName',values.fullName)
                formData.append('id',values.id)
              
                 
               const response = await  axiosInstance.post('/profile/edit-coordinators-data/',formData,{
                headers:{
                  "Content-Type":'multipart/form-data'
                }}
               )
               console.log(response);
               
               if(response){
                console.log(response,'this form response');
                resetForm()
                //setImageFile('')
               }
            
              }
              catch(error){
                  console.log(error);
                  
                console.log(error,'Erroorrrrrrr');
                
            
              }
              

            }
          } initialValues={inititalValues} validationSchema={validationSchema}>
 {({setFieldValue})=>(
             <Form>
             <div className="h-fit">
             
             <div className="border border-2px m-2 w-fit rounded-md bg-white">
               <div className="flex justify-between">
                 <div></div>
                  <div className="mt-1 mr-1 cursor-pointer" onClick={onClose}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-5 h-5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
             
             </div>
               </div>
               <div className="text-center">
                 <span className="font-bold text-lg"> Update your Profile</span>
                
               </div>
               <div className=" flex m-2 gap-4">
               {
                profileImagePre?<div><div></div>  <div className="border border-black w-24 h-24 rounded-full flex items-center justfy-center "><img src={profileImagePre} alt="" className="h-24 w-24 rounded-full" /> </div> </div> :<div>
                <div>
                  
                </div>
                <div className="border z-40 h-24 w-24 rounded-full bg-gray-300 flex items-center justfy-center relative">
<label htmlFor="drop">
 <input 
   type="file"
   className="absolute py-12 w-24 opacity-0 cursor-pointer" 
   name="coordinatorProfile" 
   accept="image/*"  
   onChange={(event:any) => {
     handleImageInput(event);
     console.log(event.currentTarget.files[0]);
     setFieldValue('coordinatorProfile', event.currentTarget.files[0]);
   }}
 />
 <svg 
   xmlns="http://www.w3.org/2000/svg"  
   fill="none" 
   viewBox="0 0 24 24" 
   strokeWidth="1.5"  
   stroke="currentColor" 
   className="w-6 h-6 ml-9"
 >
   <path 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" 
   />
   <path 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" 
   />
 </svg>
</label>
</div>

                <div className="">
              <ErrorMessage name="coordinatorProfile" className="text-red-500 text-sm"/>
              </div>
              </div>
               }
                 
             
                <div className="mt-4">
                   <div className="flex gap-2">
                   <div className="m-1 ml-0 mr-0">
                     <Field type="text" className="border border-2px  py-0.5 px-1 outline-black" name="fullName" placeholder="Enter your name"/>
                     <div>
                  <ErrorMessage name="fullName" className="text-red-500 text-sm"/>
                  </div>
                   </div>
                
                    <div className="m-1 ml-0 mr-0">
                     <Field type="text" className="border border-2px  py-0.5 px-1 outline-black " name="mobileNumber" placeholder="Enter your  number" />
                    <div>
                    <ErrorMessage name="mobileNumber" className="text-red-500 text-sm"/>
                    </div>
                   </div>
               
                 </div>
                  <div className="flex gap-2 mt-1">
                   <div className="w-full">
                     <Field type="text" className="border border-2px py-0.5 px-1 outline-black w-full" name="emailId" placeholder="Enter your email id" />
                   <div>
                   <ErrorMessage name="emailId" className="text-red-500 text-sm"/>
                   </div>
                   </div>
                   
                   
                 </div>
                </div>
                 
               </div>
               <div className="flex justify-center mb-2">
                 <div></div>
                <div> <button className=" bg-black text-white px-4 py-1 rounded-md" type="submit">update</button></div>
               </div>
             
             </div>
             </div>
             </Form>
 )}
</ Formik>
</div>

        </>
    )
}

export default ProfileEditModal