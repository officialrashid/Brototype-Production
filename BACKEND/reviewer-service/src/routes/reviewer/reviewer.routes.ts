import express from "express"
import {reviewer_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
import verifyTokenMiddleware from "../../custom-token/custom-tokenverify";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {scheduleTimeController,getScheduleEventsController,updateScheduleEventsController,deleteScheduleEventsController,getDayTimeLineupController,getAllDetailsController,profileUpdateController,updateWorkDetailsController,getReviewerProfileController,reviewTakeCountController,getAllReviewersProfileController,getBestReviewersController,getReviewCountAnalyzeController,getPerPageReviewersController,getAllChatReviewersController,getParticularEventsController,updateParticularEventsController,cancelParticularEventsController,getDomainWiseReviewersController,updateReviewCompletedController,getReviewesController} = reviewer_Controller(dependencies) 

  router.post('/schedule-event',jwtVerification(secretKey),scheduleTimeController)
  router.get('/get-schedule-events/:reviewerId',jwtVerification(secretKey),getScheduleEventsController)
  router.patch('/update-event',jwtVerification(secretKey),updateScheduleEventsController)
  router.delete('/delete-event',jwtVerification(secretKey),deleteScheduleEventsController)
  router.get('/get-day-timeLine',jwtVerification(secretKey),getDayTimeLineupController)
  router.get('/get-reviewer-details/:reviewerId',jwtVerification(secretKey),getAllDetailsController)
  router.get('/review-take-count/:reviewerId',jwtVerification(secretKey),reviewTakeCountController)
  router.post('/profile-update',jwtVerification(secretKey),upload.single("image"),profileUpdateController)
  router.post('/update-work-details',jwtVerification(secretKey),updateWorkDetailsController)
  router.get('/get-reviewer-profile/:reviewerId',jwtVerification(secretKey),getReviewerProfileController)
  router.get('/get-all-reviewers-profile/:currentPage',jwtVerification(secretKey),getAllReviewersProfileController)
  router.get('/get-best-reviewers',jwtVerification(secretKey),getBestReviewersController)
  router.get('/get-review-count-analyze',jwtVerification(secretKey),getReviewCountAnalyzeController)
  router.get('/get-per-page-reviewers/:perPage',jwtVerification(secretKey),getPerPageReviewersController)
  router.get('/get-all-chat-reviewers',jwtVerification(secretKey),getAllChatReviewersController)
  router.get('/get-particular-date-events/:reviewerId',jwtVerification(secretKey),getParticularEventsController)
  router.patch('/update-particular-date-events',jwtVerification(secretKey),updateParticularEventsController)
  router.patch('/cancel-particular-date-events',jwtVerification(secretKey),cancelParticularEventsController)
  router.get('/get-domain-wise-reviewer/:domain',jwtVerification(secretKey),getDomainWiseReviewersController)
  router.patch('/update-review-completed-status',jwtVerification(secretKey),updateReviewCompletedController)
  router.get('/get-reviewes/:reviewerId',jwtVerification(secretKey),getReviewesController)
  return router
}
