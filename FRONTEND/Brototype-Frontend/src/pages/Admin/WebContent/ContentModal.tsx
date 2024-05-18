
import { useState } from "react"
import { Form,Field,Formik,ErrorMessage } from "formik"
import * as Yup from 'yup'



const ContentModal=({isVisible,onClose})=>{

 

  
  const [imageFile,setImageFile]=useState('')
  const handleImageChange=(event:any)=>{
    

    console.log(URL.createObjectURL(event.target.files[0]));

    setImageFile(URL.createObjectURL(event.target.files[0]))
    
    
  }


  const initalValues={
    content:'',
 
    contentImage:''

  }
  const validationSchema=Yup.object({
    content:Yup.string().required('content is required'),
   
    contentImage:Yup.mixed().required('Content image is required')
    .test('fileType','Invalid file format',value=>{
      if(!value) return true 
      return ['image/jpg','image/jpeg','image/png','image/webp','image/svg+xml'].includes((value as any).type)
  })
    
  })
    if(!isVisible) return null
    return (
<div className="bg-black/60 z-40 fixed  inset-0 flex justify-center items-center   overflow-y-scroll overflow-hidden">

        <div className="border rounded-md m-6 bg-white w-1/2">
  <div className="flex justify-between mr-2 mt-3 cursor-pointer">
    <div></div>
    <div onClick={()=>{onClose(),setImageFile('')}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>
  </div>
<div className="text-center ml-0 mr-0 m-1">
  <span className="text-xl font-semibold">Add a new web content</span>
</div>
<Formik initialValues={initalValues} onSubmit={async (values,{resetForm,setStatus})=>{
  try{   
    // console.log('hello form  submitted',values) ;

    const formData=new FormData()

    formData.append('content',values.content)
 
    formData.append('contentImage',values.contentImage)
    console.log(formData,'formmdata');
    
   
   const response = await  axiosInstance.post('/content/create-content',formData,{
    headers:{
      "Content-Type":'multipart/form-data'
    }}
   )
   console.log(response);
   
   if(response){
    console.log(response,'this form response');
    resetForm()
    setImageFile('')
   }

  }
  catch(error){
      console.log(error);
      
    console.log(error,'Erroorrrrrrr');
    

  }
}} validationSchema={validationSchema} >

{({setFieldValue }) =>(
  <Form >
  <div className=" m-2 ">
    <Field as='textarea' type="text"  name="content" id="" className="border row-14  w-full py-1.5 rounded-md outline-black px-2" placeholder="Enter your content"/>
    <ErrorMessage name="content" component="div" className="text-red-500" />
  </div>
  
 
  
  <div className="flex flex-col m-2 mt-1">
  
    <label htmlFor="ds" className=" m-1 mt-">Upload a picture</label>
   <input type="file"  name="contentImage" accept="image/*"  id="" onChange={(event:any)=>{handleImageChange(event),setFieldValue('contentImage',event.currentTarget.files[0])}} className="block border text-gray-400 b p rounded-md  file:border-0  file:py-1.5 file:text-gray-600"/>
   <ErrorMessage name="contentImage"  component="div" className="text-red-500 " />
  {imageFile? <div className="flex justify-center mt-6 ml-12 mb-6">
    <div></div>
   <img src={imageFile}  className=" w-1/2 h-44" />
   
   </div>:''}
  
  </div>
  
  <div className="flex justify-center m-2 items-center">
    <button type="submit" className="px-4 py-2 border bg-black text-white rounded-md " >Add your course</button>
  </div>
  </Form>
)}

</Formik>
</div> 
</div>




        

    )
}


export default ContentModal