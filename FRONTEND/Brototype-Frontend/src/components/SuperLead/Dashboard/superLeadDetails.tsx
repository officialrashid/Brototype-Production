import React, { useEffect, useState } from 'react';
import MiniChart from 'react-mini-chart'
import { getHubWiseStudentsDetails, getPendingStudents } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SuperLeadDetails = () => {
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId")
    const [analyzeDetails, setAnalyzeDetails] = useState("")
    const [pendingStudent,setPendingStudent] = useState(0)
    useEffect(() => {
        const fetchHubWiseStudentDetails = async () => {
            try {
                const response = await getHubWiseStudentsDetails(superleadUniqueId)
                console.log(response, "response in side sectionsss");
                if (response.status === true) {
                    setAnalyzeDetails(response)
                }
            } catch (err) {

            }
        }
        fetchHubWiseStudentDetails()
    }, [])

    useEffect(() => {
        const fetchPendingStudents = async () => {
            try {
               const response = await getPendingStudents(superleadUniqueId)
               console.log(response,"response in getting pending studentssssss");
               if(response?.response?.status==true){
                 setPendingStudent(response?.response?.pendingStudentCount)
               }else if(response?.response?.message==="No Pending Students Available" && response?.response?.status===false){
                setPendingStudent(0)
               }
            } catch (error:any) {
              toast.error(error)
            }
        }
        fetchPendingStudents()
    })
    return (
        <>
            <div>
                <div className="grid grid-rows-3 grid-flow-col gap-2 w- h-21/3 mt-36   top-0  fit">
                    <div className="bg-white l rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Students</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">{analyzeDetails?.studentsCount}</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#6466F2"
                                activePointColor="#6466F2"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>
                    <div className="bg-white  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Advisors</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">10</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#ff0000"
                                activePointColor="#ff0000"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>
                    <div className="bg-white  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Reviewers</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">{analyzeDetails?.reviewersCount}</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#F1BB67"
                                activePointColor="#F1BB67"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>
                    <div className="bg-white  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Terminate</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">{analyzeDetails?.terminateCount}</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#03c3ec"
                                activePointColor="#03c3ec"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>
                    <div className="bg-white  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Quit</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">{analyzeDetails?.quitCount}</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#00ff00"
                                activePointColor="#00ff00"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>
                    <div className="bg-white  rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">

                        <p className='font-roboto ml-14 mt-4 text-sm text-gray-500'>Pending</p>
                        <h1 className="font-roboto text-2xl ml-14 font-medium mt-1 text-md">{pendingStudent}</h1>


                        <div className="m-3 ml-6  ">
                            <MiniChart
                                strokeColor="#8492A3"
                                activePointColor="#8492A3"
                                activePointRadius={8}
                                strokeWidth={5}
                                labelFontSize={50}
                                width={120}
                                height={50}
                                dataSet={[0, -20, 343, 49.3, -100, 200, 78]} />


                        </div>
                    </div>

                </div>








            </div>


        </>
    );
}

export default SuperLeadDetails;
