import mongoose from "mongoose";
import { scheduledReviews } from "../entities/ReviewScheduler";
import { reviews } from "../entities/ReviewSchema";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import { IReview } from "../interfaces/IReviewSchema";




export class ReviewRepository implements IReviewRepository{



    async addReviewData(coordiantorsData: any, studentsData: any) {

        const scheduledReviewData = await scheduledReviews.create({students:studentsData,coordinators:coordiantorsData})
       return scheduledReviewData
        
    }

 
    async addScheduledReviews(id: string, scheduleReviews: any) {
      const updateScheduledReviews = await scheduledReviews.findByIdAndUpdate(id, { scheduledReviews: scheduleReviews }, { new: true });
      console.log('||||||||||||||||||||||');
      console.log(updateScheduledReviews?.scheduledReviews);

      
      const res = await this.addCoordinatorsReviews(updateScheduledReviews?.scheduledReviews);
      
      return updateScheduledReviews;
    }
    async addCoordinatorsReviews(scheduledReviews: any) {
      for (let i = 0; i < scheduledReviews.length; i++) {
        const coordinatorId:any = scheduledReviews[i].coordinatorsId;
        
        
        let coordinatorReviews = await reviews.findOne({ coordinatorId: coordinatorId });
        console.log('_))))))))))))))))))))))))))))))');
        
       console.log(i,coordinatorReviews);
       console.log('(((((((((((((((((((((');
        
        if (!coordinatorReviews) {
          
          coordinatorReviews = await reviews.create({ coordinatorId: coordinatorId });
        }
    
  
        for (let j = 0; j < scheduledReviews[i].StudentList.length; j++) {
          const reviewObj={
            studentId:scheduledReviews[i].StudentList[j]._id
          }
          coordinatorReviews.reviews.push(reviewObj as IReview);
        }
    

        await coordinatorReviews.save();
      }
    }
    async coordinatorReviews(coordinatorId:string,type:string){

        try{
         const coordinatorReviews=await reviews.findOne({coordinatorId})
         let reviewData:any
         console.log(type,'typeeeee');
         console.log(coordinatorReviews,'cooo');
         
         if(type=='schedule'){
           reviewData=coordinatorReviews?.reviews.filter((review)=>review.reviewStatus=="notcompleted")
          console.log(reviewData,'reviewData');
 
         }else{
           console.log('enterff');
           
           reviewData=coordinatorReviews?.reviews.filter((review)=>review.reviewStatus=="scheduled")
           console.log(reviewData,'reviewData');
 
         }
          
 
          
         if(reviewData?.length){
             return reviewData
         }
         else{
             return []
         }
        }
     
     catch(error:any){
         return {error:error,message:"There is an error "}
     }
 }

 async addReviewBookingData(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string,cancel:boolean) {
    //coodinatorData:
    //reviewObjectId

    if(!cancel){
      const updatefields={$set:{'reviews.$[review].startTime':startTime,'reviews.$[review].endTime':endTime,'reviews.$[review].scheduledDate':scheduledDate,'reviews.$[review].reviewerId':reviewerId,'reviews.$[review].slotId':slotId,'reviews.$[review].eventId':eventId,'reviews.$[review].reviewStatus':"scheduled"}}
      const filter=[{'review._id':reviewId}]
      
  const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
  console.log(response,'ressssss');
  
  return response

    }else{
      const updatefields={$set:{'reviews.$[review].startTime':null,'reviews.$[review].endTime':null,'reviews.$[review].scheduledDate':null,'reviews.$[review].reviewerId':null,'reviews.$[review].slotId':null,'reviews.$[review].eventId':null,'reviews.$[review].reviewStatus':"notcompleted"}}
      const filter=[{'review._id':reviewId}]
      
  const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
  console.log(response,'ressssss');
  
  return response

    }



   

}
   


async getIndividualCoordinatorReview(coordinatorId:string){

    const assignedReviews=await reviews.find({coordinatorId,reviews:{$elemMatch:{reviewStatus:"notcompleted"}}},{
        'reviews.$': 1
      })
    console.log(assignedReviews,'asss');
    

    return assignedReviews

}
async addReviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string) {
    console.log('reppooo');



    const updatefields={$set:{'reviews.$[review].reviewStatus':reviewStatus}}
    const filter=[{'review._id':reviewId}]
    
   const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
   console.log(response,'ressssss');

return response
    
}
async addmeetingLink(meetingLink: string, coordinatorId: string, reviewId: string) {

    const reviewObj=await reviews.findOne({coordinatorId:coordinatorId})
    const reviewData:any=reviewObj?.reviews.filter((data:any)=>{
     return data?._id==reviewId
    })
    if(reviewData[0].meetingLink!==null){
        return reviewData[0].meetingLink
    }else{
        const updatefields={$set:{'reviews.$[review].meetingLink':meetingLink}}
        const filter=[{'review._id':reviewId}]
        
       const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
     return response

    }
    
   
}



 async findMeetingLink(coordinatorId: string, reviewId: string) {

    const filter=[{'review._id':reviewId}]
    
   const response=await reviews.findOne({coordinatorId:coordinatorId})
   const reviewData:any=response?.reviews.filter((data:any)=>{
    return data?._id==reviewId
   })

return reviewData[0].meetingLink
    
}



