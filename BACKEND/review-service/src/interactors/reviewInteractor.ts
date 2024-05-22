import { IReviewInteractor } from "../interfaces/IReviewInteractor";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import  { ObjectId } from "mongoose"
import axios from 'axios'

export class ReviewInteractor implements IReviewInteractor{

    private ReviewRepository:IReviewRepository
    constructor(ReviewRepository:IReviewRepository){
       this.ReviewRepository=ReviewRepository
    }


    createReviewData(coordinatorsData: any,studentsData: any) {

        return this.ReviewRepository.addReviewData(coordinatorsData,studentsData)
        
    }
    sortCoordinators(coordinators:Array<{_id:ObjectId,created:Date}>){

        return coordinators.sort((coordinatorOne:any,coordinatorSecond:any)=>parseInt(coordinatorOne.created)-parseInt(coordinatorSecond.created))

      }

 scheduler(id:string,students:any, coordinators:any) {
        

interface scheduleReviews{
    reviewDate:Date,
    reviews:[{}]
}
//type ObjectIdArray = ObjectId[]
        let scheduledStudents:any=[]
        let sortedCoordinators:any=coordinators
        let remainingStudents:any=[]
        let poppedStudent:any
        let shiftedStudent:any
        let shiftedStudentArray:any
        let orgStudentCount:number=students.length
        let scheduledReviews:any=[]

        if(orgStudentCount==0 || coordinators.length===0){

               //student count is zero

               if(orgStudentCount===0){
                throw Error('Sorry,There is no students')
              }
    
              //coordinators count is zero
    
            else{
                throw Error('Sorry,There is no coordinators')
              }

          

        }

        else{

          //student count and coordinators count are equal [case--1] --------[TESTEDDDDDD]

          if(orgStudentCount===coordinators.length){
            for(let i=0;i<coordinators.length;i++){
        scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
            return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
          }

           //student count is less than the coordinators count 3<20 [case-2]-------[TESTEDDDDDD]
           if((students.length!==0 && sortedCoordinators.length!==0) && (students.length<sortedCoordinators.length)){
            for(let i=0;i<orgStudentCount;i++){
                 console.log(students.length,i);
                 
                  shiftedStudent=students.shift()
                  console.log(shiftedStudent);
                  
                  if(shiftedStudent!==undefined){
                    scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[shiftedStudent]})
                  }
            
                
            }
          
          
          return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
      }

      //student count is greater than the coordinators count student count [case-3 test cased passed]
      if((students.length!==0&&coordinators.length!==0)&&(students.length>coordinators.length)){
          console.log('review intractrooooooo');
          
        //Both are even numbers
        if(students.length%2===0&&coordinators.length%2===0){
          console.log('workedd');
          remainingStudents=students.splice(coordinators.length,orgStudentCount)
          console.log(remainingStudents,'remian');

          for(let i=0;i<coordinators.length;i++){ 
              scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

          }
          //remaining students assigning

          if(remainingStudents.length){
            console.log(remainingStudents.length,);
            let orgRemainingStudentCount=remainingStudents.length
            for(let i=0;i<coordinators.length;i++){
              console.log(scheduledReviews);
              let j
              for(j=0;j<Math.floor(orgRemainingStudentCount/coordinators.length);j++){
                if(remainingStudents[j]==undefined){
                  break;
                }else{
                  scheduledReviews[i].StudentList.push(remainingStudents[j])

                }

              }
              remainingStudents.splice(0,j)


              
    
            }
          }
          return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
        }
        

        //[case-4]student count is odd number,and coordinators count is even--test case passsesd

        if(students.length%2!==0 && coordinators.length%2==0){
           remainingStudents=students.splice(coordinators.length,orgStudentCount)
           console.log(remainingStudents,'remainingggggggggggg============');
           

          for(let i=0;i<coordinators.length;i++){

             scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
                
            
              if(remainingStudents.length){
                console.log(remainingStudents.length,);
                let orgRemainingStudentCount=remainingStudents.length
                for(let i=0;i<coordinators.length;i++){
                  console.log(scheduledReviews);
                  let j
                  for(j=0;j<Math.ceil(orgRemainingStudentCount/coordinators.length);j++){
                    
                    
                    if(remainingStudents[j]==undefined){
                      break;
                    }else{
                      scheduledReviews[i].StudentList.push(remainingStudents[j])
    
                    }
    
                  }
                  remainingStudents.splice(0,j)
    
    
                  
        
                }
              }
             
              return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
            
              }

              

             //[case-5] student count is even  number and, coordinator count is odd number//test case passes

              if(students.length%2==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)
  
              
          for(let i=0;i<coordinators.length;i++){

            scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

           }
               

           if(remainingStudents.length){
            console.log(remainingStudents.length,);
            let orgRemainingStudentCount=remainingStudents.length
            for(let i=0;i<coordinators.length;i++){
              let j
              for(j=0;j<Math.ceil(orgRemainingStudentCount/coordinators.length);j++){
                console.log('entered remaining loopppppppsppppppppp');
                if(remainingStudents[j]==undefined){
                  break;
                }else{
                  scheduledReviews[i].StudentList.push(remainingStudents[j])

                }

              }
              remainingStudents.splice(0,j)


              
    
            }
          }
  
  
  
  
                return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
              }

              // Both student and coordinators count is odd number[case-6]

              if(students.length%2!==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)

                for(let i=0;i<coordinators.length;i++){
                
               scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})
                }

