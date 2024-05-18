

export const getReviewStudents_Usecase = (dependencies: any) => {

  const {
      repository: { authenticationRepository },
  } = dependencies;

  if (!authenticationRepository) {
      return console.log("Error: student Repository not found");
  }

  const executeFunction = async () => {
      try {
          
          const response = await authenticationRepository.getReviewStudents()
     
          
          if(response && response.length !=0){
              console.log("usecaseil kerrrriiiiii");
              
              return {status:true,response}
          }else{
              return {status:false,message:"student not found Your Hub"}
          }
      } catch (err) {
          return { status: false, message: "The Some issue in the get Course completion graph" }
      }

  }
  return {
      executeFunction,
  };
};
