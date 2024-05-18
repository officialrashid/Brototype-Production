import { Formik,Form, Field,ErrorMessage } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCompanyData } from "../../../redux-toolkit/companySlice"
import { addBranch } from "../../../redux-toolkit/branchSlice"


const BranchModal=({isVisbile,onClose,editData,handleCloseModal,showToastMessage})=>{
    const[manageData,setManageData]=useState([{id:'',branchName:''}])
  const dispatch=useDispatch()
  const branches=useSelector(state=>state?.branchReducer?.branchData)
useEffect(()=>{
console.log('useEffecctttttt111');
console.log(editData ,'edit daatta');
console.log(manageData.length,'manageeegeg')
setManageData(editData)
console.log(manageData.length,'afterrrr setting')

},[editData])
const initalValues= {
  branchLocation:editData.length>0?editData[0].branchName:'',
  id:editData.length>0?editData[0].id:''
}
const validationSchema=Yup.object({
  branchLocation:Yup.string().required('Hub location is required').test('is-unique','Branch Location already exist',
  function(value){
    if(!value) return true;
    const existLocation=branches.find(branch=>branch.branchName===value)
    return !existLocation

  })
  
})

const handleClosing=()=>{
console.log('cloding modal after respone');

  onClose()

  
  
  
}


    if(!isVisbile) return null
    return(
        <>
         <Formik onSubmit={
            async(values,{resetForm,setStatus})=>{
          
                
                try{

                   if(!values.id){
                    console.log('hello my branch called');
                    const response= await axiosInstance.post('/branch/create-branch',values)
                    if(response){
                        console.log(response);
                        dispatch(getCompanyData(response.data.branches))
                        dispatch(addBranch(response.data))
                        handleClosing()
                        resetForm()
                       showToastMessage('New branch added successfully')
                       
                      
                    }
                   

                   }else{
                    const response= await axiosInstance.post('/branch/create-branch',values)
                    if(response){
                        console.log(response);
                        
                       
                        handleClosing()
                        resetForm()
                       showToastMessage('Branch edited successfully')
                    }
                   }

                   

                }
                catch(error){

                  if(error&&error.response?.data&& error.response.data?.message){
                    showToastMessage(error.response.data.message,error)

                  }else{
                    showToastMessage('An error occurred while adding the branch location.',error)

                  }
                

                }

            }} 
            initialValues={initalValues} validationSchema={validationSchema}>  
     <Form>
        <div className="bg-black/60 z-40 fixed  inset-0 flex justify-center items-center   overflow-y-scroll overflow-hidden">
    
        <div className="border border-2px m-2 bg-white w-1/2 rounded-md">
  <div className="flex justify-between">
    <div></div>
    <div onClick={()=>{setManageData([]),handleClosing(),handleCloseModal()}} className="m-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-5 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"  />
</svg>
</div>
  </div>
<div className="text-center mt-">
  <span className="text-xl font-semibold">Add a new  hub location</span>
</div>
  <div className=" m-2 mt-6 mb-8">
    <Field type="text"  name='branchLocation' className="border w-full py-1.5 px-2 rounded-md outline-black" placeholder="Add your new hub location"/>
    <ErrorMessage name="branchLocation" component="div" className="text-red-500" />

  </div>

  <div className="flex justify-center mb-4"> 
    <div></div>
    <div> <button type="submit" className="bg-black px-4 text-white py-1 rounded-md">Submit</button></div>
  </div>

  </div>
    
  
  </div>
  </Form>
  </Formik>
 
        </>
    )

}
export default BranchModal