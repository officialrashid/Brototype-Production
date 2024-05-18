import * as Yup from 'yup';
import { useFormik } from 'formik';
import { updateAddressDetails } from '../../../utils/methods/post';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface FormValues {
  houseName: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  pincode: string;

}
interface ProfileUpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
  handleProfileUpdateSuccess: () => void; // Add this prop for handling successful profile update
}
const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);
const AddressModal : React.FC<ProfileUpdateModalProps> = ({ isVisible, onClose, handleProfileUpdateSuccess }) => {
  const studentId:string = useSelector((state: any) => state?.student?.studentData?.studentId);
  const validationSchema = Yup.object({
    houseName: Yup.string().trim().required('house Name is required'),
    village: Yup.string().required('village Name is required'),
    taluk: Yup.string().required('taluk Name is required'),
    district: Yup.string().required('district of Birth is required'),
    state: Yup.string().required('satate is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'pincode  must be exactly 6 digits').required('pincode is required'),

  });

  const formik = useFormik({
    initialValues: {
      houseName: '',
      village: '',
      taluk: '',
      district: '',
      state: '',
      pincode: '',
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, 'Form values submitted address');
        const response = await updateAddressDetails(values, studentId)
        console.log(response, "response coming to the frontend update Address");
        if(response.data.status===true){
          toast.success("address details update successfully")
          handleProfileUpdateSuccess()
       }else{
          toast.error("address details update not done,something went wrong")
       }
       onClose()
      } catch (error) {
        console.error(error, 'error in the formik data');
      }
    },
  });
  if (!isVisible) return null
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
            <span className="font-semibold font-roboto">Update your Address</span>
          </div>
          <div className="m-2 mt-0">
            <div className="flex gap-5">


              <div >

              </div>
              <div className="w-full">
                <div className=" ">
                  <div className="m-1">
                    <div className="mb-3 ">
                      <span className="text-sm font-roboto">House Name</span>
                    </div>

                    <input type="text"
                      id='houseName'
                      name='houseName'
                      value={formik.values.houseName}
                      onChange={formik.handleChange}
                      autoComplete='houseName'
                      required
                      className="w-full border border-2px py-1" />
                    {formik.touched.houseName && formik.errors.houseName && (
                      <ErrorText>{formik?.errors?.houseName}</ErrorText>
                    )}
                  </div>
                  <div className="">
                    <div className="m-1">
                      <div className="mb-3 mt-3">
                        <span className="text-sm font-roboto">Taluk</span>
                      </div>

                      <input type="text"
                        id='taluk'
                        name='taluk'
                        value={formik.values.taluk}
                        onChange={formik.handleChange}
                        autoComplete='taluk'
                        required
                        className="w-full border border-2px py-1" />
                      {formik.touched.taluk && formik.errors.taluk && (
                        <ErrorText>{formik?.errors?.taluk}</ErrorText>
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
                        <span className="text-sm font-roboto">Village</span>
                      </div>

                      <input type="text"
                        id='village'
                        name='village'
                        value={formik.values.village}
                        onChange={formik.handleChange}
                        autoComplete='village'
                        required
                        className="w-full border border-2px py-1" />
                      {formik.touched.village && formik.errors.village && (
                        <ErrorText>{formik?.errors?.village}</ErrorText>
                      )}
                    </div>
                    <div className="">
                      <div className="mr-3  m-1 ml-0">
                        <div className="mb-3 mt-3">
                          <span className="text-sm font-roboto">District</span>
                        </div>

                        <input type="text"
                          id='district'
                          name='district'
                          value={formik.values.district}
                          onChange={formik.handleChange}
                          autoComplete='district'
                          required
                          className="w-full border border-2px py-1" />
                        {formik.touched.district && formik.errors.district && (
                          <ErrorText>{formik?.errors?.district}</ErrorText>
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
                      <span className="text-sm font-roboto">State</span>
                    </div>

                    <input type="text"
                      id='state'
                      name='state'
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      autoComplete='state'
                      required
                      className="w-full border border-2px py-1" />
                    {formik.touched.state && formik.errors.state && (
                      <ErrorText>{formik?.errors?.state}</ErrorText>
                    )}
                  </div>



                </div>
              </div>

              <div className="w-full">

                <div className="w-full">
                  <div className=" mr-2 mb-3">
                    <div className="mr-3 m-1 ml-0">
                      <div className="mb-3 ">

                        <span className="text-sm font-roboto">Pincode</span>
                      </div>

                      <input type="text"
                        id='pincode'
                        name='pincode'
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        autoComplete='pincode'
                        required
                        className="w-full border border-2px py-1" />
                      {formik.touched.pincode && formik.errors.pincode && (
                        <ErrorText>{formik?.errors?.pincode}</ErrorText>
                      )}
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
  );
}

export default AddressModal;
