

const TaskHead=()=>{
    return (
        <>
      <div className='mx-auto bg-white  '>
  <table className="w-full text-sm text-left divide-y divide-y-8  table-auto table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300  dark:text-gray">
      <tr>
        <th scope="col" className="w-1/4 px-5 py-7 text-center rounded-l-md  font-roboto ">
        Name
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center font-roboto">
       Batch
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center font-roboto">
        Week
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center font-roboto">
      Domain
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center font-roboto">
Date
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center font-roboto">
         Profile
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center  rounded-r-md font-roboto">
       Schedule
        </th>
       
      </tr>
    </thead>
  </table>
</div>

        </>
    )
}

export default TaskHead