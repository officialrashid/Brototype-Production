import express from "express"
import {authentication_Controller} from "../../libs/controllers";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController,studentLoginController,reviewerLoginController,superleadLoginController,getAllStudentsStatusController,updateStudentStatusController,getHubwiseStudentsDetailsController,getAllReviewersStatusController,addReviewerController,updateReviewerStatusController,addStudentController,getSuperleadHubController,updateStudentPlacedController,getStudentsAndPlacedStudentsController,addAdvisorController,advisorLoginController,getStdDashboardDetailsController,getAdvisorDetailsController,getAllAdvisorsController,updateAdvisorStatusController,getReviewInitiatorsController,updateReviewStatusController,getStudentProfileController,advisorGoogleLoginController,studentGoogleLoginController,reviewerGoogleLoginController,superleadGoogleLoginController,getAllChatStudentsController,getAllChatSuperleadsController} = authentication_Controller(dependencies) 

  router.post('/createInvigilator',jwtVerification(secretKey),createInvigilatorController)
  router.post('/student-login',studentLoginController)
  router.post('/reviewer-login',reviewerLoginController)
  router.post('/superlead-login',superleadLoginController)
  router.get('/get-all-students-status',jwtVerification(secretKey),getAllStudentsStatusController)
  router.patch('/update-student-status',jwtVerification(secretKey),updateStudentStatusController)
  router.patch('/update-reviewer-status',jwtVerification(secretKey),updateReviewerStatusController)
  router.get('/get-hubwise-students-details/:uniqueId',jwtVerification(secretKey),getHubwiseStudentsDetailsController)
  router.get('/get-all-reviewers-status',jwtVerification(secretKey),getAllReviewersStatusController)
  router.post('/add-reviewer',jwtVerification(secretKey),addReviewerController)
  router.post('/add-student',jwtVerification(secretKey),addStudentController)
  router.get('/get-superlead-hub-location/:uniqueId',jwtVerification(secretKey),getSuperleadHubController)
  router.patch('/update-student-placed-status',jwtVerification(secretKey),updateStudentPlacedController)
  router.get('/get-students-and-placed-students/:uniqueId',jwtVerification(secretKey),getStudentsAndPlacedStudentsController)
  router.get('/get-per-page-students-status',jwtVerification(secretKey),getStudentsAndPlacedStudentsController)
  router.post('/add-advisor',jwtVerification(secretKey),addAdvisorController)
  router.post('/advisor-login',advisorLoginController)
  router.get('/get-student-dashboard-details/:studentId',jwtVerification(secretKey),getStdDashboardDetailsController)
  router.get('/get-advisor-details/:advisorId',jwtVerification(secretKey),getAdvisorDetailsController)
  router.get('/get-all-advisors',getAllAdvisorsController)
  router.patch('/update-advisor-status',jwtVerification(secretKey),updateAdvisorStatusController)
  router.get('/get-initiator-details',jwtVerification(secretKey),getReviewInitiatorsController)
  router.patch('/update-review-status',jwtVerification(secretKey),updateReviewStatusController)
  router.get('/get-particular-student-profile/:studentId',jwtVerification(secretKey),getStudentProfileController)
  router.post('/advisor-google-login',advisorGoogleLoginController)
  router.post('/student-google-login',studentGoogleLoginController)
  router.post('/reviewer-google-login',reviewerGoogleLoginController)
  router.post('/superlead-google-login',superleadGoogleLoginController)
  router.get('/get-all-chat-students',jwtVerification(secretKey),getAllChatStudentsController)
  router.get('/get-all-chat-superleads',jwtVerification(secretKey),getAllChatSuperleadsController)
  return router
}
