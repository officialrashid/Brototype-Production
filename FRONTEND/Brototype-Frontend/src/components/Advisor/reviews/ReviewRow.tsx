import { useState } from "react"

import TaskUpdate from "../Scheduled/TaskUpdate"
import JaasMeet from "../jaasmeet/JaasMeet"
import { axiosInstance } from "../services/api/apiClient"
import { useDispatch, useSelector } from "react-redux"
import { changeFrame } from "../../../redux-toolkit/reviewSlice"
import TaskView from "../Scheduled/TaskView"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import axios from "axios"
import { RootState } from "../../../redux-toolkit/store"
import Api from "../../../utils/baseUrl/reviewerBaseUrl"
import { useNavigate } from "react-router-dom"
const ReviewRow = ({ reviewData }: { reviewData: any }) => {
  //const reviewData:any=[{name:'hhh'}]
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId)
  console.log(advisorId,"advisorId get successfullyy ysssrrr in reduxxxxx");
  
  const [taskView, setTaskView] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [frame, setFrame] = useState(false)
  const[meetState,setMeetState]=useState(false)
  const [currentWeek,setCurrentWeek] = useState(0)
  const [domain,setDomain]=useState('')
  const [studentId,setStudentId]=useState('')
  const createFullFrame = () => {
    dispatch(changeFrame(true))

  }


  const handleToast = (message: any, error: any) => {
    if (!error) {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3500
      });
      //setModal(false)
    }
    else {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000
      });



    }
  }
  
  const [studentIds,setstudentId]=useState('')
  const [reviewerId,setReviewerId]=useState('')
  const [eventId,setEventId]=useState('')
  const [reviewId,setReviewId]=useState('')
  const [slotId,setSlotId]=useState('')
 
const updateReviewDetail=(studentId:string,reviewerId:string,eventId:string,reviewId:string,slotId:string,currentWeek:number)=>{
  setstudentId(studentId), setReviewerId(reviewerId), setEventId(eventId),setReviewId(reviewId),setSlotId(slotId)

setCurrentWeek(currentWeek)
}

const cancelReview = async (reviewerId:string,eventId:string,slotId: string,reviewId:string, handleToast: Function) => {

  console.log(advisorId, slotId, 'rrrrr')
  console.log(eventId, 'eeee')
  const bookedEventId=slotId
console.log(reviewerId,'reviewerID')
console.log(reviewId,'reviewId')
const bookStatus=false
    const cancel:boolean=true
  const response = await Api.patch('/api/reviewer/update-particular-date-events', {reviewerId ,eventId,bookedEventId:slotId,advisorId,bookStatus,reviewId,cancel })

  console.log(response,'respose from booked');
  
  handleToast('Review cancelled successfully')
}

  const updateMeetLInk=async (reviewId:string,advisorId:string,meetLink:string)=>{


const data={reviewId,advisorId,meetLink}
const response = await axios.patch('https://brototypes.com/review/update-meeting-link',data)
if(response){
  console.log(response);
  
  dispatch(changeFrame(false))

}

  }

  const handleMeetLink = async () => {
    console.log('meet');
    setMeetState(true)

     //dispatch(changeFrame(true))

   // window.open('https://8x8.vc/vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e/my-meet','_blank')

    //  try{
    //     const response=await   axiosInstance.get('/create-meet/1234')
    //     if(response){

    //         window.open('https://8x8.vc/vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e/my-meet','_blank')

    //     }

    //  }catch(error){
    //     console.log(error);


    //  }

  
  }
  const handleViewTask = (currentWeek:any,domain:any,studentId:any) =>{
    console.log(currentWeek,domain,studentId,'ddsds')
    setCurrentWeek(currentWeek)
      
      setDomain(domain)
      setStudentId(studentId)
      setTaskView(true)
  }
  return (
    <>
   {
        console.log(reviewData,'reviewwwwwdatapp')
   }
      {
       
    
        
      
      reviewData?.map((reviewData: any, index: number) => {
        return (
          <div className='mx-auto pt-2 mb-1 mt-' >
          <table className="w-full text-sm text-left divide-y divide-y-8 table-fixed  rounded-full">
            <thead className="text-md text-gray-700 bg-gray-100  dark:text-gray-800 font-roboto" >
              <tr className="   ">

                <th scope="col" className="w-1/4 px-4 py-6  text-center rounded-l-lg   " style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                  {reviewData?.name} {reviewData.lastName}
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center">
                  {reviewData?.batch}

                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                  {reviewData?.startTime}
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                 {reviewData?.domain}
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                  {reviewData?.scheduledDate}
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                  <button className="bg-black text-white px-3 rounded-md  py-1" onClick={() => { handleViewTask(reviewData.currentWeek,reviewData.domain,reviewData.studentId) }}>View</button>
                </th>
                <th scope="col" className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                  <button className="bg-black text-white px-3 rounded-md  py-1" onClick={() => { setTaskModal(true),updateReviewDetail(reviewData.studentId,reviewData.reviewerId,reviewData.eventId,reviewData.reviewId,reviewData.slotId,reviewData.currentWeek)}}>Update</button>
                </th>

                <th scope="col" className="w-1/4 px-4 py-6 text-center rounded-r-lg ">
              {
                reviewData?.meetingLink==null?<button className="bg-black text-white px-3 rounded-md  py-1"onClick={()=>{navigate(`/advisor/start-review/${advisorId}`),createFullFrame()}}>Start</button>:<button className="bg-black text-white px-3 rounded-md  py-1">Join</button>
              }
                 
                </th>

                <th scope="col" className="w-1/4 px-4 py-6 text-center ">
                <button className="bg-black text-white px-3 rounded-md  py-1" onClick={()=>{cancelReview(reviewData.reviewerId,reviewData.eventId,reviewData.slotId,reviewData.reviewId,handleToast)}}>Cancel</button>
              
                </th>

              </tr>
            </thead>
          </table>
        </div>
        )
       
      })}
      <TaskView isVisible={taskView} onClose={() => { setTaskView(false) }} studentId={studentId} currentWeek={currentWeek} domain={domain} />

      <TaskUpdate isVisible={taskModal} onClose={() => { setTaskModal(false) }} handleToast={handleToast} reviewId={reviewId} slotId={slotId} reviewerId={reviewerId} coordinatorId={advisorId} eventId={eventId} studentId={studentIds} currentWeek={currentWeek} />
      <ToastContainer />
    </>
  )
}

export default ReviewRow