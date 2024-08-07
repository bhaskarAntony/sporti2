import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import SuccessPopup from '../../components/popups/SuccessPopup';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';
import DOMPurify from 'dompurify';

function sanitizeInput(input, field) {
    let sanitized = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
    if (field === 'checkIn' || field === 'checkOut') {
        return input;
    }
    if (field === 'email') {
        sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
    } else if (field === 'phoneNumber' || field === 'noGuests') {
        sanitized = sanitized.replace(/[^0-9]/g, '');
    } else {
        sanitized = sanitized.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    return sanitized;
}

function MainRoomBook() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        officerDesignation: '',
        officerCadre: '',
        email: '',
        phoneNumber: '',
        checkIn: '',
        checkOut: '',
        sporti: '',
        serviceType: '',
        serviceName: 'Room Booking',
        roomType: '',
        noGuests: 1,
        totalCost: 0,
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    const handleClose = () => {
        setShowModal(false);
    };

    const openModal = (title, desc) => {
        setShowModal(true);
        setDesc(desc);
        setTitle(title);
    };

    const navigate = useNavigate();
    const { openDialog } = useDialog();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: sanitizeInput(value, name)
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
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        if (!formData.sporti) {
            newErrors.sporti = 'SPORTI selection is required';
        }
        if (!formData.officerDesignation) {
            newErrors.officerDesignation = 'officerDesignation is required';
        }
        if (!formData.officerCadre) {
            newErrors.officerCadre = 'officerCadre is required';
        }
        if (!formData.roomType) {
            newErrors.roomType = 'Room type selection is required';
        }
        if (!formData.guestType) {
            newErrors.guestType = 'Guest type selection is required';
        }
        if (!formData.checkIn) {
            newErrors.checkIn = 'Check-in date and time are required';
        }
        if (!formData.checkOut) {
            newErrors.checkOut = 'Check-out date and time are required';
        }
        if (!formData.officerDesignation.trim()) {
            newErrors.officerDesignation = 'Officer Designation is required';
        }
        if (!formData.officerCadre.trim()) {
            newErrors.officerCadre = 'Officer Cadre is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderRoomTypes = () => {
        if (formData.sporti == 'SPORTI2') {
            return (
                <>
                    <Dropdown.Item eventKey="Family">{selectedLanguage === 'kannada' ? 'ಕುಟುಂಬ' : 'Family'}</Dropdown.Item>
                    {/* <Dropdown.Item eventKey="VIP">{selectedLanguage === 'kannada' ? 'ವಿಐಪಿ' : 'VIP'}</Dropdown.Item> */}
                    <Dropdown.Item eventKey="Standard">{selectedLanguage === 'kannada' ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            );
        } else if(formData.sporti == 'SPORTI1') {
            return (
                <>
                  <Dropdown.Item eventKey="Family">{selectedLanguage === 'kannada' ? 'ಕುಟುಂಬ' : 'Family'}</Dropdown.Item>
                    <Dropdown.Item eventKey="VIP">{selectedLanguage === 'kannada' ? 'ವಿಐಪಿ' : 'Suite (ADGP & Above)'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Standard">{selectedLanguage === 'kannada' ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            )
        }
        else{
            return null;
        }
    };

    const generateHash512 = (text) => {
        const hash = CryptoJS.SHA512(text);
        return hash.toString(CryptoJS.enc.Hex);
    };

    const createPaymentForm = () => {
        const requestData = {
            K1USRID: 'K1SPOTIUSER',
            K1PWD: '39d16932b27ba15a4c77fd09f8817b2dbce0089dfd45b602fdad8881127002560c5249a77c9dce96fc88a035a1393553ca80f1196b2f89a27b701525533fc55c',
            Name: formData.username,
            AppNo: 'MD89786',
            Email: formData.email,
            Phone: formData.phoneNumber,
            ProductInfo: formData.roomType,
            AmountPaid: formData.totalCost
        };

        const requestDataString = `K1USRID=${requestData.K1USRID}|K1PWD=${requestData.K1PWD}|Name=${requestData.Name}|AppNo=${requestData.AppNo}|Phone=${requestData.Phone}|Email=${requestData.Email}|ProductInfo=${requestData.ProductInfo}|AmountPaid=${requestData.AmountPaid}`;

        const checksum = generateHash512(requestDataString);

        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=http://localhost:58851/College/Purenewal.aspx`;

        const form = document.createElement('form');
        form.id = 'FormPost';
        form.method = 'post';
        form.action = 'https://koneportal.cmsuat.co.in:1443/SPORTI/Index/UXhBakNVanVwTFRWM3IremdWSjV5dz09';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = 'SPORTIFormData';
        input.name = 'SPORTIFormData';
        input.value = formValue;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);//https://sporti-backend-live.onrender.com
        axios.post('https://sporti-backend-live.onrender.com/api/sporti/service/room/book', formData)
            .then(response => {
                const { success, user } = response.data;
                if (success) {
                    setIsLoading(false);
                    openDialog('Success', `Your booking request has been sent to admin for confirmation and it takes one working day for the same. SMS will be sent to the registered mobile number. Please note the acknowledgement number for future reference. ApplicationNo is ${user.applicationNo}`, false);
                    navigate(`/`);
                } else {
                    setIsLoading(false);
                    openDialog('Error', 'Something went wrong, please try again later.', true);
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
        <div className='main-function-hall-booking container-fluid p-1 p-md-5'>
            <div className="row">
                <div className="col-md-8 m-auto bg-white p-0">
                    <div className="bg-main p-3 text-center">
                        <h1 className="fs-3 text-light">{selectedLanguage === 'kannada' ? ' Room  ಬುಕ್ಕಿಂಗ್ ವೇಳಾಪಟ್ಟಿ' : 'SPORTI Room Booking Form'}</h1>
                        <p className="text-light">
                            {selectedLanguage === 'kannada' ? 'ಈ ಫಾರಂ ಅಧಿಕಾರಿಗಳಿಗೆ ಇತರ ಸಲಹೆಗಳಿಗಾಗಿ ಭಾವಿಸುವುದಿಲ್ಲ' : 'This form is for booking rooms in the SPORTI'}
                        </p>
                        <div className="d-flex justify-content-end">
                   <Dropdown onSelect={(value) => setSelectedLanguage(value)} className='w-auto'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-language">
                            {selectedLanguage === 'kannada' ? 'ಕನ್ನಡ' : 'English'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="english">English</Dropdown.Item>
                            <Dropdown.Item eventKey="kannada">ಕನ್ನಡ</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                   </div>
                    </div>
                    <div className="p-4">
                        <form onSubmit={submitForm}>
                            <div className="row">
                            <div className="form-group mb-3">
                                <label htmlFor="username">{selectedLanguage === 'kannada' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'officers name'}</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    max={50}
                                />
                                {errors.username && <div className="text-danger">{errors.username}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="officerDesignation">{selectedLanguage === 'kannada' ? 'Officer Designation' : 'officer Designation'}</label>
                                <input
                                    type="text"
                                    id="officerDesignation"
                                    name="officerDesignation"
                                    value={formData.officerDesignation}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    maxlength={40}
                                />
                                {errors.officerDesignation && <div className="text-danger">{errors.officerDesignation}</div>}
                            </div>
                            <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="guestType" className="form-label">
                                    {selectedLanguage === 'kannada' ? 'ಅತಿಥಿ ಪ್ರಕಾರ' : 'Officers Category'}
                                </label>
                                <Dropdown onSelect={(value) => handleDropdownChange('guestType', value)}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-guestType">
                                        {formData.guestType || (selectedLanguage === 'kannada' ? 'ಅತಿಥಿ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' : 'Select Officers Category')}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Officers from Karnataka">
                                            {selectedLanguage === 'kannada' ? 'ಕರ್ನಾಟಕದ ಅಧಿಕಾರಿಗಳು' : 'Serving and Retired Officers of Karnataka Cadre'}
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Officers from Other States">
                                            {selectedLanguage === 'kannada' ? 'ಇತರೆ ರಾಜ್ಯಗಳ ಅಧಿಕಾರಿಗಳು' : ' ⁠Officers from other Cadres'}
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Serving and Senior Police Officers">
                                            {selectedLanguage === 'kannada' ? 'ಇತರೆ' : 'Others'}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {errors.guestType && <small className="text-danger">{errors.guestType}</small>}
                            </div>
                        </div>
                           <div className="col-md-6">
                           <div className="form-group mb-3">
                                <label htmlFor="officerCadre">{selectedLanguage === 'kannada' ? 'officerCadre' : 'Officer Cadre'}</label>
                                <input
                                    type="text"
                                    id="officerCadre"
                                    name="officerCadre"
                                    value={formData.officerCadre}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    maxlength={40}
                                />
                                {errors.officerCadre && <div className="text-danger">{errors.officerCadre}</div>}
                            </div>
                           </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">{selectedLanguage === 'kannada' ? 'ಇಮೇಲ್' : 'Email'}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    maxlength={40}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="phoneNumber">{selectedLanguage === 'kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ' : 'Phone Number'}</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    min={10}
                                    max={13}
                                />
                                {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="checkIn">{selectedLanguage === 'kannada' ? 'ಪರಿಶೀಲಿಸಿ ಇನ್' : 'Check-in Date and Time'}</label>
                                <input
                                    type="datetime-local"
                                    id="checkIn"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                                {errors.checkIn && <div className="text-danger">{errors.checkIn}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="checkOut">{selectedLanguage === 'kannada' ? 'ಪರಿಶೀಲಿಸಿ ಔಟ್' : 'Check-out Date and Time'}</label>
                                <input
                                    type="datetime-local"
                                    id="checkOut"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                                {errors.checkOut && <div className="text-danger">{errors.checkOut}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="sporti">{selectedLanguage === 'kannada' ? 'SPORTI' : 'SPORTI'}</label>
                                <Dropdown onSelect={(eventKey) => handleDropdownChange('sporti', eventKey)}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        {formData.sporti || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡು' : 'Select')}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="SPORTI-1">{selectedLanguage === 'kannada' ? 'SPORTI-1' : 'SPORTI-1'}</Dropdown.Item>
                                        <Dropdown.Item eventKey="SPORTI-2">{selectedLanguage === 'kannada' ? 'SPORTI-2' : 'SPORTI-2'}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {errors.sporti && <div className="text-danger">{errors.sporti}</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="roomType">{selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಪ್ರಕಾರ' : 'Room Type'}</label>
                                <Dropdown onSelect={(eventKey) => handleDropdownChange('roomType', eventKey)}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-room-type">
                                        {formData.roomType || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡು' : 'Select')}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {renderRoomTypes()}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {errors.roomType && <div className="text-danger">{errors.roomType}</div>}
                            </div>
                           
                            <div className="form-group mb-3 mt-3">
                                <label htmlFor="noGuests">{selectedLanguage === 'kannada' ? 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ' : 'Number of Guests'}</label>
                                <input
                                    type="number"
                                    id="noGuests"
                                    name="noGuests"
                                    value={formData.noGuests}
                                    onChange={handleFormChange}
                                    className="form-control"
                                    min={1}
                                />
                                {errors.noGuests && <div className="text-danger">{errors.noGuests}</div>}
                            </div>
                            </div>
                            {/* <div className="form-group mb-3">
                                <label htmlFor="totalCost">{selectedLanguage === 'kannada' ? 'ಒಟ್ಟು ವೆಚ್ಚ' : 'Total Cost'}</label>
                                <input
                                    type="text"
                                    id="totalCost"
                                    name="totalCost"
                                    value={formData.totalCost}
                                    readOnly
                                    className="form-control"
                                />
                            </div> */}
                            {/* <button type="submit" className="btn btn-primary">{selectedLanguage === 'kannada' ? 'ಹಂತದ ಪೂರೈಸಿ' : 'Submit'}</button> */}
                            <div className="row">
                            <div className="col-md-12 mt-4 p-3 d-flex justify-content-end gap-2">
                            <button type="submit" className="blue-btn rounded-1 m-1">{selectedLanguage === 'kannada' ? 'ಸಲ್ಲಿಸು' : 'Submit'}</button>
                            <button className="btn btn-danger rounded-1 m-1" type='reset'>Cancel</button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessPopup title={title} desc={desc} showModal={showModal} handleClose={handleClose} />
        </div>
    );
}

export default MainRoomBook;
