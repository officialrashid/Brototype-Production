

import React from "react"
import { Formik,ErrorMessage,Field,Form } from "formik"
import * as Yup from 'yup'

import axios from "axios"

const AddForm=({addForm,onClose})=>{

  const initialValues={
    name:"",
    email:"",
    qualification:"",
    contact:""
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema=Yup.object({
  
    name:Yup.string().required('name  is required'),
    email:Yup.string().email('Invalid email').required('email  is required'),
    qualification:Yup.string().required('qualification  is required')
   ,
    contact:Yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid').min(10, "too short")
    .max(10, "too long")
  })

  console.log("add form");
  
    if(!addForm) return null


    return(
        <>


<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll overflow-hidden z-40">
  <div className="w-[600px] flex flex-col max-h-[80vh]  " >
   <div className="self-end">
    <button className="text-xl text-white justify-between" onClick={() => onClose()}>
      X
    </button>
   </div>
    
    <div className="bg-white p-2 rounded-lg border border-gray-500 ">

      <Formik initialValues={initialValues} validationSchema={validationSchema}



  onSubmit={async (values, { resetForm,setStatus,setSubmitting}) => {
    try {
console.log(values);

      let response= await  axios.post('http://localhost:3002/api/fumigation/enquery',values)

      console.log(response);

      if(response.status){
        resetForm();
        setStatus('Form submitted successfully')
        setSubmitting(false)
      }
      
    

      //
    } catch (err) {
      // Handle any errors here
    }
  }}
      
      
      
      
      >

        {({status})=>(
          <Form className="space-y-6 m-6" action="#">
          <div >
            <Field
              type="text"
              name="name"
              id="name"
              className="shadow-xl mb-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter student full name"
              
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
  
          </div>
          
          <div>
            <Field
              type="text"
              name="email"
              id="email"
              className="shadow-xl mb-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter student e-mail"
             
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
  
          <div>
            <Field
              type="text"
              name="qualification"
              id="qualification"
              className="shadow-xl mb-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter student qualification"
              
            />
            <ErrorMessage name="qualification" component="div" className="text-red-500" />
          </div>
  
          <div className="mb-">
            <Field
              type="text"
              name="contact"
              id="contact"
              className="shadow-xl mb-2 bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-sm  focus:ouline-black block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              placeholder="Enter student  Contact number"
       
            />
            <ErrorMessage name="contact" component="div" className="text-red-500" />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="shadow-xl text-white bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
            >
              Submit
            </button>
  
          </div>

          {status && <div className="success-message">{status}</div>} 
          
        </Form>
        )}
      

      </Formik>
     
    </div>
  </div>
</div>

        
        
        </>
    )
}

export default AddForm