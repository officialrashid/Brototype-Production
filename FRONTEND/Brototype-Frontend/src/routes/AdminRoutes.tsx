import Chat from "../components/Admin/Chat/Chat"
import Main from "../components/Admin/Dashboard/Main"
import MainNavigation from "../components/Admin/MainNavigation"
import SideNav from "../components/Admin/SideNav"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import WebContentPage from "../components/Admin/WebContent/WebContentPage"
import Counsellor from "../components/Admin/Counsellor/Counsellor"
import Course from "../components/Admin/Courses/Course"
import Branch from "../components/Admin/branches/Branch"
import EnquiryComp from "../components/Admin/enquiries/Enquiry"
import Data from "../components/Admin/Data/Data"


const App=()=>{


  return (
    <>
   
    <div className="bg-gray-200">
   
    <MainNavigation/>
    
    <div className="max-w-7xl   pt-28  mx-auto flex gap-8 ">       
       <div className=' border border-gray-200  rounded-lg w-2/12   h-fit  '>
       <SideNav/>
       </div>
      
       <div className=" rounded-md  w-5/6">
       <Routes>
       <Route path='/dashboard' element={ <Main/>}></Route>
       <Route path='/chat/' element={ <Chat/>}></Route>
       <Route path='/content/' element={ <WebContentPage/>}></Route>
       <Route path='/academic-counsellors/' element={ <Counsellor/>}></Route>
       <Route path='/courses/' element={ <Course/>}></Route>
       <Route path='/branches/' element={ <Branch/>}></Route>
       <Route path='/enquiries/' element={ <EnquiryComp/>}></Route>
       <Route path='/company-data/' element={ <Data/>}></Route>
       </Routes>

       </div>
      
  

       </div>

       </div>
      


       

    



    
    </>
  )
}

export default App