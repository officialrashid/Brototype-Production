import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

// ProfileUpdateModal.tsx
interface ProfileUpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
  handleProfileUpdateSuccess: () => void; // Add this prop for handling successful profile update
}

// StudentManifest.tsx


const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ isVisible, onClose, handleProfileUpdateSuccess }) => {
  const studentId:any = useSelector((state: any) => state?.student?.studentData?.studentId);
  const validationSchema = Yup.object().shape({
    selectedFile: Yup.mixed()
      .required('Please select an image')
      .test('fileType', 'File must be in JPG/PNG format', (file) => {
        if (!file) return true;
        return validFileTypes.includes(file.type);
      }),
    firstName: Yup.string()
      .required('First Name is required')
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : originalValue.trim()))
      .test('capitalize-first', 'First letter must be capital', (value) => {
        return /^[A-Z]/.test(value || ''); // Check if the first letter is capital
      })
      ,
    lastName: Yup.string()
      .required('Last Name is required')
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : originalValue.trim()))
      .test('capitalize-first', 'First letter must be capital', (value) => {
        return /^[A-Z]/.test(value || '');
      }),
    domain: Yup.string()
      .required('Domain is required')
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : originalValue.trim()))
      .test('capitalize-first', 'First letter must be capital', (value) => {
        return /^[A-Z]/.test(value || '');
      }),
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    formik.setFieldValue('selectedFile', file || null); // Set to null if file is undefined
    setSelectedFile(file || null);
  };

  const formik = useFormik({
    initialValues: {
      selectedFile: null,
      firstName: '',
      lastName: '',
      domain: '',
      batch: '',
    },
    validationSchema,
    onSubmit: async (e:any) => {
     
      try {
        if (!formik.values.selectedFile) {
          formik.setFieldError('selectedFile', 'Please select an image');
          return;
        }
        const formData = new FormData();
        formData.append('image', formik.values.selectedFile as unknown as File);
        formData.append('firstName', formik.values.firstName);
        formData.append('lastName', formik.values.lastName);
        formData.append('domain', formik.values.domain);
        formData.append('batch', formik.values.batch);
        formData.append('studentId', studentId);
        console.log(formData,"forData comingggggggggggggggggggggggggggggg");
        
        const response = await uploadImage(formData);
        if(response?.data?.status===true){
           toast.success("profile updated successfully")
           handleProfileUpdateSuccess()
           onClose();
      
        }else{
          toast.error("profile updated not done,something went wrong")
          onClose();
        }
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    },
  });


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
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
          <div>
            <div className="border border-2px h-28 w-28 rounded-full m-6 mb-3">
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="h-full w-full object-cover rounded-full"
                />
              )}
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="bg-black text-white m-9 mt-0 rounded-md px-4 py-1 font-roboto hover:bg-gray-500 cursor-pointer"
              >
                Upload
              </label>
              {formik.errors.selectedFile && <ErrorText>{formik.errors.selectedFile}</ErrorText>}
            </div>
          </div>
          <div className="m">
            <div className=" m-6 flex">
              <div>
                <div>
                  <span className="text-sm font-roboto">First Name</span>
                </div>
                <input
                  type="text"
                  className="border border-2px mr-4 outline-black py-1 rounded-sm"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <ErrorText>{formik?.errors?.firstName}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">Middle Name & Last Name</span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <ErrorText>{formik.errors.lastName}</ErrorText>
                )}
              </div>
            </div>
            <div className=" m-6 flex">
              <div>
                <div>
                  <span className="text-sm font-roboto">
                    Domain
                  </span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="domain"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.domain && formik.errors.domain && (
                  <ErrorText>{formik.errors.domain}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">Batch</span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="batch"
                  value={formik.values.batch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.batch && formik.errors.batch && (
                  <ErrorText>{formik.errors.batch}</ErrorText>
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

export default ProfileUpdateModal;
