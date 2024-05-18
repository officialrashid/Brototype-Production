import { IContentInterface } from "../interfaces/IContentInterface";
import { IContentRepository } from "../interfaces/IContentRepository";
import { IContentInteractor } from "../interfaces/IContentInteractor";

export class ContentInteractor implements IContentInteractor{

    private contentRepository:IContentRepository

    constructor(contentRepository:IContentRepository){
        this.contentRepository=contentRepository
    }
    addContent(contentDetails: IContentInterface) {

       return  this.contentRepository.createContent(contentDetails)
        
    }
    editContent(content:string, id: string,contentImage?:string) {
      if(contentImage){
        return this.contentRepository.updateContent(content,id,contentImage)
      }
      else{
        return this.contentRepository.updateContent(content,id)

      }

      
        
    }
     deleteContent(id: string) {
      return this.contentRepository.deleteContent(id)   
    }
    getContent() {
      return this.contentRepository.getContent()     
    }
}