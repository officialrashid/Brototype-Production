
import  { ObjectId } from "mongoose"
import { IReviewScheduler } from "../interfaces/IReviewScheduler"



interface scheduleReviews{
    reviewDate:Date,
    reviews:[{}]
}
type ObjectIdArray = ObjectId[]

class   ReviewScheduler implements IReviewScheduler {

    // private studentCount:Number
    // private coordinatorCount:Number=10
    private students:Array<ObjectId>
    private coordinators:Array<{_id:ObjectId}>
  

    private scheduledReviews:Array<{coordinatorsId:ObjectId,StudentList:ObjectIdArray}>=[]
    
      constructor(coordinators:any,students:any){
        this.coordinators=coordinators
        this.students=students
      }






      private sortCoordinators(coordinators:Array<{_id:ObjectId,created:Date}>){

        return coordinators.sort((coordinatorOne:any,coordinatorSecond:any)=>parseInt(coordinatorOne.created)-parseInt(coordinatorSecond.created))

      }

      


      scheduler(students:Array<ObjectId>, coordinators: []) {
        let scheduledStudents:Array<ObjectId>=[]
        let sortedCoordinators:Array<{_id:ObjectId,created:Date}>=this.sortCoordinators(coordinators)
        let remainingStudents:Array<ObjectId>=[]
        let poppedStudent:ObjectId|undefined
        let shiftedStudent:ObjectId|undefined
        let shiftedStudentArray:ObjectIdArray
        let orgStudentCount:number=students.length


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

          //student count and coordinators count are equal

          if(orgStudentCount===coordinators.length){
            for(let i=0;i<coordinators.length;i++){
             this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
            return this.scheduledReviews
          }

           //student count is less than the coordinators count 3<20
           if((students.length!==0 && sortedCoordinators.length!==0) && (students.length<sortedCoordinators.length)){
            console.log('studnt count is less than coordinator called');
              

            for(let i=0;i<students.length;i++){
              
                  shiftedStudent=students.shift()
                  console.log(shiftedStudent);
                  
                  if(shiftedStudent!==undefined)
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[shiftedStudent]})
            }
         
            
            return this.scheduledReviews
      }

      //student count is greater than the coordinators count
      if((students.length!==0&&coordinators.length!==0)&&(students.length>coordinators.length)){

        //Both are even numbers
        if(students.length%coordinators.length===0){
          if(students.length%2===0 && coordinators.length%2===0){

            for(let i=0;i<coordinators.length;i++){
            shiftedStudentArray=students.splice(0,orgStudentCount/coordinators.length)
            this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
            }
            return this.scheduledReviews
          }

        }else{

          for(let i=0;i<coordinators.length;i++){
            remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length)
            for(let j=0;j<1;j++){
              shiftedStudentArray=students.splice(0,Math.floor(students.length/coordinators.length))
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }


          }
          //remaining students assigning

          if(remainingStudents.length){
            for(let i=0;i<remainingStudents.length;i++){
              this.scheduledReviews[i].StudentList.push(remainingStudents[i])
            }
          }
          return this.scheduledReviews
        }
        

        //student count is odd number,and coordinators count is even

        if(students.length%2!==0 && coordinators.length%2==0){
           remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length%coordinators.length)

          for(let i=0;i<coordinators.length;i++){

            remainingStudents=students.splice(students.length-Math.floor(students.length%coordinators.length),students.length)

           

            shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
            if(shiftedStudentArray.length!==0){
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }
                
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                  this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return this.scheduledReviews
            
              }

              

             // student count is even  number and, coordinator count is odd number

              if(students.length%2==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)
  
                for(let i=0;i<coordinators.length;i++){
                  shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))

                  this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }

                if(remainingStudents.length){
                  for(let i=0;i<remainingStudents.length;i++){
                    this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                  }
                }
  
  
  
  
                return this.scheduledReviews
              }
              // Both student and coordinators count is odd number

              if(students.length%2!==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)

                for(let i=0;i<coordinators.length;i++){
                shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
                this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                  this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return this.scheduledReviews
              
            
            }

        }

      }
  
}


export default ReviewScheduler


