import { useState } from "react"
import DataModal from "./DataModal"

//import { convertFromEC4CompatibleStyle } from "echarts/types/src/util/styleCompat.js"


const DataRow=({companyData,handleToast})=>{
  {console.log(companyData,'inside row')}
    const [isVisible,setIsVisible]=useState(false)
    const handleModalClose=()=>{
      setIsVisible(false)
    }
    return(
      <>
      {
       
        
        companyData.map((data:any)=>{
        return (
          <div className='mx-auto pt-2 mb-2 bg-white '  >
          <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
            <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
              <tr className="   ">
                <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                
                {data.studentCount}
                </th>
               
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                {data.placementCount}
                    </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                {data.courseCount}
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                {data.counsellorsCount}

                </th>
               
                <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                <button className="bg-black text-white px-6 rounded-md  py-1" onClick={()=>{setIsVisible(true)}}>Edit</button>
                </th>
               
               
              </tr>
            </thead>
          </table>
        </div>

        )
         

        })
      }
       
         
          <DataModal editData={companyData[0]?.id} handleModalClose={handleModalClose}  isVisible={isVisible} onClose={()=>{setIsVisible(false)}} handleToast={handleToast}/>
        </>
        
    )
}

export default DataRow