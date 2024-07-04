import React, { useState, useEffect } from 'react';
import SuccessPopup from '../../components/popups/SuccessPopup';
import axios from 'axios';
import Loading from '../../components/popups/Loading';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import { Dropdown } from 'react-bootstrap';
import './style.css'; // Include the CSS file

function MainFunctionHallBooking() {
    const [formData, setFormData] = useState({
        officerName: '',
        officerDesignation: '',
        officerCadre: '',
        officerEmail: '',
        officerPhoneNumber: '',
        checkInDate: '',
        checkOutDate: '',
        serviceName: '',
        serviceType: '',
        totalCost: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(null); // State for selected language

    const navigate = useNavigate();
    const { openDialog } = useDialog();

    useEffect(() => {
        calculateTotalCost(); // Calculate total cost on initial render
    }, [formData.serviceName, formData.serviceType]); // Run when serviceName or serviceType changes

    const handleClose = () => {
        setShowModal(false);
    };

    const openModal = (title, desc) => {
        setShowModal(true);
        setDesc(desc);
        setTitle(title);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.officerName.trim()) {
            newErrors.officerName = 'Officer\'s name is required';
            isValid = false;
        }

        if (!formData.officerDesignation.trim()) {
            newErrors.officerDesignation = 'Designation is required';
            isValid = false;
        }

        if (!formData.officerCadre.trim()) {
            newErrors.officerCadre = 'Cadre is required';
            isValid = false;
        }

        if (!formData.officerEmail.trim()) {
            newErrors.officerEmail = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.officerEmail)) {
            newErrors.officerEmail = 'Invalid email address';
            isValid = false;
        }

        if (!formData.officerPhoneNumber.trim()) {
            newErrors.officerPhoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.officerPhoneNumber)) {
            newErrors.officerPhoneNumber = 'Invalid phone number';
            isValid = false;
        }

        if (!formData.checkInDate) {
            newErrors.checkInDate = 'Check-in date is required';
            isValid = false;
        }

        if (!formData.checkOutDate) {
            newErrors.checkOutDate = 'Check-out date is required';
            isValid = false;
        }

        if (!formData.serviceName) {
            newErrors.serviceName = 'Service name is required';
            isValid = false;
        }

        if (!formData.serviceType) {
            newErrors.serviceType = 'Service type is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const calculateTotalCost = () => {
        let total = 0;
        if (formData.serviceName === 'Main Event Hall Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    total = 45000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    total = 25000;
                    break;
                case 'Serving and Senior Police Officers':
                    total = 20000;
                    break;
                default:
                    total = 0;
            }
        } else if (formData.serviceName === 'Conference Hall Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    total = 15000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    total = 10000;
                    break;
                case 'Serving and Senior Police Officers':
                    total = 7500;
                    break;
                default:
                    total = 0;
            }
        } else if (formData.serviceName === 'Barbeque Area Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    total = 10000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    total = 7500;
                    break;
                case 'Serving and Senior Police Officers':
                    total = 5000;
                    break;
                default:
                    total = 0;
            }
        }
        setFormData({
            ...formData,
            totalCost: total
        });
        return total;
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const translateToKannada = (text) => {
        // Dummy translation logic, replace with actual translation mechanism
        switch (text) {
            case 'Officer\'s Name':
                return 'ಅಧಿಕಾರಿಗಳ ಹೆಸರು';
            case 'Designation':
                return 'ಹುದ್ದೆ';
            case 'Cadre':
                return 'ಶ್ರೇಣಿ';
            case 'Email':
                return 'ಇಮೇಲ್';
            case 'Phone Number':
                return 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ';
            case 'Check-in Date':
                return 'ಚೆಕ್-ಇನ್ ದಿನಾಂಕ';
            case 'Check-out Date':
                return 'ಚೆಕ್-ಔಟ್ ದಿನಾಂಕ';
            case 'Service Name':
                return 'ಸೇವೆಯ ಹೆಸರು';
            case 'Service Type':
                return 'ಸೇವೆಯ ರೀತಿ';
            case 'Total Cost (₹)':
                return 'ಒಟ್ಟು ವೆಚ್ಚ (₹)';
            case 'Submit':
                return 'ಸಲ್ಲಿಸಿ';
            case 'Cancel':
                return 'ರದ್ದುಮಾಡಿ';
            default:
                return text;
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        axios.post('https://sporti-backend-2-o22y.onrender.com/api/payment', formData)
            .then(response => {
                const { success, user } = response.data;
                if (success) {
                    setIsLoading(false);
                    openDialog('Success', `Booking submitted successfully with application number ${user.applicationNo}`, false);
                    navigate(`/payment/${user.applicationNo}`);
                } else {
                    setIsLoading(false);
                    openDialog('Error', 'Your application is not confirmed. Please wait until confirmation. The application will be confirmed within 24 working hours after booking.', true);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Error submitting form:', error);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='main-function-hall-booking container-fluid p-3 p-md-5'>
            <div className="row">
                <div className="col-md-8 m-auto bg-white p-0">
                    <div className="bg-main p-3 text-center">
                        <h1 className="fs-3 text-light">{selectedLanguage === 'kannada' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಸೇವೆ ಬುಕ್ಕಿಂಗ್ ವೇಳಾಪಟ್ಟಿ' : 'Karnataka Government Service Booking Form'}</h1>
                        <p className="text-light">
                            {selectedLanguage === 'kannada' ? 'ಈ ಫಾರಂ ಅಧಿಕಾರಿಗಳಿಗೆ ಇತರ ಸಲಹೆಗಳಿಂದ ಬಹುಮಾನಗಳನ್ನು ಪುಡಿಸುವ ಅವಕಾಶವನ್ನು ಒದಗಿಸುತ್ತದೆ.' : 'This form provides an opportunity for officers to book various sports services offered through the department.'}
                        </p>
                    </div>
                    <form onSubmit={submitForm} className="p-3">
                        <div className="mb-3">
                            <label htmlFor="officerName" className="form-label">{selectedLanguage === 'kannada' ? 'ಅಧಿಕಾರಿಗಳ ಹೆಸರು' : 'Officer\'s Name'}</label>
                            <input type="text" className={`form-control ${errors.officerName ? 'is-invalid' : ''}`} id="officerName" name="officerName" value={formData.officerName} onChange={handleFormChange} />
                            {errors.officerName && <div className="invalid-feedback">{errors.officerName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="officerDesignation" className="form-label">{selectedLanguage === 'kannada' ? 'ಹುದ್ದೆ' : 'Designation'}</label>
                            <input type="text" className={`form-control ${errors.officerDesignation ? 'is-invalid' : ''}`} id="officerDesignation" name="officerDesignation" value={formData.officerDesignation} onChange={handleFormChange} />
                            {errors.officerDesignation && <div className="invalid-feedback">{errors.officerDesignation}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="officerCadre" className="form-label">{selectedLanguage === 'kannada' ? 'ಶ್ರೇಣಿ' : 'Cadre'}</label>
                            <input type="text" className={`form-control ${errors.officerCadre ? 'is-invalid' : ''}`} id="officerCadre" name="officerCadre" value={formData.officerCadre} onChange={handleFormChange} />
                            {errors.officerCadre && <div className="invalid-feedback">{errors.officerCadre}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="officerEmail" className="form-label">{selectedLanguage === 'kannada' ? 'ಇಮೇಲ್' : 'Email'}</label>
                            <input type="email" className={`form-control ${errors.officerEmail ? 'is-invalid' : ''}`} id="officerEmail" name="officerEmail" value={formData.officerEmail} onChange={handleFormChange} />
                            {errors.officerEmail && <div className="invalid-feedback">{errors.officerEmail}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="officerPhoneNumber" className="form-label">{selectedLanguage === 'kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ' : 'Phone Number'}</label>
                            <input type="tel" className={`form-control ${errors.officerPhoneNumber ? 'is-invalid' : ''}`} id="officerPhoneNumber" name="officerPhoneNumber" value={formData.officerPhoneNumber} onChange={handleFormChange} />
                            {errors.officerPhoneNumber && <div className="invalid-feedback">{errors.officerPhoneNumber}</div>}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="checkInDate" className="form-label">{selectedLanguage === 'kannada' ? 'ಚೆಕ್-ಇನ್ ದಿನಾಂಕ' : 'Check-in Date'}</label>
                                <input type="date" className={`form-control ${errors.checkInDate ? 'is-invalid' : ''}`} id="checkInDate" name="checkInDate" value={formData.checkInDate} onChange={handleFormChange} />
                                {errors.checkInDate && <div className="invalid-feedback">{errors.checkInDate}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="checkOutDate" className="form-label">{selectedLanguage === 'kannada' ? 'ಚೆಕ್-ಔಟ್ ದಿನಾಂಕ' : 'Check-out Date'}</label>
                                <input type="date" className={`form-control ${errors.checkOutDate ? 'is-invalid' : ''}`} id="checkOutDate" name="checkOutDate" value={formData.checkOutDate} onChange={handleFormChange} />
                                {errors.checkOutDate && <div className="invalid-feedback">{errors.checkOutDate}</div>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="serviceName" className="form-label">{selectedLanguage === 'kannada' ? 'ಸೇವೆಯ ಹೆಸರು' : 'Service Name'}</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="serviceName-dropdown">
                                    {formData.serviceName ? translateToKannada(formData.serviceName) : 'Select Service'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceName: 'Main Event Hall Booking'})}>{translateToKannada('Main Event Hall Booking')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceName: 'Conference Hall Booking'})}>{translateToKannada('Conference Hall Booking')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceName: 'Barbeque Area Booking'})}>{translateToKannada('Barbeque Area Booking')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {errors.serviceName && <div className="invalid-feedback">{errors.serviceName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="serviceType" className="form-label">{selectedLanguage === 'kannada' ? 'ಸೇವೆಯ ರೀತಿ' : 'Service Type'}</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="serviceType-dropdown">
                                    {formData.serviceType ? translateToKannada(formData.serviceType) : 'Select Type'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceType: 'Private Parties'})}>{translateToKannada('Private Parties')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceType: 'Senior Police Officers of Other Govt Department'})}>{translateToKannada('Senior Police Officers of Other Govt Department')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFormData({...formData, serviceType: 'Serving and Senior Police Officers'})}>{translateToKannada('Serving and Senior Police Officers')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {errors.serviceType && <div className="invalid-feedback">{errors.serviceType}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{selectedLanguage === 'kannada' ? 'ಒಟ್ಟು ವೆಚ್ಚ (₹)' : 'Total Cost (₹)'}</label>
                            <input type="text" className="form-control" value={formData.totalCost} readOnly />
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="language-dropdown">
                                    {selectedLanguage === 'kannada' ? 'ಭಾಷೆ' : 'Language'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleLanguageChange(null)}>English</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLanguageChange('kannada')}>ಕನ್ನಡ</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className='d-flex justify-content-end'>
                                <button type="submit" className="blue-btn rounded-1">{selectedLanguage === 'kannada' ? 'ಸಲ್ಲಿಸಿ' : 'Submit'}</button>
                                <button type="button" className="btn btn-danger ms-2 rounded-1" onClick={() => navigate('/')}>{selectedLanguage === 'kannada' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {showModal && <SuccessPopup title={title} desc={desc} handleClose={handleClose} />}
        </div>
    );
}

export default MainFunctionHallBooking;
