
import logo from '../../../../public/brototype logo.png';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { invigilatorGoogleLogin, studentGoogleLogin, studentLogin } from '../../../utils/methods/post';

import { setStudentData } from "../../../redux-toolkit/studentReducer"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from 'react';

// define the object datas
interface formValues {
  email: string;
  password : string
}
const adminEmail = "muhammedrashi59@gmail.com"
const adminPassword = "123"
const SignIn = () => {
  let phone: number;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
      localStorage.setItem("adminVerify",'false')
  },[])
  const formik = useFormik({
    initialValues: {
      email: '',
      password : ''
    } as unknown as formValues,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const body: any = {
          email: values?.email,
          password : values.password
        };
        console.log(body);
        
       if(adminEmail===body.email && adminPassword===body.password){
        console.log("Enetr successfully");
        
         toast.success("Admin Login Successfully")
         localStorage.setItem("adminVerify",'true')
         navigate("/admin/dashboard")
       }else{
        localStorage.setItem("adminVerify",'false')
        toast.error("Email Or Phone Number Is Incorrect")
       }
      } catch (error) {
        console.error(error);
      }
    }
  });

  // define the Google SignIn function
  // const handleGoogleSignIn = async (e: any) => {
  //   e.preventDefault();

  //   const provider = new GoogleAuthProvider();

  //   signInWithPopup(auth, provider)
  //     .then(async (result) => {
  //       if (result.user?.email) {
  //         let email: string = result.user.email;
  //         const response: any = await studentGoogleLogin(email);
  //         console.log(response,"response in google login fornenedd");
          
  //         if (response?.data?.status === false) {
  //           toast.error("Email Not Found");
         
  //         } else {
  //           console.log("else case from google login",response?.data?.response?.customToken);
            
  //           signInWithCustomToken(auth, response?.data?.response?.customToken)
  //           .then(async(userCredential) => {
  //             const user = await userCredential.user;
  //             console.log(user,"usr comingggggg");
  //             const idToken = await user.getIdToken()
  //             console.log(idToken,"id Token comuing  tatadsdgs");
        
  //             if (user) {
  //               const studentData: any = {
  //                 studentId: response?.data?.response?.student.studentId,
  //                 imageUrl: response?.data?.response?.student.profileUrl,
  //                 batchId : response?.data?.response?.student?.batchId,
  //                 batch : response?.data?.response?.student?.batch,
  //                 name : response?.data?.response?.student.name,
  //                 phone : response?.data?.response?.student.phone,
  //                 accessToken: response?.data?.response?.accessToken,
  //                 customToken: response?.data?.response?.customToken
  //             }
  //             let student = "student"
  //             localStorage.setItem('studentIdToken',idToken)
  //             localStorage.setItem(`studentAccessToken`, studentData?.accessToken)
  //             localStorage.setItem("studentCustomToken", studentData?.customToken)
  //             localStorage.setItem('role', student)
  //             dispatch(setStudentData(studentData))
  //             toast.success("SUCCESSFULLY LOGIN");
  //             navigate("/student")
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err, 'invalid Firebase token');
  //           })
  //           .finally(() => {
  //             setIsLoading(false);
  //           });
           
           
  //         }
  //       } else {
  //         toast.error("Some Issues In Google SignIn");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error, "error in the Google SignIn");
  //       toast.error("Some Issues In Google SignIn");
  //     });
  // };
  return (


 
<>
      <div className="flex flex-col min-h-screen ">
        <div className='flex justify-center items-center h-screen bg-gray-200'>
          <div className="border border-solid  shadow-2xl bg-white p-4 mt-4 w-1/4" >
            <div className="  flex-1 flex-col ">
              <div>
                <img
                  className=" mx-auto mt-4 h-10 w-auto "
                  src={logo}
                  alt="Your Company"
                />
                <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="uniqueId" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Enter your student id'
                        id="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="email"
                        required
                        className=" focus:outline-gray-800 block w-full rounded-sm px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="uniqueId" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Enter your student id'
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="password"
                        required
                        className=" focus:outline-gray-800 block w-full rounded-sm px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between ">
                    <div className='flex items-start'>
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="accent-black w-4 h-4 border border-blue-900 rounded bg-blue-100 focus:ring-3 focus:ring-blue-300 dark:bg-blue-900 dark:border-blue-900 dark:focus:ring-blue-900 dark:ring-offset-blue-900 ring-blue-900" />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor="remember" className="text-gray-800 dark:text-gray-400">Remember me</label>
                      </div>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-black hover:text-red">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full justify-center rounded-sm bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 relative"
                    >
                      {isLoading && (
                        <div role="status">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2 mt-0.5" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                      )}
                      {isLoading ? 'Signing In...' : 'Sign in'}
                    </button>
                  </div>
                  <div>

                    {/* <button
                      onClick={handleGoogleSignIn}
                      type="submit"
                      className="flex w-full justify-center rounded-sm bg-black px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                    >
                      <img src="/google.png" alt="" className='w-4 mr-3 mt-1' />
                      Google With SignIn
                    </button> */}
                  </div>
                  <div className='ml-2'>
                    <span className='text-sm text-gray-400 ml-2'>This site is protected by reCAPTCHA and the </span>
                    <div>
                      <span className=' text-sm text-gray-400 ml-[0.86vw]'>Google Privacy Policy and Terms of Service</span>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>


      </div>

      <nav className='bg-white bottom-0 fixed w-full shadow-xl h-12 '>

        <nav className=''>
          <ul className='flex items-center text-gray-500 text-sm pt-4 gap-[1vw] pl-64'>
            <li> <span className=' '>Copyright © 2023 Brototype</span></li>
            <li>Help center</li>
            <li>Jobs</li>
            <li>Online interview</li>
            <li>Students</li>
            <li>Terms</li>
            <li>Privacy and policy</li>
            <li>Students</li>
            <li>Terms</li>
            <li>Privacy and policy</li>



          </ul>
        </nav>
      </nav>

</>

   

  );
}

export default SignIn;




