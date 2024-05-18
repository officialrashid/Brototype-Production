import * as Yup from 'yup';
import { useFormik } from 'formik';
import { updatePersonalDetails } from '../../../utils/methods/post';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface FormValues {
  dateOfBirth: string;
  age: string;
  email: string;
  gender: string;
  phone: string;
  fathersName: string;
  fathersContact: string;
  mothersName: string;
  mothersContact: string;
}

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const PersonalInfoModal: React.FC<{ isVisible: boolean; onClose: () => void,handleProfileUpdateSuccess: () =>void }> = ({ isVisible, onClose ,handleProfileUpdateSuccess}) => {
  const studentId:string = useSelector((state: any) => state?.student?.studentData?.studentId);
  const validationSchema = Yup.object({
    dateOfBirth: Yup.string().required('Date of Birth is required').test('valid-date', 'Invalid date', function (value) {
      const currentDate = new Date();
      const birthDate:any = new Date(value);

      return !isNaN(birthDate) && birthDate < currentDate;
    }),
    age: Yup.number().required('Age is required').test('valid-age', 'Invalid age', function (value) {
      const { dateOfBirth } = this.parent;
      const currentDate = new Date();
      const birthDate:any = new Date(dateOfBirth);

      return !isNaN(birthDate) && value === currentDate.getFullYear() - birthDate.getFullYear();
    }),
    email: Yup.string().email('Invalid email address').transform((value) => value.trim()).required('Email is required'),
    gender: Yup.string().transform((value) => value.trim()).required('Gender is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').transform((value) => value.trim()).required('Phone is required'),
    fathersName: Yup.string().transform((value) => value.trim()).required("Father's Name is required"),
    fathersContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').transform((value) => value.trim()).required("Father's Contact is required"),
    mothersName: Yup.string().transform((value) => value.trim()).required("Mother's Name is required"),
    mothersContact: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').transform((value) => value.trim()).required("Mother's Contact is required"),
  });


  const formik = useFormik({
    initialValues: {
      dateOfBirth: '',
      age: '',
      email: '',
      gender: '',
      phone: '',
      fathersName: '',
      fathersContact: '',
      mothersName: '',
      mothersContact: '',
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, 'Form values submitted');
        const response = await updatePersonalDetails(values, studentId)
        console.log(response, "response coming to the frontend");
         if(response.data.status===true){
          toast.success("personal details update successfully")
          handleProfileUpdateSuccess()
         }else{
          toast.error("personal details update not done,something went wrong")
         }
         onClose()
      } catch (error) {
        console.error(error, 'error in the formik data');
      }
    },
  });

  if (!isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll overflow-hidden z-40">
        <div className="border border-2px  m-10 w-1/2 bg-white">
          <div className="flex justify-between m-4 mb-">
            <div>

            </div>
            <div >
              <svg onClick={() => { onClose() }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>


            </div>


          </div>
          <div className="text-center mb-6">
            <span className="font-semibold font-roboto">Update your  Personal Information</span>
          </div>
          <div className="m-2 mt-0">
            <div className="flex gap-5">


              <div >

              </div>
              {/* <div className="w-full">
                <div className=" ">
                  <div className="m-1">
                    <div className="mb-3 ">
                      <span className="text-sm font-roboto">FirstName</span>
                    </div>

                    <input type="text"
                      id='firstName'
                      name='firstName'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      autoComplete='firstName'
                      required className="w-full border border-2px py-1" />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <ErrorText>{formik?.errors?.firstName}</ErrorText>
                    )}
                  </div>
                  <div className="">
                    <div className="m-1">
                      <div className="mb-3 mt-3">
                        <span className="text-sm font-roboto">LastName</span>
                      </div>

                      <input type="text"
                        id='lastName'
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <ErrorText>{formik?.errors?.lastName}</ErrorText>
                      )}
                    </div>



                  </div>


                </div>
              </div> */}

               <div className="w-full">

                <div className="w-full">
                  <div className=" mr-2 mb-3">
                    {/* <div className="mr-3 m-1 ml-0">
                      <div className="mb-3 ">
                        <span className="text-sm font-roboto">MiddleName</span>
                      </div>

                      <input type="text"
                        id='middleName'
                        name='middleName'
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.middleName && formik.errors.middleName && (
                        <ErrorText>{formik?.errors?.middleName}</ErrorText>
                      )}
                    </div> */}
                    <div className="">
                      <div className="mr-3  m-1 ml-0">
                        <div className="mb-3 mt-3">
                          <span className="text-sm font-roboto">DateOfBirth</span>
                        </div>

                        <input type="date"
                          id='dateOfBirth'
                          name='dateOfBirth'
                          value={formik.values.dateOfBirth}
                          onChange={formik.handleChange}
                          className="w-full border border-2px py-1" />
                        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                          <ErrorText>{formik?.errors?.dateOfBirth}</ErrorText>
                        )}
                      </div>



                    </div>


                  </div>
                </div>

              </div> 



            </div>
            <div className="flex gap-5">


              <div >

              </div>
              <div className="w-full">
                <div className=" ">
                  <div className="m-1">
                    <div className="mb-3 ">
                      <span className="text-sm font-roboto">Age</span>
                    </div>

                    <input type="text"
                      id='age'
                      name='age'
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      className="w-full border border-2px py-1" />
                    {formik.touched.age && formik.errors.age && (
                      <ErrorText>{formik?.errors?.age}</ErrorText>
                    )}
                  </div>
                  <div className="">
                    <div className="m-1">
                      <div className="mb-3 mt-3">
                        <span className="text-sm font-roboto">Email</span>
                      </div>

                      <input type="text"
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.email && formik.errors.email && (
                        <ErrorText>{formik?.errors?.email}</ErrorText>
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

                        <span className="text-sm font-roboto">Gender</span>
                      </div>

                      <input type="text"
                        id='gender'
                        name='gender'
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.gender && formik.errors.gender && (
                        <ErrorText>{formik?.errors?.gender}</ErrorText>
                      )}
                    </div>
                    <div className="">
                      <div className="mr-3  m-1 ml-0">
                        <div className="mb-3 mt-3">
                          <span className="text-sm font-roboto">Phone</span>
                        </div>

                        <input type="text"
                          id='phone'
                          name='phone'
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          className="w-full border border-2px py-1" />
                        {formik.touched.phone && formik.errors.phone && (
                          <ErrorText>{formik?.errors?.phone}</ErrorText>
                        )}
                      </div>



                    </div>


                  </div>
                </div>

              </div>



            </div>
            <div className="flex gap-5">


              <div >

              </div>
              <div className="w-full">
                <div className=" ">
                  <div className="m-1">
                    <div className="mb-3 ">
                      <span className="text-sm font-roboto">Father's Name</span>
                    </div>

                    <input type="text"
                      id='fathersName'
                      name='fathersName'
                      value={formik.values.fathersName}
                      onChange={formik.handleChange}
                      className="w-full border border-2px py-1" />
                    {formik.touched.fathersName && formik.errors.fathersName && (
                      <ErrorText>{formik?.errors?.fathersName}</ErrorText>
                    )}
                  </div>
                  <div className="">
                    <div className="m-1">
                      <div className="mb-3 mt-3">
                        <span className="text-sm font-roboto">Father's Contact</span>
                      </div>

                      <input type="text"
                        id='fathersContact'
                        name='fathersContact'
                        value={formik.values.fathersContact}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.fathersContact && formik.errors.fathersContact && (
                        <ErrorText>{formik?.errors?.fathersContact}</ErrorText>
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

                        <span className="text-sm font-roboto">Mother's Name</span>
                      </div>

                      <input type="text"
                        id='mothersName'
                        name='mothersName'
                        value={formik.values.mothersName}
                        onChange={formik.handleChange}
                        className="w-full border border-2px py-1" />
                      {formik.touched.mothersName && formik.errors.mothersName && (
                        <ErrorText>{formik?.errors?.mothersName}</ErrorText>
                      )}
                    </div>
                    <div className="">
                      <div className="mr-3  m-1 ml-0">
                        <div className="mb-3 mt-3">
                          <span className="text-sm font-roboto">Mother's Contact</span>
                        </div>

                        <input
                          type="text"
                          id='mothersContact'
                          name='mothersContact'
                          value={formik.values.mothersContact}
                          onChange={formik.handleChange}
                          className="w-full border border-2px py-1" />
                        {formik.touched.mothersContact && formik.errors.mothersContact && (
                          <ErrorText>{formik?.errors?.mothersContact}</ErrorText>
                        )}
                      </div>



                    </div>


                  </div>
                </div>

              </div>



            </div>

          </div>

          <div className=" flex justify-between m-6">
            <div>

            </div>
            <div>
              <button
                type="button"
                className="bg-black rounded-md px-4 py-1 text-white text-md font-roboto hover:bg-gray-400"
                onClick={() => formik.handleSubmit()}
              >
                Submit
              </button>

            </div>

          </div>



        </div>
      </div>



    </>
  )




}

export default PersonalInfoModal