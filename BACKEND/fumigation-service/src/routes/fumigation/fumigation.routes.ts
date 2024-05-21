import express from "express"
import {fumigation_Controller} from "../../libs/controllers";
import jwt from "jsonwebtoken"
import confirmPassedStudents from "../../libs/controllers/fumigation/studentsController/confirmPassedStudents";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
// const = require('../..Middleware.js')
export default (dependencies:any)=>{

  const router = express.Router();
  //  import all controll //
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController,invigilatorLoginController,createInvigilatorController,getAllBatches,getStudentsMarkController,removeBatchwiseStudentsController,removeBatchController,editBatchController,editBatchSubmitController,getInvigilatorsController,editInvigilatorController,editInvigilatorSubmitController,removeInvigilatorsController,passedStudentsController,failedStudentsController,editStudentMarkController,invigilatorGoogleLoginController,confirmPassedStudentsController,getAllFumigationStudentsController,updateStudentStatusController,getPerPageStudentController,superleadAddStudentController,getPendingStudentsController} = fumigation_Controller(dependencies) 
// define the all api ..
  router.post('/enquery',fumigationController) //
  router.get('/get-enquery',jwtVerification(secretKey),getAllPendingStudent) //
  router.post('/create-batch',jwtVerification(secretKey),createBatch) //
  router.patch('/add-students',jwtVerification(secretKey),addStudents)

  router.get('/get-batchwise-students/:batchId',jwtVerification(secretKey),getBatchwiseStudentsController)
  router.patch('/add-students-mark',jwtVerification(secretKey),studentsMarkController)
  router.post('/invigilator-login',jwtVerification(secretKey),invigilatorLoginController) //
  router.post('/create-invigilator',jwtVerification(secretKey),createInvigilatorController) //
  router.get('/get-all-batches',jwtVerification(secretKey),getAllBatches)
 
  router.get('/get-students-mark',jwtVerification(secretKey),getStudentsMarkController)
  router.delete('/remove-batchwise-students',jwtVerification(secretKey),removeBatchwiseStudentsController)
  router.delete('/remove-batch',jwtVerification(secretKey),removeBatchController)
  router.get('/edit-batch/:batchId',jwtVerification(secretKey),editBatchController)
  router.patch('/edit-batch-submit',jwtVerification(secretKey),editBatchSubmitController)
  router.get('/get-all-invigilators',jwtVerification(secretKey),getInvigilatorsController)
  router.get('/edit-invigilator',jwtVerification(secretKey),editInvigilatorController)
  router.patch('/edit-invigilator-submit',jwtVerification(secretKey),editInvigilatorSubmitController)
  router.delete("/remove-invigilators/:invigilatorId",jwtVerification(secretKey),removeInvigilatorsController)
  router.get("/get-passed-students",jwtVerification(secretKey),passedStudentsController)
  router.get("/get-failed-students",jwtVerification(secretKey),failedStudentsController)
  router.get('/edit-student-mark',jwtVerification(secretKey),editStudentMarkController)
  router.post('/invigilator-google-login',invigilatorGoogleLoginController)
  router.post('/confirm-passed-students',jwtVerification(secretKey),confirmPassedStudentsController)
  router.get('/get-all-fumigation-students',jwtVerification(secretKey),getAllFumigationStudentsController)
  router.patch('/update-student-status',jwtVerification(secretKey),updateStudentStatusController)
  router.get('/get-per-page-students',jwtVerification(secretKey),getPerPageStudentController)
  router.post('/superlead-add-student',jwtVerification(secretKey),superleadAddStudentController)
  router.get('/get-pending-students/:uniqueId',jwtVerification(secretKey),getPendingStudentsController)
  return router
}