async findStudentreview(studentId: string) {
    const response=await reviews.aggregate([
        {
          '$project': {
            'coordinatorId': 1, 
            'reviews': 1
          }
        }, {
          '$unwind': {
            'path': '$reviews'
          }
        }, {
          '$match': {
            '$and': [
              {
                'reviews.studentId': new mongoose.Types.ObjectId(studentId)
              }, {
                '$or': [
                  {
                    'reviews.reviewStatus': 'scheduled'
                  }, {
                    'reviews.reviewStatus': 'repeat'
                  }
                ]
              }
            ]
          }
        }
      ])
      if(response.length){
        console.log(response,'ttttttt');
        
        return response[0]
      }else{
        return {error:true,message:"there is no scheduled reviews"}
      }

      
}

  async updateExtendRequest(coordinatorId: string, reviewId: string,extendReason:string,extendDays:string) {
    const updatefields={$set:{'reviews.$[review].isExtendReqSend':true,'reviews.$[review].extendReason':extendReason,'reviews.$[review].extendStatus':"pending"}}
    const filter=[{'review._id':reviewId}]
    const response=await reviews.findOneAndUpdate({coordinatorId},updatefields,{new:true,arrayFilters:filter})

     return response
     
 }

 async findCoordinatorExtendReqs(coordinatorId: string) {
console.log(coordinatorId);

    const reviewsData=await reviews.findOne({coordinatorId:coordinatorId})
    //console.log(reviewsData);
    
    const pendingReviews=reviewsData?.reviews.filter(review=>review?.extendStatus=="pending")
    console.log(pendingReviews,'prrrrrr');
    
    return pendingReviews
     
 }

 async findStudentExtendRequests(studentId:string){
  console.log(studentId);
  
    const response=await reviews.aggregate([
        {
          '$project': {
            'coordinatorId': 1, 
            'reviews': 1
          }
        }, {
          '$unwind': {
            'path': '$reviews'
          }
        }, {
          '$match': {
            '$and': [
              {
                'reviews.studentId': new mongoose.Types.ObjectId(studentId)
              }, {
                '$or': [
                  {
                    'reviews.extendStatus': 'rejected'
                  }, {
                    'reviews.extendStatus': 'approved'
                  },
                  {
                    'reviews.extendStatus': 'pending'
                  }
                ]
              }
            ]
          }
        }
      ])
      console.log(response,'extend');
      
      if(response.length){
        return response
      }else{
        return {error:true,message:"there is no scheduled reviews"}
      }

     

 }

 async updateExtendRequestByCoordinator(coordinatorId:string,reviewId:string,type:string){

   try{
    if(type=="rejected"||type=="approved"){
        const filter=[{'review._id':reviewId}]
        const updatefields={$set:{'reviews.$[review].extendReqStatus':type}}
        const response=await reviews.findOneAndUpdate({coordinatorId},updatefields,{new:true,arrayFilters:filter})
         return response

    }
    else if(type=="repeat"||type=="completed"){
        const reviewsData=await reviews.findOne({coordinatorId})
        const pendingReviews:any=reviewsData?.reviews.find((review:any)=>review._id==reviewId)
        if(pendingReviews.extendReqSend){
            const filter=[{'review._id':reviewId}]
            const updatefields={$set:{'reviews.$[review].extendReqStatus':"rejected"}}
            const response=await reviews.findOneAndUpdate({coordinatorId},updatefields,{new:true,arrayFilters:filter})
             //return response

        }
      
        
    }
    else{
        return {error:true,message:"sorry, there is no review data"}
    }


   }catch(error){
    return error

   }

 }

