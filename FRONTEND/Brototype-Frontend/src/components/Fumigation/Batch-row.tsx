import { useEffect, useState } from "react"
import StudentModal from "./Student-Modal"
import axios from "axios"
import BatchModal from "./Batch-Modal"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getBatchData } from "../../redux-toolkit/batchSlice"


const BatchRow=()=>{
  const [record,setRecord]=useState({})

const dispatch=useDispatch()
const batches=useSelector(state=>state.batch.batchData)

console.log(batches,"user-reduce");

   useEffect(()=>{

 axios.get('http://localhost:3002/api/fumigation/get-all-batches').then(res=>{

 console.log("batches");

console.log(res.data.response);

  dispatch(getBatchData(res.data.response))
 })


        // const batches=[{id:1,name:"BCE-141",},
        // {id:2,name:"BCE-142",},{id:3,name:"BCE-143",},
        // {id:4,name:"BCE-144",}]
       
       

   },[])


   const [selectedBatch,setSelectedBatch]=useState(0)

   console.log("seleted batch",selectedBatch);
   

    const [showStudentModal,setShowStudentModal]=useState(false)

    const [addBatch,setAddBatchModal]=useState(false)


    // edit bacth

     const editBatch=(batchId)=>{
        

      axios.get(`http://localhost:3002/api/fumigation/edit-batch/${batchId}`).then(res=>{
        console.log('get response  edit batch cominggggggggg',res.data.response.response[0]);

        setRecord(res.data.response.response[0])
        setAddBatchModal(true)
        
      })


     }

    return (
        <>



        <div className='border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl  mt-4 font-roboto'>
          
            <div className="mt-6 mr-16 ml-14 mb-4">
            <ul className='flex  justify-between'>
            <li><span className="text-xl font-semibold">All Batches</span></li>
            <li><button className='rounded-md bg-white border border-black  text-black px-4 py-2  font-bold transition duration-300 ease-in-out'  onClick={()=>{
                setAddBatchModal(true) 
            }} > Add  Batch</button></li>
            

            
          </ul>

                
            </div>
           


          {
     batches.map(batch=>{
      return (

        
      
      <div className='p-2 mb-2'>
            <table className="w-full  text-left divide-y divide-y-8 border border-gray-400 ">
  <thead className=" text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr className=' flex justify-between '>
      <th scope="col" className="px-12 py-7">
      <Link to={`/fumigation/view-batch/${batch.id}`}> {batch.name}</Link>
       
      </th>
     
      <th scope="col" className="px-12 py-5 ">

      <button name="add-bacth" className='px-4 py-2 bg-white rounded-md   border border-black text-black inline-flex' style={{ marginRight: '10px' }} onClick={()=>{
                setSelectedBatch(batch.id),editBatch(batch.id)
            }}>  Edit Batch  </button>
      
      <button className='px-2 py-2 bg-white rounded-md  border border-black text-black' name="add-student" onClick={()=>{
                 setSelectedBatch(batch.id),setShowStudentModal(true)
            }}><span className="text-md" >Add students</span></button>
            
       
      </th>

      
    </tr>
  </thead>


 
</table>
  
            </div> 


      
      )
     })

          }
              
            

           
            
         
           
         
          
            
           
            
            </div>
             <StudentModal isVisible={showStudentModal} onClose={() => { setShowStudentModal(false) } } batchId={selectedBatch} students={undefined} /> 

             <BatchModal isVisible={addBatch}  onClose={()=>{setAddBatchModal(false),setRecord({})}} batchRecord={record} />
           
        </>
    )
}

export default BatchRow