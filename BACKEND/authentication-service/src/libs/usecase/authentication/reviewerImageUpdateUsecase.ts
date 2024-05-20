

export const reviewerImageUpdate_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    return null;
  }

  const executeFunction = async (data:any) => {
    console.log(data);
    
    try {
     const response = await authenticationRepository.reviewerImageUpdate(data)
  
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing advisor tasks" };
    }
  };

  return {
    executeFunction,
  };
};
