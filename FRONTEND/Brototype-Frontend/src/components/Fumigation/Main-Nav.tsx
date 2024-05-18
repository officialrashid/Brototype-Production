

import { useState } from "react"
import { useNavigate,  } from "react-router-dom"
import BatchRow from "./Batch-row"
import Modal from "./Inv-Modal"
import Invigilator from "./Invigilator"
import { useEffect } from "react"

const MainNav=()=>{
const navigate=useNavigate()

    const [showModal,setShowModal]=useState(false)
    const [activeTab,setActiveTab]=useState(1)





    

      const handleTabClick=(tabIndex:any)=>{
        setActiveTab(tabIndex)
        if(tabIndex==1){
            navigate('/fumigation/batch/')
        }

        // if(tabIndex==2){
        //     navigate('/fumigation-record/ ')
        // }
        if(tabIndex==2){
            navigate('/fumigation/current-invigilators/ ')
        }
        if(tabIndex==3){
            navigate('/fumigation/pending-students/ ')
        }

      }

    return (
        <>
         <div className="bg-white-200 shadow-xl pt-24 font-roboto" >
            <div >
                <nav className="pt-2">
                    <ul className="max-w-screen-xl flex flex-wrap mx-auto justify-between  ">
                        <li><span className='text-2xl font-bold'> Hello invigilators,</span></li>
                        <li><button  onClick={()=>{
            setShowModal(true)
        }} className=" px-2 py-2 rounded-full bg-black text-white  flex items-center space-x-2 border-transparent hover:border-gray-300"> <span className="text-3xl ">+</span> <span>Add invigilators</span></button></li>
                    </ul>
                </nav>
            </div>
            <nav className="pt-5 border-b border-gray-200  dark:border-gray-200 ">
                <ul className="flex flex-wrap mx-auto align-items gap-[2vw] max-w-screen-xl text-md tab-list ">
               
                   <li className={` pb-2 text-gray-500   hover:border-b-2 hover:text-black   cursor-pointer ${activeTab === 1 ? 'text-gray-800 hover:border-gray-800 border-b-2 border-gray-800 ' : ''}`  } onClick={()=>{handleTabClick(1)}}> 
                  
            
                  Batches
      </li>

     
                    {/* <li className={` pb-2 text-gray-500    hover:border-b-2  hover:text-black   cursor-pointer ${activeTab === 2 ? 'text-gray-800 hover:border-gray-800 border-b-2 border-gray-800' : ''}` } onClick={()=>{handleTabClick(2)}} >
                          
                                Fumigation records 
                 
                    </li> */}

       
                    <li className={` pb-2 text-gray-500  hover:border-b-2  hover:text-black   cursor-pointer ${activeTab ===2?"text-gray-800 hover:border-gray-800 border-b-2 border-gray-800":""}`} onClick={()=>{handleTabClick(2)}} >
                        
                 
                                Current invigilators
                         
                      
                    </li>
           
                    
                    <li className={` pb-2 text-gray-500   hover:border-b-2 hover:text-black cursor-pointer ${activeTab ===3?"text-gray-800 hover:border-gray-800 border-b-2 border-gray-800":""}`} onClick={()=>{handleTabClick(3)}} >
                 
                            
                                Pending students
                    
                       
                    </li>
                
                </ul>
            </nav>
        </div> 


        


      

        <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}/>
        </>
    )
}
export default MainNav