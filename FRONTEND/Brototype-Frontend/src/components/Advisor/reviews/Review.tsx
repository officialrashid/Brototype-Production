import ReviewRow from "./ReviewRow"
import ReviewHead from "./ReviewHead"
import ReviewSearchBar from "../schedule /RevieSearchBar"
import { useEffect, useState } from "react"
import { getScheduledReviewData } from "../../../redux-toolkit/reviewSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
const Review = () => {
    const advisorId: any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
    const dispatch = useDispatch()
    const scheduledReviewDatas = useSelector(state => state?.review?.scheduledData)
    const [filteredData, setFilteredData] = useState(scheduledReviewDatas)
    //const filteredData:any=[{name:'hhh'}]
    const searchFn = (searInp: string) => {

        console.log(searInp, 'hellloo');

        const searchData = scheduledReviewDatas.filter((data: any) => {
            console.log(data.name);

            return data.name.toLowerCase().includes(searInp.toLowerCase())

        }



        )
        setFilteredData(searchData)


    }
    useEffect(() => {
        const getStudentDetails = async () => {
         const scheduled:Boolean=true
            const studentData = await axios.get(`http://brototypes.com/review/assigned-reviews?coordinatorId=${advisorId}&type=scheduled`,)
            console.log(studentData, 'studenrnttttt');
            //const filteredData:any=[{name:'hhh'}]
            console.log(studentData.data,'sttt');
            
            dispatch(getScheduledReviewData(studentData.data))




        }

        getStudentDetails()

    }, [])

    return (
        <>
            <ReviewSearchBar searchFn={searchFn} />
            <ReviewHead />
            {scheduledReviewDatas.length?<ReviewRow reviewData={filteredData} />:<div className="text-center  font-bold m-10"><h1>There is no scheduled reviews</h1></div>}
        </>
    )
}



export default Review