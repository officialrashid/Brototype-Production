import * as Yup from 'yup';
import { useFormik } from 'formik';
import { updateReviewerWorkDetails } from '../../../utils/methods/post';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface FormValues {
  experience: string;
  skills: string[]; // Changed to an array of strings
  CurrentWorkingCompanyName: string;
  PrefferedDomainsForReview: string[]; // Changed to an array of strings
}

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">{children}</p>
);

const PersonalInfoModal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const reviewerId: any = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
  const validationSchema = Yup.object({
    experience: Yup.number().typeError('Experience must be a number').required('Experience is required'),
    skills: Yup.array().of(Yup.string()).min(1, 'Skills are required'), // Updated to array validation
    CurrentWorkingCompanyName: Yup.string().trim().required('Current Working Company Name is required'), // Added trim()
    PrefferedDomainsForReview: Yup.array().of(Yup.string()).min(1, 'Preferred Domains For Review is required'), // Added trim()
  });

  const handleSkillChange = (e, type) => {
    const { value, checked } = e.target;
    if (checked) {
      formik.setFieldValue(type, [...formik.values[type], value]);
    } else {
      formik.setFieldValue(type, formik.values[type].filter((item) => item !== value));
    }
  };

  const formik = useFormik({
    initialValues: {
      experience: '',
      skills: [],
      CurrentWorkingCompanyName: '',
      PrefferedDomainsForReview: [],
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, 'Form values submitted');
        const response = await updateReviewerWorkDetails(values, reviewerId);
        console.log(response, "response coming to the frontend");
        if (response.data.status === true) {
          toast.success("Your Work Details update successfully");
          onClose();
        } else {
          toast.error("Work details update not done, something went wrong");
          onClose();
        }
      } catch (error) {
        console.error(error, 'error in the formik data');
      }
    },
  });

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
        <div className="border border-2px  m-10 w-1/2 bg-white">
          <div className="flex justify-between m-4 mb-">
            <div></div>
            <div>
              <svg
                onClick={() => {
                  onClose();
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center mb-6">
            <span className="font-semibold font-roboto">Update your Work Information</span>
          </div>
          <div className="m-2 mt-0">
            <div className="flex gap-5">
              <div></div>
              <div className="w-full">
                <div className="">
                  <div className="m-1">
                    <div className="mb-3 ">
                      <span className="text-sm font-roboto">Experience</span>
                    </div>
                    <input
                      type="text"
                      id='experience'
                      name='experience'
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      autoComplete='experience'
                      required className="w-full border border-2px py-1" />
                    {formik.touched.experience && formik.errors.experience && (
                      <ErrorText>{formik?.errors?.experience}</ErrorText>
                    )}
                  </div>
                  <div className="">
                    <div className="m-1 mt-">
                      <div className="mb-3 mt-2">
                        <span className="text-sm font-roboto">Skills</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <input
                          id="mernstack-checkbox"
                          type="checkbox"
                          value="Mern Stack"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleSkillChange(e, 'skills')}
                        />
                        <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Mernstack</label>
                      </div>
                      <div className="flex items-center mb-2">
                        <input
                          id="golang-checkbox"
                          type="checkbox"
                          value="Golang"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleSkillChange(e, 'skills')}
                        />
                        <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Golang</label>
                      </div>
                      <div className="flex items-center mb-2">
                        <input
                          id="flutter-checkbox"
                          type="checkbox"
                          value="Flutter"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleSkillChange(e, 'skills')}
                        />
                        <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Flutter</label>
                      </div>
                      {/* Other skills checkboxes */}
                      {formik.touched.skills && formik.errors.skills && (
                        <ErrorText>{formik?.errors?.skills}</ErrorText>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <div className=" mr-2 mb-3">
                    <div className="mr-3 m-1 ml-0">
                      <div className="mb-3 ">
                        <span className="text-sm font-roboto">Current Working Company Name</span>
                      </div>
                      <input
                        type="text"
                        id='CurrentWorkingCompanyName'
                        name='CurrentWorkingCompanyName'
                        value={formik.values.CurrentWorkingCompanyName}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.CurrentWorkingCompanyName && formik.errors.CurrentWorkingCompanyName && (
                        <ErrorText>{formik?.errors?.CurrentWorkingCompanyName}</ErrorText>
                      )}
                    </div>
                    <div className="">
                      <div className="m-1 mt-4">
                        <div className="mb-3 mt-2">
                          <span className="text-sm font-roboto">Preffered Domain For Review</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            id="mernstack-checkbox"
                            type="checkbox"
                            value="Mern Stack"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleSkillChange(e, 'PrefferedDomainsForReview')}
                          />
                          <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Mernstack</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            id="golang-checkbox"
                            type="checkbox"
                            value="Golang"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleSkillChange(e, 'PrefferedDomainsForReview')}
                          />
                          <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Golang</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            id="flutter-checkbox"
                            type="checkbox"
                            value="Flutter"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleSkillChange(e, 'PrefferedDomainsForReview')}
                          />
                          <label htmlFor="mernstack-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-roboto">Flutter</label>
                        </div>
                        {/* Other preferred domain checkboxes */}
                        {formik.touched.PrefferedDomainsForReview && formik.errors.PrefferedDomainsForReview && (
                          <ErrorText>{formik?.errors?.PrefferedDomainsForReview}</ErrorText>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-between m-6">
            <div></div>
            <div>
              <button
                type="button"
                className="bg-black rounded-md px-4 py-1 text-white text-md font-roboto hover:bg-gray-400"
                onClick={formik.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoModal;
