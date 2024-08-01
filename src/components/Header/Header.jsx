import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LangaugeContext';
import { Navbar, Container, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/main_logo.svg';
import './style.css';

function Header({ toggleTheme, theme }) {
  const [show, setShow] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isKannada } = useLanguage();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header>
      <Navbar expand="xl" className="navbar p-0">
        <Container fluid className="p-0 d-flex justify-content-between">
          <div className="logo-container d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              <div className="d-flex gap-2 align-items-center logo mx-3">
                <img src={logo} alt="logo" className="main-logo" />
                <h1 className="f3 fw-bold m-0">{isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}</h1>
              </div>
            </Navbar.Brand>
          </div>

          <button
            className="btn p-0 bg-transparent text-white d-block d-xl-none"
            onClick={handleShow}
          >
            <i className="bi bi-list fs-1"></i>
          </button>

          <Navbar.Collapse id="navbarScroll" className="p-0">
            <div className="d-none d-lg-block w-100">
              <Nav className="me-auto my-2 my-lg-0 gap-1 " style={{ maxHeight: '70px' }} navbarScroll>
                <Nav.Link as={Link} to="/">{isKannada ? 'ಮನೆ' : 'Home'}</Nav.Link>
                {/* {isAuthenticated && (
                  <> */}
                    <Nav.Link as={Link} to="/about">{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Nav.Link>
                    <Nav.Link as={Link} to="/services/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Nav.Link>
                    <Nav.Link as={Link} to="/services/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Nav.Link>
                    <Nav.Link as={Link} to="/events&gallery">{isKannada ? 'ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</Nav.Link>
                    <Nav.Link as={Link} to="/faqs">{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</Nav.Link>
                    <NavDropdown
                      title={isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
                      id="basic-nav-dropdown2"
                      show={showDropdown2}
                      onMouseEnter={() => setShowDropdown2(true)}
                      onMouseLeave={() => setShowDropdown2(false)}
                    >
                      <NavDropdown.Item as={Link} to="/contact/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/contact/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</NavDropdown.Item>
                    </NavDropdown>
                  {/* </>
                )} */}
                {!isAuthenticated && (
                  <Nav.Link as={Link} to="/login">{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} className="mobile-nav p-2">
        <Offcanvas.Header closeButton className="bg-white rounded-3">
          <Offcanvas.Title>
            <div className="d-flex gap-2 align-items-center logo">
              <img src={logo} alt="logo" />
              <h1 className="fs-3 fw-bold">{isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}</h1>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li><Link to="/" onClick={handleClose}>{isKannada ? 'ಮನೆ' : 'Home'}</Link></li>
            {isAuthenticated && (
              <>
                <li><Link to="/about" onClick={handleClose}>{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Link></li>
                <li><Link to="/services/sporti1" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Link></li>
                <li><Link to="/services/sporti2" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Link></li>
                <li><Link to="/events&gallery" onClick={handleClose}>{isKannada ? 'ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</Link></li>
                <li><Link to="/faqs" onClick={handleClose}>{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</Link></li>
                <li className="nav-item dropdown text-start">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownServices2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownServices2">
                    <li><Link className="dropdown-item text-dark" to="/contact/sporti1" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/contact/sporti2" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Link></li>
                  </ul>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li><Link to="/login" onClick={handleClose}>{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</Link></li>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
