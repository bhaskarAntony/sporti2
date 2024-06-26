import React, { useState, useEffect } from 'react';
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
        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=http://localhost:58851/College/Purenewal.aspx`;

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
        if(!booking.status === 'pending') {
            form.submit();
        }else{
            openDialog('Error', 'Your application is not confirmed please wait until confirm, the application will confirm within 24 working hours after booking.', true);
        }
    };

    if (loading) return <Loading/>
    if (error) return <p>{ openDialog('Error', 'something went wrong please refresh the page to try...', true)}</p>;

    return (
        <div className='p-5'>
       <div className="row">
        <div className="col-md-6 m-auto">
        <div className="card p-3 shadow w-100">
           <h1 className='fs-1'>Booking Details</h1>
           <hr />
           <ul className="list-group">
           <li className="list-group-item"> <p className='fs-4'><b>Username:</b> {booking.username}</p></li>
           <li  className="list-group-item"> <p className='fs-4'><b>Email:</b> {booking.email}</p></li>
         <li  className="list-group-item">   <p className='fs-4'><b>Service:</b> {booking.serviceName}</p></li>
            <li  className="list-group-item"><p className='fs-4'><b>Check-in:</b> {new Date(booking.checkIn).toLocaleDateString()}</p></li>
           <li  className="list-group-item"> <p className='fs-4'><b>Check-out:</b> {new Date(booking.checkOut).toLocaleDateString()}</p></li>
           <li className="d-flex gap-3 list-group-item flex-nowrap">
          <button onClick={createPaymentForm} className='blue-btn w-100'>Online Payment</button>
          <button onClick={createPaymentForm} className='blue-btn w-100'>Offline Payment</button>
          </li>
           </ul>
           </div>
        </div>
       </div>
         
        </div>
    );
};

export default Payment;
