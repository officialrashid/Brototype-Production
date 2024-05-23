// get Batchwise Students USecase
export const getEnqueryGraph_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async () => { 
     try{
       const response = await studentRepository.getEnqueryGraph(); // get batchwise Students
       if (response.status===true) {
          return { response };
       }else{
        return { response }
       }
     } catch(err){
       return {status:false,message:"An Error occured while get enquery graph details"} // handle exception
     }
      
    };
 
    return {
       excutefunction
    };
 };
 