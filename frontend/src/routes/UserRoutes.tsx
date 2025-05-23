import UserLayout from '../pages/patient/UserLayout';
import UnAuthorizedRoute from './UnAuthorizedRoute';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/patient/Home';
import Auth from '../pages/patient/Auth';
import PublicRoutes from './PublicRoutes';
import Profile from '../pages/patient/Profile';
import AuthorizedRoute from './AuthorizedRoute';
import FindDoctors from '../pages/patient/FindDoctors';
import Specialization from '../pages/patient/Specialization';
import UserDriveLayout from '../pages/patient/UserDriveLayout';
import Appointments from '../components/patient/userDrive/appointments/Appointments';
import Feedback from '../components/patient/userDrive/feedbacks/Feedback';
import Finance from '../components/patient/userDrive/finance/Finance';
import PageNotFound from '../pages/common/PageNotFound';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatLayout from '../pages/patient/ChatLayout';
import MedicalRecord from '../components/patient/userDrive/medicalRecords/MedicalRecord';
import { ENV } from '../constants/env';

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserLayout />}>


          <Route index element={<PublicRoutes><Home /></PublicRoutes>} />
          <Route path="auth" element={<UnAuthorizedRoute preventedRole={'user'}>
            <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
              <Auth role='user' />
            </GoogleOAuthProvider>
          </UnAuthorizedRoute>} />
          <Route path="profile" element={<AuthorizedRoute allowedRole={'user'}><Profile /></AuthorizedRoute>} />
          <Route path='find-doctors' element={<PublicRoutes><FindDoctors /></PublicRoutes>} />
          <Route path='find-doctors/:specialization' element={<PublicRoutes><Specialization /></PublicRoutes>} />
          <Route path="chat" element={<AuthorizedRoute allowedRole={'user'}><ChatLayout /></AuthorizedRoute>} />



          <Route path='drive' element={<UserDriveLayout />}>
            <Route path='medical-records' element={<AuthorizedRoute allowedRole={'user'}><MedicalRecord /></AuthorizedRoute>} />
            <Route path='appointments' element={<AuthorizedRoute allowedRole={'user'}><Appointments /></AuthorizedRoute>} />
            <Route path='feedbacks' element={<AuthorizedRoute allowedRole={'user'}><Feedback /></AuthorizedRoute>} />
            <Route path='payments' element={<AuthorizedRoute allowedRole={'user'}><Finance /></AuthorizedRoute>} />
          </Route>


        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>
  )
}

export default UserRoutes
