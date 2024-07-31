import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/LandingPage/LandingPage';
import Navigation from './pages/Fumigation/Navigation';
import Login from './pages/Fumigation/SignIn';
import OtpComponet from './pages/Authentication/OtpComponet';
import StudentRoutes from './routes/StudentRoutes'; // Import StudentRoutes
import ReviewerRoutes from './routes/ReviewerRoutes';
import AuthenticationRoutes from './routes/StudentAuthRoutes';
import ReviewerAuthRoutes from './routes/ReviewerAuthRoutes';
import SuperleadAuthRoutes from './routes/SuperleadAuthRoutes';
import AdvisorRoutes from './routes/AdvisorRoutes';
import SuperLeadRoutes from "./routes/SuperLeadRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import AdvisorAuthRoutes from './routes/AdvisorAuthRoutes'
import FumigationRoutes from './routes/FumigationRoutes';
import AdminAuthRoutes from './routes/AdminAuthRoutes';
import JaasMeet from './components/Advisor/jaasmeet/JaasMeet';
import JaasService from './components/Advisor/jaasmeet/jaasService';

function App() {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
    return (
      <>

     <Router>

        <Routes>
        <Route path="/meeting/:123445" element={<JaasService roomId={getRandomInt(1000,10000)} />} />
        <Route path="/meeting/vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e/:roomId" element={<JaasService roomId={getRandomInt(1000,10000)} />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/invigilator" element={<Login />} />
  
          <Route path="/otpLogin" element={<OtpComponet />} />
          <Route path="/otpTestLogin" element={<OtpComponet />} />
  
          <Route path="/reviewerIn/*" element={<ReviewerAuthRoutes />} />
          <Route path="/studentIn/*" element={<AuthenticationRoutes />} />
          <Route path="/advisorIn/*" element={<AdvisorAuthRoutes />} />
          <Route path="/superleadIn/*" element={<SuperleadAuthRoutes />} />
          <Route path="/adminIn/*" element={<AdminAuthRoutes />} />
          <Route path="/reviewer/*" element={<ReviewerRoutes />} />
  
          {/* Nested StudentRoutes */}
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/advisor/*" element={<AdvisorRoutes />} />
          <Route path="/superlead/*" element={<SuperLeadRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/fumigation/*" element={<FumigationRoutes />} />
        </Routes>
  
      </Router>
      
      
      </>
    )
   
      
    
}

export default App;
