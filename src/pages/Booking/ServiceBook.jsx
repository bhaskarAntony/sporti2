import React, { useState, useEffect } from 'react';
import SuccessPopup from '../../components/popups/SuccessPopup';
import axios from 'axios';
import Loading from '../../components/popups/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import { Dropdown } from 'react-bootstrap';
import './style.css'; // Include the CSS file
import DOMPurify from 'dompurify';

function sanitizeInput(input) {
    return DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
}

function MainFunctionHallBooking() {
    const { sporti } = useParams();
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
        eventdate: '',
        sporti: sporti
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
    }, [formData.roomType, formData.guestType, formData.noGuests, formData.checkInDate, formData.checkOutDate, formData.serviceName, formData.serviceType, numberOfDays]);

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
            [name]: sanitizeInput(value)
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDropdownChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: sanitizeInput(value)
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

        if (!formData.eventdate) {
            newErrors.eventdate = 'Event date is required';
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

        if (formData.serviceName === 'main function hall') {
            switch (formData.serviceType) {
                case 'Others':
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
        } else if (formData.serviceName === 'Conference Room') {
            switch (formData.serviceType) {
                case 'Others':
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
        } else if (formData.serviceName === 'Barbeque Area') {
            switch (formData.serviceType) {
                case 'Others':
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
        return baseCost * numberOfDays;
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
            case 'Event start date':
                return 'ಈವೆಂಟ್ ಪ್ರಾರಂಭ ದಿನಾಂಕ';
            case 'Event end date':
                return 'ಈವೆಂಟ್ ಕೊನೆ ದಿನಾಂಕ';
            case 'Officers Category':
                return 'ಅಧಿಕಾರಿಗಳ ವರ್ಗ';
            case 'Hall type':
                return 'ಹಾಲ್ ಪ್ರಕಾರ';
            case 'Approximate No of guests':
                return 'ಅಂದಾಜು ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ';
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
        axios.post('https://sporti-services-backend.onrender.com/api/sporti/service/book', formData)
            .then(response => {
                const { success, user } = response.data;
                if (success) {
                    setIsLoading(false);
                    openDialog('Success', `Your booking request has been sent to admin for confirmation and it takes one working day for the same. SMS will be sent to the registered mobile number. please note the acknowledgement number for future reference. ApplicationNo is ${user.applicationNo}`, false);
                    navigate(`/payment/${user.applicationNo}`);
                } else {
                    setIsLoading(false);
                    openDialog('Error', 'Something went wrong, please try again later.', true);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                openDialog('Error', 'Booking Error', true);
                console.error('Error submitting form:', error);
            });
    };

    const generateDayOptions = () => {
        const options = [];
        for (let i = 0.5; i <= 20; i += 0.5) {
            options.push(
                <Dropdown.Item eventKey={i} key={i}>
                    {i} {i === 1 ? 'day' : 'days'}
                </Dropdown.Item>
            );
        }
        return options;
    };

    const handleDaySelection = (value) => {
        setNumberOfDays(parseFloat(value));
    };

    if (isLoading) {
        return <Loading />;
    }
    const decodeHtml = (encodedString) => {
        try {
            // Only decode if it is a valid encoded URI component
            return decodeURIComponent(encodedString);
        } catch (e) {
            // Return the original string if decoding fails
            // setError('URI malformed');
            return encodedString;
        }
    };

    return (
        <div className='main-function-hall-booking container-fluid p-1 p-md-5'>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="bg-white rounded">
                        <div className="bg-main p-2 p-md-3 text-light rounded-top">
                            <h3 className='m-0 text-center'>
                                {selectedLanguage === 'english' ? 'Main Function Hall Booking' : 'ಮೇನ್ಸ್ ಫಂಕ್ಷನ್ ಹಾಲ್ ಬುಕ್ಕಿಂಗ್'}
                            </h3>
                        </div>
                        <form onSubmit={submitForm} className="p-2 p-md-4">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="form-label">
                                        {selectedLanguage === 'english' ? 'Officer\'s Name' : translateToKannada('Officer\'s Name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.username && <div className="text-danger">{errors.username}</div>}
                                    <div dangerouslySetInnerHTML={{ __html: sanitizeInput(decodeHtml(formData.username)) }} />

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="officerDesignation" className="form-label">
                                        {selectedLanguage === 'english' ? 'Designation' : translateToKannada('Designation')}
                                    </label>
                                    <input
                                        type="text"
                                        id="officerDesignation"
                                        name="officerDesignation"
                                        value={formData.officerDesignation}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.officerDesignation && <div className="text-danger">{errors.officerDesignation}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="officerCadre" className="form-label">
                                        {selectedLanguage === 'english' ? 'Cadre' : translateToKannada('Cadre')}
                                    </label>
                                    <input
                                        type="text"
                                        id="officerCadre"
                                        name="officerCadre"
                                        value={formData.officerCadre}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.officerCadre && <div className="text-danger">{errors.officerCadre}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">
                                        {selectedLanguage === 'english' ? 'Email' : translateToKannada('Email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">
                                        {selectedLanguage === 'english' ? 'Phone Number' : translateToKannada('Phone Number')}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="eventdate" className="form-label">
                                        {selectedLanguage === 'english' ? 'Event start date' : translateToKannada('Event start date')}
                                    </label>
                                    <input
                                        type="date"
                                        id="eventdate"
                                        name="eventdate"
                                        value={formData.eventdate}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                    {errors.eventdate && <div className="text-danger">{errors.eventdate}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="serviceName" className="form-label">
                                        {selectedLanguage === 'english' ? 'Service Name' : translateToKannada('Service Name')}
                                    </label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('serviceName', value)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-serviceName">
                                            {formData.serviceName || 'Select Service Name'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="main function hall">Main Function Hall</Dropdown.Item>
                                            <Dropdown.Item eventKey="conference room">Conference Room</Dropdown.Item>
                                            <Dropdown.Item eventKey="barbeque area">Barbeque Area</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.serviceName && <div className="text-danger">{errors.serviceName}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="serviceType" className="form-label">
                                        {selectedLanguage === 'english' ? 'Service Type' : translateToKannada('Service Type')}
                                    </label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('serviceType', value)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-serviceType">
                                            {formData.serviceType || 'Select Service Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Others">Others</Dropdown.Item>
                                            <Dropdown.Item eventKey="Senior Police Officers of Other Govt Department">Senior Police Officers of Other Govt Department</Dropdown.Item>
                                            <Dropdown.Item eventKey="Serving and Senior Police Officers">Serving and Senior Police Officers</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.serviceType && <div className="text-danger">{errors.serviceType}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="roomType" className="form-label">
                                        {selectedLanguage === 'english' ? 'Hall type' : translateToKannada('Hall type')}
                                    </label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('roomType', value)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-roomType">
                                            {formData.roomType || 'Select Hall Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Conference Room">Conference Room</Dropdown.Item>
                                            <Dropdown.Item eventKey="Main Hall">Main Hall</Dropdown.Item>
                                            <Dropdown.Item eventKey="Barbeque Area">Barbeque Area</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.roomType && <div className="text-danger">{errors.roomType}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="noGuests" className="form-label">
                                        {selectedLanguage === 'english' ? 'Approximate No of guests' : translateToKannada('Approximate No of guests')}
                                    </label>
                                    <input
                                        type="number"
                                        id="noGuests"
                                        name="noGuests"
                                        value={formData.noGuests}
                                        onChange={handleFormChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="numberOfDays" className="form-label">
                                        {selectedLanguage === 'english' ? 'Number of days' : translateToKannada('Number of days')}
                                    </label>
                                    <Dropdown onSelect={handleDaySelection}>
                                        <Dropdown.Toggle variant="success" id="dropdown-days">
                                            {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {generateDayOptions()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="totalCost" className="form-label">
                                        {selectedLanguage === 'english' ? 'Total Cost (₹)' : translateToKannada('Total Cost (₹)')}
                                    </label>
                                    <input
                                        type="text"
                                        id="totalCost"
                                        name="totalCost"
                                        value={formData.totalCost}
                                        readOnly
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary">
                                        {selectedLanguage === 'english' ? 'Submit' : translateToKannada('Submit')}
                                    </button>
                                </div>
                                <div className="col-md-6 text-end">
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                                        {selectedLanguage === 'english' ? 'Cancel' : translateToKannada('Cancel')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Popup */}
            {showModal && (
                <SuccessPopup title={title} description={desc} handleClose={handleClose} />
            )}
        </div>
    );
}

export default MainFunctionHallBooking;
