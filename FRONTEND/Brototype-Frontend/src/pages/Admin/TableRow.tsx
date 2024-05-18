

const TableRow=({content})=>{

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
                  <button className="bg-black text-white px-6 rounded-md  py-1">Edit</button>
                  </th>
                  <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
                  <button className="bg-black text-white px-4 rounded-md  py-1"  >Delete</button>
                  </th>
                 
                </tr>
              </thead>
            </table>
          </div>

          )
        })}
        

        </>
    )
}


export default TableRow