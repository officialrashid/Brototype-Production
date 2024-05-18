import React, { useEffect, useState } from 'react';
import ReviewerSignIn from '../pages/Reviewer/SignIn';
import ReviewerOtp from '../pages/Reviewer/ReviewerOtp';
import ReviewerDashboard from '../pages/Reviewer/ReviewerDashboard';
import { Routes, Route, Navigate } from 'react-router-dom';

function ReviewerAuthRoutes() {
  const [reviewerAccessToken, setReviewerAccessToken] = useState('');

  useEffect(() => {
    const reviewerJwt:any = localStorage.getItem('reviewerAccessToken');
    setReviewerAccessToken(reviewerJwt);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={ <ReviewerSignIn />}
      />
      <Route path="/reviewerOtp" element={ <ReviewerOtp/>} />
    </Routes>
  );
}

export default ReviewerAuthRoutes;
