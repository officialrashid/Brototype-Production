

const TaskRow=()=>{
    return (
        <>
             <div className='mx-auto pt-2 mb-2 bg-white '  >
  <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
    <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 " >
      <tr className="   ">
        <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg  font-roboto" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       sachin
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center font-roboto">
            hello
       
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center font-roboto" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
haiiii
            </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center font-roboto" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       what
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center font-roboto" style={{ whiteSpace: 'normal',wordWrap: 'break-word',  textOverflow: 'ellipsis' }}>
       12-03-2023
        </th>
       
        <th scope="col" className="w-1/4 px-4 py-6 text-center ">
        <button className="bg-black text-white px-6 rounded-md  py-1 font-roboto">View</button>
        </th>
        <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
        <button className="bg-black text-white px-4 rounded-md  py-1 font-roboto"  onClick={()=>{}}>Schedule</button>
        </th>
       
      </tr>
    </thead>
  </table>
</div>
        
        </>
    )
}

export default TaskRow