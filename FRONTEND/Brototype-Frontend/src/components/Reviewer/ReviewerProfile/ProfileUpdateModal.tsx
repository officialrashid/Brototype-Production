import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

interface ProfileUpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ isVisible, onClose }) => {
  const reviewerId:any = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
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
      }),
    lastName: Yup.string()
      .required('Last Name is required')
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : originalValue.trim()))
      .test('capitalize-first', 'First letter must be capital', (value) => {
        return /^[A-Z]/.test(value || '');
      }),
    email: Yup.string().email('Invalid email address').transform((value) => value.trim()).required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').transform((value) => value.trim()).required('Phone is required'),
    age: Yup.number()
      .required('Age is required'),
    gender: Yup.string()
      .required('Gender is required')
  });
  

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: '/api/reviewer/profile-update' });

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
      email: '',
      phone:'',
      age: '',
      gender:''
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
        formData.append('email', formik.values.email);
        formData.append('phone', formik.values.phone);
        formData.append('age', formik.values.age);
        formData.append('gender', formik.values.gender);
        formData.append('reviewerId', reviewerId);
        const response = await uploadImage(formData);
        if(response?.data?.status===true){
          toast.success("profile update successfully")
        }else{
          toast.error("profile update not done,something went wrong")
        }
        onClose();
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
                  <span className="text-sm font-roboto">Last Name</span>
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
                    Email
                  </span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <ErrorText>{formik.errors.email}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">Phone</span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <ErrorText>{formik.errors.phone}</ErrorText>
                )}
              </div>
              
            </div>
            <div className=" m-6 flex">
              <div>
                <div>
                  <span className="text-sm font-roboto">
                    Age
                  </span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age && (
                  <ErrorText>{formik.errors.age}</ErrorText>
                )}
              </div>
              <div>
                <div>
                  <span className="text-sm font-roboto">Gender</span>
                </div>
                <input type="text" className="border border-2px mr-4 outline-black py-1 rounded-sm "
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.gender && formik.errors.gender && (
                  <ErrorText>{formik.errors.gender}</ErrorText>
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
