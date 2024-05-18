///// ****** reviewer delete api section ////

import studentApi from "../baseUrl/studentBaseUrl"
import reviewerApi from "../baseUrl/reviewerBaseUrl"
import authenticationApi from "../baseUrl/authenticationBaseUrl"
import fumigationApi from "../baseUrl/fumigationBaseUrl"
import superleadApi from "../baseUrl/superleadBaseUrl"
import taskApi from "../baseUrl/taskBaseUrl"
import chatApi from "../baseUrl/baseUrl"

export const deleteEvents = async (data: {id: string; reviewerId: string;})=>{
    console.log(data,")()((&&&&&&&&");
    
    try {
     const resposne = await reviewerApi.delete('/api/reviewer/delete-event',{ params: data })
     return resposne.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const deleteActivityEvents = async (data: {id: string; superleadId: string;})=>{
    console.log(data,")()((&&&&&&&&");
    
    try {
     const resposne = await superleadApi.delete('/api/superlead/delete-activity-event',{ params: data })
     return resposne.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }

  // CHAT AND VIDEO SERVICE DELETE ACTIONS /////
  export const deleteMessage = async (data: {messageId: string; action: string;})=>{ 
    try {
     const resposne = await chatApi.delete('/api/chat-and-video/delete-message',{ params: data })
     return resposne.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }


  