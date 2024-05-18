import React, { useEffect, useState } from 'react';
import AdvisorSignIn from '../pages/Advisors/SignIn';
import AdvisorOtp from '../pages/Advisors/AdvisorOtp';
import { Routes, Route, Navigate } from 'react-router-dom';

function AdvisorAuthRoutes() {
//   const [reviewerAccessToken, setReviewerAccessToken] = useState('');

//   useEffect(() => {
//     const reviewerJwt:any = localStorage.getItem('reviewerAccessToken');
//     setReviewerAccessToken(reviewerJwt);
//   }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={ <AdvisorSignIn />}
      />
      <Route path="/advisorOtp" element={ <AdvisorOtp />} />
    </Routes>
  );
}

export default AdvisorAuthRoutes;
