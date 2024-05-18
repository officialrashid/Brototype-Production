import mongoose, { Schema,model } from "mongoose";
import { IReviewSchema } from "../interfaces/IReviewSchema";
import { IReview } from "../interfaces/IReviewSchema";



const reviewSchema=new Schema<IReviewSchema>(
    {
        coordinatorId:mongoose.Schema.Types.ObjectId,
        reviews:[{
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                auto:true
            },
            studentId:mongoose.Schema.Types.ObjectId,
            reviewerId:mongoose.Schema.Types.ObjectId,
            reviewStatus:{
                type:String,
                default:"notcompleted"
            },
            assignedDate:{
            type:Date,
            default:null
           },
            conductedDate:{
                type:Date,
                default:null
            },
            reviewDate:{
                type:Date,
                default:function (this:IReview){
                    const assigned=new Date(this.assignedDate)
                    return assigned? new Date(assigned.setDate(assigned.getDate()+2)):null
                }
            },
            startTime:{
                type:String,
                default:null
            },
            endTime:{
                type:String,
                default:null
            },
            scheduledDate:{
                type:String,
                default:null
            },
            slotId:{
                type:mongoose.Schema.Types.ObjectId,
                default:null
            },
            eventId:{
                type:mongoose.Schema.Types.ObjectId,
                default:null
            },
            meetingLink:{
                type:String,
                default:null
            },
            isExtendReqSend:{
                type:Boolean,
                default:false
            },
            extendReason:{
                type:String,
                default:null
            },
           
            extendStatus:{
                type:String,
                default:null
            },
            createdAt:{
                type:Date,
                default:Date.now()
            },
            extendDays:{
                type:String,
                default:""
            }
           
        
            
            
            
           
        },
        
        ]

    },
    {
        timestamps:true
    }
)

const reviews=model<IReviewSchema>('review',reviewSchema)
export {reviews}