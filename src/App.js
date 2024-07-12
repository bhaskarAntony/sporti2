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
import { Dropdown } from 'react-bootstrap';
// import Payment from './pages/paymentpage/Payment';
// import Verify from './pages/Verification/Verify';
import FontSizeChanger from 'react-font-size-changer';

function App(){
  const [isHighContrast, setIsHighContrast] = useState(false);
 

  const [fontSize, setFontSize] = useState('16px'); // Default font size

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prevState => !prevState);
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

  const highContrastClass = isHighContrast ? 'high-contrast' : '';

  const [fontSizeIndex, setFontSizeIndex] = useState(3); // Default to 'fs-4'
  const isAuthenticated = true;

  const increaseFontSize = () => {
    if (fontSizeIndex > 0) {
      setFontSizeIndex(prevIndex => prevIndex - 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeIndex < fontSizeClasses.length - 1) {
      setFontSizeIndex(prevIndex => prevIndex + 1);
    }
  };


  const fontSizeClasses = [
    'fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'display-1','display-2', 'display-3', 'display-4', 'display-5', 'display-6'
  ];
  const fontSizeClass = fontSizeClasses[fontSizeIndex];
  return (
    <div className={`App overflow-hidden ${highContrastClass} ${fontSizeClass}`}>
    <div className='d-flex justify-content-end gap-2 p-1 gradient align-items-center'>
    <button className='btn btn-dark rounded-1 btn-sm' onClick={()=>setIsKannada(!isKannada)}>{isKannada?'To English':'To Kannada'}</button>
      <button className="btn btn-dark btn-sm rounded-1" onClick={toggleHighContrast}>{isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}</button>

      <button className="fbtn border-0 rounded" onClick={increaseFontSize}>A+</button>
       <button className="fbtn border-0 rounded" onClick={decreaseFontSize}>A-</button>
                        {/* <FontSizeChanger
        targets={['.content', '.content p', '.content h1', '.content h2', '.content h3', '.content h4', '.content h5', '.content h6', '.content span', '.content .f6']}
        options={{
          stepSize: 1,
          range: 3
        }}
        customButtons={{
          up: <button className="fbtn border-0 rounded" onClick={increaseFontSize}>A+</button>,
          down: <button className="fbtn border-0 rounded" onClick={decreaseFontSize}>A-</button>,
          style: {
            backgroundColor: 'transparent',
            border:'none',
            color: 'black',
            WebkitBoxSizing: 'border-box',
            WebkitBorderRadius: '5px',
            width: '30px'
          },
          buttonsMargin: 10
        }}
      /> */}
    </div>
   <TranslationHOC>
    <BrowserRouter>
    <ScrollToTop/>
    {/* <FontSizeSelector selectedFontSize={fontSize} handleFontSizeChange={handleFontSizeChange} /> */}
    <Header toggleTheme={toggleTheme} theme={theme}/>
      {/* <button onClick={logout}>Logout</button> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<FoodCart/>}/>
      <Route path='/room/:sporti' element={<MainRoomBook/>}/>
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
      <Route path='/services/book/:sporti' element={<ServiceBook/>}/>
     </Route>

     <Route path='/services/:sporti' element={<Services/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/additional-details/:id' element={<AdditionalDetailsForm/>}/>
      <Route path='/admin/:id' element={<Admin/>}/>
      <Route path='/view/:id' element={<View/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </TranslationHOC>
    {/* <h1>SPORTI IS UPDATING PLEASE TRY AGAIN LATER...</h1> */}
    </div>
  );
}

export default App;