                if(remainingStudents.length){
                  console.log(remainingStudents.length,);
                  let orgRemainingStudentCount=remainingStudents.length
                  for(let i=0;i<coordinators.length;i++){
                    console.log(scheduledReviews);
                    let j
                    for(j=0;j<Math.ceil(orgRemainingStudentCount/coordinators.length);j++){
                      if(remainingStudents[j]==undefined){
                        break;
                      }else{
                        scheduledReviews[i].StudentList.push(remainingStudents[j])
      
                      }
      
                    }
                    remainingStudents.splice(0,j)
      
      
                    
          
                  }
                }
                return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
              }

              
              
            
            }

        }

      }

     async getReviewStudentDetail(studentId:string){

        try{
          // console.log('entered student', studentId);
          
          const student= await axios.get(`http://localhost:6002/api/auth/get-particular-student-profile/${studentId}`)
          // console.log('|||||||||||||||||||||');
          
          console.log(student,"studenteeeee");
          // console.log('|||||||||||||||||||||');
          return student.data.response.response

        }catch(error){

        }

      }

      async  getCoordinatorReviewDetail(coordinatorID:string,type:string){
        
      try{
        // console.log('entereddd');
        
        const coordinatorReviewDetails=  await this.ReviewRepository.coordinatorReviews(coordinatorID,type)
         console.log(coordinatorReviewDetails);
        const reviews=coordinatorReviewDetails
        // console.log(reviews);
        
        const studentDetails=await Promise.all(reviews.map(async (student:any)=>{
// console.log(student,'studennnttttttttttttt');

       const studentData:any=await this.getReviewStudentDetail(student._doc.studentId)
//console.log(studentData);

       return {...student._doc,name:studentData.name,batch:studentData.batch,currentWeek:studentData.currentWeek,domain:studentData.domain}

        }))
         console.log('student detaislsssssssssssss');
         
      console.log(studentDetails);
        return studentDetails
      }catch(error){
        console.log(error);
        
        return {error,message:"there is an error in fetching the reviews"}
      }


       }



       async reviewbookingUpdation(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string,cancel:boolean){
        console.log('interactorr called');
        return this.ReviewRepository.addReviewBookingData(coordinatorId,reviewId,reviewerId,eventId,slotId,startTime,endTime,scheduledDate,cancel)
       }

        reviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string){

          return this.ReviewRepository.addReviewStatusUpdation(coordinatorId,reviewId,reviewStatus)
        

       }

       async  coordinatorsReviews(coordinatorId:string){
        return this.ReviewRepository.getIndividualCoordinatorReview(coordinatorId)
             
       }

       async meetingLinkUpdation(meetingLink:string,coordinatorId:string,reviwId:string){

        return this.ReviewRepository.addmeetingLink(meetingLink,coordinatorId,reviwId)

       }
       async getMeetingLink(coordinatorId:string,reviewId:string){

        return this.ReviewRepository.findMeetingLink(coordinatorId,reviewId)

       }
       getStudentreview(studentId: string) {
         return this.ReviewRepository.findStudentreview(studentId)
       }
     
       async getCoordinatorDetail(coordinatorId:string){

        try{
          // console.log('entered student', studentId);
          
          const student= await axios.get(`http://localhost:4001/student-service/students/${coordinatorId}`)
          // console.log('|||||||||||||||||||||');
          
          // console.log(student.data);
          // console.log('|||||||||||||||||||||');
          return student.data

        }catch(error){

        }

      }

      sendExtendRequest(coordinatorId:string,reviewId:string,extendReason:string,extendDays:string){

        return this.ReviewRepository.updateExtendRequest(coordinatorId,reviewId,extendReason,extendDays)
      }

      getCoordinatorExtendRequests(coordinatorId: string) {
        return this.ReviewRepository.findCoordinatorExtendReqs(coordinatorId)
      }

      studentExtendRequests(studentId: string) {
        return this.ReviewRepository.findStudentExtendRequests(studentId)
      }

       
      updateExtendReqStatus(coordinatorId: string, reviewId: string, type: string) {
        return this.ReviewRepository.updateExtendRequestByCoordinator(coordinatorId,reviewId,type)
      }

      getPerformanceGraphData(coordinatorId: string) {
        return this.ReviewRepository.findPerformanceGraphData(coordinatorId)
        
      }

      async getTopFiveCoordinators() {


        try{
          // console.log('entereddd');
          
          const fivecoordinatorDetails=  await this.ReviewRepository.findTopFiveCoordinators()
           console.log(fivecoordinatorDetails);
          const coordinators=fivecoordinatorDetails
          // console.log(reviews);
          
          const coordinatorDetails=await Promise.all(coordinators.map(async (coordinator:any)=>{
  // console.log(student,'studennnttttttttttttt');
  
         const coordinatorData:any=await this.getFiveCoordinatorDetails(coordinator._id)
  //console.log(studentData);
  
         return {coordinatorData,coordinator}
  
          }))
           console.log('student detaislsssssssssssss');
           
        console.log(coordinatorDetails);
          return coordinatorDetails
        }catch(error){
          console.log(error);
          
          return {error,message:"there is an error in fetching the reviews"}
        }




        //return this.ReviewRepository.findTopFiveCoordinators()
      }

      getWeeklySummaryData(coordinatorId: string) {
        return this.ReviewRepository.findSummaryGraphData(coordinatorId)
      }

      async getFiveCoordinatorDetails(advisorId:string){
        try{
          // console.log('entered student', studentId);
          
          const coordinator= await axios.get(`http://localhost:6002/api/auth/get-advisor-details/${advisorId}`)
          // console.log('|||||||||||||||||||||');
          console.log(coordinator.data,"studenteeeee");
          // console.log('|||||||||||||||||||||');
          return coordinator.data.response.response
 
        }catch(error){

        }


      }

      getCoordinatorTaskDetails(coordinatorId: string) {
        return this.ReviewRepository.findCoordinatorReviewDetail(coordinatorId)
      }


}