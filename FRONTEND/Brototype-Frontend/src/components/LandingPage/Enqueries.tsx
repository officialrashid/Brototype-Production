
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EnquiriesApi } from '../../utils/methods/post';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface formValues {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  prefferredLocation: string;
}

const Enquiries = () => {


  const validationSchema = Yup.object({
    name: Yup.string().min(2,"Too Short")
    .max(50,"Too Long")
    .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone is required'),
    qualification: Yup.string().required('Qualification is required'),
    prefferredLocation: Yup.string().required('Preferred Location is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      qualification: '',
      prefferredLocation: '',
    } as formValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          qualification: values.qualification,
          prefferredLocation: values.prefferredLocation,
        };
        const response = await EnquiriesApi(body);

        if (response.data.status === true) {
          toast.success('Enquiry message successful!');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000); // Redirect after 3 seconds
        } else {
          toast.error('Email Or PhoneNumber already Exist');
        }
      } catch (error) {
        console.log(error, 'error in the formik data');
      }
    },
  });

  return (
    <>
      <div className='bg-gray-200 h-96 w-62rem ml-56 mt-12 '>
        <div className='w-full h-8rem flex gap-4'>
          <div className='w-12rem h-auto gap-4 mt-10rem ml-8rem'>
            <div className='w-12rem h-8'>
              <p className='font-semibold text-2xl px-5 w-fit font-roboto'>Have any queries?</p>
              <p className='text-sm px-5 py-3 w-fit font-roboto'>Get a free counseling session from our Team</p>
              <div className='w-16rem h-6rem mt-5 ml-3 flex'>
                <img src="/PhoneIcon.svg" alt="" />
                <div className='w-16rem h-5 bg-green-90 mt-3 ml-5'>
                  <p className='font-roboto'>Call our team</p>
                  <p className='text-2xl mt-3 font-roboto'>9526603573</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white grid grid-cols-1 w-24rem h-22.5rem ml-16 rounded-md shadow-xl mt-5'>
            <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
              <form onSubmit={formik.handleSubmit}>
                <div className='mt-4 ml-8'>
                  <input
                    id='name'
                    name='name'
                    type='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete='name'
                    required
                    className='block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 focus:outline-gray-600'
                    placeholder='Name'
                    style={{ padding: '3%' }}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='text-red-500 text-sm'>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className='mt-4 ml-8'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete='email'
                    required
                    className='block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 focus:outline-gray-600'
                    placeholder='Email'
                    style={{ padding: '3%' }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className='mt-4 ml-8'>
                  <input
                    id='phone'
                    name='phone'
                    type='text'  
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    autoComplete='phone'
                    required
                    className='block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 focus:outline-gray-600'
                    placeholder='Phone'
                    style={{ padding: '3%' }}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className='text-red-500 text-sm'>{formik.errors.phone}</div>
                  ) : null}
                </div>
              
                <div className='mt-4 ml-8'>
                  <select
                    id='qualification'
                    name='qualification'
                    value={formik.values.qualification}
                    onChange={formik.handleChange}
                    autoComplete='qualification'
                    required
                    className='block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 focus:outline-gray-600'
                  >
                    <option value='' disabled selected>
                      Qualification
                    </option>
                    <option value='+2'>+2</option>
                    <option value='UG'>UG</option>
                    <option value='PG'>PG</option>
                    <option value='PHD'>PHD</option>
                  </select>
                  {formik.touched.qualification && formik.errors.qualification ? (
                    <div className='text-red-500 text-sm'>{formik.errors.qualification}</div>
                  ) : null}
                </div>
                <div className='mt-4 ml-8'>
                  <select
                    id='prefferredLocation'
                    name='prefferredLocation'
                    value={formik.values.prefferredLocation}
                    onChange={formik.handleChange}
                    autoComplete='prefferredLocation'
                    required
                    className='block w-20rem rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 focus:outline-gray-600'
                  >
                    <option value='' disabled selected>
                      Preferred Location
                    </option>
                    <option value='kochi'>Kochi</option>
                    <option value='Kozhikode'>Kozhikode</option>
                    <option value='Bangalore'>Bangalore</option>
                    <option value='Chennai'>Chennai</option>
                  </select>
                  {formik.touched.prefferredLocation && formik.errors.prefferredLocation ? (
                    <div className='text-red-500 text-sm'>{formik.errors.prefferredLocation}</div>
                  ) : null}
                </div>
                <div className='mt-4 ml-8'>
                  <button
                    type='submit'
                    className='flex w-20rem justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-fit flex justify-center items-center inex'>
        <div className='triangle-rotate'></div>
      </div>
      <div></div>
    </>
  );
};

export default Enquiries;
