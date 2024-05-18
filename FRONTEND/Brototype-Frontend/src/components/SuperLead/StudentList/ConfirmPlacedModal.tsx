
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addReviewers } from '../../../utils/methods/post';
import useMutation from '../../../hooks/useMutation';
import { toast } from 'react-toastify';
import { updatePlacedStatus } from '../../../utils/methods/patch';


interface PlacedStatusUpdateModal {
  isVisible: boolean;
  onClose: () => void;
}
interface ErrorTextProps {
    children: React.ReactNode;
  }
const ErrorText: React.FC<ErrorTextProps> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const ConfirmPlacedModal: React.FC<PlacedStatusUpdateModal> = ({ isVisible, onClose,studentId }) => {
 
    const validationSchema = Yup.object().shape({
        date: Yup.date().required('Date is required'),
        confirm: Yup.string()
          .required('Confirmation is required')
          .trim()
          .test('type', 'Confirmation must be of type "confirm"', value => value === 'confirm')
      });
      
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: '/api/student/profile-update' });
  const formik = useFormik({
    initialValues: {
      date: '',
      confirm: ''
    },
    validationSchema,
    onSubmit: async (values:any) => {
     
      try {
        if (!values) {
          return "not enter the details"
        }
        const date = values?.date;
        const confirm = values?.confirm
        const PlacedDetails = {
            date,
            confirm,
            studentId,
            action:"Placed"
        }
        const response = await updatePlacedStatus(PlacedDetails)
        console.log(response,"student placed responseeee");
        
         if(response?.status===true){
          toast.success("Student Status Updated Successfully")
          onClose();
         }else{
          toast.warn("Student Status Updated not Successfull")
          onClose()
         }
       onClose()
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    },
  });
const handleClick = (event:any) =>{
   event.stopPropagation()
}

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60  flex justify-center items-center overflow-y-scroll overflow-hidden z-40"onClick={(e)=>handleClick(e)}>
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
                  <span className="text-sm font-roboto">Placed Date</span>
                </div>
                <input
                  type="date"
                  className="border border-2px mr-4  outline-black py-1 px-2 w-72 rounded-sm font-roboto text-sm"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && (
                  <ErrorText>{formik?.errors?.date}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">Please type confirm</span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 px-2 w-72 font-roboto text-sm  rounded-sm "
                  name="confirm"
                  placeholder='confirm'
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirm && formik.errors.confirm && (
                  <ErrorText>{formik.errors.confirm}</ErrorText>
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

export default ConfirmPlacedModal;
