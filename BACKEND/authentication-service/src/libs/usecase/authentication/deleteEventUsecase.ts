


export const deleteEvent_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (eventId: string,coordinatorId:string) => {
        
    if(!eventId || coordinatorId){
        return {status:false,message:"event data not found"}
    }
    const response = await authenticationRepository.deleteEvent(eventId,coordinatorId)
    console.log(response,'response n usecase');
    
    if(!response){
      return {status:false,message:"event not deleted"}
    }else {
      return {response}
    }
  };

  return {
    executeFunction
  };
};
