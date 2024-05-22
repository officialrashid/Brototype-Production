
export const updateAdvisorDetails_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository }
    } = dependencies;

    if (!authenticationRepository) {
        return console.log("Error: Fumigation Repository not found");
    }

    const executeFunction = async (advisorId:string,firstName:string,lastName:string,email:string,phone:string,profileUrl:string) => {

        if (!advisorId) {
            return { status: false, message: "advisor not found" }
        }
        const response = await authenticationRepository.updateAdvisorDetails(advisorId,firstName,lastName,email,phone,profileUrl)
        if (response && response.length != 0) {
            return { response }
        } else {
            return { status: false, message: "advisor not found your hub" }
        }

    };

    return {
        executeFunction
    };
};
