

export const getAdvisorCreatedTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (technicalLeadId:string,week:string,taskType:string) => {
    console.log(technicalLeadId,week,taskType,"<><><>1111111");
    try {
      if (!technicalLeadId) {
        return { status: false, message: "task not found" };
      }
      const response = await taskRepository.getCreatedTask(technicalLeadId,week,taskType);
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
