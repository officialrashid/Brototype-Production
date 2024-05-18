import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
interface invigilatorLogin {
    // Define the structure of the data parameter here
    uniqueId: string;
  
  }
export const invigilatorLogin = async (data:invigilatorLogin): Promise<AxiosResponse> =>{
   
    try{
  
      const response = await axios.post('http://localhost:3002/api/fumigation/invigilator-login',data);
      return response
    } catch(error){
      console.log("Error in the invigilatorLogin",error);
      throw error;  
    }
  
  }
  
  export const invigilatorGoogleLogin = async (email:string)=>{
      try{
        const response= await axios.post('http://localhost:3002/api/fumigation/invigilator-google-login',email)
        return response
      } catch (err){
        return {status:false,message:"Some issue in Google Sign in"}
      }
  }