async  findPerformanceGraphData(coordinatorId:string) {
  try{
    const response=await reviews.aggregate(
      [
            {
              '$match': {
                'coordinatorId':  new mongoose.Types.ObjectId(coordinatorId)
              }
            }, {
              '$unwind': {
                'path': '$reviews'
              }
            }, {
              '$match': {
                'reviews.reviewStatus': 'completed'
              }
            }, {
              '$project': {
                'year': {
                  '$year': '$createdAt'
                }, 
                'month': {
                  '$dateToString': {
                    'format': '%Y-%m', 
                    'date': '$createdAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'year': '$year', 
                  'month': '$month'
                }, 
                'reviewCount': {
                  '$sum': 1
                }
              }
            }, {
              '$project': {
                'month': {
                  '$concat': [
                    {
                      '$substrCP': [
                        '$_id.year', 2, 3
                      ]
                    }, '-', {
                      '$switch': {
                        'branches': [
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '01'
                              ]
                            }, 
                            'then': 'Jan'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '02'
                              ]
                            }, 
                            'then': 'Feb'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '03'
                              ]
                            }, 
                            'then': 'Mar'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '04'
                              ]
                            }, 
                            'then': 'Apr'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '05'
                              ]
                            }, 
                            'then': 'May'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '06'
                              ]
                            }, 
                            'then': 'Jun'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '07'
                              ]
                            }, 
                            'then': 'July'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '08'
                              ]
                            }, 
                            'then': 'Aug'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '09'
                              ]
                            }, 
                            'then': 'sept'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '10'
                              ]
                            }, 
                            'then': 'Oct'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '11'
                              ]
                            }, 
                            'then': 'Nov'
                          },
                          {
                            'case': {
                              '$eq': [
                                {
                                  '$substr': [
                                    '$_id.month', 5, 2
                                  ]
                                }, '12'
                              ]
                            }, 
                            'then': 'Dec'
                          }
                        ], 
                        'default': ''
                      }
                    }
                  ]
                }, 
                '_id': 0, 
                'reviewCount': 1
              }
            }, {
              '$sort': {
                'month': 1
              }
            }
          ])


          console.log(response);
          
          return response



  }
  catch(error){
    return {error:true,}
  }

 }

async findTopFiveCoordinators() {

  try{

    const currentMonthStart=new Date()
    currentMonthStart.setDate(1)
    currentMonthStart.setHours(0,0,0,0)
    const nextMonthStart=new Date(currentMonthStart)
    nextMonthStart.setMonth(nextMonthStart.getMonth()+1)
console.log(currentMonthStart,'ne>>',nextMonthStart)

    const response=await reviews.aggregate([
      {
        '$unwind': {
          'path': '$reviews'
        }
      }, {
        '$match': {
        'reviews.createdAt':
        {
        '$gte':currentMonthStart,
        '$lte':nextMonthStart
        },
          'reviews.reviewStatus': 'completed'
        }
      }, {
        '$group': {
          '_id': '$coordinatorId', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$limit': 5
      }
    ])

    console.log(response,'toppppp');
    return response
    


  }catch(error){

  }
  
}
async findSummaryGraphData(coordinatorId: string) {
  try{
const sevenDaysAgo=new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)

    const response=await reviews.aggregate([
      {
        '$match': {
          'coordinatorId': new mongoose.Types.ObjectId(coordinatorId)
        }
      }, {
        '$unwind': {
          'path': '$reviews'
        }
      }, {
        '$match': {
          'reviews.createdAt':{
            '$gte':sevenDaysAgo

          },
          'reviews.reviewStatus': 'completed'
        }
      }, {
        '$addFields': {
          'dayOfweek': {
            '$dayOfWeek': '$reviews.createdAt'
          }
        }
      }, {
        '$group': {
          '_id': '$dayOfweek', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$addFields': {
          'dayName': {
            '$arrayElemAt': [
              [
                'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
              ], {
                '$subtract': [
                  '$_id', 1
                ]
              }
            ]
          }
        }
      }, 
      {
        '$sort': { '_id': 1 }
      },  
      {
        '$project': {
          '_id': 0, 
          'count': 1, 
          'day': '$dayName'
        }
      }
      
    ])

    console.log(response,'response graphhhhh');
    
    return response

  }catch(error){

  }
}

async findCoordinatorReviewDetail(coordinatorId: string) {

  const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const response = await reviews.aggregate([
  {
    '$match': {
      'coordinatorId': new mongoose.Types.ObjectId(coordinatorId)
    }
  },
  {
    '$unwind': {
      'path': '$reviews'
    }
  },
  {
    '$facet': {
      'reviewStatusCounts': [
        {
          '$group': {
            '_id': '$reviews.reviewStatus',
            'count': { '$sum': 1 }
          }
        }
      ],
      'scheduledTodayCount': [
        {
          '$match': {
            'reviews.scheduledDate': {
              '$gte': today,
              '$lt': tomorrow
            }
          }
        },
        {
          '$count': 'count'
        }
      ]
    }
  }
])


  return response
  
}







}


