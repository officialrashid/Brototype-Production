

export const deleteAdvisorCreatedTask_Usecase = (dependencies: any) => {
  const {
    repository: { taskRepository }
  } = dependencies;

  if (!taskRepository) {
    return console.log("Error: Fumigation Repository not found");
  }

  const executeFunction = async (taskId:string,taskType:string) => {
    try {
      if (!taskId) {
        return { status: false, message: "task not found" };
      }
      const response = await taskRepository.deleteCreatedTask(taskId,taskType);
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
