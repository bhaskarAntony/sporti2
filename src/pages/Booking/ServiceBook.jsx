import React, { useState, useEffect } from 'react';
import SuccessPopup from '../../components/popups/SuccessPopup';
import CryptoJS from 'crypto-js';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../components/popups/Loading';
import { useNavigate } from 'react-router-dom';

function MainFunctionHallBooking() {
    const [ApplicationNo, setApplicationNo] = useState(null)
    const [formData, setFormData] = useState({
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
        CheckSum:'pending'
    });
    const [showmodal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        serviceName: '',
        serviceType: ''
    });

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
        // Reset error message when input changes
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
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

        if (formData.serviceName==null) {
            newErrors.serviceName = 'Service name is required';
            isValid = false;
        }

        if (!formData.serviceType==null) {
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
        return total;
    };

    const generateHash512 = (text) => {
        const hash = CryptoJS.SHA512(text);
        return hash.toString(CryptoJS.enc.Hex);
    };

    const createPaymentForm = (name, email, phonenumber, service, applicationNo) => {
        const requestData = {
            K1USRID: 'K1SPOTIUSER',
            K1PWD: '39d16932b27ba15a4c77fd09f8817b2dbce0089dfd45b602fdad8881127002560c5249a77c9dce96fc88a035a1393553ca80f1196b2f89a27b701525533fc55c',
            Name: formData.username,
            AppNo: applicationNo,
            Email: formData.email,
            Phone: formData.phoneNumber,
            ProductInfo: formData.serviceName,
            AmountPaid: calculateTotalCost(),
        };

        // Concatenate parameters in the specified order
        const requestDataString = `K1USRID=${requestData.K1USRID}|K1PWD=${requestData.K1PWD}|Name=${requestData.Name}|AppNo=${requestData.AppNo}|Phone=${requestData.Phone}|Email=${requestData.Email}|ProductInfo=${requestData.ProductInfo}|AmountPaid=${requestData.AmountPaid}`;

        // Generate checksum based on concatenated string
        const checksum = generateHash512(requestDataString);

        // Append checksum and return URL
        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=http://localhost:3000/payment`;

        // Create form element
        const form = document.createElement('form');
        form.id = 'FormPost';
        form.method = 'post';
        form.action = 'https://koneportal.cmsuat.co.in:1443/SPORTI/Index/UXhBakNVanVwTFRWM3IremdWSjV5dz09';

        // Create and append input for SPORTIFormData
        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = 'SPORTIFormData';
        input.name = 'SPORTIFormData';
        input.value = formValue;
        form.appendChild(input);

        // Append form to body and submit
        document.body.appendChild(form);
        form.submit();
    };
    const navigate = useNavigate()

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
                setMessage(`Booking submitted successfully with application number ${user.applicationNo}`);
                openModal('Success', `Booking submitted successfully with application number ${user.applicationNo}`)
                navigate(`/payment/${user.applicationNo}`);

            } else {
                setIsLoading(false);
                setMessage('Failed to submit booking');
            }
        })
        .catch(error => console.error('Error submitting form:', error));
      }
    };
    if(isLoading){
        return <Loading/>
    }

    return (
        <div className='main-function-hall-booking container-fluid p-3 p-md-5'>
            <div className="row">
                <div className="col-md-8">
                    <h1 className="fs-1">Book Our services</h1>
                   <form action="" onSubmit={submitForm}>
                   <div className="row">
                            <div className="col-md-12">
                                {/* <div className="form-group mt-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" name="username" id="username" value={formData.username} onChange={handleFormChange} />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div> */}
                            </div>
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
                                    <label htmlFor="check" className="form-label">checkin</label>
                                    <input type="date" className="form-control" name="checkIn" id="phoneNumber" value={formData.checkIn} onChange={handleFormChange} />
                                    {errors.checkIn && <small className="text-danger">{errors.checkIn}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="check" className="form-label">check out</label>
                                    <input type="date" className="form-control" name="checkOut" id="phoneNumber" value={formData.checkOut} onChange={handleFormChange} />
                                    {errors.checkOut && <small className="text-danger">{errors.checkOut}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="check" className="form-label">Sporti</label>
                                   <select name="sporti" className='form-select' id="" value={formData.sporti} onChange={handleFormChange}>
                                    <option value="sporti1">SPORTI-1</option>
                                    <option value="sporti2">SPORTI-2</option>
                                   </select>
                                </div>
                            </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label htmlFor="serviceName" className="form-label">Service Name</label>
                                <Dropdown className='w-100'>
                                    <Dropdown.Toggle className='bg-light text-dark border-secondary w-100 text-start'>
                                        {formData.serviceName || 'Select Service Name'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'Main Event Hall Booking' })}>Main Event Hall Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'Conference Hall Booking' })}>Conference Hall Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'Training Hall Booking' })}>Training Hall Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'Barbeque Area Booking' })}>Barbeque Area Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'Badminton' })}>BADMINTON Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'mini theatre' })}>MINI THEATRE Booking</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceName: 'table tennis' })}>TABLE TENNIS Booking</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {errors.serviceName && <small className="text-danger">{errors.serviceName}</small>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label htmlFor="serviceType" className="form-label">Service Type</label>
                                <Dropdown className='w-100'>
                                    <Dropdown.Toggle className='bg-light text-dark border-secondary w-100 text-start'>
                                        {formData.serviceType || 'Select Service Type'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceType: 'Private Parties' })}>Private Parties</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceType: 'Senior Police Officers of Other Govt Department' })}>Senior Police Officers of Other Govt Department</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFormData({ ...formData, serviceType: 'Serving and Senior Police Officers' })}>Serving and Senior Police Officers</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {errors.serviceType && <small className="text-danger">{errors.serviceType}</small>}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-4" type='submit'>Send Request</button>
                   </form>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <ul className="list-group">
                            <li className='list-group-item'>Username: {formData.username}</li>
                            <li className='list-group-item'>Email: {formData.email}</li>
                            <li className='list-group-item'>Phone Number: {formData.phoneNumber}</li>
                            <li className='list-group-item'>SPORTI: {formData.sporti}</li>
                            <li className='list-group-item'>Check In: {formData.checkIn}</li>
                            <li className='list-group-item'>Check Out: {formData.checkOut}</li>
                            <li className='list-group-item'>Service Name: {formData.serviceName}</li>
                            <li className='list-group-item'>Service Type: {formData.serviceType}</li>
                            <li className='list-group-item'>Service Price: {calculateTotalCost()}</li>
                            <li className='list-group-item'><h1 className='fs-2 fw-bold'>Total: {calculateTotalCost()}</h1> </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {message && <p>{message}</p>}
                </div>
            </div>
            <SuccessPopup show={showmodal} close={handleClose} title={title} desc={desc}/>
        </div>
    );
}

export default MainFunctionHallBooking;
