import ReviewersProfile from "../../components/Reviewer/ReviewerProfile/ReviewerProfile"
import Sidebar from "../../components/Reviewer/Sidebar/sidebar";
const ReviewerProfile = () => {
    return (
        <>
            <Sidebar />
            <div className="h-auto flex-1  bg-custom-background">
                <ReviewersProfile />
            </div>
        </>
    );
}

export default ReviewerProfile;
