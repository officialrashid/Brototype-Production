
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addReviewers, addStudents } from '../../../utils/methods/post';
import useMutation from '../../../hooks/useMutation';
import { toast } from 'react-toastify';

interface ProfileUpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
  changeModalStatus : () => void
}

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const AddStudentsModal: React.FC<ProfileUpdateModalProps> = ({ isVisible, onClose,changeModalStatus }) => {
 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : originalValue.trim()))
      .test('capitalize-first', 'First letter must be capital', (value) => {
        return /^[A-Z]/.test(value || ''); // Check if the first letter is capital
      }),
    email: Yup.string().email('Invalid email address').transform((value) => value.trim()).required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').transform((value) => value.trim()).required('Phone is required'),
    batch: Yup.string()
    .required('Batch is required')
    .transform((originalValue) => {
      const trimmedValue = originalValue.trim();
      return trimmedValue.toUpperCase();
    })
    .test('all-uppercase', 'Batch must be in uppercase', (value) => {
      // Check if the transformed value is the same as the original value
      return value === value?.toUpperCase();
    }),
  });
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: '/api/student/profile-update' });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone:'',
      batch:''
    },
    validationSchema,
    onSubmit: async (values:any) => {
     
      try {
        if (!values) {
          return "not enter the details"
        }
        const response = await addStudents(values)
        console.log(response,"responseeeeeee");
        
         if(response?.status===true){
          toast.success("Student Created Succefully")
          onClose();
          changeModalStatus()
         }else if(response?.status===false && response?.message==="student not created because of batch not found"){
          toast.warn("Student Created not Success, because batch not found")
          onClose()
         } else{
          toast.warn("Student Created not Success,Try again")
         }
       onClose()
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    },
  });


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60  flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
      <div className="border border- shadow-md w-fit m-10 rounded-md bg-white ">
        <div className="flex justify-between mt-4 mr-4">
          <div></div>
          <div>
            <svg onClick={() => { onClose() }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-6  rounded-md">
         
          <div className="m">
            <div className=" m-6 flex ">
              <div>
                <div>
                  <span className="text-sm font-roboto"> Name</span>
                </div>
                <input
                  type="text"
                  className="border border-2px mr-4  outline-black py-1 px-2 w-72 rounded-sm"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <ErrorText>{formik?.errors?.name}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">
                    Email
                  </span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 px-2 w-72  rounded-sm "
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <ErrorText>{formik.errors.email}</ErrorText>
                )}
              </div>
            </div>
            <div className=" m-6 flex">
            <div className="font-roboto">
                <div>
                  <span className="text-sm font-roboto">Phone</span>
                </div>
                <input type="text" className="border font-roboto border-2px mr-4 outline-black py-1 px-2 w-72  rounded-sm "
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <ErrorText>{formik?.errors?.phone}</ErrorText>
                )}
              </div>
              <div className="font-roboto">
                <div>
                  <span className="text-sm font-roboto">Batch</span>
                </div>
                <input type="text" className="border font-roboto border-2px mr-4 outline-black py-1 px-2 w-72  rounded-sm "
                  name="batch"
                  value={formik.values.batch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.batch && formik.errors.batch && (
                  <ErrorText>{formik?.errors?.batch}</ErrorText>
                )}
              </div>
              
            </div>
           
            <div className="flex justify-between mr-10 mb-3" >
              <div></div>
              <div>
                <button
                  type="button" // Add this line to specify the type
                  className="bg-black text-white rounded-md px-5 py-1.5 font-roboto hover:bg-gray-500"
                  onClick={(e)=>formik.handleSubmit(e)}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Submit"}
                </button>
                {uploadError && <ErrorText>
                  {uploadError}
                </ErrorText>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentsModal;
