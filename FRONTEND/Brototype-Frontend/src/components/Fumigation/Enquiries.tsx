import React from 'react';
import { useFormik } from 'formik';
import { EnquiriesApi } from '../../utils/methods/post';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface formValues{
     name: string,
     email: string,
     phone: string,
     qualification: string,
     preferredLocation: string
}


const Enqueries = () => {
const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      qualification: '',
      preferredLocation: '',
    } as formValues,
    // Define your onSubmit handler here
    onSubmit: async (values) => {
      try{

        const body ={
          name: values.name,
          email: values.email,
          phone: values.phone,
          qualification: values.qualification,
          preferredLocation: values.preferredLocation
        }
       const response = await EnquiriesApi(body) 
        if(response){
          toast.success('Enquerie message successful!');
          window.location.reload()
        }
        

      } catch(error){
        console.log(error,"error in the formik data");
        
      }
    },
  });


    return (
        <>
        <div className='bg-custom-domain h-96 w-62rem ml-56 mt-12 '>
        <div className="w-full h-8rem flex gap-4">
          <div className='w-12rem h-auto gap-4 mt-10rem ml-8rem'>
            <div className='w-12rem h-8'>
              <p className='font-semibold text-2xl px-5 w-fit'>Have any queries?</p>
              <p className='text-sm px-5 py-3 w-fit'>Get a free counseling session from our Team</p>
              <div className='w-16rem h-6rem mt-5 ml-3 flex'>
                <img src="/PhoneIcon.svg" alt="" />
                <div className='w-16rem h-5 bg-green-90 mt-3 ml-5'>
                  <p>Call our team</p>
                  <p className='text-2xl mt-3'>9526603573</p>
                </div>
              </div>
            </div>
          </div>
      
          <div className='bg-white grid grid-cols-1 w-24rem h-22.5rem ml-16 rounded-md shadow-xl mt-5'>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={formik.handleSubmit}>
              
                <div className="mt-4 ml-8">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete="name"
                    required
                    className="block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Name'
                    style={{ padding: '3%' }}
                  />
                </div>
                <div className="mt-4 ml-8">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="email"
                    required
                    className="block w-20rem  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 focus:outline-gray-600"
                    placeholder='Email'
                    style={{ padding: '3%' }}
                  />
                </div>
                <div className="mt-4 ml-8">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    autoComplete="phone"
                    required
                    className="block w-20rem  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Phone'
                    style={{ padding: '3%' }}
                  />
                </div>
                <div className="mt-4 ml-8">
                  <input
                    id="qualification"
                    name="qualification"
                    type="qualification"
                    value={formik.values.qualification}
                    onChange={formik.handleChange}
                    autoComplete="qualification"
                    required
                    className="block w-20rem  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Qualification'
                    style={{ padding: '3%' }}
                  />
                </div>
                <div className="mt-4 ml-8">
                  <select
                    id="preferredLocation"
                    name="preferredLocation"
                    value={formik.values.preferredLocation}
                    onChange={formik.handleChange}
                    autoComplete="preferredLocation"
                    required
                    className="block w-20rem  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>Preferred Location</option>
                    <option value="kochi">Kochi</option>
                    <option value="kozhikkod">Kozhikkod</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
                <div className='mt-4 ml-8'>
                  <button
                    type="submit"
                    className="flex w-20rem justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center inex">
        <div className="triangle-rotate "></div>
      </div>
      </>
    );
}

export default Enqueries;