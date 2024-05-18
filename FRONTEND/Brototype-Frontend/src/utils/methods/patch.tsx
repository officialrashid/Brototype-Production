///// **********   //////

import studentApi from "../baseUrl/studentBaseUrl"
import reviewerApi from "../baseUrl/reviewerBaseUrl"
import authenticationApi from "../baseUrl/authenticationBaseUrl"
import fumigationApi from "../baseUrl/fumigationBaseUrl"
import superleadApi from "../baseUrl/superleadBaseUrl"
import taskApi from "../baseUrl/taskBaseUrl"
import chatApi from "../baseUrl/baseUrl"
import reviewApi from "../baseUrl/reviewBaseUrl"
export const updateEvents = async (data:any)=>{
    console.log(data,")()((&&&&&&&&");
    
    try {
     const resposne = await reviewerApi.patch('/api/reviewer/update-event',data)
     return resposne.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const updateStudentStatus = async (data:any)=>{
    try {
     const resposne = await authenticationApi.patch('/api/auth/update-student-status',data)
     return resposne?.data?.response
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const updateReviewerStatus = async (data:any)=>{
    try {
     const resposne = await authenticationApi.patch('/api/auth/update-reviewer-status',data)
     return resposne?.data?.response
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const updatePlacedStatus = async (data:any)=>{
    try {
     const resposne = await authenticationApi.patch('/api/auth/update-student-placed-status',data)
     return resposne?.data?.response
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const updateSuperleadProfile = async (data:any)=>{
    console.log(data,"data in patchssss");
    
    try {
     const resposne = await superleadApi.patch('/api/superlead/update-superlead-profile',data)
     return resposne?.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  export const updateFumigationStudentStatus = async (data:any)=>{
    console.log(data,"data in patchssss");
    
    try {
     const resposne = await fumigationApi.patch('/api/fumigation/update-student-status',data)
     return resposne?.data
    } catch(err){
      return {status:false,message:"some issue in the Address details update"}
    }
  
  }
  
  
  export const updateActivityEvents = async (data:any)=>{

    try {
     const resposne = await superleadApi.patch('/api/superlead/update-activity-event',data)
     return resposne?.data
    } catch(err){
      return {status:false,message:"some issue in the add Reviewer"}
    }
  
  
  }

  // PATCH METHOD FOR CHAT AND VIDEO SERVICE /////

  export const updateGroupParticipantStatus = async (data: any) => {
    try {
      const resposne = await chatApi.patch('/api/chat-and-video/update-group-participant-status', data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  export const updateGroupMembers = async (data: any) => {
    try {
      console.log(data,"data update group memeberss");
      
      const resposne = await chatApi.patch('/api/chat-and-video/update-group-members', data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  export const setUnreadMsgCountZero = async (data: any) => {
    try {
      const resposne = await chatApi.patch('/api/chat-and-video/update-unread-msg-zero', data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  export const setGroupUnreadMsgCountZero = async (data: any) => {
    try {
      const resposne = await chatApi.patch('/api/chat-and-video/update-group-unread-msg-zero', data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }

//// *** Review Api Section ******/////
  export const updateMeetUrl = async (coordinatorId: string,reviewId:string,meetingUrl:string) => {
    try {
      const data = {
        coordinatorId,
        reviewId,
        meetingUrl
      }
      const resposne = await reviewApi.patch('/review/update-meeting-link',data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  
  //// ******* Advisor Api Sections ////

  export const updateAdvisorStatus = async (data:any) => {
    try {
      const resposne = await authenticationApi.patch('/api/auth/update-advisor-status',data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  export const updateReviewStatus = async (data:any) => {
    try {
      const resposne = await reviewerApi.patch('/api/reviewer/update-review-completed-status',data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  export const updateStdtReviewStatus = async (data:any) => {
    try {
      const resposne = await authenticationApi.patch('/api/auth/update-review-status',data)
      return resposne?.data
    } catch (err) {
      return { status: false, message: "some issue in the add Reviewer" }
    }
  
  
  }
  