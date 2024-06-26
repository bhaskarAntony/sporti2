import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import SuccessPopup from '../../components/popups/SuccessPopup';
import CryptoJS from 'crypto-js';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MainRoomBook() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        designation:'',
        cadre:'',
        phoneNumber: '',
        noGuests: 1,
        roomType: '',
        sporti: '',
        guestType: '',
        checkIn: '',
        checkOut: '',
        username: '',
        email: '',
        phoneNumber: '',
        sporti: '',
        checkIn: '',
        checkOut: '',
        serviceName: '',
        serviceType: '',
        Paidamount:'pending',
        Paiddatetime:'pending',
        K1TranNo:'pending',    
        SPORTIPWD:'pending',
        SPORTIUSRID:'pending',
        CheckSum:'pending',
        cadre:'',
        designation:'',

    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const calculateTotalCost = () => {
        let roomPrice = 0;

        switch (formData.roomType) {
            case 'Family':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 1600;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 2100;
                }
                break;
            case 'VIP':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 1300;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 1600;
                } else if (formData.guestType === 'Others') {
                    roomPrice = 2700;
                }
                break;
            case 'Standard':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 800;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 1100;
                } else if (formData.guestType === 'Others') {
                    roomPrice = 1600;
                }
                break;
            default:
                roomPrice = 0;
        }

        return roomPrice * formData.noGuests;
    };

    const renderRoomTypes = () => {
        if (formData.sporti === 'SPORTI-1') {
            return (
                <>
                    <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Family')}>Family</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Suite Room (ADGP & Above)')}>Suite Room (ADGP & Above)</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Standard')}>Standard</Dropdown.Item>
                </>
            );
        }else if (formData.sporti === 'SPORTI-2') {
            return (
                <>
                    {/* <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Family')}>Family</Dropdown.Item> */}
                    <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Suite Room (ADGP & Above))')}>Suite Room (ADGP & Above)</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownChange('roomType', 'Standard')}>Standard</Dropdown.Item>
                </>
            );
        } else {
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
            AmountPaid: calculateTotalCost()
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
            
    //         openModal('Success', 'Your booking was successful.');
    //         createPaymentForm();
    //     }
    // };
    const { openDialog } = useDialog();
    const navigate = useNavigate();
    const submitForm = (e) => {
        e.preventDefault()
        setIsLoading(true)
      if(validateForm()){
        axios.post('https://sporti-backend-2-o22y.onrender.com/api/payment', formData)
        .then(response => {
            const { success, user } = response.data;
            console.log(response)
            if (success) {
                setIsLoading(false);
                // createPaymentForm(formData.username, formData.email, formData.phoneNumber, formData.serviceName, user.applicationNo)
                // setMessage(`Booking submitted successfully with application number ${user.applicationNo}`);
                // openModal('Success', `Booking submitted successfully with application number ${user.applicationNo}`)
                openDialog('Success', `Booking submitted successfully with application number ${user.applicationNo} `, false);
                navigate(`/payment/${user.applicationNo}`);

            } else {
                setIsLoading(false);
                openDialog('Error', 'Your application is not confirmed please wait until confirm, the application will confirm within 24 working hours after booking.', true);
            }
        })
        .catch(error => console.error('Error submitting form:', error));
      }
    };

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className='boork-room container-fluid p-3 p-md-5'>
            <div className="row">
                <div className="col-md-8">
                    <h1 className="fs-1">Room Booking Form</h1>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="username" className="form-label">Officer's Name</label>
                                    <input type="text" className="form-control" name="username" id="username" value={formData.username} onChange={handleFormChange} />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="username" className="form-label">Designation</label>
                                    <input type="text" className="form-control" name="designation" id="designation" value={formData.designation} onChange={handleFormChange} />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="username" className="form-label">Cadre</label>
                                    <input type="text" className="form-control" name="cadre" id="cader" value={formData.cadre} onChange={handleFormChange} />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" name="email" id="email" value={formData.email} onChange={handleFormChange} />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} />
                                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="noGuests" className="form-label">No. Guests</label>
                                    <input type="number" className="form-control" name="noGuests" id="noGuests" min={1} value={formData.noGuests} onChange={handleFormChange} />
                                    {errors.noGuests && <small className="text-danger">{errors.noGuests}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="noGuests" className="form-label">No. Rooms</label>
                                    <input type="number" className="form-control" name="noRooms" id="noRooms" min={1} value={formData.noGuests} onChange={handleFormChange} />
                                    {errors.noGuests && <small className="text-danger">{errors.noGuests}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="sporti" className="form-label">SPORTI</label>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle className='bg-light text-dark border-secondary w-100 text-start'>
                                            {formData.sporti || 'Select SPORTI'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDropdownChange('sporti', 'SPORTI-1')}>SPORTI-1</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownChange('sporti', 'SPORTI-2')}>SPORTI-2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.sporti && <small className="text-danger">{errors.sporti}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="guestType" className="form-label">Guest Type</label>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle className='bg-light text-dark border-secondary w-100 text-start'>
                                            {formData.serviceName || 'Select Guest Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDropdownChange('guestType', 'Officers from Karnataka')}>Officers from Karnataka</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownChange('guestType', 'Officers from Other States')}>Officers from Other States</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownChange('guestType', 'Others')}>Others</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.guestType && <small className="text-danger">{errors.guestType}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="roomType" className="form-label">Room Type</label>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle className='bg-light text-dark border-secondary w-100 text-start'>
                                            {formData.serviceType || 'Select Room Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {renderRoomTypes()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.roomType && <small className="text-danger">{errors.roomType}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="checkIn" className="form-label">Check In</label>
                                    <input type="datetime-local" className="form-control" name="checkIn" id="checkIn" value={formData.checkIn} onChange={handleFormChange} />
                                    {errors.checkIn && <small className="text-danger">{errors.checkIn}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="checkOut" className="form-label">Check Out</label>
                                    <input type="datetime-local" className="form-control" name="checkOut" id="checkOut" value={formData.checkOut} onChange={handleFormChange} />
                                    {errors.checkOut && <small className="text-danger">{errors.checkOut}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Continue</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4 mt-4">
                    <div className="card shadow-sm">
                        <h1 className="fs-2">Booking information</h1>
                        <ul className="list-group">
                            <li className='list-group-item'>Username: {formData.username}</li>
                            <li className='list-group-item'>Email: {formData.email}</li>
                            <li className='list-group-item'>Phone Number: {formData.phoneNumber}</li>
                            <li className='list-group-item'>No. Guests: {formData.noGuests}</li>
                            <li className='list-group-item'>Room Type: {formData.roomType}</li>
                            <li className='list-group-item'>SPORTI: {formData.sporti}</li>
                            <li className='list-group-item'>Guest Type: {formData.guestType}</li>
                            <li className='list-group-item'>Check In: {formData.checkIn}</li>
                            <li className='list-group-item'>Check Out: {formData.checkOut}</li>
                            <li className='list-group-item'>Room Cost: {calculateTotalCost()}</li>
                            <li className='list-group-item'><h1 className='fs-2 fw-bold'>Total: {calculateTotalCost()}</h1> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <SuccessPopup show={showModal} close={handleClose} title={title} desc={desc} />
        </div>
    );
}

export default MainRoomBook;
