
import MarkModal from "./Mark-modal"
import { useEffect, useState } from "react"
import SubNav from "./Sub-nav"
import axios from "axios"
const Record = () => {
  const [pendingStudents, setPendingStudents] = useState([])
  useEffect(() => {
    const fetchPendingStudents = async () => {
      let response = await axios.get('http://localhost:3002/api/fumigation/get-enquery')
      console.log(response?.data?.response, "response in get pendingeeee");
      if (response.status === 201) {
        setPendingStudents(response?.data?.response)
      }
    }
    fetchPendingStudents()
  },[])
  return (
    <>

      <div className=' border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl  mt-4 font-roboto'>

        {/* <nav className='mt-8'>
                <ul className='flex  flex-wrap  justify-center space-x-24'>
                    <li> <span>BCE-141 All Students</span></li>
                    <li>
    <label className="flex items-center space-x-2">
      <input type="radio"  checked name="radio-group"  className=" accent-black form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black"  />
      <span>Mock</span>
    </label>
  </li>
  <li>
    <label className="flex items-center space-x-2">
      <input type="radio" name="radio-group" className=" accent-black form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black"/>
      <span>Fumigation</span>
    </label>
  </li>
                     <li> <a href="http://"> <span>Passed students</span></a></li>
                    <li> <a href="http://"> <span>Failed students</span></a></li>
                    <li> <button className='bg-black px-2 py-2 rounded-2xl text-white flex items-center'><span className='text-sm' >Add student</span></button></li>
                    

                </ul>
            </nav> */}





        <div className='mx-auto p-2  mt-4 font-roboto'>
          <div className="mb-4">
            <input type="search" name="" onChange={(e) => { handleSearch(e, studentList) }} className="p-8 py-2 border border-gray-500   outline-none  foucus:border-black " placeholder="search..." id="" />
            <button className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 text-gray-600 focus:outline-none">

            </button>
          </div>
          <table className="w-full text-sm text-left divide-y divide-y-8 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 shadow-xl dark:text-gray ">
              <tr >
                <th scope="col" className="px-16 py-6  ">
                  Name
                </th>
                <th scope="col" className=" px-16 py-6">
                  Email
                </th>
                <th scope="col" className="px-16 py-6">
                  Phone
                </th>
                <th scope="col" className="px-16 py-6">
                  Qualification
                </th>
                <th scope="col" className="px-16 py-6 ">
                  Preffered Location
                </th>
             

              </tr>
            </thead>



          </table>

        </div>










        {pendingStudents.map((student: any, index: number) => (
        <div className=' mx-auto p-2 mb-2'>

          <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transition duration-700 ease-in-out transform hover:scale-101.5">
        
            <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
             
               
                <tr>
                  <th scope="col" className="px-12 py-6">
                   {student.name}
                  </th>
                  <th scope="col" className="px-8 py-6">
                    {student.email}
                  </th>
                  <th scope="col" className="px-8 py-6">
                  {student.phone}
                  </th>
                  <th scope="col" className="px-24 py-6">
                    {student.qualification}
                  </th>
                  <th scope="col" className="px-8 py-6 ">
                  {student.prefferredLocation}
                  </th>
                </tr>
           

            </thead>
     
          </table>
        </div>
          ))}


        {/* <MarkModal isVisible={markModal} onClose={() => { setMarkModal(false) }} /> */}

      </div>

    </>
  )
}

export default Record