import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ServicePage from './LandingPage/Pages/ServicePage';
import OurServices from './LandingPage/Pages/OurServices';
import ContactUs from './LandingPage/Pages/ContactUs';
import AboutUs from './LandingPage/Pages/AboutUs';
import WhyChooseUs from './LandingPage/Pages/WhyChooseUs';
import Privacy from './LandingPage/Pages/Privacy';
import TermAndCondition from './LandingPage/Pages/TermAndCondition';
import AdminSignIn from './AdminDashboards/Components/LoginSignup/AdminSignIn';
import AdminAttendance from './AdminDashboards/Components/Attendence';
import AdminExpenses from './AdminDashboards/Components/Expenses';
import AdminManageHr from './AdminDashboards/Components/ManageHr';
import AdminAddEmployeeForm from './AdminDashboards/Components/ManageHr/Forms/AdminAddEmployeeForm';
import AdminManageMaster from './AdminDashboards/Components/ManageMaster';
import AdminManageWebsite from './AdminDashboards/Components/ManagePage';
import AdminCustomerManage from './AdminDashboards/Components/Customer';
import AdminRolesAndPermission from './AdminDashboards/Components/RolesAndPermission';
import Profile from './AdminDashboards/Components/profile/Profile';
import AdminPannel from './AdminDashboards/AdminPannel';
import ProfileHistory from './LandingPage/Pages/ProfileHistory';
// import MyProfile from './LandingPage/Pages/MyProfile';
import AdminProfile from './AdminDashboards/Components/profile/AdminProfile';
import Availability from './AdminDashboards/Components/Availability/Availability';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/ServicePage' element={<ServicePage />} />
        <Route path='/Our-All-Services' element={<OurServices />} />
        <Route path='/Contact-Us' element={<ContactUs />} />
        <Route path='/About-Us' element={<AboutUs />} />
        <Route path='/Why-Choose-Us' element={<WhyChooseUs />} />
        <Route path='/Privacy-&-Policy' element={<Privacy />} />
        <Route path='/Term-&-Condition' element={<TermAndCondition />} />
        <Route path='/YourProfile' element={<ProfileHistory />} />
        <Route path='/email' element={<ProfileHistory />} />


        {/* Dashboard Routes */}
        <Route path='/admin' element={<AdminSignIn />}>
          <Route path='dashboard' element={<AdminPannel />} />
          <Route path='attendance' element={<AdminAttendance />} />
          <Route path='account' element={<AdminExpenses />} />
          <Route path='manage-hr' element={<AdminManageHr />} />
          <Route path='manage-hr/employee-form' element={<AdminAddEmployeeForm />} />
          <Route path='manage-master' element={<AdminManageMaster />} />
          <Route path='manage-website' element={<AdminManageWebsite />} />
          <Route path='customer' element={<AdminCustomerManage />} />
          <Route path='roles-&-permission' element={<AdminRolesAndPermission />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path='availability' element={<Availability />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
