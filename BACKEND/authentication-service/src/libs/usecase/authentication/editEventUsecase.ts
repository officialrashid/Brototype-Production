


export const editEvent_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (event: any,coordinatorId:string) => {
        
    if(!event || coordinatorId){
        return {status:false,message:"event data not found"}
    }
    const response = await authenticationRepository.editEvent(event,coordinatorId)
    console.log(response,'response n usecase');
    
    if(!response){
      return {status:false,message:"event not edited"}
    }else {
      return {response}
    }
  };

  return {
    executeFunction
  };
};
