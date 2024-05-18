import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getSuperleadProfile } from "../../../utils/methods/get";
import { useNavigate } from "react-router-dom";
import DeactivateAccount from "./DeactivateAccount";


const SuperleadProfile = () => {

    const superleadId:any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
    const [profile,setProfile] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
       const fetchProfile = async () =>{
             try {
                const response = await getSuperleadProfile(superleadId)
                console.log(response,"dffdjjdbdhfdhfd");
                if(response.status===true){
                    const [profileData] = response?.response;
                    setProfile(profileData);
                }
             } catch (error) {
                throw error  
             }
       }
       fetchProfile()
    },[])
const handleEditAccount = (action:string) =>{
     try {
        navigate('/superlead/profileUpdate',{ state: { action } })
     } catch (error) {
        throw error
     }
}
    return (
        <>
            <section className="p-3 sm:p-5 mt- w-full mt-36 mb-0">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12 mb-0">

                    <div className="bg-white border relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="relative">

                            <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/pages/profile-banner.png" alt="" className="w-full h-48" />


                            <div className="flex mb-0">
                                <div className="absolute top-36 left-8 w-26 bg-white rounded-md">
                                    <img src={profile?.imageUrl} alt="" className="w-28 h-28 rounded-md" />
                                </div>
                                <div className="m-40 mt-0 mb-0">
                                    <p className="font-serif text-gray-500 pt-3 ">{profile?.firstName} {profile?.lastName}</p>
                                    <div className="mt-0 mb-5">
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 font-roboto ">SuperLead @Brototype</span>
                                    </div>
                                </div>

                            </div>
                            {/* <div className="bg-custom-background"> */}
                                <div className='bg-white h-auto m-8 mt-0  ml-4  rounded-xl '>

                                    <div className='ml-3 mt-5  w-full h-auto rounded-md border border-gray-300'>
                                        <h1 className='font-roboto ml-5 mt-3 font-semibold text-sm'>Personal Information</h1>
                                        {/* <span className="absolute font-roboto  mr-5 right-3 mt-24 inline-flex items-center rounded-md bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 ring-1 ring-inset ring-purple-700/10 cursor-pointer" >
                                            <img src='/edit.png' className='w-3 h-3 mr-2' alt="Edit Icon" />
                                             Edit Your Account
                                        </span> */}

                                        <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>First Name</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.firstName}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Last Name</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.lastName}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Email</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.email}</p>

                                            </div>
                                        </div>
                                        <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Phone</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.phone}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Gender</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.gender}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Date Of Birth</p>
                                                
                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.dateOfBirth}</p>

                                            </div>
                                        </div>
                                        <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Hub Location</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.hubLocation}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Qualification</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.qualification}</p>

                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Past Your Worked Company</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile?.pastYourWorkedCompany}</p>

                                            </div>
                                     

                                        </div>
                                        <div className='grid grid-cols-3 ml-5 mt-6 gap-x-5'>
                                            <div className='flex flex-col'>
                                                <p className='text-sm text-gray-400 font-roboto'>Year of Expereience</p>

                                                <p className='text-sm text-gray-400 font-roboto mt-2 text-gray-500'>{profile.yearOfExpereience}</p>

                                            </div>
                           
                                        </div>
                      
                                    </div>
                                    <div className="flex items-center justify- gap-2 m-5">
                            <button type="button" className="focus:outline-none text-white bg-Average hover:bg-purple-500 focus:ring-1 focus:ring-Average font-medium rounded-lg text-xs font-roboto px-5 py-2 mb-2 dark:bg-Average"onClick={(e)=>handleEditAccount("edit")}>Edit</button>
                            <button type="button" className="focus:outline-none text-red-500 hover:text-white bg-red-100 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2 mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Deactive My Account</button>
                        </div>
                                </div>
                            </div>

                        </div>
                    </div>

                {/* </div> */}
            </section>
            <DeactivateAccount />
        </>
    )
}
export default SuperleadProfile