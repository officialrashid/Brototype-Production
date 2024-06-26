import { IReviewInteractor } from "../interfaces/IReviewInteractor";
import { Request,Response } from "express";

class ReviewController {
    private reviewInteractor:IReviewInteractor
    constructor(reviewInteractor:IReviewInteractor  ){
        this.reviewInteractor=reviewInteractor
    }

    async OnScheduleReview(id:string,studentsData:any,coordinatorsData:any){
     

            try{
           
            
              
                const response= await  this.reviewInteractor.scheduler(id,studentsData,coordinatorsData)
                return response
            
            }
            catch(error){
                console.error(error);
            // res.status(500).json({ message: 'Error creating product' });
          
          
            }
        
         
    
        
   
        
    }

   async  OncreateReviewData(coordinatorsData:any,studentsData:any){

        const response=  await this.reviewInteractor.createReviewData(coordinatorsData,studentsData)
        
        return response   
   }
   async onGetCoordinatorsReview(req:Request,res:Response){

    const coordinatorId:any=req.query.coordinatorId
    const type:any=req.query.type
    
    console.log(coordinatorId,type);
    
    const response=await this.reviewInteractor.getCoordinatorReviewDetail(coordinatorId,type)
    return res.json(response)

   }
   async onUpdateReviewBooking(data:any){


    
    const { coordinatorId,reviewId,reviewerId,eventId,slotId,startTime,endTime,scheduledDate,cancel}=JSON.parse(data.value.toString())
    const  response=await this.reviewInteractor.reviewbookingUpdation(coordinatorId,reviewId,reviewerId,eventId,slotId,startTime,endTime,scheduledDate,cancel)
    console.log(response)
    

   }


   async onGetAllCoordinatorsReviews(req:Request,res:Response){

    const coordinatorId=req.params.coordinatorId

    const response=await this.reviewInteractor.coordinatorsReviews(coordinatorId)

       return res.json(response)

   }

 async OnGetScheduledReviews(req:Request,res:Response){


    const coordinatorId=req.params.coordinatorId
    const response=await this.reviewInteractor.coordinatorsReviews(coordinatorId)

       return res.json(response)

   }

   async OnReviewStatusUpdation(data:any){
    console.log(JSON.parse(data.value.toString()),"bookingn updation")
    
    const {coordinatorId,reviewId,reviewStatus}=JSON.parse(data.value.toString())
    const response=await this.reviewInteractor.reviewStatusUpdation(coordinatorId,reviewId,reviewStatus)
    
   }

   async OnMeetingLinkUpdation(req:Request,res:Response){

    const {meetingLink,coordinatorId,reviewId}=req.body

    const response=await this.reviewInteractor.meetingLinkUpdation(meetingLink,coordinatorId,reviewId)
     return res.json(response)

   }


   async OngetMeetingLink(req:Request,res:Response){
    const coordinatorId=req.params.id
    const reviewId=req.params.reviewId
    const response=await this.reviewInteractor.getMeetingLink(coordinatorId,reviewId)
    return res.json(response)
   }

   async OnGetStudentReview(req:Request,res:Response){
    console.log('hellooo');
    
    const student:string=req.params.studentId

    const response=await this.reviewInteractor.getStudentreview(student)
    return res.json(response)

   }


   async OnExtendRequestsSend(req:Request,res:Response){
  const{coordinatorId,reviewId,extendReason,extendDays}=req.body
    
  
    const response=await this.reviewInteractor.sendExtendRequest(coordinatorId,reviewId,extendReason,extendDays)
    return res.json(response)

   }

 async OnGetExtendReqsForCoordinators(req:Request,res:Response){
    const coordiantorId=req.params.coordinatorId
    const response=await this.reviewInteractor.getCoordinatorExtendRequests(coordiantorId)
    return res.json(response)
 }

 async OnGetStudentExtendRequests(req:Request,res:Response){
    const studentId=req.params.studentId
    const response=await this.reviewInteractor.studentExtendRequests(studentId)
    return res.json(response)
 }
 async OnChangeStudentExtendStatus(req:Request,res:Response){
    try{
    const type:any=req.query.type
    const coordinatorId:any=req.query.coordinatorId
    const reviewId:any=req.query.reviewId
    const response=this.reviewInteractor.updateExtendReqStatus(coordinatorId,reviewId,type)

return res.json(response)

   
 }catch(error){
    console.log(error,'');
    

    

 }
 }


 async onGetPerformanceGraphData(req:Request,res:Response){

    const coordinatorId:string=req.params.id
    const resposne= await this.reviewInteractor.getPerformanceGraphData(coordinatorId)
    return res.json(resposne)
 }

 async OnGetTopFiveCoordinators(req:Request,res:Response){
    const response=await this.reviewInteractor.getTopFiveCoordinators()
     return res.json(response)

 }

 async OnGetWeeklySummaryGraphData(req:Request,res:Response){
    const coordinatorId:string=req.params.id
    const response=await this.reviewInteractor.getWeeklySummaryData(coordinatorId)
    return res.json(response)
 }
 async onGetCoordinatorReviewDetails(req:Request,res:Response){
   const coordinatorId:string=req.params.id
   const response=await this.reviewInteractor.getCoordinatorTaskDetails(coordinatorId)
   return res.json(response)

 }
}

export {ReviewController}
