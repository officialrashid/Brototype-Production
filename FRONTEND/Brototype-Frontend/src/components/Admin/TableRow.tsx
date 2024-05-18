import { useState } from "react"
import ContentModal from "./WebContent/ContentModal"
import ContentDelete from  "./WebContent/ContentDelete"


const TableRow=({content})=>{
  const [isVisbile,setIsvisible]=useState(false)
  const [editData,setEditData]=useState([])
  const [editImageFile,setEditImageFile]=useState({})
  const [deleteModal,setDeleteModal]=useState(false)
  const [deleteObjId,setDeleteObjId]=useState('')
  const extensionFn=(imageUrl:string)=>{
console.log('exteeee');

    const urlParts=imageUrl?.split('.')
       if(urlParts?.length){
        return urlParts[urlParts?.length-1]
       }
    
       

   }

   const handleDeleteModal=(id:string)=>{
    setDeleteModal(true)
    setDeleteObjId(id)

   }

  const editFn= (id:string)=>{
  
const contentData=content.filter((data:any)=>data.id===id)
const imagety=   extensionFn(contentData[0].contentImage)
console.log(contentData,'filter','imageType',imagety);

setEditImageFile({type:`image/${imagety}`,url:contentData[0].contentImage})
setEditData(contentData)
setIsvisible(true)
console.log(editImageFile,'edittttat Rowwwwwww');

  }

    return (
        <>
        {content?.map((data:any)=>{
          return (
            <div className='mx-auto pt-2 mb-2 bg-white '  >
            <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
              <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
                <tr className="   ">
                  <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                   <img src= {data.contentImage} className="h-12 ml-4" />
                  </th>
                 
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                   {data.content}
                      </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                 what
                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
                 12-03-2023
                  </th>
                 
                  <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                  <button className="bg-black text-white px-6 rounded-md  py-1" onClick={()=>{editFn(data.id,content)}}>Edit</button>
                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
                  <button className="bg-black text-white px-4 rounded-md  py-1" onClick={()=>{handleDeleteModal(data.id)}} >Delete</button>
                  </th>
                 
                </tr>
              </thead>
            </table>
          </div>
          

          )

        })}
        <ContentDelete isVisible={deleteModal} showDeleteModal={()=>{setDeleteModal(false)}} id={deleteObjId} />
<ContentModal isVisible={isVisbile} editData={editData} onClose={()=>{setIsvisible(false)}} editImageFile={editImageFile}/>
        </>
    )
}


export default TableRow