import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { TranslationHOC } from './helpers/TranslationHOC';
import Home from './pages/Home/Home';
import Food from './pages/food/Food';
import ViewFood from './pages/food/ViewFood';
import Room from './pages/Rooms/Room';
import Event from './pages/Events/Event';
import FoodCart from './pages/food/FoodCart';
import EventView from './pages/Events/EventView';
import Footer from './components/footer/Footer';
import { useEffect, useState } from 'react';
import RoomView from './pages/Rooms/RoomView';
import LiveStream from './pages/Events/LiveStream';
import Login from './pages/Login';
import About from './pages/about/About';
import Faqs from './pages/faqs/Faqs';
import Tems_and_conditions from './pages/terms/Tems_and_conditions';
import Privacy from './pages/privacy/Privacy';
import Help from './pages/Help/Help';
import SiteMap from './pages/sitemap/SiteMap';
import Contact from './pages/contact/Contact';
import Gallery from './pages/gallery/Gallery';
import Signup from './pages/signup/Signup';
import Services from './pages/services/Services';
import Events from './components/events/Events';
import View from './pages/view/View';
import Registration from './pages/registration/Registration';
import AdditionalDetailsForm from './pages/membership/AdditionalDetailsForm';
import Admin from './pages/membership/Admin';
import MainContact from './pages/contact/MainContact';
import MainservicePage from './pages/services/MainservicePage';
import MainFaqPage from './pages/faqs/MainFaqPage';
import Aos from 'aos';
import ConferenceHallBook from './pages/Conferencehall/ConferenceHallBook';
import MainRoomBookingPage from './pages/Rooms/MainRoomBookingPage';
import ServiceBook from './pages/Booking/ServiceBook';
import MainRoomBook from './pages/Rooms/MainRoomBook';
import ProtectedRoute from './components/ProtectedRoute';
import FontSizeSelector from './font-resizer/FontSizeSelector';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
// import Payment from './pages/payment/Payment';
import { useLanguage } from './context/LangaugeContext';
import Payment from './pages/payment/Payment';
// import Payment from './pages/paymentpage/Payment';
// import Verify from './pages/Verification/Verify';

function App(){
  useEffect(()=>{
    Aos.init();
  }, [])

  const [fontSize, setFontSize] = useState('16px'); // Default font size

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const {logout} = useAuth();
  const {setIsKannada, isKannada} = useLanguage();
 
  return (
    <div className="App overflow-hidden">
      {/* <button onClick={()=>setIsKannada(!isKannada)}>{isKannada?'To English':'To Kannada'}</button> */}
   <TranslationHOC>
    <BrowserRouter>
    <ScrollToTop/>
    {/* <FontSizeSelector selectedFontSize={fontSize} handleFontSizeChange={handleFontSizeChange} /> */}
    <Header toggleTheme={toggleTheme} theme={theme}/>
      {/* <button onClick={logout}>Logout</button> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<FoodCart/>}/>
      <Route path='/room' element={<MainRoomBook/>}/>
      <Route path='/roomview/:id/:sportiId' element={<RoomView/>}/>
      <Route path='/event' element={<Event/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/stream' element={<LiveStream/>}/>
      <Route path='/faqs' element={<Faqs/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/gallery/:id' element={<Gallery/>}/>
      <Route path='/events&gallery' element={<Events/>}/>
      <Route path='/site_map' element={<SiteMap/>}/>
      <Route path='/contact/:sporti' element={<Contact/>}/>
      <Route path='/terms_and-conditions' element={<Tems_and_conditions/>}/>
      <Route path='/privacy_policy' element={<Privacy/>}/>
      <Route path='/eventView/:id' element={<EventView/>}/>
      <Route path='/food/order/:id' element={<ViewFood/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Registration/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/food' element={<Food/>}/>
      <Route path='/payment/:applicationNo' element={<Payment/>}/>
      {/* <Route path='/payment/:applicationNo' element={<Payment/>}/> */}
      <Route path='/services/book' element={<ServiceBook/>}/>
     </Route>

     <Route path='/services/:sporti' element={<Services/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/additional-details/:id' element={<AdditionalDetailsForm/>}/>
      <Route path='/admin/:id' element={<Admin/>}/>
      <Route path='/view/:id' element={<View/>}/>
      <Route path='/conference-hall' element={<ConferenceHallBook/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </TranslationHOC>
    {/* <h1>SPORTI IS UPDATING PLEASE TRY AGAIN LATER...</h1> */}
    </div>
  );
}

export default App;
