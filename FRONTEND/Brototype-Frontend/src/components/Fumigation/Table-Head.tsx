

const TableHead=()=>{
    return (
        <>
         <div className='mx-auto p-2 mt-4 font-roboto'>
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

        


        </>
    )
}

export default TableHead