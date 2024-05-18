
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import AddEvent from './AddEvent'
import { useState } from 'react'
const localizer = momentLocalizer(moment)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import DeleteEvent from './DeleteEvent'
import { deleteEvents } from '../../../redux-toolkit/coordinatorSlice'

const EventCalendar=()=>{
  const [deleteModal,setDeleteModal]=useState(false)
  const [Modal,setModal]=useState(false)
  const coordinatorData=useSelector(state=>state.coordinator.coordinatorData)
  console.log(coordinatorData,'cppppppp');
  const [editData,setEditData]=useState({})
  const[deleteId,setDeleteId]=useState('')
  console.log();
  const dispatch=useDispatch()
  const deleteEvent= async  ()=>{
console.log('helllo');

dispatch(deleteEvents(deleteId))
     
  //  try{
  //   const response= await axiosInstance.delete(`/eventt/event-delete/${deleteId}`)

  //   if(response.data){
  //     //handleToast('Event deleted successfully')
  //     toast.success('Event deleted successfully', {
  //       position: 'top-center',
  //       autoClose: 3000
  //     })
       
  //     setDeleteModal(false)
      


      
  //   }

  // }
  //  catch(error){
  //   toast.error('There is an error in deleteing', {
  //     position: 'top-center',
  //     autoClose: 3000
  //   })
  //   setDeleteModal(false)

   }

 // }
  
  const editEvent=(id:string)=>{
    console.log(id,'cnanincian');
    
  const data= coordinatorData.events.filter((e:any)=>{
      return id==e._id
    })
    console.log(data,'ad6aaa6a');
    if(data[0]){

      const startDateObj=new Date(data[0].startDate)
      const endDateObj=new Date(data[0].endDate)
      const startyear=startDateObj.getFullYear()
      const startMonth=String(startDateObj.getMonth()+1).padStart(2,'0')
      const startDay=String(startDateObj.getDate()).padStart(2,'0')
     const  formatStartDate=`${startyear}/${startMonth}/${startDay}`

    const editObj ={...data[0],startDate:formatStartDate,endDate:new Date(data[0].endDate)}

      setEditData(editObj)
      
    }
  
    setModal(true)
    console.log(editData,'edittttt');
  }

  const handleToast=(message:any,error:any)=>{
    if(!error){
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000
      });
setModal(false)
    }
    else{
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000
      });


    
   }
  }

  const orgEvents=coordinatorData.events?.map((event:any)=>{
    return {title:event.eventType,start:event.startDate,end:event.endDate}
  })

    const events=[
        {
          'title': 'All Day Event very long title',
          'allDay': true,
          'start': new Date(2023, 12, 0),
          'end': new Date(2024, 1, 1)
        },
        {
          'title': 'Long Event',
          'start': new Date(2023, 3, 7),
          'end': new Date(2023, 3, 10)
        },
      
        {
          'title': 'DTS STARTS',
          'start': new Date(2016, 2, 13, 0, 0, 0),
          'end': new Date(2016, 2, 20, 0, 0, 0)
        },
      
        {
          'title': 'DTS ENDS',
          'start': new Date(2016, 10, 6, 0, 0, 0),
          'end': new Date(2016, 10, 13, 0, 0, 0)
        },
      
        {
          'title': 'Some Event',
          'start': new Date(2023, 3, 9, 0, 0, 0),
          'end': new Date(2023, 3, 9, 0, 0, 0)
        },
        {
          'title': 'Conference',
          'start': new Date(2023, 3, 11),
          'end': new Date(2023, 3, 13),
          desc: 'Big conference for important people'
        },
        {
          'title': 'Meeting',
          'start': new Date(2023, 3, 12, 10, 30, 0, 0),
          'end': new Date(2023, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
          'title': 'Lunch',
          'start': new Date(2023, 3, 12, 12, 0, 0, 0),
          'end': new Date(2023, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch'
        },
        {
          'title': 'Meeting',
          'start': new Date(2023, 3, 12, 14, 0, 0, 0),
          'end': new Date(2023, 3, 12, 15, 0, 0, 0)
        },
        {
          'title': 'Happy Hour',
          'start': new Date(2023, 3, 12, 17, 0, 0, 0),
          'end': new Date(2023, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day'
        },
        {
          'title': 'Dinner',
          'start': new Date(2023, 3, 12, 20, 0, 0, 0),
          'end': new Date(2023, 3, 12, 21, 0, 0, 0)
        },
        {
          'title': 'Birthday Party',
          'start': new Date(2023, 3, 13, 7, 0, 0),
          'end': new Date(2023, 3, 13, 10, 30, 0)
        },
        {
          'title': 'Birthday Party 2',
          'start': new Date(2023, 3, 13, 7, 0, 0),
          'end': new Date(2023, 3, 13, 10, 30, 0)
        },
        {
          'title': 'Birthday Party 3',
          'start': new Date(2023, 3, 13, 7, 0, 0),
          'end': new Date(2023, 3, 13, 10, 30, 0)
        },
        {
          'title': 'Late Night Event',
          'start': new Date(2023, 3, 17, 19, 30, 0),
          'end': new Date(2023, 3, 18, 2, 0, 0)
        },
        {
          'title': 'Multi-day Event',
          'start': new Date(2023, 3, 20, 19, 30, 0),
          'end': new Date(2023, 3, 22, 2, 0, 0)
        }
      ]
    return (
        <>
        <div className="border   flex rounded-md justify-between bg-white">
  <div className="m-4 ">
    <div>
      <span className="text-2xl font-semibold">December 20, 2023</span>

    </div>
     <div className='mt-2'>
      <span>Today You have 4 upcoming events</span>

    </div>

  </div>
  <div className="mt-8 mr-4"> 
    <span className="text-2xl">8:20 pm</span>

  </div>
</div>

<div className=" mt-4  flex gap-2  " >
  <div className='bg-white  rounded-md '>
  <Calendar
   
   localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000,width:750}}
      events={orgEvents}
      className=''/>

  </div>

  <div className='w-full '>
  <button className="py-2 bg-white  w-full rounded-md shadow-sm " onClick={()=>{setModal(true)}}> <span className='text-xl'>+</span> <span className='font-semibold'>Add New Event</span> </button>

{
  coordinatorData?.events?.map((event:any)=>

  
  
  {
    console.log(event._id);
    
    return   <div className="border-l-4 border-l-gray-400  border rounded-md   mt-4 bg-white ">
    <div className='m-2 '>

   
  <div className="flex justify-between  mb-0">
    <div><span className='text-md'>Onlne-meeting</span></div>
  <div><span className='text-xs'>{event.startDate}</span></div>

  </div>
  <div className=" mt-0 mb-0">
    <span className='text-sm'>{event.eventType} </span>
  </div>
   <div className=" mt-0">
    <span className='text-sm'>Maradu, Kochi</span>
  </div>
  
</div>
<div className="flex">
  <div><button className="px-2 border rounded-md ml-2 mb-2" onClick={()=>{editEvent(event._id)}}>Edit</button></div>
    <div><button className="px-2 border rounded-md ml-2 mb-2" onClick={()=>{setDeleteModal(true),setDeleteId(event._id)}}>Delete</button></div>

</div>
  </div>
  }
  )
}
  
  
  </div>

    
    </div>
    <AddEvent isVisible={Modal} editData={editData} onClose={()=>{setModal(false)}} handleToast={handleToast} />
        <ToastContainer/>
        < DeleteEvent deleteModal={deleteModal} showDeleteModal={()=>{setDeleteModal(false)}}  deleteFn={deleteEvent}/>
        
        </>
      
    )
}

export default EventCalendar