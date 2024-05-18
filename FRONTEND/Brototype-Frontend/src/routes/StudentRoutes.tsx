import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Sidebar from "../components/Students/Sidebar/Sidebar";
import StudentManifest from '../components/Students/StudentManifest/StudentManifest';
import Dashboard from '../pages/Students/Dashboard';
import WeeklyTask from "../pages/Students/WeeklyTask";
import ViewTask from "../pages/Students/ViewTask";
import TodoList from '../pages/Students/TodoList';
import ExtendDetails from '../pages/Students/ExtendDetails';
import ReviewResult from '../pages/Students/reviewDetails';
import StudentSignIn from "../pages/Students/SignIn"
import StudentOtp from "../pages/Students/StudentOtp";
import Navigationbar from '../components/Students/Navigation/Navbar';
import Chat from "../pages/Students/Chat"
import GlobalContext from '../context/GlobalContext';
import { useSocket } from '../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import JaasMeet from '../components/Advisor/jaasmeet/JaasMeet';

interface StudentRoutesProps {
  // Define any props if required
}

interface Socket {
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
  // Add other methods if needed
}

interface RootState {
  student: {
      studentData: {
          studentId: string;
          // Define other properties if needed
      }
  }
}

function StudentRoutes() {
  const changeScreen = useSelector((state)=>state?.review?.changeScreen)
  const studentId: any = useSelector((state: RootState) => state?.student?.studentData?.studentId);
    const [studentAccessToken,setStudentAccessToken] = useState("")
    useEffect(()=>{
      const studentJwt = localStorage.getItem("studentAccessToken")
      setStudentAccessToken(studentJwt)
    },[])

    const socket = useSocket();
    useEffect(() => {
      if (!socket || !studentId) return;

      // Emit online status when the tab is open
      socket.emit("addOnlineUser", studentId);

      const handleGetOnlineUser = (users: any[]) => {
          console.log(users, "online usersssss");

          // Dispatch action to update Redux with new online users
        
      };

      socket.on("getOnlineUser", handleGetOnlineUser);

      // Clean up socket event listener on component unmount
      return () => {
          socket.off("getOnlineUser", handleGetOnlineUser);
      };
  }, [ studentId, socket]);
  
  useEffect(() => {
      const handleBeforeUnload = () => {
          if (socket && studentId) {
              // Emit offline status to the server when the tab is closed
              socket.emit("setOfflineUser", studentId); 
          }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, [studentId, socket]);
  
  useEffect(() => {
      const handleWindowFocus = () => {
          if (socket && studentId) {
              // Emit online status to the server when the tab is focused
              socket.emit("addOnlineUser", studentId);
          }
      };

      window.addEventListener('focus', handleWindowFocus);

      return () => {
          window.removeEventListener('focus', handleWindowFocus);
      };
  }, [studentId,socket]);

  return (
    <>
     {changeScreen?<JaasMeet roomId={studentId}/>:
    <>
    <Navigationbar/>
    <div className="bg-custom-background">
      <div className="bg-white">
        <div className="flex">  
          <Sidebar />
         
          <Routes>
         
            <Route path="/" element={studentAccessToken ? <Dashboard />:<StudentSignIn/>} />
            <Route path="/profile" element={studentAccessToken ?<StudentManifest />:<StudentSignIn/>} />
            <Route path="/task" element={studentAccessToken ?<WeeklyTask />:<StudentSignIn/>} />
            <Route path="/viewTask" element={studentAccessToken ?<ViewTask />:<StudentSignIn/>} />
            <Route path="/todolist" element={studentAccessToken ?<TodoList />:<StudentSignIn/>} />
            <Route path="/extendDetails" element={studentAccessToken ?<ExtendDetails />:<StudentSignIn/>} />
            <Route path="/review" element={studentAccessToken ?<ReviewResult />:<StudentSignIn/>} />
            <Route path="/chat" element={studentAccessToken ?<Chat />:<StudentSignIn/>} />
          </Routes>
        </div>
      </div>
    </div>
   </>
}
    </>
  );
}

export default StudentRoutes;
