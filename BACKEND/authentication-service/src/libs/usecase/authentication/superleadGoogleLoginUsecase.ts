
export const superleadGoogleLogin_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (email: string) => {
          
      if(!email){
          return {status:false,message:"email not found"}
      }
      const response = await authenticationRepository.superleadGoogleLogin(email)
      console.log(response,'response n usecase');
      
      if(response.status===false){
        return {status:false,message:"superlead not found"}
      }else {
        return {response}
      }
    };
  
    return {
      executeFunction
    };
  };
  