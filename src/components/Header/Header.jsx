import Button from 'react-bootstrap/Button';
import './style.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/main_logo.svg'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import ThemeToggle from '../../Theme/ThemeToggle';
import { useLanguage } from '../../context/LangaugeContext';

function Header({ toggleTheme, theme }) {
  const [show, setShow] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isKannada } = useLanguage();

  return (
    <header>
      {/* <ThemeToggle toggleTheme={toggleTheme} theme={theme} /> */}
      <Navbar expand="lg" className="navbar p-0">
        <Container fluid className='p-0'>
          <div className="logo-container d-flex align-items-center bg-white">
            <Navbar.Brand href="/">
              <div className='d-flex gap-2 align-items-center logo'>
                <img src={logo} alt="logooo" className='main-logo' />
                <h1 className="fs-3 fw-bold m-0 text-black">
                  {isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}
                </h1>
              </div>
            </Navbar.Brand>
          </div>

          <button className='btn p-0 bg-transparent text-white d-block d-md-none' onClick={handleShow}>
            <i className='bi bi-list fs-1'></i>
          </button>
          <Navbar.Collapse id="navbarScroll" className='p-0'>
            <div className="d-none d-md-block w-100">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link href="/">{isKannada ? 'ಮನೆ' : 'Home'}</Nav.Link>
                <Nav.Link href="/about">{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Nav.Link>
                <Nav.Link href="/services/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Nav.Link>
                <Nav.Link href="/services/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Nav.Link>
                <Nav.Link href="/login">{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</Nav.Link>
                <Nav.Link href="/events&gallery">{isKannada ? 'ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</Nav.Link>
                <Nav.Link href="/faqs">{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</Nav.Link>
                <NavDropdown
                  title={isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
                  id="basic-nav-dropdown2"
                  show={showDropdown2}
                  onMouseEnter={() => setShowDropdown2(true)}
                  onMouseLeave={() => setShowDropdown2(false)}
                >
                  <NavDropdown.Item href="/contact/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</NavDropdown.Item>
                  <NavDropdown.Item href="/contact/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
            <div className="d-flex gap-2 d-none d-lg-block align-items-center flex-nowrap">
              {/* <button className="btn btn-danger">Create account</button> */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} className='mobile-nav p-2'>
        <Offcanvas.Header closeButton className='bg-white rounded-3'>
          <Offcanvas.Title>
            <div className='d-flex gap-2 align-items-center logo'>
              <img src={logo} alt="logo" />  
              <h1 className="fs-3 fw-bold">{isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}</h1>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li><a href="/"> {isKannada ? 'ಮನೆ' : 'Home'}</a></li>
            <li><a href="/about"> {isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</a></li>
            <li><a href="/services/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</a></li>
            <li><a href="/services/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</a></li>
            <li><a href="/login">{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</a></li>
            <li><a href="/events&gallery">{isKannada ? 'ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</a></li>
            <li><a href="/faqs">{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</a></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownServices2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownServices2">
                <li><a className="dropdown-item text-dark" href="/contact/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</a></li>
                <li><a className="dropdown-item text-dark" href="/contact/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</a></li>
              </ul>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
