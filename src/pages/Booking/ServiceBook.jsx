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
        username: '',
        officerDesignation: '',
        officerCadre: '',
        email: '',
        phoneNumber: '',
        checkInDate: '',
        checkOutDate: '',
        serviceType: '',
        serviceName: '',
        roomType: '',
        noGuests: 1,
        totalCost: 0,
        applicationNo: '',
    });

    const navigate = useNavigate();
    const { openDialog } = useDialog();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [perDayCost, setPerDayCost] = useState(0);

    useEffect(() => {
        const totalCost = calculateTotalCost();
        setFormData((prevFormData) => ({
            ...prevFormData,
            totalCost,
        }));
    }, [formData.roomType, formData.guestType, formData.noGuests, formData.checkInDate, formData.checkOutDate, formData.serviceName, formData.serviceType]);


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

    const handleDropdownChange = (name, value) => {
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

        if (!formData.username.trim()) {
            newErrors.username = 'Officer\'s name is required';
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

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
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
        let baseCost = 0;
        const perGuestCost = 1000; // Example cost per guest

        if (formData.serviceName === 'Main Event Hall Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    baseCost = 45000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    baseCost = 25000;
                    break;
                case 'Serving and Senior Police Officers':
                    baseCost = 20000;
                    break;
                default:
                    baseCost = 0;
            }
        } else if (formData.serviceName === 'Conference Hall Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    baseCost = 15000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    baseCost = 10000;
                    break;
                case 'Serving and Senior Police Officers':
                    baseCost = 7500;
                    break;
                default:
                    baseCost = 0;
            }
        } else if (formData.serviceName === 'Barbeque Area Booking') {
            switch (formData.serviceType) {
                case 'Private Parties':
                    baseCost = 10000;
                    break;
                case 'Senior Police Officers of Other Govt Department':
                    baseCost = 7500;
                    break;
                case 'Serving and Senior Police Officers':
                    baseCost = 5000;
                    break;
                default:
                    baseCost = 0;
            }
        }
        
        setPerDayCost(baseCost);

        const checkInDate = new Date(formData.checkInDate);
        const checkOutDate = new Date(formData.checkOutDate);
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setNumberOfDays(diffDays);

        return baseCost * formData.noGuests * diffDays;
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
                openDialog('Error', 'Booking Error', true);
                console.error('Error submitting form:', error);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='main-function-hall-booking container-fluid p-4 p-md-5'>
            <div className="row">
                <div className="col-md-8 m-auto bg-white p-0">
                    <div className="bg-main p-3 text-center">
                        <h1 className="fs-3 text-light">{selectedLanguage === 'kannada' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಸೇವೆ ಬುಕ್ಕಿಂಗ್ ವೇಳಾಪಟ್ಟಿ' : 'Karnataka Government Service Booking Form'}</h1>
                        <p className="text-light">
                            {selectedLanguage === 'kannada' ? 'ಈ ಫಾರಂ ಅಧಿಕಾರಿಗಳಿಗೆ ಇತರ ಸಲಹೆಗಳಿಂದ ಬಹುಮಾನಗಳನ್ನು ಪುಡಿಸುವ ಅವಕಾಶವನ್ನು ಒದಗಿಸುತ್ತದೆ.' : 'This form provides an opportunity for officers to book various sports services offered through the department.'}
                        </p>
                        <div className="d-flex justify-content-end">
                            <Dropdown onSelect={(value) => setSelectedLanguage(value)} className='w-auto'>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {selectedLanguage === 'kannada' ? 'ಭಾಷೆ: ಕನ್ನಡ' : 'Language: English'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="english">English</Dropdown.Item>
                                    <Dropdown.Item eventKey="kannada">ಕನ್ನಡ</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <form className="p-3" onSubmit={submitForm}>
                        <div className="form-group mb-3">
                            <label htmlFor="username">{selectedLanguage === 'kannada' ? translateToKannada('Officer\'s Name') : 'Officer\'s Name'}</label>
                            <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleFormChange} />
                            {errors.username && <span className="text-danger">{errors.username}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="officerDesignation">{selectedLanguage === 'kannada' ? translateToKannada('Designation') : 'Designation'}</label>
                            <input type="text" className="form-control" id="officerDesignation" name="officerDesignation" value={formData.officerDesignation} onChange={handleFormChange} />
                            {errors.officerDesignation && <span className="text-danger">{errors.officerDesignation}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="officerCadre">{selectedLanguage === 'kannada' ? translateToKannada('Cadre') : 'Cadre'}</label>
                            <input type="text" className="form-control" id="officerCadre" name="officerCadre" value={formData.officerCadre} onChange={handleFormChange} />
                            {errors.officerCadre && <span className="text-danger">{errors.officerCadre}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">{selectedLanguage === 'kannada' ? translateToKannada('Email') : 'Email'}</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleFormChange} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phoneNumber">{selectedLanguage === 'kannada' ? translateToKannada('Phone Number') : 'Phone Number'}</label>
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} />
                            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="checkInDate">{selectedLanguage === 'kannada' ? translateToKannada('Check-in Date') : 'Check-in Date'}</label>
                            <input type="date" className="form-control" id="checkInDate" name="checkInDate" value={formData.checkInDate} onChange={handleFormChange} />
                            {errors.checkInDate && <span className="text-danger">{errors.checkInDate}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="checkOutDate">{selectedLanguage === 'kannada' ? translateToKannada('Check-out Date') : 'Check-out Date'}</label>
                            <input type="date" className="form-control" id="checkOutDate" name="checkOutDate" value={formData.checkOutDate} onChange={handleFormChange} />
                            {errors.checkOutDate && <span className="text-danger">{errors.checkOutDate}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="serviceName">{selectedLanguage === 'kannada' ? translateToKannada('Service Name') : 'Service Name'}</label>
                            <Dropdown onSelect={(value) => handleDropdownChange('serviceName', value)}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {formData.serviceName || (selectedLanguage === 'kannada' ? 'ಸೇವೆಯ ಹೆಸರು' : 'Select Service')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Main Event Hall Booking">Main Event Hall Booking</Dropdown.Item>
                                    <Dropdown.Item eventKey="Conference Hall Booking">Conference Hall Booking</Dropdown.Item>
                                    <Dropdown.Item eventKey="Barbeque Area Booking">Barbeque Area Booking</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {errors.serviceName && <span className="text-danger">{errors.serviceName}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="serviceType">{selectedLanguage === 'kannada' ? translateToKannada('Service Type') : 'Service Type'}</label>
                            <Dropdown onSelect={(value) => handleDropdownChange('serviceType', value)}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {formData.serviceType || (selectedLanguage === 'kannada' ? 'ಸೇವೆಯ ರೀತಿ' : 'Select Service Type')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Private Parties">Private Parties</Dropdown.Item>
                                    <Dropdown.Item eventKey="Senior Police Officers of Other Govt Department">Senior Police Officers of Other Govt Department</Dropdown.Item>
                                    <Dropdown.Item eventKey="Serving and Senior Police Officers">Serving and Senior Police Officers</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {errors.serviceType && <span className="text-danger">{errors.serviceType}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="noGuests">{selectedLanguage === 'kannada' ? translateToKannada('Number of Guests') : 'Number of Guests'}</label>
                            <input type="number" className="form-control" id="noGuests" name="noGuests" value={formData.noGuests} onChange={handleFormChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>{selectedLanguage === 'kannada' ? translateToKannada('Total Cost (₹)') : 'Total Cost (₹)'}</label>
                            <div className="form-control" readOnly>
                                {formData.totalCost}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="blue-btn rounded-1 m-1">{selectedLanguage === 'kannada' ? translateToKannada('Submit') : 'Submit'}</button>
                            <button type="button" className="btn btn-danger m-1 rounded-1" onClick={() => navigate('/services')}>{selectedLanguage === 'kannada' ? translateToKannada('Cancel') : 'Cancel'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MainFunctionHallBooking;
