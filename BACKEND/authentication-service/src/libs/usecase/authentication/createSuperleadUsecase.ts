
import { sendEmail } from "../../../nodemailer/nodemailer";
import { Superleads } from "../../entities/superleads";

export const createSuperlead_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository }
  } = dependencies;

  if (!authenticationRepository) {
    console.error("Error: Authentication Repository not found");
    // You might want to throw an error here or handle it according to your needs
    return null;
  }

  const executeFunction = async (data: any) => {
    if (!data) {
      return { status: false, message: "student data not received, try again later" };
    }
    try {

        const lastResponse = await authenticationRepository.createSuperleadUniqueId(data.hubLocation);
        let lastNumber = 0;
    
        if (lastResponse && lastResponse.length > 0) {
          const lastUniqueId = lastResponse[0].uniqueId;
    
          if (lastUniqueId) {
            const lastNumberStr = lastUniqueId.substr(-3);
            lastNumber = parseInt(lastNumberStr, 10);
          }
        }
        const generateLetter = lastResponse[0].uniqueId.split("").splice(0,4).join("");


        console.log(generateLetter,"dahjbfdvfhdsgvfdsgfvdshfgsfgdsfysdf");
        
        const newUniqueId = `${generateLetter}${String(lastNumber + 1).padStart(3, '0')}`;
        const emailPhoneCheckResult = await authenticationRepository.superleadEmailExist(data.email, data.phone);
        if (!emailPhoneCheckResult || (emailPhoneCheckResult && emailPhoneCheckResult.length === 0)) {
          const uniqueIdExist = await authenticationRepository.superleadUniqueIdExist(newUniqueId);
          if (!uniqueIdExist || (uniqueIdExist && uniqueIdExist.length === 0)) {
            const loginUrl = "http://localhost:5173/superleadIn"
            sendEmail("Hello Superlead", newUniqueId,loginUrl,data.email);
            const superlead = new Superleads({
              ...data,
              uniqueId: newUniqueId,
            });
            
            const createReviewerResponse = await authenticationRepository.createSuperleads(data,newUniqueId);
          } else {
            return { status: false, message: "UniqueId already exists" };
          }
        } else {
          return { status: false, message: "Email or phone already exists" };
        }
      return { status: true, message: "superlead Created Successfully" };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return { status: false, message: "An error occurred while processing students" };
    }
  };
  
  return {
    executeFunction,
  };
  
  

};


