
import createInvigilator_Controller from "./createInvigilatorController"
import studentLogin_Controller from "./studentLoginController"
import reviewerLogin_Controller from "./reviewerLoginController"
import superleadLogin_Controller from "./superleadLoginController"
import getAllStudentsStatus_Controller from "./getAllStudentsStatusController"
import updateStudentStatus_Controller from "./updateStudentStatusController"
import getHubwiseStudentsDetails_Controller from "./getHubwiseStudentsDetailsController"
import getAllReviewersStatus_Controller from "./getAllReviewersStatusController"
import addReviewer_Controller from "./addReviewerController"
import updateReviewerStatus_Controller from "./updateReviewerStatusController"
import addStudent_Controller from "./addStudentController"
import getSuperleadHub_Controller from "./getSuperleadHubController"
import updateStudentPlaced_Controller from "./updateStudentPlacedController"
import getStudentsAndPlacedStudents_Controller from "./getStudentsAndPlacedStudentsController"
import getPerPageStudentStatus_Controller from "./getPerPageStudentStatusController"
import addAdvisor_Controller from "./addAdvisorController"
import advisorLogin_Controller from "./advisorLoginController"
import getStdDashboardDetails_Controller from "./getStdDashboardDetailsController"
import getAdvisorDetails_Controller from "./getAdvisorDetailsController"
import getAllAdvisors_Controller from "./getAllAdvisorsController"
import updateAdvisorStatus_Controller from "./updateAdvisorStatusController"
import getReviewInitiators_Controller from "./getReviewInitiatorsController"
import updateReviewStatus_Controller from "./updateReviewStatusController"
import getStudentProfile_Controller from "./getStudentProfileController"
import advisorGoogleLogin_Controller from "./advisorGoogleLoginController"
import studentGoogleLogin_Controller from "./studentGoogleLoginController"
import reviewerGoogleLogin_Controller from "./reviewerGoogleLoginController"
import superleadGoogleLogin_Controller from "./superleadGoogleLoginController"
import getAllChatStudents_Controller from "./getAllChatStudentsController"
import getAllChatSuperleads_Controller from "./getAllChatSuperleadsController"
import createEvent_Controller from "./createEventController"
import editEvent_Controller from "./editEventController"
import deleteEvent_Controller from "./deleteEventController"
import createSuperlead_Controller from "./createSuperleadController"
import updateAdvisorDetails_Controller from "./updateAdvisorDetailsController"
export default (dependencies:any)=>{

    return{
        createInvigilatorController: createInvigilator_Controller(dependencies),
        studentLoginController: studentLogin_Controller(dependencies),
        reviewerLoginController: reviewerLogin_Controller(dependencies),
        superleadLoginController: superleadLogin_Controller(dependencies),
        getAllStudentsStatusController: getAllStudentsStatus_Controller(dependencies),
        updateStudentStatusController: updateStudentStatus_Controller(dependencies),
        getHubwiseStudentsDetailsController: getHubwiseStudentsDetails_Controller(dependencies),
        getAllReviewersStatusController: getAllReviewersStatus_Controller(dependencies),
        addReviewerController: addReviewer_Controller(dependencies),
        updateReviewerStatusController: updateReviewerStatus_Controller(dependencies),
        addStudentController: addStudent_Controller(dependencies),
        getSuperleadHubController: getSuperleadHub_Controller(dependencies),
        updateStudentPlacedController: updateStudentPlaced_Controller(dependencies),
        getStudentsAndPlacedStudentsController: getStudentsAndPlacedStudents_Controller(dependencies),
        getPerPageStudentStatusController: getPerPageStudentStatus_Controller(dependencies),
        addAdvisorController: addAdvisor_Controller(dependencies),
        advisorLoginController: advisorLogin_Controller(dependencies),
        getStdDashboardDetailsController: getStdDashboardDetails_Controller(dependencies),
        getAdvisorDetailsController: getAdvisorDetails_Controller(dependencies),
        getAllAdvisorsController: getAllAdvisors_Controller(dependencies),
        updateAdvisorStatusController: updateAdvisorStatus_Controller(dependencies),
        getReviewInitiatorsController: getReviewInitiators_Controller(dependencies),
        updateReviewStatusController: updateReviewStatus_Controller(dependencies),
        getStudentProfileController: getStudentProfile_Controller(dependencies),
        advisorGoogleLoginController: advisorGoogleLogin_Controller(dependencies),
        studentGoogleLoginController: studentGoogleLogin_Controller(dependencies),
        reviewerGoogleLoginController: reviewerGoogleLogin_Controller(dependencies),
        superleadGoogleLoginController: superleadGoogleLogin_Controller(dependencies),
        getAllChatStudentsController: getAllChatStudents_Controller(dependencies),
        getAllChatSuperleadsController: getAllChatSuperleads_Controller(dependencies),
        createEventController: createEvent_Controller(dependencies),
        editEventController: editEvent_Controller(dependencies),
        deleteEventController: deleteEvent_Controller(dependencies),
        createSuperleadController: createSuperlead_Controller(dependencies),
        updateAdvisorDetailsController: updateAdvisorDetails_Controller(dependencies),
    }
}