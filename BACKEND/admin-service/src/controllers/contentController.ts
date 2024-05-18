import { IContentInteractor } from "../interfaces/IContentInteractor";
import { Response,Request } from "express";
import { IContentInterface } from "../interfaces/IContentInterface";


export class ContentController {


    private controllerInteractor:IContentInteractor

    constructor(controllerInteractor:IContentInteractor){

        this.controllerInteractor=controllerInteractor
    }
    async onGetContent(req:Request,res:Response){
        const response=await this.controllerInteractor.getContent()

        return res.json(response)
    }

   async  onCreateContent(req:Request,res:Response){
        let contentData:IContentInterface=req.body
        console.log(contentData);
        
        if(!contentData.id){
            console.log(req.body);
         
            console.log(req.file,'form');
            
             contentData.contentImage=(req as any).file.location
         
            
            const response= await this.controllerInteractor.addContent(contentData)
    
            return res.json(response)


        }
        else{
            console.log('edit called');
            
            contentData.contentImage=(req as any).file.location
            console.log(contentData,'contentDataa');
            
            const response= await this.controllerInteractor.editContent(contentData.content,contentData.id,contentData.contentImage)
            return res.json(response)
        }
        
 


    }

   async onEditContent(req:Request,res:Response){
        let contentData:{id:string,content:string}=req.body
        console.log(req.body,'edittt',contentData);
        const response= await this.controllerInteractor.editContent(contentData.content,contentData.id)

        return res.json(response)
        

    }
   async onDeleteContent(req:Request,res:Response){
        const id:string=req.params.id
       const response= await this.controllerInteractor.deleteContent(id)
             return res.json({response})

    }

}