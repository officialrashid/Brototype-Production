import axios, { AxiosInstance } from "axios";
import TokenValidCheck from "../../tokenValidCheck/tokenValidCheck";

axios.defaults.withCredentials = true;
const Api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3002", 
});

let userRole: string | null; // Variable to store user role globally

// Add a request interceptor
Api.interceptors.request.use(
  function (config) {
    // Retrieve the user role from local storage
    userRole = localStorage.getItem('role');

    if (userRole === 'student') {
      const studentJwtToken = localStorage.getItem("studentAccessToken");
      const studentCustomToken = localStorage.getItem("studentIdToken");
      if (studentJwtToken && studentCustomToken) {
        config.headers['Authorization'] = `Bearer ${studentJwtToken}`;
        config.headers['Authorization-CustomToken'] = `${studentCustomToken}`;
      }
    } else if(userRole === "reviewer"){
      const reviewerJwtToken = localStorage.getItem("reviewerAccessToken");
      const reviewerCustomToken = localStorage.getItem("reviewerIdToken");
      if (reviewerJwtToken && reviewerCustomToken) {
        config.headers['Authorization'] = `Bearer ${reviewerJwtToken}`;
        config.headers['Authorization-CustomToken'] = `${reviewerCustomToken}`;
      }
    } else if(userRole === "superlead"){
      const superleadJwtToken = localStorage.getItem("superleadAccessToken");
      const superleadCustomToken = localStorage.getItem("superleadIdToken");
      if (superleadJwtToken && superleadCustomToken) {
        config.headers['Authorization'] = `Bearer ${superleadJwtToken}`;
        config.headers['Authorization-CustomToken'] = `${superleadCustomToken}`;
      }
    } else if(userRole === "advisor"){
      const advisorJwtToken = localStorage.getItem("advisorAccessToken");
      const advisorCustomToken = localStorage.getItem("advisorIdToken");
      if (advisorJwtToken && advisorCustomToken) {
        config.headers['Authorization'] = `Bearer ${advisorJwtToken}`;
        config.headers['Authorization-CustomToken'] = `${advisorCustomToken}`;
      }
    } else if(userRole === "invigilator"){
      const invigilatorJwtToken = localStorage.getItem("invigilatorAccessToken");
      const invigilatorCustomToken = localStorage.getItem("invigilatorIdToken");
      if (invigilatorJwtToken && invigilatorCustomToken) {
        config.headers['Authorization'] = `Bearer ${invigilatorJwtToken}`;
        config.headers['Authorization-CustomToken'] = `${invigilatorCustomToken}`;
      }
    }


    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
  
      console.log(error,"errorororr");
    
    if (error.response && error.response.status === 401) {
      // Redirect to the login page or handle as needed
      console.log("error keriii");
      TokenValidCheck(userRole)
   
    }
   
  
    return Promise.reject(error);
  }
);

export default Api;
