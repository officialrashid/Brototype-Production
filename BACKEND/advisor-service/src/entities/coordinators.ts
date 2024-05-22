import mongoose, { Schema, model } from "mongoose";
import { ICoordinators } from "../interfaces/ICoordinators";

const coordinatorSchema= new Schema<ICoordinators>(
    {
        coordinatorsId:mongoose.Schema.Types.ObjectId, 
        events:[{
            _id:{
                type:mongoose.Schema.Types.ObjectId,
               auto:true
            },
            eventType:String,
            eventDescription:String,
            eventLocation:String,
            eventPlatform:String,
            startDate:String,
            endDate:String,
            startTime:String,
            endTime:String,
            conductedDate:Date         
        }]
    },
    {
        timestamps:true
    }
)


const coordinators= model<ICoordinators>('coordinator',coordinatorSchema)

export {coordinators}