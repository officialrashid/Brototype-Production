import axios from "axios"
import { Formik,Form,Field,ErrorMessage } from "formik"
import * as Yup from 'yup'

const BatchModal=({isVisible ,onClose,batchRecord})=>{

console.log(batchRecord,"in modalllllllllllllll")


const initialValues={
  hubLocation:batchRecord?batchRecord.hubLocation:" ",
  batchName:batchRecord?batchRecord.batchName:" "
}
const validationSchema=Yup.object({

  hubLocation:Yup.string().trim().nullable().required('Hub location is required'),
  batchName:Yup.string().matches(/^[A-Z]{3}-\d{2}$/, 'Batch Name should be in the format "BCE-12"').required('Batch name is required')
})

  const batchFormHandler= ()=>{
  

   

//     console.log("hellllloooooo");
    
// try{
//   let reponse= await  axios.post('http://localht:3002/api/fumigation/createBtach')

// }catch(err){

// }finally{
//   setSubmitting(false)

// }
  


  }


    if(!isVisible) return null
    return (
        <>

<div className="fixed font-roboto inset-0 z-10 bg-black/60 bg-opacity-25 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll overflow-hidden ">
  <div className="w-[600px] flex flex-col max-h-[80vh]  " >
   <div className="self-end">
    <button className="text-xl text-white justify-between" onClick={() => onClose()}>
      X
    </button>
   </div>
    
    <div className="bg-white p-2 rounded-lg border border-gray-500  ">
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={async (values, { resetForm,setStatus }) => {
    try {

      
console.log(values.hubLocation.trim());

      let response= await  axios.post('http://localhost:3002/api/fumigation/create-batch',values)

      console.log(response);

      if(response.status){
        resetForm();
        setStatus(' Submitted sucesssssfully!!!!!!')
      }
      
    

      //
    } catch (err) {
      // Handle any errors here
    }
  }}
>

  {({status})=>(

<Form className="space-y-6 m-6">
<div>
  <Field
    type="text"
    name="hubLocation"
    id="hubLocation"
    className="shadow-xl mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
    placeholder="Enter your hub location"
  />
  <ErrorMessage name="hubLocation" component="div" className="text-red-500" />
</div>

<div>
  <Field
    type="text"
    name="batchName"
    id="password"
    className="shadow-xl bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black mb-4"
    placeholder="Enter your Batch Name"
  />
  <ErrorMessage name="batchName" component="div" className="text-red-500" />
</div>

<div className="flex justify-end">
  <button
    type="submit"
    className="shadow-xl text-white bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-black dark:hover-bg-gray-500 dark:focus:ring-gray-500"
  >
    Submit
  </button>
</div>
{status && <div className="success-message text-green-500 text-center">{status}</div>}
</Form>

  )}
 
</Formik>



     
    </div>
  </div>
</div>












        </>
    )
}


export default BatchModal


