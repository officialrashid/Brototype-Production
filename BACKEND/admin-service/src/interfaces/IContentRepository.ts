import { IContentInterface } from "./IContentInterface"


export interface IContentRepository{

   createContent(content:IContentInterface):any
   updateContent(content:string,id:string,contentImageUrl?:string):any
   deleteContent(id:string):any,
   getContent():any
}