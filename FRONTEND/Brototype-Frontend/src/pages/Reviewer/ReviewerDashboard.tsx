import ReviewDetails from "../../components/Reviewer/Dashboard/reviewDetails";
import Sidebar from "../../components/Reviewer/Sidebar/sidebar";
import TimeLineUp from "../../components/Reviewer/Dashboard/TimeLineUp";
import Graph from "../../components/Reviewer/Dashboard/Graph";
import Rating from "../../components/Reviewer/Dashboard/Rating";
import UpcomingReviews from "../../components/Reviewer/Dashboard/UpcomingReviews";
import ScheduleTimeCard from "../../components/Reviewer/ScheduleTimeCard/ScheduleTimeCard";
import ReviewerDetails from "../../components/Reviewer/Dashboard/ReviewerDetails"
import ReviewerProfile from "../../components/Reviewer/Dashboard/ReviewerProfile";
import Notification from "../../components/Reviewer/Dashboard/Notification";
const ReviewerDashboard = () => {
    return (
        <>
        <Sidebar/>
        <div className="h-auto flex-1  bg-custom-background">
        <ReviewerDetails/>

            <TimeLineUp/>
       
            <Graph/>
            <ScheduleTimeCard />
            <UpcomingReviews/>

        </div>
        
        <ReviewerProfile/>
        <Rating/>
        <Notification/>
   
        </>
    );
}

export default ReviewerDashboard;
