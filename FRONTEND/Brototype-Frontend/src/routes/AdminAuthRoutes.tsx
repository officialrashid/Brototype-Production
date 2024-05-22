import  { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import AdminSignIn from "../pages/Admin/SignIn"
function AdminAuthRoutes() {
//   const [reviewerAccessToken, setReviewerAccessToken] = useState('');

  useEffect(() => {
    // const reviewerJwt:any = localStorage.getItem('reviewerAccessToken');
    // setReviewerAccessToken(reviewerJwt);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={ <AdminSignIn />}
      />
      {/* <Route path="/reviewerOtp" element={ <ReviewerOtp/>} /> */}
    </Routes>
  );
}

export default AdminAuthRoutes;
