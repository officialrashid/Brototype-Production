import { contentData } from "../entities/contentEntity";
import { IContentInterface } from "../interfaces/IContentInterface";
import { IContentRepository } from "../interfaces/IContentRepository";

export class ContentRepository implements IContentRepository{


       async createContent(content:IContentInterface) {

            const response= await  contentData.create(content)
            return response
        }
        async updateContent(content: string,id: string,contentImageurl?:string) {

           if(!contentImageurl){
            const response=await contentData.findByIdAndUpdate(id,{content:content},{new:true})

            return response
           }
           else{
            const response=await contentData.findByIdAndUpdate(id,{content:content,contentImage:contentImageurl},{new:true})

            return response

           }
        }
        async deleteContent(id: string) {
            const response= await contentData.findByIdAndDelete(id)
            return response
        }

        async getContent(){
         const response= await contentData.find()
         return response
        }
}