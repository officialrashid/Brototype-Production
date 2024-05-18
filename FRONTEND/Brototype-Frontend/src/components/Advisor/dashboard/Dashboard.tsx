import CalendarComp from "../components/CalendarComp"
import Box from "./Box"
import NewTask from "./NewTask"
import PerformanceGraph from "./PerformanceGraph"
import ReactApexChart from "react-apexcharts"
import TableNav from "./TableNav"
// import Footer from "../Footer"
import WeeklySummary from "./WeeklySymmary"
// import profile from '../assets/images/profile.webp'
import { useEffect } from "react"
import { axiosInstance } from "../services/api/apiClient"
import { getCoordinatorData } from "../../../redux-toolkit/coordinatorSlice"
import { useDispatch, useSelector } from "react-redux"




const Dashboard=()=>{
  const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId)
  console.log(advisorId,"advisorId get successfullyy ysssrrr in reduxxxxx");
  const dispatch=useDispatch()
const coordinatorData=useSelector(state=>state.coordinator.coordinatorData)
const percentData=()=>{

  

}

const series =[]
console.log(coordinatorData,'');

  useEffect(()=>{

  try{
    const advisorData=async ()=>{
   console.log('calledddd');
   const id='66199c84e5ef257629c45d69'
      const response= await axiosInstance.get(`/profile/get-coordinators-data/${id}`)
  
      if(response){
      console.log(response);
      
        dispatch(getCoordinatorData(response.data))
  
    
       
      
     
      }
     
  } 
  advisorData()
}
  catch(error){
    console.log(error);
    
  } 
   
  

  },[])
    //const series = []; //70 percent
    const options = {
      labels: [], //label of this diagram
      plotOptions: {
        radialBar: {
         
          dataLabels: {
            name: {
              show: false, // Set to true if you want to display the category (name) labels
            },
            value: {
              show: false, // Set to true if you want to display the value labels
            }
          }
        }
      },
      colors:['#276497']
    }

    return (
      
          <>
          <div className="flex justify-between ">
              <div className="w-4/6 "> 
              <div className=" border   rounded-lg  m-4 mt-0  mb-0 h-fit bg-white  shadow-lg">
    <div className="flex justify-between m-4 ">
        <div>
  <span className="font-semibold  text-lg font-roboto">Helloo coordinator !!!!!</span>
  <div className="mt-1">
    <span className="font-roboto" >Complete your task</span>
  </div>
    </div>
      <div className="border border-gray-400  h-20 w-20  flex  items-center justify-center"  >
      <img  className=" h-20 w-20" alt="" />
    
    </div>
  
    </div>
  
   
  </div>
  
  
             <div className="flex    rounded-md  m-2   ">
             <div className="grid grid-cols-2   gap-2 m-2">
              <Box coordinator={coordinatorData}/>
              <div className="border border-2px  m-2 mx-auto rounded-md  bg-white   shadow-lg" >
    <div className="flex m-2 ">
      <div> <span  className="font-medium  font-roboto"> Shared Reviews</span>
   <div className="mt-4">
     <span className="text-4xl font-roboto"> {coordinatorData?.shared?coordinatorData.shared:0}</span>
   </div>
      </div>
      <div className=" mt-4  border-darkBlue w-20 h-20 rounded-full border-4 "  > 
      <svg fill="#e5e7e8" height={54} className="mt-1.5 ml-1" width={65} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297" xmlSpace="preserve" stroke="#e5e7e8">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <g>
            <path d="M223.271,181.31c-1.699-14.088-3.106-24.923-4.067-31.335c-1.908-12.736-12.359-23.586-26.004-26.997l-13.084-3.271 c-3.314,14.324-16.167,25.038-31.485,25.038c-15.317,0-28.17-10.713-31.484-25.038l-13.085,3.271 c-13.644,3.412-24.095,14.261-26.004,26.997c-0.965,6.439-2.371,17.275-4.067,31.334c-0.388,3.223,0.583,6.336,2.736,8.764 c2.153,2.428,5.127,3.766,8.374,3.766h127.062c3.246,0,6.22-1.337,8.373-3.766C222.688,187.644,223.659,184.532,223.271,181.31z"></path>
            <path d="M136.49,95.582c-0.342,5.325-1.776,11.852-6.085,17.011c0.091,9.972,8.233,18.056,18.226,18.056 c9.994,0,18.136-8.084,18.227-18.056c-4.309-5.159-5.744-11.686-6.086-17.011c-3.85,1.41-7.912,2.187-12.141,2.187 S140.34,96.992,136.49,95.582z"></path>
            <path d="M148.631,83.674c17.123,0,33.93-23.572,33.93-47.588c0-20.611-13.318-33.93-33.93-33.93 c-20.61,0-33.929,13.318-33.929,33.93C114.702,60.102,131.508,83.674,148.631,83.674z"></path>
            <path d="M66.424,239.748H5.969c-3.292,0-5.969,2.678-5.969,5.97v25.859c0,3.292,2.677,5.97,5.969,5.97h60.455 c3.292,0,5.969-2.678,5.969-5.97v-25.859C72.393,242.426,69.716,239.748,66.424,239.748z"></path>
            <path d="M66.181,199.424c-0.433-0.489-0.838-0.997-1.23-1.514l-27.744,27.743h19.935l19.158-19.31 C72.451,204.913,68.962,202.559,66.181,199.424z"></path>
            <path d="M291.031,239.748h-60.455c-3.292,0-5.969,2.678-5.969,5.97v25.859c0,3.292,2.677,5.97,5.969,5.97h60.455 c3.292,0,5.969-2.678,5.969-5.97v-25.859C297,242.426,294.323,239.748,291.031,239.748z"></path>
            <path d="M259.792,225.653l-27.594-27.594c-0.357,0.465-0.725,0.922-1.116,1.363c-2.83,3.194-6.396,5.575-10.328,6.996 l19.103,19.235H259.792z"></path>
            <path d="M178.727,257.046h-60.454c-3.292,0-5.97,2.677-5.97,5.969v25.86c0,3.292,2.678,5.969,5.97,5.969h60.454 c3.292,0,5.97-2.677,5.97-5.969v-25.86C184.697,259.724,182.019,257.046,178.727,257.046z"></path>
            <rect x="141.583" y="207.933" width="14.095" height="35.018"></rect>
          </g>
        </g>
      </g>
    </g>
  </svg>
     
      {/* <svg  height={70} width={75} className="mt-0.5" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#e5e7eb" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 19,31.6667C 22.4978,31.6667 25.3333,34.5022 25.3333,38C 25.3333,40.0017 24.4047,41.7865 22.9548,42.9471C 24.9536,49.0304 30.5383,53.4894 37.2083,53.8333C 37.2083,56.2887 38.2245,58.5067 39.8593,60.0898L 38,60.1667C 27.79,60.1667 19.1923,53.2639 16.619,43.8706C 14.3012,42.9295 12.6667,40.6557 12.6667,38C 12.6667,34.5022 15.5022,31.6667 19,31.6667 Z M 45.125,15.8333C 48.6228,15.8333 51.4583,18.6689 51.4583,22.1667C 51.4583,25.6645 48.6228,28.5 45.125,28.5C 41.6337,28.5 38.8022,25.675 38.7917,22.1861C 38.5294,22.1732 38.2655,22.1667 38,22.1667C 31.8493,22.1667 26.5178,25.6738 23.896,30.7973C 22.5009,29.8471 20.8153,29.2917 19,29.2917L 17.559,29.4103C 20.9149,21.4339 28.8034,15.8333 38,15.8333C 39.6024,15.8333 41.165,16.0034 42.6709,16.3263C 43.4256,16.0088 44.2548,15.8333 45.125,15.8333 Z M 45.9167,47.5C 47.3141,47.5 48.6058,47.9526 49.6532,48.7191C 52.2485,45.8991 53.8333,42.1347 53.8333,38C 53.8333,34.5408 52.724,31.3407 50.8417,28.736C 52.6012,27.2036 53.7393,24.9758 53.8278,22.4809C 57.7488,26.4794 60.1667,31.9574 60.1667,38C 60.1667,44.8738 57.0379,51.0169 52.1268,55.0828C 51.5466,57.9822 48.9868,60.1667 45.9167,60.1667C 42.4189,60.1667 39.5833,57.3311 39.5833,53.8333C 39.5833,50.3355 42.4189,47.5 45.9167,47.5 Z "></path> </g></svg> */}  </div>
    </div>
    
  
    
  
  </div>
  <div className="border border-2px  m-2 mx-auto rounded-md  bg-white   shadow-lg" >
    <div className="flex m-2 ">
      <div> <span className="font-medium  font-roboto">  Weekly Task</span>
   <div className="mt-3">
     <span className="text-4xl font-roboto">{coordinatorData?.weeklyTask?coordinatorData.weeklyTask:0}</span>
   </div>
      </div>
      <div className=" mt-4 ml-6 border-darkBlue w-20 h-20 rounded-full border-4 "  > 
  <svg viewBox="0 0 28 28" height={50} width={60} className="mt-3 ml-1" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e6e7e8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 5.25C4 3.45508 5.45507 2 7.25 2H20.75C22.5449 2 24 3.45507 24 5.25V17.3787C23.8796 17.4592 23.7653 17.5527 23.659 17.659L22.5 18.818V5.25C22.5 4.2835 21.7165 3.5 20.75 3.5H7.25C6.2835 3.5 5.5 4.2835 5.5 5.25V22.7497C5.5 23.7162 6.2835 24.4997 7.25 24.4997H15.3177L16.8177 25.9997H7.25C5.45507 25.9997 4 24.5446 4 22.7497V5.25Z" fill="#e5e7e8"></path> <path d="M10.5 8.75C10.5 9.44036 9.94036 10 9.25 10C8.55964 10 8 9.44036 8 8.75C8 8.05964 8.55964 7.5 9.25 7.5C9.94036 7.5 10.5 8.05964 10.5 8.75Z" fill="#e5e7e8"></path> <path d="M9.25 15.2498C9.94036 15.2498 10.5 14.6902 10.5 13.9998C10.5 13.3095 9.94036 12.7498 9.25 12.7498C8.55964 12.7498 8 13.3095 8 13.9998C8 14.6902 8.55964 15.2498 9.25 15.2498Z" fill="#e5e7e8"></path> <path d="M9.25 20.5C9.94036 20.5 10.5 19.9404 10.5 19.25C10.5 18.5596 9.94036 18 9.25 18C8.55964 18 8 18.5596 8 19.25C8 19.9404 8.55964 20.5 9.25 20.5Z" fill="#e5e7e8"></path> <path d="M12.75 8C12.3358 8 12 8.33579 12 8.75C12 9.16421 12.3358 9.5 12.75 9.5H19.25C19.6642 9.5 20 9.16421 20 8.75C20 8.33579 19.6642 8 19.25 8H12.75Z" fill="#e5e7e8"></path> <path d="M12 13.9998C12 13.5856 12.3358 13.2498 12.75 13.2498H19.25C19.6642 13.2498 20 13.5856 20 13.9998C20 14.414 19.6642 14.7498 19.25 14.7498H12.75C12.3358 14.7498 12 14.414 12 13.9998Z" fill="#e5e7e8"></path> <path d="M12.75 18.5C12.3358 18.5 12 18.8358 12 19.25C12 19.6642 12.3358 20 12.75 20H19.25C19.6642 20 20 19.6642 20 19.25C20 18.8358 19.6642 18.5 19.25 18.5H12.75Z" fill="#e5e7e8"></path> <path d="M25.7803 19.7803L19.7803 25.7803C19.6397 25.921 19.4489 26 19.25 26C19.0511 26 18.8603 25.921 18.7197 25.7803L15.7216 22.7823C15.4287 22.4894 15.4287 22.0145 15.7216 21.7216C16.0145 21.4287 16.4894 21.4287 16.7823 21.7216L19.25 24.1893L24.7197 18.7197C25.0126 18.4268 25.4874 18.4268 25.7803 18.7197C26.0732 19.0126 26.0732 19.4874 25.7803 19.7803Z" fill="#e5e7e8"></path> </g></svg>    
      </div>
    </div>
    
  
  </div>
  <div className="border border-2px  m-2 mx-auto rounded-md  bg-white   shadow-lg" >
    <div className="flex m-2  ">
      <div> <span className="font-medium  font-roboto"> Total reviews </span>
   <div className="mt-3">
     <span className="text-4xl font-roboto"> {coordinatorData?.totalReviews?coordinatorData.totalReviews:0}</span>
   </div>
      </div>
      <div className=" mt-4 ml-6 border-darkBlue w-20 h-20 rounded-full border-4 "  > 
      <svg height={50} width={65} className="mt-2 ml-1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#e5e7e8" fill-rule="evenodd" d="M8,0 C8.51283143,0 8.93550653,0.386039974 8.9932722,0.883378828 L9,1 L11,1 L11,2 L13,2 C13.51285,2 13.9355092,2.38604429 13.9932725,2.88337975 L14,3 L14,15 C14,15.51285 13.613973,15.9355092 13.1166239,15.9932725 L13,16 L3,16 C2.48716857,16 2.06449347,15.613973 2.0067278,15.1166239 L2,15 L2,3 C2,2.48716857 2.38604429,2.06449347 2.88337975,2.0067278 L3,2 L5,2 L5,1 L7,1 C7,0.447715 7.44772,0 8,0 Z M5,4 L4,4 L4,14 L12,14 L12,4 L11,4 L11,5 L5,5 L5,4 Z M10.5352,7.29289 C10.9258,7.68342 10.9258,8.31658 10.5352,8.70711 L7.70711,11.5352 C7.31658,11.9258 6.68342,11.9258 6.29289,11.5352 L5.29289,10.5352 C4.90237,10.1447 4.90237,9.51154 5.29289,9.12102 C5.68342,8.73049 6.31658,8.73049 6.70711,9.12102 L7,9.41391 L9.12102,7.29289 C9.51154,6.90237 10.1447,6.90237 10.5352,7.29289 Z M8,2 C7.44772,2 7,2.44772 7,3 C7,3.55228 7.44772,4 8,4 C8.55228,4 9,3.55228 9,3 C9,2.44772 8.55228,2 8,2 Z"></path> </g></svg>
      </div>
    </div>
    
  
  </div>
              
              
          </div>
          
  
          <div className="border   rounded-md  x  m-2 mt-4 mb-4 bg-white   shadow-lg">
          <div className="ml-2 mt-4 text-center">
                  <span className="font-medium  font-roboto">Task completion</span>
              </div>
          <ReactApexChart options={options} series={series}   type="radialBar" width={200} height={200}  />
          <div className="text-center ">
              <span className="text-4xl font-roboto ">{Math.floor((coordinatorData?.weeklyTask/coordinatorData?.todaysReview)*100)}%</span>
          </div>
  
          </div>
  
             </div>
          
             <div className="border m-4 mt-2  rounded-md bg-white  shadow-lg">
              <div className="m-2">
                  <span className="font-medium font-roboto">Weekly summary</span>
              </div>
           <WeeklySummary/>  
          </div>
             
          <div className="border m-4 mt-6 rounded-md bg-white  shadow-lg ">
              <div className="m-2">
                  <span className="font-medium  font-roboto">Performance Graph</span>
              </div>
          <PerformanceGraph graphHeight={206}/>
          </div>
          
  
              </div>
       
  <CalendarComp/>
  
  
          </div>
          <div className="m-4 mr-0 border rounded-md bg-white  shadow-lg">
              <TableNav/>
              <NewTask/>
          </div>
         
         
  
  
  
  
          
          </>
       
    )
}

export default Dashboard