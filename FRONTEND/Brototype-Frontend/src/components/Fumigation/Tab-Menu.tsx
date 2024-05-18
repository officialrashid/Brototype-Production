
import { Link } from "react-router-dom"
import { useState } from "react";
import Modal from "./Inv-Modal";


const TabMenu=()=>{

    const [showModal,setShowModal]=useState(false)
    ;
    return (
        <>
         <div className="bg-white-200 shadow-xl pt-20 font-roboto" >
            <div >
                <nav className="pt-2">
                    <ul className="max-w-screen-xl flex flex-wrap mx-auto justify-between ">
                        <li><span className='text-2xl font-bold font-roboto'> Hello invigilators,</span></li>
                        <li><button  onClick={()=>{
            setShowModal(true)
        }} className=" px-2 py-2 rounded-full bg-black text-white  flex items-center space-x-2 border-transparent hover:bg-gray-800 hover:border-gray-300"> <span className="text-3xl ">+</span> <span>Add invigilators</span></button></li>
                    </ul>
                </nav>
            </div>
            <nav className="pt-5 border-b border-gray-200  dark:border-gray-200 ">
                <ul className="flex flex-wrap mx-auto align-items gap-[2vw] max-w-screen-xl">
                    <li className='hover:text-gray-500 hover:border-gray-300 border-b-2 border-transparent'> 
                    <Link  to='/batch' className=' '>
                    <span className=''>
                                Batches
                            </span>

                </Link>
                            
                   
                    </li>
                    <li className='hover:text-gray-500 hover:border-gray-300 hover:border-gray-300 border-b-2 border-transparent'>
                       
                          <Link to='/fumigation-record' ><span >
                                All fumigation record
                            </span></Link>
                            
                 
                    </li>
                    <li className='hover:text-gray-500 hover:border-gray-300 border-b-2 border-transparent'>
                        <Link to='/current-invigilators'>
                            <span>
                                Current invigilators
                            </span>
                        </Link>
                    </li>
                    <li className='hover:text-gray-500 hover:border-gray-300 hover:border-gray-300 border-b-2 border-transparent'>
                        <Link to='/pending-students'>
                            <span>
                                Pending students
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

<Modal isVisible={showModal} onClose={()=>{
    setShowModal(false)
}} />
        
        </>
    )
}

export default TabMenu