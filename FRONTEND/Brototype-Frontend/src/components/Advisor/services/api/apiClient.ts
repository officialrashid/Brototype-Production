import axios, { AxiosError, AxiosInstance,AxiosRequestConfig } from "axios";
axios.defaults.withCredentials=true


 export const axiosInstance:AxiosInstance = axios.create({baseURL:'https://brototypes.com/coordinators'})

axiosInstance.interceptors.request.use((config:any)=>{
 console.log('hello');
    

    // let token=localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization=`Bearer ${token}`
    // }
    

    
return config
},(error:AxiosError)=>{

    
    return Promise.reject(error)

})



axiosInstance.interceptors.response.use((respoone:any)=>{



    return respoone
},(error:AxiosError)=>{
    
    return Promise.reject(error)
})


