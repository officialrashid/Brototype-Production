import { useEffect, useState } from "react"
import Slot from "./Slot"
import SearchBar from "../components/SearchBar"
import Api from "../../../utils/baseUrl/reviewerBaseUrl"
import { useParams } from "react-router-dom"

const Reviewer=()=>{
console.log("PPPPPPPPPP()(***&&&&&&&");

  const {domain,reviewId}=useParams()
  let count=0
  console.log(domain,":::::::");
const [reviewers,setReviewers]=useState([])


  useEffect(()=>{

    console.log("useEffect calleld");
    const getReviewerDetails=async ()=>{

      
      
      const response=await Api.get(`/api/reviewer/get-domain-wise-reviewer/${domain}`)
      console.log(response,'kekkcsdbkjcbsbckjbckbk');
      
    
        setReviewers(response.data.response.reviewers)

    }
    getReviewerDetails()
      
  },[])

  
    //const [count,setCount]=useState(0)
    const [active,setActive]=useState(false)
    const [modal,setModal]=useState(false)
    const [eventId,setEventId]=useState('')
    const [events,setEvents]=useState([])
    const [slots,setSlots]=useState([])
    const [reviewerId,setReviewerId]=useState('')
   const getReviewerEvents=async (id:string)=>{
    console.log('helooo',id,"thidis udddd");
    if(reviewerId===id){
      setReviewerId("")
    }
    else{
      const response=await Api.get(`/api/reviewer/get-particular-date-events/${id}`)

      console.log(response.data.response.events,']]]]]]]]]');

      
      if(response.data){
    
    console.log("{}{}888888");
    
        
        setEvents(response.data.response.events)
        setActive(true)
        
        
      
        setReviewerId(id)
        console.log(reviewerId,'reviewerD');

    }
     
  

}


   }


 


   const handleSlotModal=(id:string)=>{
    
     setEventId(id)
    let  data=events.filter((timeData:any)=>{
   
      return timeData._id===id
 })
console.log(data[0].bookedEvents,'data');

 setSlots(data[0]?.bookedEvents)
 setModal(true)
    
   }
    
   

  

  //  const reviewers = [
  //   { _id: '1234', name: 'Muhammad Riyas' },
  //   { _id: '5678', name: 'Shahabaz' },
  //   { _id: '91011', name: 'Vishnu shivan' },
  //   { _id: '121314', name: 'Rayan' },
  //   { _id: '151617', name: 'Joseph' }
  // ]


  


   
  
    return (
        <>
        
     {
      reviewers?.map((reviewer)=>{
        return (


<div>
<div className="mb-5">
       
       
       <div className="border border-2px  rounded-md py-2 bg-white" onClick={()=>{getReviewerEvents(reviewer.reviewerId)}}>
         <div className="flex justify-between m-2  ">
           <div><span className="font-semibold font-roboto"> {reviewer.firstName} {reviewer.lastName}</span> </div>
           <div>{active? <svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg>   :<svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg>}</div>
         </div>
       </div>
       </div>







          <div className=" border border-2px rounded-md mt-2 bg-white mb-6">

          <div className="flex  flex-wrap justify-center">
          {
            
            
         reviewerId==reviewer.reviewerId?events.map((timeEvent)=>{
            {count}
            return (
          <div className="border border-gray-400 m-10 rounded-sm w-1/2 bg-gray-300 w-1/4  font-roboto" onClick={()=>{handleSlotModal(timeEvent._id)}}>
            <div className="border border-gray-400  bg-white rounded-md ml-2 mr-2 text-center py-1.5 bg-white shadow-lg mt-2 font-bold font-roboto">
            {/* {timeEvent.date[count]
            
            } */}
            {count+1}
      </div>
           <div  className="flex justify-between m-2  mt-1 py-2 cursor-pointer">
            
             <div className="border border-gray-400 w-1/2 rounded-md mr-2 text-center py-1.5   bg-white shadow-lg ">
              <span className="font-semibold font-roboto">{timeEvent.startTime}</span>
             </div>
              <div className="py-1.5">
                <span>-</span>
        
             </div>
              <div className="border border-gray-400  w-1/2 rounded-md ml-2 text-center py-1.5 bg-white shadow-lg ">
                <span className="font-semibold font-roboto" >{timeEvent.endTime}</span>
        
             </div>
           </div>
          </div>
           
               )
              
              }
              
            ):""
          
          }
           
           
      
      
          
      
      
      
      
         
        </div>
        </div>
        </div>
         
        )
      })
     }


     
 


 <Slot isVisible={modal} events={slots} eventId={eventId} onClose={()=>{setModal(false)}} reviewerId={reviewerId} reviewId={reviewId}/>
        
        </>
    )
}

export default Reviewer