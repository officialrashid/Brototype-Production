import React, { useEffect, useState } from "react";
import { getReviewerProfile } from "../../../utils/methods/get";
import { useSelector } from "react-redux";
import ProfileUpdateModal from "./ProfileUpdateModal";
import PersonalInfoModal from "./updateWorkDetailsModal";

const ReviewerProfile = () => {
  const [setProfile, setProfileUpdate] = useState(false);
  const [setPersonalInfo, setPersonalInfoUpdate] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
 
  useEffect(() => {
    fetchReviewerProfile();
  }, [profileInfo]);

  const fetchReviewerProfile = async () => {
    try {
      const response = await getReviewerProfile(reviewerId);
      console.log(response, "PPppp");

      if (response?.status===true) {
        // Assuming 'response.data.response' is an array
        const [profileData] = response.response;
console.log(profileData.skills,"fbdvfdvfhdvfdfvgh");

        // Set the profile details in the state
        setProfileInfo({
          imageUrl : profileData.imageUrl,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          experience: profileData.experience,
          skills: Array.from(profileData.skills), // Convert to regular JavaScript array,
          age : profileData.age,
          gender: profileData.gender,
          email: profileData.email,
          phone: profileData.phone,
          CurrentWorkingCompanyName:profileData.CurrentWorkingCompanyName,
          PrefferedDomainsForReview:profileData.PrefferedDomainsForReview
          // Add other properties as needed
        });
      } else {
        console.error("Failed to get profile data:", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-custom-background">
        <div className='bg-white h-auto m-8 rounded-xl w-67.3rem'>
          <h1 className='font-roboto font-sm ml-5 mt-5 text-white'>hello</h1>
          <h1 className='font-roboto font-sm ml-10 mt-'>Your Profile Details</h1>
          <div className='ml-10 mt-5 w-62rem h-28 rounded-md border border-gray-300 relative'>
            <div className='flex'>
              <img src={profileInfo.imageUrl} alt="" className='rounded-full w-16 h-16 ml-5 mt-5' />
              <div className='flex flex-1 flex-col ml-8 mt-5'>
                <h1 className='text-sm font-semibold font-roboto'>{profileInfo.firstName} {profileInfo.lastName}</h1>
                <p className='text-sm text-gray-500 font-roboto mt-1 ml-6'>{profileInfo.age} years old </p>
                <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-pink-50 px-1 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer font-roboto">{profileInfo.experience} year exp</span>
        <span className="inline-flex items-center rounded-md bg-pink-50 px-1 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer font-roboto">Reviewer</span>
                </div>
              </div>
              <span className="absolute top-12 right-5 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer font-roboto" onClick={() => { setProfileUpdate(true) }}>
                <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
                Add Details
              </span>
            </div>
          </div>

          <div className='ml-10 mt-5 w-62rem h-auto rounded-md border border-gray-300'>
            <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Work Information</h1>
            <span className="absolute  mr-24 right-3 mt-8 inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10 cursor-pointer font-roboto" onClick={() => { setPersonalInfoUpdate(true) }} >
              <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
              Add Details
            </span>
            <div className='grid grid-cols-2 ml-5 mt-3 gap-x-5'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Experience</p>
                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.experience}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-400 font-roboto'>Current Working Company Name</p>
                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profileInfo.CurrentWorkingCompanyName}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 ml-5 mt-6 gap-x-5'>
  <div className='flex flex-col'>
    <p className='text-sm text-gray-400 font-roboto'>Skills</p>
    <ul className='text-sm text-gray-400 font-roboto mt-2'>
    {profileInfo.skills && profileInfo.skills.map((skill, index) => (
  <li key={index}>{index+1}. {skill}</li>
))}

    </ul>
  </div>
  <div className='flex flex-col'>
    <p className='text-sm text-gray-400 font-roboto'>Preferred Domains For Review</p>
    <ul className='text-sm text-gray-400 font-roboto mt-2'>
      {profileInfo.PrefferedDomainsForReview && profileInfo.PrefferedDomainsForReview.map((domain, index) => (
        <li key={index}>{index+1}. {domain}</li>
      ))}
    </ul>
  </div>
</div>

        
          </div>
          <p className="text-white">hr</p>
        </div>
      </div>
     
      <ProfileUpdateModal isVisible={setProfile} onClose={() => { setProfileUpdate(false)}} />
      <PersonalInfoModal isVisible={setPersonalInfo} onClose={() => { setPersonalInfoUpdate(false) }} />
    </>
  );
}

export default ReviewerProfile;
