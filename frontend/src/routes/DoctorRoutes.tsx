import DoctorLayout from "../pages/doctor/DoctorLayout";
import UnAuthorizedRoute from "./UnAuthorizedRoute";
import Dashboard from "../pages/doctor/Dashboard";
import { Route, Routes } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import Profile from "../pages/doctor/Profile";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/patient/Auth";
import Appointments from "../pages/doctor/Appointments";
import Finance from "../pages/doctor/Finance";
import PageNotFound from "../pages/common/PageNotFound";
import Chat from "../pages/common/Chat";


function DoctorRoutes() {
    return (

        <Routes>
            <Route path="/" element={<DoctorLayout />}>
                <Route path="dashboard" element={<AuthorizedRoute allowedRole='doctor'><Dashboard /></AuthorizedRoute>} />
                <Route path="profile" element={<AuthorizedRoute allowedRole='doctor'><Profile /></AuthorizedRoute>} />
                <Route path="appointments" element={<AuthorizedRoute allowedRole='doctor'><Appointments /></AuthorizedRoute>} />
                <Route path="finance" element={<AuthorizedRoute allowedRole='doctor'><Finance /></AuthorizedRoute>} />
                <Route path="chats" element={<AuthorizedRoute allowedRole='doctor'><Chat /></AuthorizedRoute>} />
            </Route>

            <Route
                path="/verify-details"
                element={<PrivateRoute />}
            />
            <Route
                path="/auth"
                element={
                    <UnAuthorizedRoute preventedRole="doctor">
                        <Auth role='doctor' />
                    </UnAuthorizedRoute>
                }
            />


            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default DoctorRoutes;
