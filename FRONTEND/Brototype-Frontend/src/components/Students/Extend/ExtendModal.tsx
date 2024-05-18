import { useEffect, useState } from "react";
import { getExtendDetails } from "../../../utils/methods/get";
import { useFormik } from "formik";
import { batch, useSelector } from "react-redux";
import { requestExtention } from "../../../utils/methods/post";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  fullName: string;
  batch: string;
  domain: string;
  currentWeek: string;
  extendDays: string;
  extendReason: string;
  extendReqWeek:any
}

const validationSchema = Yup.object().shape({
  extendDays: Yup.string()
    .trim()
    .required('Extend days is required')
    .oneOf(['2', '7'], 'Extend days must be either 2 or 7'),
  extendReason: Yup.string()
    .trim()
    .required('Extend reason is required'),
});

const ExtendModal = ({ isVisible, isClose,advisorId,reviewId }) => {
  const [extend, setExtend] = useState({});
  const studentId: string = useSelector((state: any) => state?.student?.studentData?.studentId);
  const batchId: any = useSelector((state: RootState) => state?.student?.studentData?.batchId);

  useEffect(() => {
    const fetchExtendDetails = async () => {
      try {
        const data = {
          batchId,
          studentId,
        };
        const response = await getExtendDetails(studentId);
        console.log(response,"extend detailssss debugging section");
        if(response?.response?.response){
          setExtend(response?.response?.response);
        }
     
      } catch (err) {
        console.error('Error fetching extend details:', err);
      }
    };

    if (isVisible) {
      fetchExtendDetails();
    }
  }, [isVisible]);

  const formik = useFormik({
    initialValues: {
      fullName: `${extend?.firstName || ''} ${extend?.lastName || ''}`,
      batch: extend?.batch || '',
      domain: extend?.domain || '',
      currentWeek: extend?.currentWeek || 0,
      extendDays: '',
      extendReason: '',
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        // const body = {
        //   studentId,
        //   advisorId,
        //   extendDays: formik.values.extendDays,
        //   extendReason: formik.values.extendReason,
        //   fullName: `${extend.firstName || ''} ${extend.middleName || ''} ${extend.lastName || ''}`,
        //   batch: extend.batch || '',
        //   domain: extend.domain || '',
        //   currentWeek: extend.currentWeek
        // };
        const body:any ={
          coordinatorId:advisorId,
          reviewId:reviewId,
          extendReason : formik.values.extendReason,
          extendDays : formik.values.extendDays,
          extendReqWeek: extend.currentWeek
        }
        console.log(body,'bodyyyyy');
        
        const response = await requestExtention(body);
        console.log(response,"response in new extend request");
        
        if (response.status === 200) {
          toast.success("Your Request have been successfully");
          isClose();
        }
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    },
  });

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-2xl w-2/5">
        <div className="flex justify-between">
          <div></div>
          <div className="ml-4 mt-4">
            <span onClick={isClose} className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="text-center">
          <div><span className="font-semibold font-roboto text-md mb-2">Extend request</span></div>
        </div>
        <div className="m-5 mt-6">
            <div>
              {/* <input
                type="text"
                className="px-5 py-4 shadow-xl border border-gray-200 focus:outline-black border-red w-full rounded-lg mb-7 font-roboto"
                placeholder="Enter Full Name"
                id="fullName"
                name="fullName"
                value={`${extend.firstName || ''} ${extend.middleName || ''} ${extend.lastName || ''}`}
              /> */}
              {/* <input
                type="text"
                className="px-5 py-4 shadow-xl border border-gray-200 focus:outline-black border-red w-full rounded-lg mb-7 font-roboto"
                placeholder="Enter your Batch"
                id="batch"
                name="batch"
                value={extend?.batch}
              /> */}
              <input
                type="text"
                className="px-5 py-4 shadow-xl border border-gray-200 focus:outline-black border-red w-full rounded-lg mb-7 font-roboto"
                placeholder="Enter your current week"
                id="currentWeek"
                name="currentWeek"
                value={extend?.currentWeek}
              />
              <input
                type="text"
                className={`px-5 py-4 shadow-xl border ${formik.touched.extendDays && formik.errors.extendDays ? 'border-red' : 'border-gray-200'} focus:outline-black w-full rounded-lg mb-7 font-roboto`}
                placeholder="Enter extension need days"
                id="extendDays"
                name="extendDays"
                value={formik.values.extendDays}
                onChange={formik.handleChange}
              />
              {formik.touched.extendDays && formik.errors.extendDays ? (
                <div className="text-red-700 text-sm ml-2">{formik.errors.extendDays}</div>
              ) : null}
              <textarea
                name="extendReason"
                id="extendReason"
                value={formik.values.extendReason}
                onChange={formik.handleChange}
                cols={30}
                rows={10}
                className={`w-full px- py- border ${formik.touched.extendReason && formik.errors.extendReason ? 'border-red' : 'border-gray-200'} shadow-xl outline-black font-roboto`}
                placeholder="Enter your reason for extension"
              ></textarea>
              {formik.touched.extendReason && formik.errors.extendReason ? (
                <div className="text-red-700 text-sm ml-2">{formik.errors.extendReason}</div>
              ) : null}
            </div>
          </div>
        <div className="flex justify-end m-6">
       
          <button type="submit" className="border px-4 py-1 rounded-md bg-black text-white font-roboto" onClick={formik.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendModal;
