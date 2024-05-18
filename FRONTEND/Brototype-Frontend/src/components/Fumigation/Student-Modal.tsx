
import { useEffect, useState } from "react"
import axios from "axios";
import { getEnquiryData } from "../../redux-toolkit/enquirySlice";
import { useDispatch, useSelector } from "react-redux";

const StudentModal=({isVisible,onClose,students,batchId})=>{

  let  [actionStatus,setActionStatus]=useState(false)

  console.log(batchId,"batchid");
  
  console.log(students);
  const enquiry=useSelector(state=> state.enquiries.enquiryData )
   const [filteredStudents,setFilteredStudents]=useState([])
   const [studentList,setStudentList]=useState([])
console.log(filteredStudents,'filterrr');
// setFilteredStudents(students)

   const [searchQuery,setSearchQuery]=useState('')
   const handleSearch=(e,studentList)=>{
    console.log(e.target.value,'searchvalue');
    
    if(e.target.v =='undefined'){
      setFilteredStudents(studentList)
    }
console.log(students);

    setSearchQuery(e?.target?.value)
    console.log(searchQuery,"sefdf");
    const studen=studentList?.filter(student=>student?.name?.includes(searchQuery))

    setFilteredStudents(studen)
    
      
   }
   const dispatch=useDispatch()
  
  console.log("enquiryyyyyyyyy");
  

  console.log(enquiry,'qqqqqq');
  
   useEffect(()=>{
    console.log('add student useEffeect called');
    
    const fetchStudent= ()=>{
        try{
            axios.get('http://localhost:3002/api/fumigation/get-enquery').then(res=>{

            console.log(res.data.response,'from modal table');
            

                dispatch(getEnquiryData(res.data.response))
                setFilteredStudents(res.data.response)  
                
                setStudentList(res.data.response)
        
            }).catch(err=>{
                console.log(err);  
            })
        }catch(error){
            console.log(error)
        }
    }
    fetchStudent()
   },[])

   const addToBatch=async (batchId,studentId)=>{

    console.log(batchId,studentId,"adddto batchhhhhhhh");
    
         let response=await axios.patch('http://localhost:3002/api/fumigation/add-students',{batchId,studentId})
          console.log(batchId,studentId,"heleloo my bacth id,");

          if(response.status){
            console.log(response,"{{{{{{ressss}}}}}");
              setActionStatus(true)
              setTimeout(()=>{
                setActionStatus(false)
              },50000)
            

          }


          


          
   }
    
    

  if(!isVisible) return null

    return (
        <>
        
        

<div className="fixed inset-0  font-roboto bg-opacity-25 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll overflow-hidden z-40">
  <div className="w-[1200px] flex flex-col max-h-[80vh] p-2  " >
    
   <div className="self-end">
    <button className="text-xl text-black justify-between" onClick={() => onClose()}>
      X
    </button>
   </div>
  
   <div className=' border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl  mt-4 bg-white '>
   {actionStatus?<div className="text-green-300 text-center">Student added successfully</div>:""}
    <div className=" m-3">
      <input type="search" name=""  onChange={(e)=>{handleSearch(e,studentList)}}  className="p-8 py-2 border border-gray-500   rounded-md outline-none  foucus:border-black"  placeholder="search..." id="" /> 
        <button className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 text-gray-600 focus:outline-none">
  
  </button>
    </div>

   <div className='mx-auto p-2 mt-4'>
  <table className="w-full text-sm text-left divide-y divide-y-8  table-auto table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300 shadow-xl dark:text-gray">
      <tr>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Name
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Contact
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
          Email
        </th>
        <th scope="col" className="w-1/4 px-5 py-6  text-center">
          Qualification
        </th>
        <th scope="col" className="w-1/4 px-5 py-6 text-center ">
         Action
        </th>
       
      </tr>
    </thead>
  </table>
</div>
{
  filteredStudents?.map(student=>{

    

    return (
      <div className='mx-auto p-2 mb-2'>
  <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 ">
    <thead className="text-md text-gray-700 bg-gray-100 shadow-2xl dark:text-gray-800">
      <tr>
        <th scope="col" className="w-1/4 px-4 py-6  text-center " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
        {student?.name}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center">
        {student?.phone}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
        {student?.email}
            </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
        {student?.qualification}
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center ">
          <button className='bg-black px-4 py-2 text-white rounded-lg' onClick={()=>{addToBatch(batchId,student._id)}}>Add</button>
        </th>
       
      </tr>
    </thead>
  </table>
</div>

    )

  })
}



   </div>




    
    
  </div>
</div>


        
        </>
    )
    }
  
export default StudentModal