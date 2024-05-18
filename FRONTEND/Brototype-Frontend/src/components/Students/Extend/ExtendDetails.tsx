import { useEffect, useState } from "react";
import { getAdvisorDetails, getRequestExtendDetails } from "../../../utils/methods/get";
import ReasonViewModal from "./ReasonViewModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { secondExtendRequest } from "../../../utils/methods/post";
import { TrendingUpIcon } from "lucide-react";

// ... (other imports)

const ExtendDetails = () => {
    const [extendRequests, setExtendRequests] = useState([]);
    const [viewReason, setViewReason] = useState(false);
    const [selectedExtendId, setSelectedExtendId] = useState("");
    const [reloadData, setReloadData] = useState(false);
    const studentId: string = useSelector((state: any) => state?.student?.studentData?.studentId);
    useEffect(() => {
        const fetchExtendDetails = async () => {
            try {
                const response = await getRequestExtendDetails(studentId);
                console.log("get extend requesteeeeeee", response);

                if (response.error === true) {
                    setExtendRequests([])

                } else {
                    const combinedData: any = []; // Array to store combined review and advisor data
                    for (const data of response) {
                        // Fetch advisor details for each review
                        const advisorDetails = await getAdvisorDetails(data.coordinatorId);
                        console.log(advisorDetails, "advisorDetails response");
                        // Check if advisor details were fetched successfully
                        if (advisorDetails.status === true && advisorDetails.response.length > 0) {
                            // Combine review data with advisor details
                            const extendData = {
                                data,
                                advisorName: `${advisorDetails.response[0].firstName} ${advisorDetails.response[0].lastName}`
                            };
                            // Push the combined data to the array
                            combinedData.push(extendData);
                            setExtendRequests(combinedData);
                        } else {
                            setExtendRequests([])
                        }

                    }
                }
            } catch (err) {
                console.error("Error fetching extension details:", err);

            }
        };

        fetchExtendDetails();
    }, [reloadData]);

    const openReasonModal = (extendId: string) => {
        console.log(extendId, "{}{}{+++)()(*****");

        setSelectedExtendId(extendId);
        setViewReason(true);
    };
    const handleExtendRequest = async (extendId: string) => {
        try {

            const response = await secondExtendRequest(extendId)
            if (response.data.status === true) {
                toast.success("Your Re-Request successfully The Advisor update after some time")
                setReloadData(prevState => !prevState);
            } else {
                toast.error("Your Re-Request not send , some issue")
            }

        } catch (err) {

        }
    }

    return (
        <>
            {
                console.log(extendRequests, "This is extend requetssss")

            }
            <div className="border m-5 h-fit rounded-xl shadow-2xl bg-white">
                <div className='mx-auto p-2 mt-4'>
                    <table className="w-full text-sm text-left  table-fixed">
                        <thead className="text-xs text-gray-700 uppercase bg-custom-background shadow-xl dark:text-gray font-roboto">
                            <tr>
                                <th scope="col" className="w-1/4 px-5 py-6 text-center  rounded-s-md">
                                    Week
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                                    Advisor
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                                    Reason
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6  text-center">
                                    Extention Days
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                                    Re-Scheduled Date
                                </th>
                                <th scope="col" className="w-1/4 px-5 py-6 text-center ">
                                    Status
                                </th>
                                {/* <th scope="col" className="w-1/4 px-5 py-6 text-center">
                                    Request
                                </th> */}


                            </tr>
                        </thead>
                    </table>
                </div>
                {extendRequests.map((data, index) => (
                    <div className='mx-auto p-2 mb-2 ' key={index}>
                        <table className="w-full text-sm text-left divide-y divide-y-8 border table-fixed border-gray-400 rounded-md font-roboto ">
                            <tbody>
                                <tr key={index} className="">
                                    <td className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                                        {data?.data?.reviews?.currentWeek}
                                    </td>
                                    <td className="w-1/4 px-4 py-6 text-center">
                                        {data?.advisorName}
                                    </td>
                                    <td className="w-1/4 px-4 py-6 text-center" style={{ whiteSpace: 'normal', wordWrap: 'break-word', textOverflow: 'ellipsis' }}>
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer" onClick={() => openReasonModal(data?.data?.reviews?._id)}>view</span>
                                    </td>
                                    <td className="w-1/4 px-4 py-6 text-center">
                                        {data?.data?.reviews?.extendDays}
                                    </td>
                                    <td className="w-1/4 px-4 py-6 text-center">
                                        {new Date(data?.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="w-1/4 px-4 py-6 text-center">
                                        <span className={`inline-flex items-center rounded-md 
    ${data?.data?.reviews?.extendStatus === "accepted" ? 'bg-green-50' :
                                                data?.data?.reviews?.extendStatus === "pending" ? 'bg-yellow-50' :
                                                    'bg-pink-50'} 
    px-2 py-1 text-xs font-medium 
    text-${data?.data?.reviews?.extendStatus === "accepted" ? 'green' :
                                                data?.data?.reviews?.extendStatus === "pending" ? 'yellow' : 'pink'}-700 
    ring-1 ring-inset 
    ring-pink-700/10 cursor-pointer`}
                                        >
                                            {data?.data?.reviews?.extendStatus}
                                        </span>


                                    </td>
                                    {/* <td className="w-1/4 px-4 py-6 text-center">
                                        {data.requestCount < 2 ? (
                                            <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 cursor-pointer" onClick={() => handleExtendRequest(data?._id)}>
                                                Request
                                            </span>
                                        ) : "---"}
                                    </td> */}

                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <ReasonViewModal isVisible={viewReason} isClose={() => { setViewReason(false) }} extendId={selectedExtendId} />
        </>
    );
}

export default ExtendDetails;
