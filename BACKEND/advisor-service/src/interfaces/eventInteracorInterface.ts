import { eventInterface } from "./eventInterface";


export interface eventIntercatorInterface{

    addEvent(event:eventInterface,coordinatorId:string):any
    editevent(event:eventInterface,coordinatorId:string):any
    deleteEvent(coordinatorId:string,eventId:string):any
 

}