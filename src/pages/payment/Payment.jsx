import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';

const Payment = () => {
    const {applicationNo} = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch booking data
        axios.get(`https://sporti-backend-2-o22y.onrender.com/api/getPayment/${applicationNo}`)
            .then(response => {
                setBooking(response.data.booking);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [applicationNo]);

    const generateHash512 = (text) => {
        const hash = CryptoJS.SHA512(text);
        return hash.toString(CryptoJS.enc.Hex);
    };

    const calculateTotalCost = () => {
        // Placeholder for actual cost calculation logic
        return 100; // Example amount
    };
    const { openDialog } = useDialog();

    const createPaymentForm = () => {
        if (!booking) return;

        const requestData = {
            K1USRID: 'K1SPOTIUSER',
            K1PWD: '39d16932b27ba15a4c77fd09f8817b2dbce0089dfd45b602fdad8881127002560c5249a77c9dce96fc88a035a1393553ca80f1196b2f89a27b701525533fc55c',
            Name: booking.username,
            AppNo: booking.applicationNo,
            Email: booking.email,
            Phone: booking.phoneNumber,
            ProductInfo: booking.serviceName,
            AmountPaid: calculateTotalCost(),
        };

        // Concatenate parameters in the specified order
        const requestDataString = `K1USRID=${requestData.K1USRID}|K1PWD=${requestData.K1PWD}|Name=${requestData.Name}|AppNo=${requestData.AppNo}|Phone=${requestData.Phone}|Email=${requestData.Email}|ProductInfo=${requestData.ProductInfo}|AmountPaid=${requestData.AmountPaid}`;

        // Generate checksum based on concatenated string
        const checksum = generateHash512(requestDataString);

        // Append checksum and return URL
        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=http://localhost:3000`;

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
        // if(!booking.status === 'pending') {
        //     form.submit();
        // }else{
        //     openDialog('Error', 'Your application is not confirmed please wait until confirm, the application will confirm within 24 working hours after booking.', true);
        // }
        form.submit();
    };

    if (loading) return <Loading/>
    if (error) return <p>{ openDialog('Error', 'something went wrong please refresh the page to try...', true)}</p>;

    return (
        <div className='p-2 p-md-4 payment'>
       <div className="row">
        <div className="col-md-8 m-auto">
        <div className="card border-0 rounded-0  w-100 p-0">
          <div className="bg-main p-3 text-center">
          <h1 className='fs-3 text-light'>SPORTI service booking details</h1>
          <p className="fs-6 text-light text-center">Here you can find all yoir application details for SPORTI service once it confirm pay ammount throgh online or offline.</p>
        
          <p className="fs-6 text-light"></p>
          </div>
      
         <div className="p-3">
         <ul className="list-group rounded-1">
           <li className="list-group-item"> <p className='fs-5'><b>Username:</b> {booking.username}</p></li>
           <li  className="list-group-item"> <p className='fs-5'><b>Email:</b> {booking.email}</p></li>
         <li  className="list-group-item">   <p className='fs-5'><b>Service:</b> {booking.serviceName}</p></li>
            <li  className="list-group-item"><p className='fs-5'><b>Check-in:</b> {new Date(booking.checkIn).toLocaleDateString()}</p></li>
           <li  className="list-group-item"> <p className='fs-5'><b>Check-out:</b> {new Date(booking.checkOut).toLocaleDateString()}</p></li>
           </ul>
         </div>
           <div className="d-flex gap-3  flex-nowrap justify-content-end p-2">
          <button onClick={createPaymentForm} className='btn btn-success rounded-1 m-1'>Pay Online</button>
          <button onClick={createPaymentForm} className='btn btn-danger rounded-1 m-1'>Pay Offline </button>
          </div>
         
           <div className="bg-main text-light p-3">
            <p className="fs-5 text-center">Note</p>
           <p className="fs-6 text-center">you can pay money throgh online or offline once the admin is confirm your service request it once confirm you will get sms message if you are already goth sms means your application has been verified now you can pay the money if you are not got any sms please visite later to this page and search your appliation number and check your application status if your appliation is reject then also you will get sms notification this precess will happen in 24 working hours for further information plase contact SPORTI team.</p>
           </div>
           </div>
        </div>
       </div>
         
        </div>
    );
};

export default Payment;
