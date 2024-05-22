import { eventIntercatorInterface } from "../interfaces/eventInteracorInterface";
import { Request,Response } from "express";
import { eventInterface } from "../interfaces/eventInterface";


export class eventController{
    
    private eventInteractor:eventIntercatorInterface

    constructor(eventInteractor:eventIntercatorInterface){
        this.eventInteractor=eventInteractor
    }

    async onCreateEvent(req:Request,res:Response){
        console.log(req.body);
        const eventData:eventInterface=req.body
        if(! eventData.id){
            
        const response= await this.eventInteractor.addEvent(eventData,eventData.coordinatorId)
        //res.json(response)
        return res.json(response)

        }
        else{
            console.log('edit event');
            
            const response=await this.eventInteractor.editevent(eventData,eventData.coordinatorId)
           return  res.json(response)

        }
          
        

    }


   async  OngetEvents(req:Request,res:Response){

    }

    async OnDeleteEvents(req:Request,res:Response){
        const response=await this.eventInteractor.deleteEvent('',req.params.id)

        return res.json(response)

    }

    
}