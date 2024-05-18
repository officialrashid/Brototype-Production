import { useState } from "react"


const BoxTab=({onTabChange})=>{

    const [activeTab,setActiveTab]=useState(1)



    const handleTab=(tabIndex)=>{

setActiveTab(tabIndex)
onTabChange(tabIndex)
    }
    return (
    
    <>

<div className="text-md font-medium text-center text-gray-500 border-b border-gray-400 dark:text-gray-500 dark:border-gray-400 ">
    <ul className="flex flex-wrap -mb-px">
        <li className={`mr-2 inline-block p-4  rounded-t-lg cursor-pointer  hover:text-gray-600 hover:border-gray-800 dark:hover:text-gray-800 ${activeTab==1?'dark:hover:text-gray-800 text-gray-800 border-b-2 border-gray-800 ':''}`} onClick={(e)=>{handleTab(1)}}>
           Mock
        </li>
        <li className={`mr-2 inline-block p-4 border-b-2   dark:hover:text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-800  cursor-pointer ${activeTab==2?'dark:hover:text-gray-800 text-gray-800 border-b-2 border-gray-800':''}` } onClick={(e)=>{handleTab(2)}} >
           Final
        </li>
        
    </ul>
</div>
    
    </>
    )
}

export default BoxTab