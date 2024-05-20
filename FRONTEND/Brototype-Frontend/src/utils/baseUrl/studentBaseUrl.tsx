import axios, { AxiosInstance } from "axios";
import TokenValidCheck from "../../tokenValidCheck/tokenValidCheck";

axios.defaults.withCredentials = true;
const Api: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000", 
});

let userRole: string | null; // Variable to store user role globally

// Add a request interceptor
Api.interceptors.request.use(
  function (config) {
    // Retrieve the user role from local storage
    userRole = localStorage.getItem('role');

    // Set headers based on the user's role
    // if (userRole === 'invigilator') {
    //   const invigilatorToken = localStorage.getItem("invigilatorAccessToken");
    //   if (invigilatorToken) {
    //     config.headers.Authorization = `${invigilatorToken}`;
    //   }
    // }
    if (userRole === 'student') {
      const studentJwtToken = localStorage.getItem("studentAccessToken");
      const studentCustomToken = localStorage.getItem("studentIdToken");
      if (studentJwtToken && studentCustomToken) {
        // config.headers.Authorization = `${studentToken}`;
        config.headers['Authorization']=`bearer ${studentJwtToken}`
        config.headers['Authorization-CustomToken'] = `${studentCustomToken}`;
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
