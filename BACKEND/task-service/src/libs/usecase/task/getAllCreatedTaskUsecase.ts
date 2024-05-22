

export const getAllCreatedTask_Usecase = (dependencies: any) => {
    const {
      repository: { taskRepository }
    } = dependencies;
  
    if (!taskRepository) {
      return console.log("Error: Fumigation Repository not found");
    }
  
    const executeFunction = async (technicalLeadId:string) => {
      try {
        if (!technicalLeadId) {
          return { status: false, message: "task not found" };
        }
        const response = await taskRepository.getAllCreatedTask(technicalLeadId);
        console.log(response);
        
        if (response.status && response.status === true) {
          return { response };
        } else {
          return {response}
        }
      } catch (err) {
        console.error(err);
        return { status: false, message: "Personal task update encountered some issues" };
      }
    };
  
    return executeFunction; // Return the executeFunction directly
  };
  