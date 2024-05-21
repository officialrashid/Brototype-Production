import express from "express"
import {superlead_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController,patchProfileController,getChatAllSuperleadsController,updateActivityEventController,getActivityEventsController,getActivityTimeLineupController,EditActivityEventController,deleteActivityEventController} = superlead_Controller(dependencies) 

  router.post('/profile-update',upload.single("image"),jwtVerification(secretKey),profileUpdateController)
  router.get('/get-superlead-profile/:superleadId',jwtVerification(secretKey),getProfileController)
  router.patch('/update-superlead-profile',upload.single("image"),jwtVerification(secretKey),patchProfileController)
  router.get('/get-chat-all-superleads',jwtVerification(secretKey),getChatAllSuperleadsController)
  router.post('/create-activity-event',jwtVerification(secretKey),updateActivityEventController)
  router.get('/get-activity-events/:superleadId',jwtVerification(secretKey),getActivityEventsController)
  router.get('/get-activity-timelineup/:superleadId',jwtVerification(secretKey),getActivityTimeLineupController)
  router.patch('/update-activity-event',jwtVerification(secretKey),EditActivityEventController)
  router.delete('/delete-activity-event',jwtVerification(secretKey),deleteActivityEventController)
  return router
}
