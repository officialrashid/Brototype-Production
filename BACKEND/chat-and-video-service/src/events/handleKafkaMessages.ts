import dependencies from "../config/dependencies";
import { updateChatProfile_Usecase } from "../libs/usecase";

const handleKafkaMessages = async (data: string, type: string) => {
  console.log(data,type);
  
  // Check if checkStudentUniqueId_Usecase is not null
  if(type ==='UpdateChatProfile'){
    console.log(data,"data coming to the handleMessae Kafka");
  
    const useCaseInstance = updateChatProfile_Usecase(dependencies);
  
    if (useCaseInstance) {
      const response = await useCaseInstance.executeFunction(data);
      console.log(response, "[][][]]");
      return response;
    } else {
      // Handle the case when checkStudentUniqueId_Usecase is null
      console.error("updateChatProfile_Usecase is null");
      return null; // Or handle the error according to your needs
    }
  }
  
};

export default handleKafkaMessages;
