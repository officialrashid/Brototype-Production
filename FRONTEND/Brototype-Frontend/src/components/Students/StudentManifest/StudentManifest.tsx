import ProfileUpdateModal from "./ProfileUpdateModal";
import PersonalInfoModal from "./PersonalInfoModal";
import AddressModal from "./AddressModal";
import EducationModal from "./EducationModal";
import GovernmentApprovelIdModal from "./GovernmentApprovelIdModal";
import React, { useEffect, useState } from "react";
import { getProfile } from "../../../utils/methods/get";
import { useDispatch, useSelector } from "react-redux";
import { signInWithCustomToken, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/config';
// import { GoogleAuthProvider } from "firebase/auth";

const StudentManifest = () => {
  const [setProfile, setProfileUpdate] = useState(false);
  const [setPersonalInfo, setPersonalInfoUpdate] = useState(false);
  const [setAddress, setAddressUpdate] = useState(false);
  const [setEducation, setEducationUpdate] = useState(false);
  const [setGovernmentId, setGevernmentIdUpdate] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const studentId: string = useSelector((state: any) => state?.student?.studentData?.studentId);


  useEffect(() => {
    fetchStudentProfile();
  }, [profileModalVisible]);
  const exampleData = {
    imageUrl: 'example-image-url',
    firstName: 'Muhammed',
    lastName: 'Rashid k',
    domain: 'Example Domain',
    batch: 'Example Batch',
    dateOfBirth: 'Example Date of Birth',
    age: 'Example Age',
    gender: 'Example Gender',
    email: 'example@email.com',
    phone: '123-456-7890',
    fathersName: 'Example Father',
    mothersName: 'Example Mother',
    fathersContact: '123-456-7891',
    mothersContact: '123-456-7892',
    houseName: 'Example House',
    village: 'Example Village',
    taluk: 'Example Taluk',
    district: 'Example District',
    state: 'Example State',
    pincode: 'Example Pincode',
    highestQualification: 'Example Qualification',
    yearOfPassing: 'Example Year',
    passPercentage: 'Example Percentage',
    schoolOrCollegeOrInstituteName: 'Example School/College/Institution',
    // ... other profileInfo fields
  };
  const fetchStudentProfile = async () => {
    try {
      const response = await getProfile(studentId);
      console.log(response, "PPppp");

      if (response?.data?.status) {
        // Assuming 'response.data.response' is an array
        const [profileData] = response.data.response;
        setProfileInfo(profileData);
      } else {
        console.error("Failed to get profile data:", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

const handleProfileUpdateSuccess = () =>{
  console.log("callingggggggggggggggggggggggg");
  
   setProfileModalVisible(true)

}
  return (
    <>
      <div className="bg-custom-background">
        <div className='bg-white h-auto m-8 rounded-xl w-67.3rem'>
          <h1 className='font-roboto font-sm ml-5 mt-5 text-white'>he</h1>
          <h1 className='font-roboto font-sm ml-5 mt-'>Your Manifest Details</h1>
          <div className='ml-10 mt-5 w-62rem h-28 rounded-md border border-gray-300 relative'>
            <div className='flex'>
              {profileInfo?.imageUrl ? (
                <img src={profileInfo.imageUrl} alt="" className='rounded-full w-16 h-16 ml-5 mt-5' />
              ) : (
                <img src="" alt="" className='rounded-full w-16 h-16 ml-5 mt-5' />
              )}

              <div className='flex flex-1 flex-col ml-8 mt-5'>
                {profileInfo?.firstName && profileInfo?.lastName ? (
                  <h1 className='text-sm font-semibold font-roboto'>{profileInfo.firstName} {profileInfo.lastName}</h1>
                ) : (
                  <h1 className='text-sm font-semibold font-roboto'>{exampleData.firstName} {exampleData.lastName}</h1>
                )}
                {profileInfo?.domain ? (
                  <h1 className='text-sm text-gray-500 font-roboto mt-1 ml-'>{profileInfo.domain}</h1>
                ) : (
                  <h1 className='text-sm text-gray-500 font-roboto mt-1 ml-'>{exampleData.domain}</h1>
                )}

                <div className="flex gap-3 mt-2">
                  {profileInfo?.batch ? (
                    <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">{profileInfo.batch}</span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">{exampleData.batch}</span>
                  )}

                  <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer">Remote</span>
                </div>
              </div>
              <span className="absolute top-12 right-5 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { setProfileUpdate(true) }}>
                <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
                Request Edit
              </span>
            </div>
          </div>



          <div className='ml-10 mt-5 w-62rem h-auto rounded-md border border-gray-300'>
            <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Personal Information</h1>
            <span className="absolute  mr-24 right-3 mt-28 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { setPersonalInfoUpdate(true) }} >
              <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
              Request Edit
            </span>

            <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Date Of Birth</p>
                {profileInfo?.dateOfBirth ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo?.dateOfBirth}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.dateOfBirth}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Age</p>
                {profileInfo?.age ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.age}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.age}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Gender</p>
                {profileInfo?.gender ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.gender}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.gender}</p>
                )}
              </div>
            </div>
            <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Email</p>
                {profileInfo?.email ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.email}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.email}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Phone</p>
                {profileInfo?.phone ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.phone}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.phone}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Father`s Name</p>
                {profileInfo?.fathersName ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.fathersName}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.fathersName}</p>
                )}
              </div>
            </div>
            <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Mother`s Name</p>
                {profileInfo?.mothersName ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.mothersName}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.mothersName}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Father`s Contact</p>
                {profileInfo?.fathersContact ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.fathersContact}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.fathersContact}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Mother`s Contact</p>
                {profileInfo?.mothersContact ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.mothersContact}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.mothersContact}</p>
                )}
              </div>

            </div>

          </div>



          <div className='ml-10 mt-5 w-62rem h-auto rounded-md border border-gray-300'>
            <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Address</h1>
            <span className="absolute  mr-24 right-3 mt-8 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { setAddressUpdate(true) }}  >
              <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
              Request Edit
            </span>
            <div className='grid grid-cols-3 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>House Name</p>
                {profileInfo?.houseName ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.houseName}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.houseName}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Village</p>
                {profileInfo?.village ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.village}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.village}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Taluk</p>
                {profileInfo?.taluk ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.taluk}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.taluk}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-3 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>District</p>
                {profileInfo?.district ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.district}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.district}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>State</p>
                {profileInfo?.state ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.state}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.state}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Pincode</p>
                {profileInfo?.pincode ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.pincode}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.pincode}</p>
                )}
              </div>
            </div>


          </div>

          <div className='ml-10 mt-5 w-62rem h-auto rounded-md border border-gray-300'>
            <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Educational Details</h1>
            <span className="absolute  mr-24 right-3 mt-8 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { setEducationUpdate(true) }}>
              <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
              Request Edit
            </span>
            <div className='grid grid-cols-3 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Hihest Qualification</p>
                {profileInfo?.highestQualification ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.highestQualification}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.highestQualification}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Year of Passing</p>
                {profileInfo?.yearOfPassing ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.yearOfPassing}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.yearOfPassing}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Pass Percentage %</p>
                {profileInfo?.passPercentage ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.passPercentage}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.passPercentage}</p>
                )}
              </div>
            </div>
            <div className='grid grid-cols-3 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>School/College/InstitutionName</p>
                {profileInfo?.schoolOrCollegeOrInstituteName ? (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.schoolOrCollegeOrInstituteName}</p>
                ) : (
                  <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{exampleData.schoolOrCollegeOrInstituteName}</p>
                )}
              </div>

            </div>


          </div>

          <div className='ml-10 mt-5 w-62rem h-auto rounded-md border border-gray-300'>
            <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Government Approved Id Card</h1>
            <span className="absolute  mr-24 right-3 mt-16 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => { setGevernmentIdUpdate(true) }}>
              <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
              Request Edit
            </span>
            <div className='grid grid-cols-3 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Your Id Card</p>
                {profileInfo?.governmentIdImageUrl ? (
                <img src={profileInfo?.governmentIdImageUrl} alt="" className='w-72 h-36 mt-3' />
                ) : (
                  <img src="https://aadhaarkyc.io/wp-content/uploads/2018/09/aadhaar_cc_926a3223b45c31aa2cfbeca9ea6028d6.png" alt="" className='w-72 h-36 mt-3' />
                )}

              </div>
   
            </div>
            <p className="text-sm font-roboto text-white">gevernmrntIdEnd</p>

          </div>
          <div className='w-24 h-16 ml-28rem'>
            {/* <button className="bg-black hover:bg-gray-400 text-white font-roboto font-semibold m-3 h-8 w-28 h-18 rounded-full text-sm">
              update
            </button> */}

          </div>

        </div>
      </div>
      <ProfileUpdateModal isVisible={setProfile} onClose={() => { setProfileUpdate(false) }} handleProfileUpdateSuccess={() =>handleProfileUpdateSuccess()} />
      <PersonalInfoModal isVisible={setPersonalInfo} onClose={() => { setPersonalInfoUpdate(false) }} handleProfileUpdateSuccess={() =>handleProfileUpdateSuccess()} />
      <AddressModal isVisible={setAddress} onClose={() => { setAddressUpdate(false) }} handleProfileUpdateSuccess={() =>handleProfileUpdateSuccess()}/>
      <EducationModal isVisible={setEducation} onClose={() => { setEducationUpdate(false) }} handleProfileUpdateSuccess={() =>handleProfileUpdateSuccess()}/>
      <GovernmentApprovelIdModal isVisible={setGovernmentId} onClose={() => { setGevernmentIdUpdate(false) }} handleProfileUpdateSuccess={() =>handleProfileUpdateSuccess()} />
    </>
  );
}

export default StudentManifest;
