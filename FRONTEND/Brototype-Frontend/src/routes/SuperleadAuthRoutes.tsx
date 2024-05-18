import React, { useEffect, useState } from 'react';
import SuperleadSignIn from '../pages/SuperLead/SignIn';
import SuperleadOtp from '../pages/SuperLead/SuperleadOtp';
import { Routes, Route, Navigate } from 'react-router-dom';

function AuthenticationRoutes() {
  const [studentAccessToken, setStudentAccessToken] = useState('');

//   useEffect(() => {
//     const studentJwt:any = localStorage.getItem('studentAccessToken');
//     setStudentAccessToken(studentJwt);
//   }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={  <SuperleadSignIn />}
      />
      <Route path="/superleadOtp" element={ <SuperleadOtp />} />
    </Routes>
  );
}

export default AuthenticationRoutes;
