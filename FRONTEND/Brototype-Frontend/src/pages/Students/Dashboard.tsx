import { useEffect } from "react";
import BatchBestStudents from "../../components/Students/Dashboard/BatchBestStudents"
import CourseCompletionGraph from "../../components/Students/Dashboard/CourseCompletionGraph"
import StudentGraph from "../../components/Students/Dashboard/StudentGraph";
import StudentProfile from "../../components/Students/Dashboard/StudentProfile";
import UpcomingReviews from "../../components/Students/Dashboard/UpcomingReviews";
import UpcomingTask from "../../components/Students/Dashboard/UpcomingTask";
import WeeklyPerformGraph from "../../components/Students/Dashboard/WeeklyPerformGraph";
import Sidebar from "../../components/Students/Sidebar/Sidebar";
import ReactGA from 'react-ga';
const Dashboard = () => {
    useEffect(() => {
        ReactGA.pageview('/dashboard'); // Track pageview on component mount
    }, []);

    return (
        <>
       
            <div className="h-auto flex-1  bg-custom-background">

                <StudentProfile />

                <StudentGraph />
                <WeeklyPerformGraph />

                <UpcomingReviews />

            </div>
            <CourseCompletionGraph />
            <BatchBestStudents />
            <UpcomingTask />
        </>
    );
}

export default Dashboard;
