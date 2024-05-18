import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getReviewerDetails, getReviewerProfile } from "../../../utils/methods/get";
import { useSelector } from "react-redux";




const ReviewerProfile = () => {
  const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
    const [data,setData] = useState("")
    const [profileInfo, setProfileInfo] = useState({});
    useEffect(() => {
      fetchReviewerProfile();
    }, []);
  
    const fetchReviewerProfile = async () => {
      try {
        const response = await getReviewerProfile(reviewerId);
        console.log(response, "PPppp");
  
        if (response?.status===true) {
          // Assuming 'response.data.response' is an array
          const [profileData] = response.response;
  
          // Set the profile details in the state
          setProfileInfo({
            imageUrl : profileData.imageUrl,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
         
            // Add other properties as needed
          });
        } else {
          console.error("Failed to get profile data:", response?.data?.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  useEffect(()=>{
    const fetchReviewerDetails = async ()=>{
       const response = await getReviewerDetails(reviewerId)
       console.log(response,"review all detailas");
       setData(response)
    }
    fetchReviewerDetails()
  },[])
  const containerVariants = {
    hover: {
      y: -10, // Adjust the value as needed to move the div up on hover
    },
  };
    return (
        <div className="w-22.5rem h-auto bg-white right-6 mb-48rem mt-6 rounded-xl  absolute" >
              
        <div className="  rounded-lg w-full mb-2 bg-white ">
<div className=" border-b  h-20 bg-slate-200  rounded-t-lg">


</div>
<div className=" h-24 w-24  border  rounded -mt-12 mx-auto   bg-white relative dark:bg-slate-200  overflow-hidden">
<img src={profileInfo.imageUrl} alt="" className="h-24 2-24"/>

  
 

</div>
<div className="m-3 text-center">
<div><span className="font-roboto ">{profileInfo.firstName} {profileInfo.lastName}</span></div>

<div>
<span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer mt-3 font-roboto">Reviewer @Brototype</span>

</div>

</div>
<div className="border-t rounded-b-lg m-5">
  <div className="flex flex-row">
    <div className="flex-1">
      <motion.div className="bg-  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300 h-26  m-4" whileHover={{ scale: 1.1 }}>
        <div className="bg-custom-background w-10 h-8 ml-4 mt-5 rounded-md shadow-sm flex">
          <img src="/success.png" alt="" className="h-8 ml-1 " />
          <h1 className="font-roboto text-2xl ml-8 font-medium ">{data?.dayReviewCount}</h1>
        </div>
        <h1 className="font-roboto text-xs ml-2 font-medium mt-3 text-gray-400 absolute">Today Review Count</h1>
        <img src="/success.png" alt="" className="h-12 w-12 ml-20 relative opacity-5" />
      </motion.div>
    </div>
    <div className="flex-1">
      <motion.div className="bg-  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300 h-26  m-4" whileHover={{ scale: 1.1 }}>
        <div className="bg-custom-background w-10 h-8 ml-4 mt-5 rounded-md shadow-sm flex">
          <img src="weekPerformance.png" alt="" className="h-8 ml-1 " />
          <h1 className="font-roboto text-2xl ml-8 font-medium  ">{data.dayTakeReviewCount}</h1>
        </div>
        <h1 className="font-roboto text-xs ml-2 font-medium mt-3 text-gray-400 absolute">Review Took Oneday</h1>
        <img src="/weekPerformance.png" alt="" className="h-12 w-12 ml-20 relative opacity-5" />
      </motion.div>
    </div>

  </div>
  <div className="flex flex-row">
    <div className="flex-1">
      <motion.div className="bg-  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300 h-26  ml-4 mr-4 " whileHover={{ scale: 1.1 }}>
        <div className="bg-custom-background w-10 h-8 ml-4 mt-5 rounded-md shadow-sm flex">
          <img src="/performance (1).png" alt="" className="h-8 ml-1 " />
          <h1 className="font-roboto text-2xl ml-8 font-medium ">{data?.oneMonthReviewCount}</h1>
        </div>
        <h1 className="font-roboto text-xs ml-2 font-medium mt-3 text-gray-400 absolute">Monthly Review Count</h1>
        <img src="/performance (1).png" alt="" className="h-12 w-12 ml-20 relative opacity-5" />
      </motion.div>
    </div>
    <div className="flex-1">
      <motion.div className="rounded-xl border border-gray-300 hover hover:border-2 border-gray-300 h-26 ml-4 mr-4 " whileHover={{ scale: 1.1 }}>
        <div className="bg-custom-background w-10 h-8 ml-4 mt-5 rounded-md shadow-sm flex">
          <img src="/failure.png" alt="" className="h-8 ml-1 " />
          <h1 className="font-roboto text-2xl ml-8 font-medium  ">{data.totalReviewCount}</h1>
        </div>
        <h1 className="font-roboto text-xs ml-2 font-medium mt-3 text-gray-400 absolute">Total Review Count</h1>
        <img src="/failure.png" alt="" className="h-12 w-12 ml-20 relative opacity-5" />
      </motion.div>
    </div>

  </div>
  <p className="text-white h-7">hello reviewer</p>
  
</div>

</div>



</div>


    );
}

export default ReviewerProfile;
