
import { useEffect, useState } from "react"
import { Form,Field,Formik,ErrorMessage } from "formik"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addContent, editContentData } from "../../../redux-toolkit/contentSlice"


const ContentModal=({isVisible,onClose,editData,editImageFile,showToastMessage})=>{
  const dispatch=useDispatch()
  const [manageData,setManageData]=useState([])
const navigate=useNavigate()
  const [previewVisible,setPreviewVisible]=useState(false)
  
  
    const [imagePreview,setImagePreview]=useState('')
 

  
  const [imageFile,setImageFile]=useState('')
  

  const handleImageChange=(event:any)=>{
      
console.log('handle');

setImageFile(URL.createObjectURL(event.target.files[0]))
    console.log(URL.createObjectURL(event.target.files[0]));

    setImagePreview(URL.createObjectURL(event.target.files[0]))
    
    
  }
  useEffect(()=>{

    setImageFile(editData[0]?.contentImage)
let editImagePreviewww=editImageFile?.url
setImageFile(editImagePreviewww)
setManageData(editData)
// setEditCotrol(editData)
 if(editData.length){
  setPreviewVisible(true)
 }
  

// setManageData(editData)

  },[editData])

  const handlModalClose=()=>{
    setPreviewVisible(false)
    
    onClose(),setImagePreview('')

  }



  const initalValues={
    content:editData.length?editData[0].content:'',
   
    contentImage:editData.length>=1?editImageFile:''

  }
  const validationSchema=Yup.object({
    content:Yup.string().required('content is required'),
   
    contentImage:Yup.mixed().
    
    required('Content image is required')
    .test('fileType','Invalid file format',value=>{
      if(!value) return true 
      return ['image/jpg','image/jpeg','image/png','image/webp','image/svg+xml',].includes((value as any).type)
  })
    ,
    
  })
    if(!isVisible) return null
    return (
<div className="bg-black/60 z-40 fixed  inset-0 flex justify-center items-center   overflow-y-scroll overflow-hidden">

        <div className="border rounded-md m-6 bg-white w-1/2">
  <div className="flex justify-between mr-2 mt-3 cursor-pointer">
    <div></div>
    <div onClick={handlModalClose} >
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>
  </div>
<div className="text-center ml-0 mr-0 m-1">
  <span className="text-xl font-semibold">Add a new web content</span>
</div>
<Formik initialValues={initalValues} onSubmit={async (values,{resetForm,setStatus})=>{
  try{   


 




   if(!editData[0]?.id){
    const form=new FormData()
  
    
    
    form.append('content', values.content);
    form.append('contentImage', values.contentImage)
    //form.append('id',editData[0]?.id)
  

    
    const response = await  axiosInstance.post('/content/create-content',form,{
      headers:{
        "Content-Type":'multipart/form-data'
      }}
     ,
     )
     console.log(response);
     
     if(response){
      console.log(response,'this form response');
      
      resetForm()
      setImagePreview('')
      handlModalClose()
      dispatch(addContent(response.data))
      showToastMessage('content created successfully')
      navigate('/content/')
      
     }
    
   }
   
    
    else{
    if(!values.contentImage.url){

      let form =new FormData()
      form.append('contentImage',values.contentImage)
      form.append('content',values.content)
      form.append('id',editData[0].id)
      console.log(values.content,editData[0].id,);
      
      console.log(form);
      
      console.log('new imageeeee' ,values.contentImage);
      const response = await  axiosInstance.post('/content/create-content',form,{
        headers:{
          "Content-Type":'multipart/form-data'
        }}
       ,
       )
       console.log(response);
       
       if(response){
        console.log(response,'this form response');
        handlModalClose()
        dispatch(editContentData(response.data))
        showToastMessage('content edited successfully')
        resetForm()
        setImagePreview('')
       
        navigate('/content/')
       }


      

    }else{
      console.log(values,'image checkinngggg');
      
      let formData= new FormData()
      
      const{content,contentImage}=values
      console.log(content,contentImage);
      
      formData.append('content',values.content)
      formData.append('id',editData[0].id)

       console.log(formData);
       const response= await axiosInstance.post('/content/update-content',formData,
        {
          headers:{
            "Content-Type":'multipart/form-data'
          }}
       
       )
       if(response){
      console.log(response,'in contet');
      resetForm()
      setPreviewVisible(false)
        
      handlModalClose()
        dispatch(editContentData(response.data))
       
        
       
        navigate('/content/')
       }
      
    }

    }
      

  }
  catch(error){
      console.log(error);
      showToastMessage('An error occured ' ,error)
    console.log(error,'Erroorrrrrrr inside contenttetette');
    

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
   <input  type="file"  name="contentImage" accept="image/*"  id=""  onChange={(event:any)=>{handleImageChange(event),setPreviewVisible(true), setFieldValue('contentImage',event.currentTarget.files[0])}} className="block border text-gray-400 b p rounded-md  file:border-0  file:py-1.5 file:text-gray-600"/>
   <ErrorMessage name="contentImage"  component="div" className="text-red-500 " />
  {previewVisible? <div className="flex justify-center mt-6 ml-12 mb-6">
    <div></div>
   <img src={editData.length?imageFile:imagePreview}  className=" w-1/2 h-44" />
   
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