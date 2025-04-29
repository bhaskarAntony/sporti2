import './App.css';
import SideNav from './components/SideNav';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Food from './pages/food/Food';
import Members from './components/Members/Members';
import ViewMember from './components/Members/ViewMember';
import Feedback from './pages/feedback/Feedback';
import ConferenceHall from './pages/Conferencehall/ConferenceHall';
import Login from './components/login/Login';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from './components/privateRoutes/AuthContext';
import Security from './components/security/Security';
import Dashboard from './components/dashboards/Dashboard';
import PrimarySearchAppBar from './components/appbar/PrimarySearchAppBar';
import MainFunctionHallBooking from './components/Bookings/ServiceBook';
import ConfirmService from './components/Bookings/ConfirmService';
import MainRoomBook from './components/Bookings/RoomBooking';
import ConfirmRoom from './components/Bookings/ConfirmRoom';
import DetailsView from './pages/view/DetailsView';
import RoomSelection from './components/dashboards/RoomNumber';
import RoomBookings from './pages/bookings/RoomBookings';
import BarbequeBookings from './pages/bookings/BarbequeBookings';
import ConferenceBookings from './pages/bookings/ConferenceBookings';
import MainHallBookings from './pages/bookings/MainHallBookings';
import RoomDetails from './pages/view/RoomDetails';
import AllRooms from './components/dashboards/AllRooms';
import EditRoom from './components/dashboards/EditRoom';
import CreateMember from './pages/membership/CreateMember';
import NoFound from '../NoFound';
import MemberDetails from './components/dashboards/MemberDetails';
// import VideoView from './components/videos/VideoView';



function AdminApp() {
  const { isAuthenticated, logout} = useAuth();
  return (
    <div className='container-fluid app admin'>
      <Security/>
    <ToastContainer/>
    
   <div className='row'>
   
    <div className='col-sm-12 col-md-12 col-lg-12 app-right p-0'>
    {/* <SideNav/> */}
    <PrimarySearchAppBar/>
   <div className="p-0">
   <Routes>
     <Route path="/login" element={<Login />} />
     <Route path='/members' element={<Members/>}/>
    

     {/* <Route element={<PrivateRoute/>}> */}
     <Route path='/' element={<Dashboard/>}/>
     {/* </Route> */}
     
     {/* <Route path='/' element={<Dashboard/>}/> */}
      <Route path='/bookings' element={<ConferenceHall/>}/>
      {/* <Route path='/new/service' element={<MainFunctionHallBooking/>}/> */}
      <Route path='/new/service' element={<NoFound/>}/>
      {/* <Route path='/confirm/service' element={<ConfirmService/>}/> */}
      <Route path='/confirm/service' element={<NoFound/>}/>
      {/* <Route path='/new/room/booking' element={<MainRoomBook/>}/> */}
      <Route path='/new/room/booking' element={<NoFound/>}/>

      {/* <Route path='/confirm/room/details' element={<ConfirmRoom/>}/> */}
      <Route path='/confirm/room/details' element={<NoFound/>}/>
      <Route path='/view/service/details' element={<DetailsView/>}/>
      <Route path='/view/room/details' element={<RoomDetails/>}/>
      <Route path='/select/room' element={<RoomSelection/>}/>

      {/* bookings */}
      <Route path='/room/bookings' element={<RoomBookings/>}/>
      <Route path='/create/membership' element={<CreateMember/>}/>
      <Route path='/main/hall/bookings' element={<MainHallBookings/>}/>
      <Route path='/conference/hall/bookings' element={<ConferenceBookings/>}/>
      <Route path='/barbeque/area/bookings' element={<BarbequeBookings/>}/>
      <Route path='/all/rooms' element={<AllRooms/>}/>
      <Route path='/edit/rooms/:applicationNo' element={<EditRoom/>}/>
      <Route path='/feedbacks' element={<Feedback/>}/>
      <Route path="/member-details" element={<MemberDetails />} />

      </Routes>
   </div>
    </div>
   </div>
    </div>
  
  );
}

export default AdminApp;