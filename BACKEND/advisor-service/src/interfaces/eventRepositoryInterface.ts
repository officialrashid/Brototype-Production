import { eventInterface } from "./eventInterface";



export interface eventRepositoryInterface{

     addEvent(event:eventInterface,coordinatorId:string):any
     editEvent(coordinatorId:string,event:eventInterface):any
     deleteEvent(coordinatorId:string,eventId:string):any
}