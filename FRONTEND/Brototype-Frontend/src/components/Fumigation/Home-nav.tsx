import {useState} from 'react';
import logo from './assets/logo-black.png'
import Modal from './Inv-Modal';
import MarkModal from './Mark-modal';
import ModalTable from './Modal-table';
import BatchModal from './Batch-Modal';
import SubNav from './Sub-nav';
import TableHead from './Table-Head';   
import TableRow from './Table-row';
import TabMenu from './Tab-Menu';
import MainNav from './Main-Nav';
import Navigation from './Navigation-bar';


const HomeNav=()=>{
    
    


    return (
        <>
      {/* <nav className="bg-white border-gray-200 shadow-md fixed top-0 w-full">
  <div className="max-w-screen-xl mx-auto m-4">
    <ul className="flex items-center justify-between">
      <li className="flex items-center">
        <a href="https://flowbite.com" className="flex items-center">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </a>
      </li>
      <li className="flex items-center gap-[vw]">
        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 hover:border-black flex items-center justify-center mr-4">
          <span className="text-2xl text-gray-500 hover:text-black ">R</span>
        </div>
        
        
        <div className="border-solid border-t- border-t-8 border-x-transparent border-x-8 border-b-0 "></div>
      </li>
    </ul>
  </div>
</nav> */}
 <Navigation/>
{/* <MainNav/>  */}
       
        <div className=' border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl min-h-screen mt-8 '>
          <SubNav/>


<TableHead/>
<TableRow/>
<TableRow/>
<TableRow/>






            
            {/* <div className=' mx-auto p-2 mb-2'>
            <table className="w-full text-sm text-left divide-y divide-y-8 border border-gray-400 transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
  <thead className="text-md text-gray-700  bg-gray-100 shadow-2xl dark:text-gray-800">
    <tr>
      <th scope="col" className="px-12 py-6">
        Mohmmad rashid
      </th>
      <th scope="col" className="px-8 py-6">
        8921974845
      </th>
      <th scope="col" className="px-8 py-6">
        muhammadrashid@gmail.com
      </th>
      <th scope="col" className="px-24 py-6">
        BCE-55
      </th>
      <th scope="col" className="px-8 py-6 ">
        <button className='bg-black px-2 py-2  text-white rounded-lg'>update</button>
      </th>
    </tr>
  </thead>


 
</table>
  
            </div>
        
        */}
         </div>

        
       






        
        </>
    
    )


}

export default HomeNav