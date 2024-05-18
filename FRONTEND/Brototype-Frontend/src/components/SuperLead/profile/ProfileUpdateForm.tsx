import { useEffect, useState } from "react";
import useMutation from "../../../hooks/useMutation";
import DeactivateAccount from "./DeactivateAccount";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getSuperleadProfile } from "../../../utils/methods/get";
import { setSuperleadProfileImage } from "../../../redux-toolkit/superleadReducer"
import { updateSuperleadProfile } from "../../../utils/methods/patch";
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];



const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
)
const ProfileUpdateForm = () => {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState({})
  const location = useLocation();
  const action = location.state && location.state.action;
  const superleadId: any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);


  const validationSchema = Yup.object().shape({

    selectedFile: Yup.mixed()
      .required('Please select an image'),
    // .test('fileType', 'File must be in JPG/PNG format', (file) => {
    //   return !file || validFileTypes.includes(file?.type);
    // }),
    firstName: Yup.string()
      .required('First Name is required')
      .trim()
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital'),

    lastName: Yup.string()
      .required('Last Name is required')
      .trim()
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital'),

    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address')
      .trim(),

    gender: Yup.string()
      .required('Gender is required')
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital')
      .trim(),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .trim(),

    qualification: Yup.string()
      .required('Qualification is required')
      .trim()
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital'),

    pastYourWorkedCompany: Yup.string()
      .required('Past Company is required')
      .trim()
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital'),

    yearOfExpereience: Yup.string()
      .required('Year of Experience is required')
      .trim()
      .matches(/^\d+$/, 'Year of Experience must be a number'),


    hubLocation: Yup.string()
      .required('Hub Location is required')
      .trim()
      .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be capital'),

    dateOfBirth: Yup.string()
      .required('Date of Birth is required')
      .test('valid-date', 'Invalid date', (value) => {
        const currentDate = new Date();
        const birthDate = new Date(value);
        return !isNaN(birthDate) && birthDate < currentDate;
      })
      .trim()
  });


  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: '/api/superlead/profile-update' });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files[0];
    formik.setFieldValue('selectedFile', file || null); // Set to null if file is undefined
    setSelectedFile(file || null);
    // dispatch(setSuperleadProfileImage(file)); // Pass the file directly, not in an object
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getSuperleadProfile(superleadId);
        if (response.status === true) {
          const [profileData] = response?.response;
          setProfile(profileData);

          // Set formik initial values to the fetched profile data
          formik.setValues({
            ...formik.values,
            selectedFile: profileData.imageUrl || null, // You may need to handle the image separately
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            gender: profileData.gender || '',
            dateOfBirth: profileData.dateOfBirth || '',
            hubLocation: profileData.hubLocation || '',
            qualification: profileData.qualification || '',
            pastYourWorkedCompany: profileData.pastYourWorkedCompany || '',
            yearOfExpereience: profileData.yearOfExpereience || '', // Corrected key name
          });

          const initialTouched = Object.keys(profileData).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          // setSelectedFile(profileImageFile || null);
          formik.setTouched(initialTouched);
        } else {
          setProfile({});
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProfile();
  }, []);


  const formik = useFormik({
    initialValues: {
      selectedFile: profile.imageUrl || null,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      gender: profile.gender || '',
      dateOfBirth: profile.dateOfBirth || '',
      hubLocation: profile.hubLocation || '',
      qualification: profile.qualification || '',
      pastYourWorkedCompany: profile.pastYourWorkedCompany || '',
      yearOfExpereience: profile.yearOfExpereience || '', // 
    },
    validationSchema,

    onSubmit: async (values: any) => {
      try {

        if (!values.selectedFile) {
          formik.setFieldError('selectedFile', 'Please select an image');
          return;
        }


        console.log(values);

        const formData = new FormData();
        formData.append('image', values.selectedFile as unknown as File);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('gender', values.gender);
        formData.append('dateOfBirth', values.dateOfBirth);
        formData.append('hubLocation', values.hubLocation);
        formData.append('qualification', values.qualification);
        formData.append('pastYourWorkedCompany', values.pastYourWorkedCompany);
        formData.append('yearOfExpereience', values.yearOfExpereience); // Corrected key name
        formData.append('superleadId', superleadId);

        if(action === "edit"){
          const response = await updateSuperleadProfile(formData)
          if(response.status===true){
            toast.success("profile updated successfully")
           
          } else if (response?.message === "Email or Phone already in use" && response?.status === false) {
            toast.warn("email or phone already in use")
          } else {
            toast.error("profile updated not done, something went wrong")
          }
          
        }else{
          const response = await uploadImage(formData);
          if (response?.data?.status === true) {
            toast.success("profile updated successfully")
            formik.resetForm();
          } else if (response?.data?.message === "Email or Phone already in use" && response?.data?.status === false) {
            toast.warn("email or phone already in use")
          } else {
            toast.error("profile updated not done, something went wrong")
          }
        }
      
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    },
  });

  const handleChange = (event: any, key: string) => {
    try {
      event.preventDefault();
      const value = event.target.value;
      console.log(value, key);

      // Update the state based on the key
      setProfile(prevProfile => ({
        ...prevProfile,
        [key]: value
      }));
      formik.setFieldTouched(key, true);
      formik.setFieldValue(key, value);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <section className="mt-36 w-full p-3 sm:p-5 mb-0">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden border bg-white shadow-md sm:rounded-lg">
            <h1 className="font-roboto m-5 mb-0 ml-8 font-semibold">Profile Details</h1>
            <form className="mb-0 mt-0">
              <div className="flex border-b">
                {!profile?.imageUrl ? (
                  <>
                    {selectedFile ? (
                      <div className="m-7 mb-4 mt-5">

                        <img
                          src={URL.createObjectURL(selectedFile) ?? "https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"}
                          alt=""
                          className="h-aut mb-0 w-20 rounded-md" />

                      </div>

                    ) : (
                      <div className="m-7 mb-4 mt-5">
                        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="" className="h-aut mb-0 w-20 rounded-md"
                        />
                      </div>

                    )}
                  </>
                ) : (
                  <>
                    {selectedFile ? (
                      <div className="m-7 mb-4 mt-5">

                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt=""
                          className="h-aut mb-0 w-20 rounded-md" />

                      </div>

                    ) : (
                      <div className="m-7 mb-4 mt-5">
                        <img src={profile?.imageUrl} alt="" className="h-aut mb-0 w-20 rounded-md"
                        />
                      </div>

                    )}
                  </>
                )}
                <div className="m-10 mb-0 ml-0 mr-0">

                  <label htmlFor="file-upload" className="mb-2 cursor-pointer rounded-md bg-dark-highBlue px-3 py-1.5 text-sm font-medium font-roboto text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Upload new photo
                  </label>

                  <p className="m-4 mb-0  ml-0 text-xs text-gray-400">Allowed JPG, GIF or PNG. Max size of 800K</p>
                  {formik.touched.selectedFile && formik.errors.selectedFile && (
                    <ErrorText>{formik.errors.selectedFile}</ErrorText>
                  )}
                  <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />

                </div>

              </div>

              <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="firstName" className="m-2 font-serif text-sm">First Name</label>
                  <>
                    {(!profile.firstName || !profile.firstName.trim()) ? (
                      <>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                          value={formik.values.firstName || ''}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                          <ErrorText>{formik.errors.firstName}</ErrorText>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                          value={profile?.firstName}
                          onChange={(e) => handleChange(e, 'firstName')}

                          onBlur={formik.handleBlur}
                          required
                        />

                        {formik.touched.firstName && formik.errors.firstName && (
                          <ErrorText>{formik.errors.firstName}</ErrorText>
                        )}

                      </>
                    )}
                  </>

                </div>

                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="lastName" className="m-2 font-serif text-sm">Last Name</label>
                  <>
                  </>
                  {!profile.lastName ? (
                    <>
                      <input
                        type="lastName"
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <ErrorText>{formik?.errors?.lastName}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="lastName"
                        id="lastName"
                        value={profile?.lastName}
                        onChange={(e) => handleChange(e, 'lastName')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <ErrorText>{formik?.errors?.lastName}</ErrorText>
                      )}
                    </>
                  )}

                </div>
              </div>
              <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="email" className="m-2 font-serif text-sm">Email</label>
                  <>
                    {!profile?.email ? (
                      <>
                        <input
                          type="email"
                          id="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                          required
                        />
                        {formik.touched.email && formik.errors.email && (
                          <ErrorText>{formik?.errors?.email}</ErrorText>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type="email"
                          id="email"
                          value={profile?.email}
                          onChange={(e) => handleChange(e, 'email')}
                          onBlur={formik.handleBlur}
                          className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                          required
                        />
                        {formik.touched.email && formik.errors.email && (
                          <ErrorText>{formik?.errors?.email}</ErrorText>
                        )}
                      </>
                    )}
                  </>

                </div>
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="phone" className="m-2 font-serif text-sm">Phone</label>
                  {!profile.phone ? (
                    <>
                      <input
                        type="phone"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <ErrorText>{formik?.errors?.phone}</ErrorText>
                      )}
                    </>

                  ) : (
                    <>
                      <input
                        type="phone"
                        id="phone"
                        value={profile?.phone}
                        onChange={(e) => handleChange(e, 'phone')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <ErrorText>{formik?.errors?.phone}</ErrorText>
                      )}
                    </>
                  )}

                </div>
              </div>
              <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="gender" className="m-2 font-serif text-sm">Gender</label>
                  {!profile?.gender ? (
                    <>
                      <input
                        type="gender"
                        id="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.gender && formik.errors.gender && (
                        <ErrorText>{formik?.errors?.gender}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="gender"
                        id="gender"
                        value={profile?.gender || ''}
                        onChange={(e) => handleChange(e, 'gender')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.gender && formik.errors.gender && (
                        <ErrorText>{formik?.errors?.gender}</ErrorText>
                      )}
                    </>
                  )}

                </div>
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="date" className="m-2 font-serif text-sm">Date Of Birth</label>
                  {!profile.dateOfBirth ? (
                    <>
                      <input
                        type="date"
                        id="date"
                        name="dateOfBirth" // Add name attribute for formik
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-500' : ''}`}
                        required
                      />
                      {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                        <ErrorText>{formik.errors.dateOfBirth}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="date"
                        id="date"
                        name="dateOfBirth" // Add name attribute for formik
                        value={profile?.dateOfBirth || ''}
                        onChange={(e) => handleChange(e, 'dateOfBirth')}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-500' : ''}`}
                        required
                      />
                      {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                        <ErrorText>{formik.errors.dateOfBirth}</ErrorText>
                      )}
                    </>
                  )}

                </div>

              </div>
              <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="hubLocation" className="m-2 font-serif text-sm">Hub Location</label>
                  {!profile?.hubLocation ? (
                    <>
                      <input
                        type="hubLocation"
                        id="hubLocation"
                        value={formik.values.hubLocation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.hubLocation && formik.errors.hubLocation && (
                        <ErrorText>{formik?.errors?.hubLocation}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="hubLocation"
                        id="hubLocation"
                        value={profile?.hubLocation || ''}
                        onChange={(e) => handleChange(e, 'hubLocation')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.hubLocation && formik.errors.hubLocation && (
                        <ErrorText>{formik?.errors?.hubLocation}</ErrorText>
                      )}
                    </>
                  )}

                </div>
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="qualification" className="m-2 font-serif text-sm">Qualification</label>
                  {!profile?.qualification ? (
                    <>
                      <input
                        type="text"
                        id="qualification"
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.qualification && formik.errors.qualification && (
                        <ErrorText>{formik?.errors?.qualification}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="qualification"
                        value={profile?.qualification || ''}
                        onChange={(e) => handleChange(e, 'qualification')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.qualification && formik.errors.qualification && (
                        <ErrorText>{formik?.errors?.qualification}</ErrorText>
                      )}
                    </>
                  )}


                </div>
              </div>
              <div className="space-y- flex flex-col items-center justify-between p-4 pb-0 pt-0 md:flex-row md:space-x-4 md:space-y-0">
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="pastYourWorkedCompany" className="m-2 font-serif text-sm">Past Your Worked Company</label>
                  {!profile?.pastYourWorkedCompany ? (
                    <>
                      <input
                        type="pastYourWorkedCompany"
                        id="pastYourWorkedCompany"
                        value={formik.values.pastYourWorkedCompany}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.pastYourWorkedCompany && formik.errors.pastYourWorkedCompany && (
                        <ErrorText>{formik?.errors?.pastYourWorkedCompany}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="pastYourWorkedCompany"
                        id="pastYourWorkedCompany"
                        value={profile?.pastYourWorkedCompany || ''}
                        onChange={(e) => handleChange(e, 'pastYourWorkedCompany')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.pastYourWorkedCompany && formik.errors.pastYourWorkedCompany && (
                        <ErrorText>{formik?.errors?.pastYourWorkedCompany}</ErrorText>
                      )}
                    </>
                  )}

                </div>
                <div className="m-3 ml-0 mr-0 w-full">
                  <label htmlFor="yearOfExpereience" className="m-2 font-serif text-sm">Year of Expereience</label>
                  {!profile.yearOfExpereience ? (
                    <>
                      <input
                        type="text"
                        id="yearOfExpereience"
                        value={formik.values.yearOfExpereience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.yearOfExpereience && formik.errors.yearOfExpereience && (
                        <ErrorText>{formik?.errors?.yearOfExpereience}</ErrorText>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        id="yearOfExpereience"
                        value={profile?.yearOfExpereience || ''}
                        onChange={(e) => handleChange(e, 'yearOfExpereience')}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border font-roboto border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                        required
                      />
                      {formik.touched.yearOfExpereience && formik.errors.yearOfExpereience && (
                        <ErrorText>{formik?.errors?.yearOfExpereience}</ErrorText>
                      )}
                    </>
                  )}

                </div>
              </div>

              <div className="flex m-5 mb-0 mt-2 gap-3">
                {action ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => formik.handleSubmit(e)}
                      disabled={uploading}
                      className="mb-2 rounded-lg font-roboto bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif"
                    >
                      {uploading ? "Uploading..." : "Edit Changes"}
                    </button>
                    {uploadError && (
                      <ErrorText>
                        {uploadError}
                      </ErrorText>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={(e) => formik.handleSubmit(e)}
                      disabled={uploading}
                      className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif"
                    >
                      {uploading ? "Uploading..." : "Save Changes"}
                    </button>
                    {uploadError && (
                      <ErrorText>
                        {uploadError}
                      </ErrorText>
                    )}
                  </>
                )}

                <button
                  type="button"
                  className="mb-2 rounded-lg bg-dark-highBlue px-5 py-2.5 text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-serif">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* <DeactivateAccount /> */}

    </>

  );
}

export default ProfileUpdateForm;
