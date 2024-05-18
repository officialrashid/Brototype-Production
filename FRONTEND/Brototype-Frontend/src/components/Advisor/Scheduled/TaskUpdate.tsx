import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { getInitiatorsDetails } from "../../../utils/methods/get"
import { addReviewResult } from "../../../utils/methods/post"
import { toast } from "react-toastify"
import { updateReviewStatus, updateStdtReviewStatus } from "../../../utils/methods/patch"


const TaskUpdate = ({ isVisible, onClose, handleToast, reviewId, slotId, reviewerId, coordinatorId, eventId, studentId,currentWeek }) => {

  // const advisorId = ''
  // const bookedadvisorId = '123'

  const inititalValues = {
    reviewStatus: "",
    personalScore: "",
    technicalScore: "",
    reviewScore: "",
    miscellaneousScore: "",
    communicationScore:"",
    pendingTopics: "",
    miscellaneousReview: "",
    technicalReview: "",
    personalReview: "",
    communicationReview:"",
    nextweekUpdation: "",
    totalWeeks:""

  }

  const validationSchema = Yup.object({
    reviewStatus: Yup.string().required("Review status is required"),
    personalScore: Yup.number().required('Personal score is required').max(10, 'Marks cannot exceed 10'),
    // technicalScore: Yup.number().required('Technical score is required').max(10, 'Marks cannot exceed 10'),
    communicationScore: Yup.number().required('CommunicationScore score is required').max(10, 'Marks cannot exceed 10'),
    totalWeeks: Yup.number().required('totalWeeks score is required'),
    reviewScore: Yup.number().required('Review score is required').max(20, 'Marks cannot exceed 20'),
    miscellaneousScore: Yup.number().required('Miscellaneous score is required').max(10, 'Marks cannot exceed 10'),
    pendingTopics: Yup.string().required('Pending topics are required'),
    miscellaneousReview: Yup.string().required('feedback  required'),
    communicationReview: Yup.string().required('communication review  required'),
    // technicalReview: Yup.string().required('feedback  required'),
    personalReview: Yup.string().required('feedback  required'),
    nextweekUpdation: Yup.string().required('updations are required')



  })

  if (!isVisible) return null

  return (
    <>
      <Formik onSubmit={async (values, { resetForm, setStatus }) => {

        // Assuming these properties need to be converted to arrays
        const propertiesToConvertToArray = ['miscellaneousReview', 'nextweekUpdation', 'pendingTopics', 'personalReview', 'technicalReview','communicationReview'];

        // Function to convert comma-separated values to arrays
        function convertToArrays(obj) {
          for (const key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'string' && propertiesToConvertToArray.includes(key)) {
              obj[key] = obj[key].split(',').map(item => item.trim());
            }
          }
        }

        // Spread the values and other properties
        let reviewDetails: any = {
          ...values,
          reviewId,
          slotId,
          reviewerId,
          coordinatorId,
          eventId,
          studentId
        };

        // Convert specific properties to arrays
        convertToArrays(reviewDetails);

        console.log(reviewDetails, 'detailsyyy');

        try {
          const getInitiatorsDetail = await getInitiatorsDetails(coordinatorId, reviewerId, studentId);
          console.log(getInitiatorsDetail, "getInitiatorsDetail");

          if (getInitiatorsDetail.status === true) {
            let status;
            let repeat;
            let totalScore=0;
            if (reviewDetails.reviewStatus === "completed") {
              status = true,
                repeat = false
            } else {
              status = false,
                repeat = true
            }
            totalScore = parseInt(reviewDetails.personalScore) + parseInt(reviewDetails.reviewScore) + parseInt(reviewDetails.communicationScore) + parseInt(reviewDetails.miscellaneousScore);
            const concatenatedData = {
              ...reviewDetails, // Merge reviewDetails properties
              advisorName: getInitiatorsDetail.data.advisorName,
              currentWeek: `week${currentWeek}`,
              reviewerName: getInitiatorsDetail.data.reviewerName,
              batchId: getInitiatorsDetail.data.batchId,
              status : status,
              repeat : repeat,
              totalScore : totalScore
            };
          const response = await addReviewResult(concatenatedData)
         console.log(response,"llllll");
            if(response?.data?.response.status===true && response?.data?.response?.message==="Review result added/updated successfully."){
              const updateStatus ={
                   reviewerId : reviewDetails.reviewerId,
                   eventId : reviewDetails.eventId,
                   bookedEventId: reviewDetails.slotId,
                   status : true
                   
              }
              const updateStdStatus={
                studentId: reviewDetails.studentId,
                currentWeek : getInitiatorsDetail.data.currentWeek+1,
                status : status

              }
              const updateReviewerStatus = await updateReviewStatus(updateStatus)
               const updateStudenttReviewStatus = await updateStdtReviewStatus(updateStdStatus) 
              if(updateReviewerStatus?.response?.status==true && updateStudenttReviewStatus.response?.status===true){
                toast.success("review result updates successfully")
                onClose()
              }else{
                toast.error("review status not updated,please try after some time")
              }
             onClose()
             
            }
          }
        } catch (error) {
          console.log(error, 'error');
          handleToast('error occurred', error);
        }

      }} initialValues={inititalValues} validationSchema={validationSchema}>
        <Form>
          <div className="z-40 fixed inset-0 flex  justify-center overflow-hidden  bg-black/60 overflow-y-scroll  py-14 font-roboto">
            <div className="border m-4 rounded-md  bg-white h-fit w-1/2">
              <div className="flex justify-between m-2 mb-4 mt-3">
                <div></div>
                <div onClick={() => { onClose() }} ><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </span></div>
              </div>
              <div >
                <div className="border border-2px m-2 rounded-md py-2">
                  <div className="flex justify-between m-2 ">
                    <div><span className="font-semibold"> Update  review status</span> </div>
                    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml: space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="border border-black py-1.5 m-4  ml-2 mr-2 mb-2 rounded-md w-full">
                    <div className="flex gap-4 m-2 justify-around">
                      <div>
                        <Field type="radio" name="reviewStatus" className=" accent-black" value="repeat" />
                        <span> Repeat</span>

                      </div>
                      <div>
                        <Field type="radio" name="reviewStatus" className=" accent-black" value="completed" />
                        <span> Completed</span>

                      </div>



                    </div>

                  </div>

                  {/* <div className="m-3">

<button className="bg-black text-white py-2 px-5 rounded-md m-2">submit</button>

</div> */}
                </div>
                <div className="ml-2">
                  <ErrorMessage name="reviewStatus" className="text-red-500" />
                </div>


              </div>
              <div className="border border-2px m-2 rounded-md py-2">
                <div className="flex justify-between m-2  ">
                  <div><span className="font-semibold"> Update  student Manifest</span> </div>
                  <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml: space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
                </div>
              </div>
              <div className="m-4 mb-2">
                <div className="flex gap-3">
                  {/* <div className=" w-full">
                    <Field type="text" name="technicalScore" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a technical workout score  " />
                  </div> */}

                  <div className=" w-full">
                    <Field name="personalScore" type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black text-sm" placeholder="Enter personal workout score  " />
                  </div>


                </div>

              </div>

              <div className="m-4 mt-0 mb-0">
                <div className="flex gap-3">
                  <div className=" w-full">
                    <ErrorMessage name="technicalScore" className="text-red-500" />
                  </div>

                  <div className=" w-full">
                    <ErrorMessage name="personalScore" className="text-red-500" />
                  </div>


                </div>

              </div>






              <div className="m-4 mb-2">
                <div className="flex gap-3">
                  <div className=" w-full">
                    <Field name="miscellaneousScore" type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black text-sm" placeholder="Enter miscellaneous workout score  " />
                  </div>

                  <div className=" w-full">
                    <Field name="communicationScore" type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black text-sm" placeholder="Enter communication score " />
                  </div>

            
                </div>
            
              </div>
              <div className="m-4 mb-2">
                <div className="flex gap-3">
                  <div className=" w-full">
                    <Field name="reviewScore" type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black text-sm" placeholder="Enter review score   " />
                  </div>
                  <div className=" w-full">
                    <Field name="totalWeeks" type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black text-sm" placeholder="Enter this student domain total week in your course " />
                  </div>

              

            
                </div>
            
              </div>
              <div className="m-4 mt-0 mb-0">
                <div className="flex gap-3">
                  <div className=" w-full">
                    <ErrorMessage name="miscellaneousScore" className="text-red-500" />
                  </div>

                  <div className=" w-full">
                    <ErrorMessage name="reviewScore" className="text-red-500" />
                  </div>


                </div>

              </div>
              <div className="m-4 mb-2">
                <div className="flex gap-3">
                  <div className=" w-full">
                  <Field as="textarea" name="pendingTopics" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full text-sm" placeholder="Enter pending topics "></Field>
                  </div>

                  {/* <div className=" w-full">
                    <Field as="textarea" name="technicalReview" rows="8" type="text" className="border border-black w-full rounded-sm outline-black" placeholder="Enter review score " />
                  </div> */}


                </div>

              </div>
              <div className="m-4 mt-0">
                <div className="flex gap-3">
                  <div className=" w-full">
                    <ErrorMessage name="miscellaneousReview" className="text-red-500" />
                  </div>

                  <div className=" w-full">
                    <ErrorMessage name="technicalReview" className="text-red-500" />
                  </div>


                </div>

              </div>
              
              {/* <div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <Field type="text" name="data5" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <Field type="text" name="data6" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div> */}
              <div className="m-4 mb-0">
                <div className="flex gap-3">
                  <div className="w-full">

                    <Field as="textarea" name="personalReview" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full text-sm" placeholder="Enter personal wrokout review "></Field>
                  </div>

                  {/* <div className="w-full">

  <Field as="textarea" name="pending2" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></Field>
</div> */}


                </div>

              </div>
              <div className="ml-4">
                <ErrorMessage name="personalReview" className="text-blue-500" />
              </div>

              <div className="m-4 mb-0">
                <div className="flex gap-3">
                  <div className="w-full">
                  <Field as="textarea" name="miscellaneousReview" rows="8" type="text" className="border border-black w-full   rounded-sm outline-black text-sm" placeholder="Enter miscellaneous workout review  " />

                  </div>

                  {/* <div className="w-full">

  <Field as="textarea" name="pending2" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></Field>
</div> */}


                </div>

              </div>
              
              <div className="ml-4">
                <ErrorMessage name="pendingTopics" className="text-blue-500" />
              </div>
              <div className="m-4 mb-0">
                <div className="flex gap-3">
                  <div className="w-full">

                    <Field as="textarea" name="nextweekUpdation" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full text-sm" placeholder="Enter nextweek updation"></Field>
                  </div>

                  {/* <div className="w-full">

  <Field as="textarea" name="pending2" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></Field>
</div> */}


                </div>

              </div>
              <div className="ml-4">
                <ErrorMessage name="nextweekUpdation" className="text-blue-500" />
              </div>
              <div className="m-4 mb-0">
                <div className="flex gap-3">
                  <div className="w-full">

                    <Field as="textarea" name="communicationReview" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full text-sm" placeholder="Enter communication Review "></Field>
                  </div>

                  {/* <div className="w-full">

  <Field as="textarea" name="pending2" id="" cols="37" rows="8" className="border border-gray-400 rounded-sm outline-black w-full " placeholder="Enter pending topics "></Field>
</div> */}


                </div>

              </div>
              <div className="ml-4">
                <ErrorMessage name="communicationReview" className="text-blue-500" />
              </div>
              {/* <div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div> */}
              <div className="m-4">
                {/* <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div> */}

              </div>
              {/* <div className="border border-2px m-2 rounded-md py-2">
  <div className="flex justify-between m-2 ">
    <div><span className="font-bold"> Update  review status</span> </div>
    <div><svg fill="#ffffff" height="35px" width="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-33 -33 396.00 396.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(9.900000000000006,9.900000000000006), scale(0.94)"><rect x="-33" y="-33" width="396.00" height="396.00" rx="198" fill="#0a0a0a" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.66"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M255.606,205.606 C252.678,208.535,248.839,210,245,210s-7.678-1.464-10.606-4.394l-69.396-69.393l-69.392,69.393c-5.857,5.858-15.355,5.858-21.213,0 c-5.858-5.857-5.858-15.355,0-21.213l79.998-80c2.813-2.813,6.628-4.394,10.606-4.394c3.979,0,7.793,1.58,10.607,4.394l80.002,80 C261.465,190.251,261.465,199.749,255.606,205.606z"></path> </g></svg></div>
  </div>
</div>
<div className="border border-black py-1.5 m-4   rounded-md">
  <div className="flex gap-4 m-2 justify-around">
    <div>
    <input type="radio" className=" accent-black" checked/>
    <span>Rescheduled</span>

    </div>
    <div>
    <input type="radio" className=" accent-black"/>
    <span>Cancelled</span>

    </div>
 
  </div>
</div> */}
              {/* <div className="m-4">
  <div className="flex gap-3"> 
      <div className=" w-full">
    <input type="text" className="border border-black w-full px-1 py-3 rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>
     <div className=" w-full">
   <input type="text" className="border border-black px-1 py-3 w-full rounded-sm outline-black" placeholder="Enter a reason  "/>
  </div>

  </div>

</div> */}
              <div className="flex justify-between m-2 mt-0">
                <div></div>
                <div>
                  <button type="submit" className="bg-black text-white py-2 px-5 rounded-md m-3" >submit</button>
                  <button className="bg-black text-white py-2 px-5 rounded-md m-3">Cancel</button>

                </div>

              </div>



            </div>
          </div>

        </Form>
      </Formik>

    </>
  )
}

export default TaskUpdate