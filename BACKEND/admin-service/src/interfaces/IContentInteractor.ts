import { IContentInterface } from "./IContentInterface"



export interface IContentInteractor{

    addContent(contentDetails:IContentInterface):any
    editContent(content:string, id:string,contentImage?:string):any
    deleteContent(id:string):any
    getContent():any

}