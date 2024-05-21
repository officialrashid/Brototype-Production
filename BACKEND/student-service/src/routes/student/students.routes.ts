import express from "express"
import {students_controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
import { profileUpdateValidationRules } from "../../input-validation/profileUpdateValidation"
import verifyTokenMiddleware from "../../custom-token/custom-tokenverify";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController,updatePersonalDetailsController,updateAddressDetailsController,updateEducationDetailsController,getBacthwiseBestStdController,getWeeklyPerformanceController,getCourseCompletionController,getAllPerformanceController,getExtendDetailsController,requestExtentionController,getExtendRequestController,getReviewDetailsController,secondExtendRequestController,governmentIdUpdateController,getAllStudentsController,getPerPageStudentController,getAllChatStudentsController,addReviewResultController,getReviewStudentsController} = students_controller(dependencies) 

  router.post('/profile-update',jwtVerification(secretKey),upload.single("image"),profileUpdateValidationRules,profileUpdateController)

  // router.get('/get-profile/:studentId', jwtVerification(secretKey), getProfileController);
  router.get('/get-profile/:studentId', jwtVerification(secretKey),getProfileController);
  router.post('/update-personal-details',jwtVerification(secretKey),updatePersonalDetailsController)
  router.post('/update-address-details',jwtVerification(secretKey),updateAddressDetailsController)
  router.post('/update-education-details',jwtVerification(secretKey),updateEducationDetailsController)
  router.get('/get-best-students/:batchId',jwtVerification(secretKey),getBacthwiseBestStdController)
  router.get('/get-weekly-performance',jwtVerification(secretKey),getWeeklyPerformanceController)
  router.get('/get-course-completion',jwtVerification(secretKey),getCourseCompletionController)
  router.get('/get-all-performance',jwtVerification(secretKey),getAllPerformanceController)
  router.get('/get-extend-details',jwtVerification(secretKey),getExtendDetailsController)
  router.post('/request-extention',jwtVerification(secretKey),requestExtentionController)
  router.get('/get-request-extend/:studentId',jwtVerification(secretKey),getExtendRequestController)
  router.get('/get-review-details',jwtVerification(secretKey),getReviewDetailsController)
  router.post('/second-extend-request/:extendId',jwtVerification(secretKey),secondExtendRequestController)
  router.post('/update-governmentId',jwtVerification(secretKey),upload.single("image"),governmentIdUpdateController)
  router.get('/get-all-students',jwtVerification(secretKey),getAllStudentsController)
  router.get('/get-per-page-students',jwtVerification(secretKey),getPerPageStudentController)
  router.get('/get-all-chat-students/:uniqueId',jwtVerification(secretKey),getAllChatStudentsController)
  router.post('/add-student-review-result',jwtVerification(secretKey),addReviewResultController)
  router.get('/get-review-students',jwtVerification(secretKey),getReviewStudentsController)
  return router
}


