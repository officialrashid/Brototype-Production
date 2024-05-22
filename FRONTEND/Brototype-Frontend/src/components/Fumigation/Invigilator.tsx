
import Navigation from "./Navigation-bar"
import MainNav from "./Main-Nav"
import SubNav from "./Sub-nav"
import { useEffect, useState } from "react"
import { getInvigilatorData,removeInvigilator } from "../../redux-toolkit/invigilatorSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import DeleteModal from "./Delete-Mod"



const Invigilator=()=>{
const dispatch=useDispatch()
const [deleteModal,setDeleteModal]=useState(false)
const invigilators=useSelector((state)=>state.invigilator.invigilatorData)
const [invigilatorId,setInvigilatorId]=useState(1)
console.log(invigilators,"data printed inv");

  useEffect(()=>{
    console.log("use effeect calledddd");
    
    const fetchInvigilatorData= async ()=>{
        try{
          

     
          const response = await axios.get("http://localhost:3002/api/fumigation/get-all-invigilators")
          console.log(response?.data?.response,"{}{}{}{}{}{");
          
            dispatch(getInvigilatorData(response?.data?.response))
        }
        catch(err){
            
        }
        
    }
    fetchInvigilatorData()
},[])
//remove


const removeInv=(invigilatorId:string)=>{
  console.log("deleeee",invigilatorId,"llllllllllll");

  
     
  try {
    
    axios.delete(`http://localhost:3002/api/fumigation/remove-invigilators/${invigilatorId}`).then(res=>{
        console.log('hhuhhuh');
   
      })
      dispatch(removeInvigilator(invigilatorId))
      setDeleteModal(false)
  
      // Navigate to the sign-in page or any other desired destination
      
    } catch (error) {
      // Handle any errors that occur during the logout process
      console.log('Error during logout:', error);
    }





 
}






    return (
        <>
       
        <div className=' border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl  mt-4  font-roboto'>   
 <div className='mx-auto p-2 mt-4'>
  <table className="w-full text-sm text-left divide-y divide-y-8  table-auto table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300 shadow-xl dark:text-gray">
      <tr>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Name
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Email
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Batch
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Contact
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
         Action
        </th>
       
      </tr>
    </thead>
  </table>
</div>

           
{
  invigilators?.map(invigilator=>{

    return(
      <div className='mx-auto p-2 mb-2' key={invigilator.id}>
  <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 ">
    <thead className="text-md text-gray-700 bg-gray-100 shadow-2xl dark:text-gray-800">
      <tr>
        <th scope="col" className="w-1/4 px-4 py-6  text-center " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       {invigilator?.name}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center">
         {invigilator?.email}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
  {invigilator?.batch}
            </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
      {invigilator?.phone}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center ">
          <button className='bg-black px-4 py-2 text-white rounded-lg  ' onClick={()=>{setDeleteModal(true),setInvigilatorId(invigilator.id)}} >Remove</button>
        </th>
       
      </tr>
    </thead>
  </table>
</div>
    )
    




    

  })
}



            






















{/* <div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transition duration-700 ease-in-out transform hover:scale-101.5">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
      muhammadrashid@gmail.codfffffffffffffffffffffffffffffffffm
      
      </th>
      <th scope="col" className="px-8 py-6">
      BCE-55
      </th>
      <th scope="col" className="px-24 py-6">
     
        8921974845
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-teal-700 px-4 py-2  text-white rounded-lg' onClick={()=>{(true)}} >Add</button>
      </th>
    </tr>
  </thead>
</table>       
</div> */}
            
           
            
          
   
            {/* <div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-red-800 px-4 py-2  text-white rounded-lg'>Remove</button>
      </th>
    </tr>
  </thead>


 
</table>
  
        
  
            </div>
            <div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-red-800 px-4 py-2  text-white rounded-lg'>Remove</button>
      </th>
    </tr>
  </thead>


 
</table>
  
        
  
            </div><div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-red-800 px-4 py-2  text-white rounded-lg'>Remove</button>
      </th>
    </tr>
  </thead>


 
</table>
  
        
  
            </div><div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-red-800 px-4 py-2  text-white rounded-lg'>Remove</button>
      </th>
    </tr>
  </thead>


 
</table>
  
        
  
            </div>
            <div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-red-800 px-4 py-2  text-white rounded-lg'>Remove</button>
      </th>
    </tr>
  </thead>


 
</table>
  
        
  
            </div> */}
        
        
        </div>

        <DeleteModal isVisible={deleteModal} showDeleteModal={()=>{setDeleteModal(false)}} deleteFn={()=>{removeInv(invigilatorId)}} />
        </>
    )
}

export default Invigilator