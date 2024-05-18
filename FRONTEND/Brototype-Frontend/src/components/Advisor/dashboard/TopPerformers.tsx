import MiniChart from 'react-mini-chart'
// import profile from '../assets/images/profile.webp'
import { useEffect } from 'react'
import { axiosInstance } from '../services/api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { getTopCoordinators } from '../../../redux-toolkit/coordinatorSlice'

const TopPerformers=()=>{
  const performers:any=useSelector(state=>state.coordinator.topCoordinators)
  console.log(performers,'loooooo');
  
  const dispatch=useDispatch()
  useEffect(()=>{
   
    const topPerformers=async()=>{

      try{
        const response=await axiosInstance.get('/profile/top-coordinators')
        if(response){

          console.log(response,'toppp');
          
          dispatch(getTopCoordinators(response.data))
          
        }
      }
      catch(error){

      }

    
    }
    topPerformers()

  },[])
  
    return (
        <>

 
 
      <div className="border   rounded-md  h-72 overflow-y-auto bg-white  shadow-lg ">
         
      <div className="sticky top-0 z-10    bg-white top-fixed rounded-md">
       <div className=' mt-2 sticky flex justify-between'>
     <div className='ml-2 mt-0'>
     <span className='  font-meduim font-roboto'>Top Performers</span>
     </div>
     <div className='mr-3'>
       <span className='font-meduim text-sm font-roboto'>view all</span>
     </div>
      
       
     
     </div>
       
      </div>
      
     
     
     
      {
        performers?.map((performer:any)=>{
          return(<div className="border border-2px rounded-md m-2 flex justify-between mt-1">
          <div  className="m-2 flex gap-2">
               
               <div className="border border-2px  px-1 py-1 rounded-md "><img className='w-10 h-12' src={profile} alt="" /></div>
                <div className="m-2  ml-0"><span className='text-sm'><p>{performer.fullName.split(' ')[0]}</p></span></div>
                <div className='flex'>
                <div className="m-2  ml-0"><span className='text-sm font-bold text-color-green-400 font-roboto'>83% </span> 
                </div>
                
                <div className="mt-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#f97316" className="w-5 h-5">
           <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
         </svg></div>
               
              
         </div>
             
             </div>
         
               <div className="m-2 mt-  ">
                 <MiniChart 
                 strokeColor="#FF6600"
                 activePointColor="#FF6600"
                 activePointRadius={8}
                 strokeWidth={5}
                 labelFontSize={50}
                 width={100}
                 height={50}
                 dataSet={[0, -20, 343, 49.3, -100, 200, 78]}/>
             
         
            </div>
         
            </div>)
        })
      }
        {/* <div className="border border-2px rounded-md m-2 flex justify-between ">
        <div  className="m-2 flex gap-2">
           
           <div className="border border-2px  px-1 py-1 rounded-md "><img className='w-10 h-12' src={profile} alt="" /></div>
            <div className="m-2  ml-0"><span className='text-sm'>John Doe</span></div>
            <div className='flex'>
            <div className="m-2  ml-0"><span className='text-sm font-bold'>83% </span> 
            </div>
            
            <div className="mt-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3b82f6" className="w-5 h-5">
       <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
     </svg></div>
           
          
     </div>
         
         </div>
     
           <div className="m-2 mt-  ">
             <MiniChart 
            strokeColor="#3399FF"
             activePointColor="#FF6600"
             activePointRadius={8}
             strokeWidth={5}
             labelFontSize={50}
             width={100}
             height={50}
             dataSet={[0, -20, 343, 49.3, -100, 200, 78]}/>
         
     
        </div>
     
        </div>
        <div className="border border-2px rounded-md m-2 flex justify-between ">
        <div  className="m-2 flex gap-2">
           
           <div className="border border-2px  px-1 py-1 rounded-md "><img className='w-10 h-12' src={profile} alt="" /></div>
            <div className="m-2  ml-0"><span className='text-sm'>John Doe</span></div>
            <div className='flex'>
            <div className="m-2  ml-0"><span className='text-sm font-bold'>83% </span> 
            </div>
            
            <div className="mt-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4ade80" className="w-5 h-5">
       <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
     </svg></div>
           
          
     </div>
         
         </div>
     
           <div className="m-2 mt-  ">
             <MiniChart 
            strokeColor="#66FF66"  
             activePointColor="#FF6600"
             activePointRadius={8}
             strokeWidth={5}
             labelFontSize={50}
             width={100}
             height={50}
             dataSet={[0, 60, 343, 49.3, 200, 200, 78]}/>
         
     
        </div>
     
        </div>
        <div className="border border-2px rounded-md m-2 flex justify-between ">
          <div  className="m-2 flex gap-2">
           
            <div className="border border-2px px-6 py-6"></div>
             <div className="m-2 ml-0"><span>John Doe</span></div>
             <div className='flex'>
            <div className="m-2  ml-0"><span className='text-sm font-bold'>83% </span> 
            </div>
            
            <div className="mt-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3b82f6" className="w-5 h-5">
       <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
     </svg></div>
           
          
     </div>
          
          </div>
     
           <div className="m-2 mt-  ">
             <MiniChart 
             strokeColor="#FF6600"
             activePointColor="#FF6600"
             activePointRadius={8}
             strokeWidth={5}
             labelFontSize={50}
             width={100}
             height={50}
             dataSet={[0, -20, 343, 49.3, -100, 200, 78]}/>
         
     
        </div>
     
        </div>
        */}
        
        
     
      </div>
    

 


        
        </>
    )
}

export default TopPerformers