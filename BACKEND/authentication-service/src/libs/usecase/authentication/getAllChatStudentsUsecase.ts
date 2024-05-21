
export const getAllChatStudents_Usecase = (dependencies: any) => {
    const {
      repository: { authenticationRepository }
    } = dependencies;
  
    if (!authenticationRepository) {
      return console.log("Error: authenticationRepository Repository not found");
    }
  
    const executeFunction = async () => {

      const response = await authenticationRepository.getAllChatStudents()
      if(response.status===true){
        return {response}
      }else {
        return {response}
      }
    };
  
    return {
      executeFunction
    };
  };
  