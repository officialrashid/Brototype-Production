import { useEffect, useState } from "react";
import { getReviewerProfile } from "../../../utils/methods/get";
import { useSelector } from "react-redux";

const ReviewerDetails=()=>{
  const reviewerId = useSelector((state: any) => state?.reviewer?.reviewerData?.reviewerId);
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
          // Add other properties as needed
        });
      } else {
        console.error("Failed to get profile data:", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
    const series = [70]; //70 percent
    const options = {
      
      labels: [], //label of this diagram
      plotOptions: {
        radialBar: {
         
          dataLabels: {
            name: {
              show: false, // Set to true if you want to display the category (name) labels
            },
     
            value: {
              show: false, // Set to true if you want to display the value labels
            },
            
          }
        },
        
      },
      colors:['#347dc1']
    }

    return (
        <>
        <div className="flex justify-between mb-0">
            <div className="w-4/6 "> 
            <div className=" border   rounded-lg  m-4 mt-6  mb-0 h-fit bg-white  ">
  <div className="flex justify-between m-4 mb-">
      <div>
<span className="font-roboto">Helloo reviewer!!!!!</span>
<div>
  <span className="font-roboto">Complete your task</span>
</div>
  </div>
    <div className=" border-gray-400  h-20 w-20  flex  items-center justify-center"  >
    <img src={profileInfo.imageUrl} className=" h-20 w-20" alt="" />
  
  </div>

  </div>

 
</div>


        

            </div>
     



        </div>
   
       
       




        
        </>
    )
}

export default ReviewerDetails;