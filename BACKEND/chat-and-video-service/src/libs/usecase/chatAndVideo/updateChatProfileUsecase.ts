

export const updateChatProfile_Usecase = (dependencies: any) => {
  const {
    repository: { chatAndVideoRepository }
  } = dependencies;

  if (!chatAndVideoRepository) {
    console.error("Error: Authentication Repository not found");
    return null;
  }

  const executeFunction = async (data:any) => {
    try {
     const response = await chatAndVideoRepository.updateChatProfile(data)
  
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing advisor tasks" };
    }
  };

  return {
    executeFunction,
  };
};
