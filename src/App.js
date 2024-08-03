import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useLanguage } from './context/LangaugeContext';
import Header from './components/Header/Header';
import { TranslationHOC } from './helpers/TranslationHOC';
import Home from './pages/Home/Home';
import FoodCart from './pages/food/FoodCart';
import MainRoomBook from './pages/Rooms/MainRoomBook';
import RoomView from './pages/Rooms/RoomView';
import Event from './pages/Events/Event';
import About from './pages/about/About';
import LiveStream from './pages/Events/LiveStream';
import Faqs from './pages/faqs/Faqs';
import Help from './pages/Help/Help';
import Gallery from './pages/gallery/Gallery';
import Events from './components/events/Events';
import SiteMap from './pages/sitemap/SiteMap';
import Contact from './pages/contact/Contact';
import Tems_and_conditions from './pages/terms/Tems_and_conditions';
import Privacy from './pages/privacy/Privacy';
import EventView from './pages/Events/EventView';
import ViewFood from './pages/food/ViewFood';
import Login from './pages/Login';
import Registration from './pages/registration/Registration';
import AdditionalDetailsForm from './pages/membership/AdditionalDetailsForm';
import Admin from './pages/membership/Admin';
import View from './pages/view/View';
import Payment from './pages/payment/Payment';
import ServiceBook from './pages/Booking/ServiceBook';
import Services from './pages/services/Services';
import ErrorPage from './pages/notFound/ErrorPage';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import FontSizeChanger from 'react-font-size-changer';
import ScrollToTop from './components/ScrollToTop';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from './context/AuthContext';
import Cookies from 'js-cookie';
import Security from './components/security/Security';

function App() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('fs-6');
  const [theme, setTheme] = useState('light');
  const { setIsKannada, isKannada } = useLanguage();
  const [fontSizeIndex, setFontSizeIndex] = useState(5);
  const [fontSizeClass, setFontSizeClass] = useState('fs-6');
  const { isAuthenticated, logout, setIsAuthenticated, validateToken } = useAuth();

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (token) {
  //     validateToken(token).then(isValid => {
  //       if (isValid) {
  //         setIsAuthenticated(true);
  //       }
  //     });
  //   }
  // }, [validateToken, setIsAuthenticated]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const highContrastClass = isHighContrast ? 'high-contrast' : '';

  const fontSizeClasses = [
    'fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'display-1', 'display-2', 'display-3', 'display-4', 'display-5', 'display-6'
  ];

  useEffect(() => {
    setFontSizeClass(fontSizeClasses[fontSizeIndex]);
  }, [fontSizeIndex]);

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

  return (
    <div className={`App overflow-hidden ${highContrastClass} ${fontSizeClass}`}>
      <Security/>
      <div className='d-flex justify-content-between gap-2 p-1 gradient align-items-center'>
        {
          isAuthenticated ? (
            <button onClick={logout} className='btn btn-danger btn-sm'>Logout</button>
          ) : (
            <Link to='/login' className='btn btn-danger btn-sm'>Login</Link>
          )
        }
        <div className='d-flex gap-3 align-items-center'>
          <button className='btn btn-light rounded-1 btn-sm' onClick={() => setIsKannada(!isKannada)}>
            {isKannada ? 'English' : 'ಕನ್ನಡಕ್ಕೆ'}
          </button>
          <button className="btn btn-light btn-sm rounded-1" onClick={() => setIsHighContrast(!isHighContrast)}>
            {isHighContrast ? 'No Contrast' : 'High Contrast'}
          </button>
          <FontSizeChanger
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
                border: 'none',
                color: 'black',
                WebkitBoxSizing: 'border-box',
                WebkitBorderRadius: '5px',
                width: '30px'
              },
              buttonsMargin: 10
            }}
          />
        </div>
      </div>
      <TranslationHOC>
        <ScrollToTop />
        
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/event' element={<Event />} />
            <Route path='/about' element={<About />} />
            <Route path='/stream' element={<LiveStream />} />
            <Route path='/faqs' element={<Faqs />} />
            <Route path='/help' element={<Help />} />
            <Route path='/gallery/:id' element={<Gallery />} />
            <Route path='/events&gallery' element={<Events />} />
            <Route path='/site_map' element={<SiteMap />} />
            <Route path='/contact/:sporti' element={<Contact />} />
            <Route path='/terms_and-conditions' element={<Tems_and_conditions />} />
            <Route path='/privacy_policy' element={<Privacy />} />
            <Route path='/services/:sporti' element={<Services />} />

          <Route>
            <Route path='/cart' element={<FoodCart />} />
            <Route path='/room/:sporti' element={<MainRoomBook />} />
            <Route path='/roomview/:id/:sportiId' element={<RoomView />} />
            <Route path='/eventView/:id' element={<EventView />} />
            <Route path='/food/order/:id' element={<ViewFood />} />
            <Route path='/additional-details/:id' element={<AdditionalDetailsForm />} />
            <Route path='/admin/:id' element={<Admin />} />
            <Route path='/view/:id' element={<View />} />
            <Route path='/payment/:applicationNo' element={<Payment />} />
            <Route path='/services/book/:sporti' element={<ServiceBook />} />
          </Route>
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </TranslationHOC>
    </div>
  );
}

export default App;
