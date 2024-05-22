import express from "express"
import {task_Controller} from "../../libs/controllers";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {updatePersonalWorkoutController,updateTechnicalWorkoutController,updateMiscellaneousWorkoutController,getUpdateTaskController,getEditTaskDetailsController,addPersonalWorkoutsTaskController,getPersonalWorkoutTaskController,addTechnicalWorkoutsTaskController,getTechnicalWorkoutTaskController,addMiscellaneousWorkoutsTaskController,getMiscellaneousWorkoutTaskController,getWeekTaskController,getAdvisorCreatedTaskController,deleteAdvisorCreatedTaskController,getAllCreatedTaskController} = task_Controller(dependencies) 

  router.post('/update-personal-workout',jwtVerification(secretKey),updatePersonalWorkoutController)
  router.post('/update-technical-workout',jwtVerification(secretKey),updateTechnicalWorkoutController)
  router.post('/update-miscellaneous-workout',jwtVerification(secretKey),updateMiscellaneousWorkoutController)
  router.get('/get-update-task/:studentId',jwtVerification(secretKey),getUpdateTaskController)
  router.get('/get-edit-task-details',jwtVerification(secretKey),getEditTaskDetailsController)
  router.post('/add-personalWorkout-task',jwtVerification(secretKey),addPersonalWorkoutsTaskController)
  router.post('/add-technicalWorkout-task',jwtVerification(secretKey),addTechnicalWorkoutsTaskController)
  router.post('/add-miscellaneousWorkout-task',jwtVerification(secretKey),addMiscellaneousWorkoutsTaskController)
  router.get('/get-personalWorkout-task/:week',jwtVerification(secretKey),getPersonalWorkoutTaskController)
  router.get('/get-miscellaneousWorkout-task/:week',jwtVerification(secretKey),getMiscellaneousWorkoutTaskController)
  router.get('/get-technicalWorkout-task',jwtVerification(secretKey),getTechnicalWorkoutTaskController)
  router.get('/get-student-week-task',jwtVerification(secretKey),getWeekTaskController)
  router.get('/get-advisor-created-task',getAdvisorCreatedTaskController)
  router.delete('/delete-advisor-created-task',deleteAdvisorCreatedTaskController)
  router.get('/get-all-created-task/:technicalLeadId',getAllCreatedTaskController)
  return router
}


