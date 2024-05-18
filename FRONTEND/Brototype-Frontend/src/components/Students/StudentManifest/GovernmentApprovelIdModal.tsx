import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { updateGovernmentApprovedId } from '../../../utils/methods/post';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
interface ProfileUpdateModalProps {
    isVisible: boolean;
    onClose: () => void;
    handleProfileUpdateSuccess: () => void; // Add this prop for handling successful profile update
  }
  
const AddressModal :React.FC<ProfileUpdateModalProps>= ({ isVisible, onClose ,handleProfileUpdateSuccess}) => {
    const studentId = useSelector((state) => state?.student?.studentData?.studentId);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validationSchema = Yup.object({
        selectedFile: Yup.mixed()
            .required('Please select an image')
            .test('fileType', 'File must be in JPG/PNG format', (file) => {
                if (!file) return true;
                return validFileTypes.includes(file?.type);
            }),
    });

    const formik = useFormik({
        initialValues: {
            selectedFile: null,
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            try {
                if (!formik.values.selectedFile) {
                    formik.setFieldError('selectedFile', 'Please select an image');
                    return;
                  }
                  const formData = new FormData();
                  formData.append('image', formik.values.selectedFile as unknown as File);
                  formData.append('studentId', studentId);
                const response = await updateGovernmentApprovedId(formData);
                console.log(response,"Aadhar update reasponse");
                
                if(response.data.status===true){
                    toast.success('governmentId updated successfully!');
                    handleProfileUpdateSuccess()
                }else{
                    toast.error('governmentId update not done,something went wrong')
                }
             
                onClose();
            } catch (error) {
                console.error('Error updating address details:', error.message);
                toast.error('Failed to update address details.');
            }
        },
    });

    const handleFileChange = (e:any) => {
        const file = e.target.files?.[0];
        formik.setFieldValue('selectedFile', file || null);
        setSelectedFile(file || null);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
                <div className="border border-2px m-10 w-1/2 bg-white">
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
                        <span className="font-semibold font-roboto">Upload any Government Approved Id Card</span>
                    </div>
                    <div className="m-2 mt-0">
                        <div className="flex gap-5">
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    {selectedFile ? (
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                            style={{ maxWidth: '50%', maxHeight: '100%' }}
                                        />
                                    ) : (
                                        <>
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                                        </>
                                    )}
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between m-6">
                        <div></div>
                        <div>
                            <button
                                type="submit" // Ensure the button type is "submit"
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
};

export default AddressModal;
