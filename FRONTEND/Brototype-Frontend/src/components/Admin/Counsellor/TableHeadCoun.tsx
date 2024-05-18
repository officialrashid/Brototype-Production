

const TableHeadCoun =()=>{
    return(
        <>
                      <div className='mx-auto bg-white  '>
  <table className="w-full text-sm text-left divide-y divide-y-8  table-auto table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300  dark:text-gray">
      <tr>
        <th scope="col" className="w-1/4 px-5 py-7 text-center rounded-l-md   ">
        Name
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center ">
       email
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center ">
        Phone
        </th>
        <th scope="col" className="w-1/4 px-5 py-7 text-center ">
      hub
        </th>
      
        <th scope="col" className="w-1/4 px-5 py-7 text-center ">
         Block
        </th>
      
       
      </tr>
    </thead>
  </table>
</div>
        
        </>
    )
}

export default TableHeadCoun