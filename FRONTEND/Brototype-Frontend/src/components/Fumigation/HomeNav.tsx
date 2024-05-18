
import  { useState } from 'react';

import PendingStudents from './Batch-student';
import Batches from './Batch';
type TableType = 'batches' | 'pendingStudents';
const HomeNav = () => {

    const [activeTable, setActiveTable] = useState < TableType > ()
    const switchTable = (tabletype: TableType) => {
        setActiveTable(tabletype)
    }
    // function setShowModal(arg0: boolean) {
    //     throw new Error('Function not implemented.');
    // }
    return (
        <>
            <div className="bg-white-200 shadow-xl pt-20 " >
                <div>
                    <nav className="pt-2">
                        <ul className="max-w-screen-xl flex flex-wrap mx-auto justify-between ">
                            <li><span className='text-2xl font-bold'> Hello Invigilators,</span></li>
                            <li><button onClick={() => {
                                // setShowModal(true)
                            }} className=" px-2 py-2 rounded-full bg-black text-white  flex items-center space-x-2 border-transparent hover:border-gray-300 sahdow-2xl"> <span className="text-3xl ">+</span> <span>Add invigilators</span></button></li>
                        </ul>
                    </nav>
                </div>
                <nav className="pt-5 border-b border-gray-200  dark:border-gray-200 ">
                    <ul className="flex flex-wrap mx-auto align-items gap-[2vw] max-w-screen-xl ">
                        <li className='hover:text-gray-500 hover:border-gray-300 border-b-2 border-transparent'>
                   
                                <span onClick={() => switchTable("batches")}>
                                    Batches
                                </span>
                          
                        </li>
                        <li className='hover:text-gray-500 hover:border-gray-300 hover:border-gray-300 border-b-2 border-transparent'>
                            <a href="http://">
                                <span >
                                    All fumigation record
                                </span>
                            </a>
                        </li>
                        <li className='hover:text-gray-500 hover:border-gray-300 border-b-2 border-transparent'>
                            <a href="http://">
                                <span>
                                    Current invigilators
                                </span>
                            </a>
                        </li>
                        <li className='hover:text-gray-500 hover:border-gray-300 hover:border-gray-300 border-b-2 border-transparent'>
                     
                            <span onClick={() => switchTable("pendingStudents")}>
                                Pending students
                            </span>
                         
                        </li>
                    </ul>
                </nav>
            </div>
            <div className=' border border-gray-400 rounded-lg w-full max-w-7xl mx-auto shadow-xl min-h-screen mt-4 '>
                <nav className='mt-8'>
                    <ul className='flex  flex-wrap  justify-center space-x-24'>
                        <li> <span>BCE-141 All Students</span></li>
                        <li>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="radio-group" className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black" />
                                <span>Mock</span>
                            </label>
                        </li>
                        <li>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="radio-group" className=" form-radio h-4 w-4 text-black border-gray-300 focus:ring-black bg-black" />
                                <span>Fumigation</span>
                            </label>
                        </li>
                        <li> <a href="http://"> <span>Passed students</span></a></li>
                        <li> <a href="http://"> <span>Failed students</span></a></li>
                        <li> <button className='bg-black px-2 py-2 rounded-2xl text-white flex items-center'><span className='text-sm' >Add student</span></button></li>


                    </ul>
                </nav>
                {activeTable === 'pendingStudents' && (
                    <PendingStudents />
                )}
                {activeTable === 'batches' && (
                    <Batches />
                )}
            </div>
        </>
    );
}

export default HomeNav;
