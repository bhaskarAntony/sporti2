import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Container, Row, Col, Card, Table, Button, ProgressBar, Modal, Form, Accordion } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import cookies from 'js-cookie'
import './style.css'
import { Avatar} from '@mui/material';
import { toast } from 'react-toastify';
import Loading from '../popup/Loading';

import { Link, useNavigate } from 'react-router-dom';
import { BookingContext } from '../hooks/BookingContext';
import AllRooms from './AllRooms';
import BlockRoom from './BlockRoom';
import ClearRoom from './ClearRoom';
import BookingsDownload from './BookingsDownload';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
];

const Dashboard = () => {
    const { Contextbookings, isloading, error, fetchBookings } = useContext(BookingContext);
    const [data, setData] = useState([]);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [monthlyUsers, setMonthlyUsers] = useState({});
    const [pendingUsers, setPendingUsers] = useState({});
    const [rejectedUsers, setRejectedUsers] = useState({});
    const [successfulUsers, setSuccessfulUsers] = useState({});
    const [successfulPayments, setSuccessfulPayments] = useState({});
    const [serviceTypes, setServiceTypes] = useState({});
    const [serviceNames, setServiceNames] = useState({});
    const [sporti, setSporti] = useState({});
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState({});
    const [bookings, setBookings] = useState([]);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [viewDetails, setViewDetails] = useState(null)
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const navigate = useNavigate();
    const [selectedSporti, setSelectedSporti] = useState('SPORTI-2');
        const [selectedRoom, setSelectedRoom] = useState(null);
        const [selectedRoomType, setSelectedRoomType] = useState(null);
        const [roomData, setRoomData] = useState({});
        const [formData, setFormData] = useState({});

        const [filterType, setFilterType] = useState('daily');

const filterDataByDay = (data) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return data.filter(item => new Date(item.checkIn).setHours(0, 0, 0, 0) === today);
};

const filterDataByWeek = (data) => {
  const currentDate = new Date();
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
  const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek)).setHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate.setDate(firstDayOfWeek + 6)).setHours(23, 59, 59, 999);

  return data.filter(item => {
    const eventDate = new Date(item.checkIn).getTime();
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  });
};


const filterDataByMonth1 = (data, selectedMonth) => {
    if (!selectedMonth) return data;
    const month = selectedMonth.value;
    return data.filter(item => new Date(item.checkIn).getMonth() + 1 === month);
  };
  
  const getFilteredData = () => {
    let filteredData = [];
  
    if (filterType === 'daily') {
      filteredData = filterDataByDay(data);
    } else if (filterType === 'weekly') {
      filteredData = filterDataByWeek(data);
    } else if (filterType === 'monthly') {
      filteredData = filterDataByMonth1(data, selectedMonth);
    }
  
    return filteredData;
  };


    
    useEffect(()=>{
        setData(Contextbookings);
        processChartData(Contextbookings);
    }, [Contextbookings])

    
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!formData.roomType || !selectedSporti) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://sporti-backend-live-p00l.onrender.com/api/available/rooms?roomType=${selectedRoomType}&sporti=${selectedSporti}`
        );
        const rooms = response.data;

        const structuredData = rooms.reduce((acc, room) => {
          const { _id, floor, category, roomNumber, isBooked } = room;
          if (!acc[floor]) acc[floor] = {};
          if (!acc[floor][category]) acc[floor][category] = [];

          acc[floor][category].push({
            id: _id,
            roomNumber,
            isBooked,
          });

          return acc;
        }, {});

        setRoomData(structuredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Failed to fetch room data.');
        console.error('Error:', error);
      }
    };

    fetchRoomData();
  }, [selectedRoomType, selectedSporti]);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };
   

//    const fetchBookings = () =>{
//     axios.get('https://sporti-backend-live-2.onrender.com/api/sporti/service/bookings')
//     .then(response => {
//         setLoading(false);
//         setData(response.data);
//         console.log(response.data.reverse());
        
//         processChartData(response.data);
//     })
//     .catch(error => {
//         setLoading(false)
//         console.error('There was an error fetching the data!', error);
//     });
//    }
//    fetchBookings()

    const processChartData = (data) => {
        const monthlyUsersData = {};
        const pendingUsersData = {};
        const rejectedUsersData = {};
        const successfulUsersData = {};
        const successfulPaymentsData = {};
        const serviceTypesData = {};
        const serviceNamesData = {};
        const sportiData = {};
        const monthlyRevenueData = {};
        let totalRevenueData = 0;

        data.forEach(item => {
            const month = new Date(item.checkIn?item.checkIn:item.eventdate).getMonth() + 1;

            monthlyUsersData[month] = (monthlyUsersData[month] || 0) + 1;

            if (item.status === 'pending') {
                pendingUsersData[month] = (pendingUsersData[month] || 0) + 1;
            }

            if (item.status === 'rejected') {
                rejectedUsersData[month] = (rejectedUsersData[month] || 0) + 1;
            }

            if (item.status === 'approved') {
                successfulUsersData[month] = (successfulUsersData[month] || 0) + 1;
            }

            if (item.status === 'confirmed') {
                successfulPaymentsData[month] = (successfulPaymentsData[month] || 0) + 1;
               
            }
            if(item.paymentStatus === "success"){
                totalRevenueData += parseFloat(item.totalCost) || 0;
                monthlyRevenueData[month] = (monthlyRevenueData[month] || 0) + parseFloat(item.totalCost);
            }

            serviceTypesData[item.serviceType] = (serviceTypesData[item.serviceType] || 0) + 1;
            serviceNamesData[item.serviceName] = (serviceNamesData[item.serviceName] || 0) + 1;
            sportiData[item.sporti] = (sportiData[item.sporti] || 0) + 1;
        });

        setMonthlyUsers(monthlyUsersData);
        setPendingUsers(pendingUsersData);
        setRejectedUsers(rejectedUsersData);
        setSuccessfulUsers(successfulUsersData);
        setSuccessfulPayments(successfulPaymentsData);
        setServiceTypes(serviceTypesData);
        setServiceNames(serviceNamesData);
        setSporti(sportiData);
        setTotalRevenue(totalRevenueData);
        setMonthlyRevenue(monthlyRevenueData);
    };

    const handleMonthChange = (selectedOption) => {
        setSelectedMonth(selectedOption);
    };

    const filterDataByMonth = (data) => {
        if (!selectedMonth) return data;
        const month = selectedMonth.value;
        return data.filter(item => new Date(item.eventdate).getMonth() + 1 === month);
    };
    const xAxisLabel = 'Months';
const yAxisLabel = 'Sales in Units';

    const generateChartData = (data, label, colors) => ({
        labels: Object.keys(data),
        datasets: [
            {
                label: label,
                data: Object.values(data),
                backgroundColor: colors,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            
        ],
    });

    const generateChartOptions = (xAxisLabel, yAxisLabel) => ({
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: xAxisLabel,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: yAxisLabel,
                },
            },
        },
    });

    const chartOptions = generateChartOptions(xAxisLabel, yAxisLabel);
    const revenueChartData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: Object.values(monthlyRevenue),
                fill: false,
                borderColor: 'transparent',
                tension: 0.1,
            },
        ],
    };

    const colors = ['#36BA98', '#F19ED2', '#3AA6B9', '#F2C18D', '#9966FF', '#FF9F40', '#E7E9ED', '#36A2EB'];

   

    const filteredData = filterDataByMonth(data);
    const headers = [
        { label: "Username", key: "username" },
        { label: "Email", key: "email" },
        { label: "Officer Designation", key: "officerDesignation" },
        { label: "Officer Cadre", key: "officerCadre" },
        { label: "Phone Number", key: "phoneNumber" },
        { label: "Application No", key: "applicationNo" },
        { label: "Sport", key: "sporti" },
        { label: "Service Name", key: "serviceName" },
        { label: "Event Date", key: "checkIn" },
        { label: "Service Type", key: "serviceType" },
        { label: "No. of Guests", key: "noGuests" },
        { label: "Payment Status", key: "paymentStatus" },
        { label: "Total Cost", key: "totalCost" },
        { label: "Status", key: "status" },
        { label: "Rejection Reason", key: "rejectionReason" }
    ];

    const renderTable = (data) => (
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map((key, index) => (
                    <tr key={index}>
                        <td>{key}</td>
                        <td>{data[key]}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    const renderProgress = (data, label) => (
        <Card.Text>
            <strong>{label}: </strong>
            <ProgressBar now={data} label={`${data}`} />
        </Card.Text>
    );

   // Handle checkbox selection
const handleCheckboxChange = (applicationNo) => {
    setSelectedBookings((prevSelected) => {
        if (prevSelected.includes(applicationNo)) {
            return prevSelected.filter((no) => no !== applicationNo); // Uncheck
        } else {
            return [...prevSelected, applicationNo]; // Check
        }
    });
};

// Delete multiple bookings
const deleteMultipleBookings = () => {
    if (selectedBookings.length === 0) {
        toast.info('No bookings selected');
        return;
    }
    if (window.confirm('Delete selected bookings?')) {
        setLoading(true);
        Promise.all(
            selectedBookings.map((applicationNo) =>
                axios.delete(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/delete/booking/${applicationNo}`)
            )
        )
            .then(() => {
                setLoading(false);
                toast.success('Selected bookings deleted');
                fetchBookings(); // Refresh the booking data
                setSelectedBookings([]); // Clear the selection after deletion
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    } else {
        toast.info('Cancelled');
    }
};

// Single delete handler (for reference, kept the same)
const deleteHandler = (applicationNo) => {
    if (window.confirm('Delete Booking?')) {
        setLoading(true);
        axios
            .delete(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/delete/booking/${applicationNo}`)
            .then((res) => {
                setLoading(false);
                toast.success('Booking deleted');
                fetchBookings();
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    } else {
        toast.info('Cancelled');
    }
};
    if(loading || isloading){
        return <Loading/>
    }
    const showDetails = (data) =>{
        setViewDetails(data);
        setShowModal(true)
    }

    const handleConfirmBooking = async (formData) => {
       if(formData.serviceName == "Room Booking"){
            navigate(`/admin/select/room`, { state: {data:formData } })
       }else{
        setLoading(true);
        try {//https://sporti-backend-live-p00l.onrender.com
            await axios.patch(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/${formData._id}/confirm`);
            // fetchBookings(); // Refresh bookings after confirmation
            setLoading(false);
            toast.success('Accepted the request');
            // window.location.reload();
            fetchBookings();
        } catch (error) {
            setLoading(false);
            toast.success('Accepted the request');
            console.error('Error:', error);
        }
       }
    };

    const handleSuccessPayment = async (formData) => {
        if(formData.serviceName == "Room Booking"){
           if(window.confirm('DO you want to make payment is success')){
            setLoading(true);
            try {//https://sporti-backend-live-p00l.onrender.com
                await axios.patch(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/${formData._id}/success/payment`);
                // fetchBookings(); // Refresh bookings after confirmation
                setLoading(false);
                toast.success('Payemnt is success');
                // window.location.reload();
                fetchBookings();
            } catch (error) {
    
    
                setLoading(false);
                toast.success('Accepted the request');
                console.error('Error:', error);
            }
           }else{
            toast.warning('cancelled')
           }
        }
     };

     const handleRemovePayment = async (formData) => {
        if (formData.serviceName === "Room Booking") { // Use strict equality
          const userConfirmed = window.confirm('Do you want to remove payment?');
      
          if (userConfirmed) {
            setLoading(true);
            try {
              await axios.patch(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/${formData._id}/remove/payment`);
              toast.success('Payment has been removed successfully');
              fetchBookings(); // Refresh bookings after confirmation
            } catch (error) {
              toast.error('Failed to remove payment, please try again later');
              console.error('Error:', error);
            } finally {
              setLoading(false); // Ensure loading is disabled even if there's an error
            }
          } else {
            toast.warning('Operation cancelled');
          }
        }
      };
      

    const handleRejectBooking = async () => {
        setLoading(true);
        try {
            await axios.patch(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/${selectedBooking._id}/reject`, { rejectionReason });
            fetchBookings(); // Refresh bookings after rejection
             setShowModal(false)
            setLoading(false);
            toast.warning('Rejected the request');
        } catch (error) {
            setLoading(false);
            toast.error('Error', error.message);
            console.error('Error:', error);
        }
    };

    const handleShowModal = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

   const resendSMS = async(id)=>{
   await axios.get(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/send/room/sms/${id}`)
   .then((res)=>{
    console.log(res);
    toast.success('Done')
    
   })
   .catch((err)=>{
    console.log(err);
    toast.error('error please try again later..')
   })
   }
   


    const gotoViewDetails = (formData) => {
       if(formData.serviceName == "Room Booking"){
         navigate('/admin/view/room/details', { state: {data:formData } });
       }
       else{
        navigate('/admin/view/service/details', { state: {data:formData } });
       }
  }

  const editRoom = (formData) =>{
    if(formData.serviceName === "Room Booking"){
        navigate(`/admin/edit/rooms/${formData.applicationNo}`)
    }
  }

  const checkOut = async(id) =>{
   try {
    const res =  await axios.patch(`http://localhost:4000/api/sporti/service/${id}/checkout`)
    if(res.status ==200){
        toast.success('check out is success');
    }else{
        toast.error('check out is failed please try again later...');
    }
   } catch (error) {
    toast.error('check out is failed please try again later...');
   }
  }
    return (
        <Container fluid className='dashboard p-3 p-md-5'>
            {/* <div className="filter-buttons">
                    <button onClick={() => setFilterType('daily')} className="main-btn">Daily</button>
                    <button onClick={() => setFilterType('weekly')} className="main-btn">Weekly</button>
                    <button onClick={() => setFilterType('monthly')} className="main-btn">Monthly</button>
                    </div>

                    <CSVLink 
                    data={getFilteredData()}
                    headers={headers}
                    filename={`booking_data_${filterType}_${selectedMonth ? selectedMonth.label : 'all'}.csv`}
                    className="main-btn"
                    >
                    <i class="bi bi-download"></i> Download Data
                    </CSVLink> */}
                    <BookingsDownload bookings={Contextbookings}/>
              <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="card p-2 border-0 d-flex gap-2 flex-row align-items-center mb-4 h-100">
                        <div className="icon">
                        <i>&#8377;</i>
                        </div>
                       <div>
                       <h4 className="fs-5">Monthly Revenue</h4>
                        <h3 className="fs-4">&#8377; {totalRevenue}/-</h3>
                        <p className="fs-6 text-secondary">August 08 2024</p>
                       </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card p-2 border-0 d-flex gap-2 flex-row align-items-center mb-4 h-100">
                        <div className="icon">
                        <i class="bi bi-people"></i>
                        </div>
                       <div>
                       <h4 className="fs-5">Total unique users</h4>
                        <h3 className="fs-4">{data.length}</h3>
                        <p className="fs-6 text-secondary">August 08 2024</p>
                       </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card p-2 border-0 d-flex gap-2 flex-row align-items-center mb-4 h-100">
                        <div className="icon">
                        <i class="bi bi-ui-checks-grid"></i>
                        </div>
                       <div>
                       <h4 className="fs-5">Confirmed Bookings</h4>
                        <h3 className="fs-4">{data.filter((item)=>item.status =="confirmed").length}</h3>
                        <p className="fs-6 text-secondary">August 08 2024</p>
                       </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card p-2 border-0 d-flex gap-2 flex-row align-items-center mb-4 h-100">
                        <div className="icon">
                        <i class="bi bi-people"></i>
                        </div>
                       <div>
                       <h4 className="fs-5">Pending Users</h4>
                        <h3 className="fs-4">{data.filter((item)=>item.status=='pending').length}</h3>
                        <p className="fs-6 text-secondary">August 08 2024</p>
                       </div>
                    </div>
                </div>
            </div>
            <div className="p-2 py-4">
           <h1 className="fs-2">Visual Charts</h1>
           </div>
           <hr />
            <Row className='mt-4'>
                {/* <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Monthly Revenue</Card.Title>
                            <hr />
                            <br />
                            <Line data={revenueChartData} options={{ plugins: { legend: { display: true }, tooltip: { callbacks: { label: function (context) { return context.raw; } } } } }} />
                        </Card.Body>
                    </Card>
                </Col> */}
                <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Monthly Bookings</Card.Title>
                            <hr />
                            <br />
                            {/* {renderProgress(Object.keys(monthlyUsers).length, 'Users')} */}
                           <Bar 
                    data={generateChartData(monthlyUsers, 'Users', colors)} 
                    options={{
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Months', // X-axis label
                                },
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Number of Users', // Y-axis label
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return context.raw;
                                    },
                                },
                            },
                        },
                    }} 
                />

                            {/* {renderTable(monthlyUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="h-100 ">
                        <Card.Body>
                            <Card.Title>Pending Bookings</Card.Title>
                            <hr />
                            <br />
                            {/* {renderProgress(Object.keys(pendingUsers).length, 'Pending Users')} */}
                            <Bar 
    data={generateChartData(pendingUsers, 'Pending Users', colors)} 
    options={{
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Months', // X-axis label
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of Pending Users', // Y-axis label
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw;
                    },
                },
            },
        },
    }} 
/>

                            {/* {renderTable(successfulUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Rejected Bookings</Card.Title>
                            <hr />
                            <br />
                            {/* {renderProgress(Object.keys(rejectedUsers).length, 'Rejected Users')} */}
                            <Bar 
    data={generateChartData(rejectedUsers, 'Rejected Users', colors)} 
    options={{
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Months', // X-axis label
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of Rejected Users', // Y-axis label
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw;
                    },
                },
            },
        },
    }} 
/>

                            {/* {renderTable(successfulUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Successful Payments</Card.Title>
                            <hr />
                            <br />
                            {/* {renderProgress(Object.keys(successfulUsers).length, 'Successful Users')} */}
                            <Bar data={generateChartData(successfulUsers, 'Successful Users', colors)} options={{ 
                                scales: {
                                    x: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Months', // X-axis label
                                        },
                                    },
                                    y: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Number of Successful Users', // Y-axis label
                                        },
                                    },
                                },
                                plugins: { legend: { display: true }, tooltip: { callbacks:{ label: function (context) { return context.raw; } } } } }} />
                            {/* {renderTable(successfulUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Confirmed Bookings</Card.Title>
                            <hr />
                            <br />
                            {/* {renderProgress(Object.keys(successfulPayments).length, 'Successful Payments')} */}
                            <Bar data={generateChartData(successfulPayments, 'Successful Payments', colors)} options={{
                                 scales: {
                                    x: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Months', // X-axis label
                                        },
                                    },
                                    y: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Number of Successful Payments', // Y-axis label
                                        },
                                    },
                                }, plugins: { legend: { display: true }, tooltip: { callbacks: { label: function (context) { return context.raw; } } } } }} />
                            {/* {renderTable(successfulUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Service Types</Card.Title>
                            <hr />
                            <br />
                            <Pie data={generateChartData(serviceTypes, 'Service Types', colors)} options={{ plugins: { legend: { display: true }, tooltip: { callbacks: { label: function (context) { return context.raw; } } } } }} />
                            {renderTable(successfulUsers)}
                        </Card.Body>
                    </Card>
                </Col> */}
                <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Service Names</Card.Title>
                            <hr />
                            <br />
                            <Pie data={generateChartData(serviceNames, 'Service Names', colors)} options={{ plugins: { legend: { display: true }, tooltip: { callbacks: { label: function (context) { return context.raw; } } } } }} />
                            {/* {renderTable(successfulUsers)} */}
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col md={4} className="mb-3">
                    <Card className="h-100  border-0">
                        <Card.Body>
                            <Card.Title>Sporti</Card.Title>
                            <hr />
                            <br />
                            <Pie data={generateChartData(sporti, 'Sporti', colors)} options={{ plugins: { legend: { display: true }, tooltip: { callbacks: { label: function (context) { return context.raw; } } } } }} />
                            {renderTable(successfulUsers)}
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
            <hr />
           {/* <Accordion>
            <Accordion.Item eventKey='1'>
                <Accordion.Header>
                   View SPORTI-1 Rooms Details
                </Accordion.Header>
                <Accordion.Body>
                <AllRooms roomType="VIP" sporti='SPORTI-1'/>
            <AllRooms roomType="Standard" sporti='SPORTI-1'/>
            <AllRooms roomType="Family" sporti='SPORTI-1'/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>
                <Accordion.Header>
                   View SPORTI-2 Rooms Details
                </Accordion.Header>
                <Accordion.Body>
            <AllRooms roomType="Standard" sporti='SPORTI-1'/>
            <AllRooms roomType="Family" sporti='SPORTI-1'/>
                </Accordion.Body>
            </Accordion.Item>
           </Accordion> */}
            <Row className="my-4">
                {/* <Col>
                    <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        options={months}
                        placeholder="Select Month"
                        className='border-1'
                    />
                </Col> */}
               
            </Row>

          
            <div className="row">
                <div className="col-md-12">
                    <div className="all-bookings p-3 p-md-5">
                        <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Recent Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all user with bookings</p>
                        </div>
                        <CSVLink
                        data={filteredData}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'all'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>
                        <>
        <div className="d-flex justify-content-between">
            <button
                className="btn btn-danger mb-3"
                onClick={deleteMultipleBookings}
                disabled={selectedBookings.length === 0}
            >
                Delete Selected
            </button>
        </div>

        {data.length !== 0 ? (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Officers Category</th>
                            <th>Service</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedBookings.includes(item.applicationNo)}
                                        onChange={() => handleCheckboxChange(item.applicationNo)}
                                    />
                                </td>
                                <td>
                                    <img
                                        src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png"
                                        alt=""
                                    />
                                </td>
                                <td>{item.username}</td>
                                <td>{item.serviceName === 'Room Booking' ? item.roomType : item.serviceType}</td>
                                <td>{item.serviceName}</td>
                                <td className="">
                                    <div className="d-flex gap-3 flex-wrap h-100">
                                        <button className="btn btn-dark btn-sm" onClick={() => gotoViewDetails(item)}>
                                            <i className="bi bi-eye-fill"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteHandler(item.applicationNo)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="col-md-3 m-auto">
                <img
                    src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740"
                    className="w-100"
                    alt=""
                />
            </div>
        )}
    </>
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Pending Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="pending").length} pending Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Pending bookings</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.status=="pending")}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'pendingbookings'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>

                        
                      
                     
                 {
                    data.filter((item) => item.status == "pending").length !=0?(
                        <div className="table-container">
                        <table>
                             <tr>
                                 <th>Profile</th>
                                 <th>Name</th>
                                 {/* <th>Cadre</th> */}
                                 <th>Service</th>
                                 <th>Action</th>
                             </tr>
                               {
                                 data.map((item, index)=>(
                                     item.status == "pending"?(
                                         <tr>
                                         {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                         <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                         <td>{item.username}</td>
                                         {/* <td>{item.officerCadre}</td> */}
                                         <td>{item.serviceName}</td>
                                         <td className=''>
                                        <div className="d-flex gap-2">
                                       <span title="confirm booking">
                                       <button className="btn btn-success btn-sm" onClick={()=>handleConfirmBooking(item)}><i class="bi bi-check-lg"></i>Confirm</button>
                                       </span>
                                        <span title="reject booking">
                                        <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i>Reject</button>
                                        </span>
                                        {/* <span title="Send SMS">
                                        <button className="btn btn-dark btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-send"></i></button>
                                        </span> */}
                                        </div>
                                         </td>
                                     </tr>
                                     ):(null)
                                 ))
                             }
                           </table>
                        </div>

                    ):(
                            <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                    )
                 }
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">SPORTI-1 Bookings</h1>
                        <hr />
                        <h1 className="fs-6">   {data.filter((item)=>item.sporti == 'SPORTI-1').length} pending Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all SPORTI-1 bookings</p>
                        </div>
                        <CSVLink
                         data={data.filter((item)=>item.sporti == 'SPORTI-1')}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'pendingbookings'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>

                        
                      
                     
                 {
                    data.filter((item) => item.sporti == 'SPORTI-1').length !=0?(
                        <div className="table-container">
                        <table>
                             <tr>
                                 <th>Profile</th>
                                 <th>Name</th>
                                 {/* <th>Cadre</th> */}
                                 <th>Service</th>
                                 <th>Action</th>
                             </tr>
                               {
                                 data.map((item, index)=>(
                                     item.status == "pending"?(
                                         <tr>
                                         {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                         <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                         <td>{item.username}</td>
                                         {/* <td>{item.officerCadre}</td> */}
                                         <td>{item.serviceName}</td>
                                         <td className=''>
                                        <div className="d-flex gap-2">
                                       <span title="confirm booking">
                                       <button className="btn btn-success btn-sm" onClick={()=>handleConfirmBooking(item)}><i class="bi bi-check-lg"></i>Confirm</button>
                                       </span>
                                        <span title="reject booking">
                                        <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i>Reject</button>
                                        </span>
                                        {/* <span title="Send SMS">
                                        <button className="btn btn-dark btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-send"></i></button>
                                        </span> */}
                                        </div>
                                         </td>
                                     </tr>
                                     ):(null)
                                 ))
                             }
                           </table>
                        </div>

                    ):(
                            <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                    )
                 }
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">SPORTI-2 Bookings</h1>
                        <hr />
                        <h1 className="fs-6">   {data.filter((item)=>item.sporti == 'SPORTI-2').length} pending Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all SPORTI-2 bookings</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.sporti == 'SPORTI-2')}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'pendingbookings'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>

                        
                      
                     
                 {
                    data.filter((item) => item.sporti == 'SPORTI-2').length !=0?(
                        <div className="table-container">
                        <table>
                             <tr>
                                 <th>Profile</th>
                                 <th>Name</th>
                                 {/* <th>Cadre</th> */}
                                 <th>Service</th>
                                 <th>Action</th>
                             </tr>
                               {
                                 data.map((item, index)=>(
                                     item.status == "pending"?(
                                         <tr>
                                         {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                         <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                         <td>{item.username}</td>
                                         {/* <td>{item.officerCadre}</td> */}
                                         <td>{item.serviceName}</td>
                                         <td className=''>
                                        <div className="d-flex gap-2">
                                       <span title="confirm booking">
                                       <button className="btn btn-success btn-sm" onClick={()=>handleConfirmBooking(item)}><i class="bi bi-check-lg"></i>Confirm</button>
                                       </span>
                                        <span title="reject booking">
                                        <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i>Reject</button>
                                        </span>
                                        {/* <span title="Send SMS">
                                        <button className="btn btn-dark btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-send"></i></button>
                                        </span> */}
                                        </div>
                                         </td>
                                     </tr>
                                     ):(null)
                                 ))
                             }
                           </table>
                        </div>

                    ):(
                            <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                    )
                 }
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Confirmed Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="confirmed").length} confirmed Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Confirmed bookings</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.status=="confirmed")}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'confirmedbookings'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>
                        
                      
                        <hr />
                     {
                        data.filter((item)=>item.status == "confirmed").length !=0?(
                          <div className="table-container">
                              <table>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                {/* <th>Cadre</th> */}
                                <th>Service</th>
                                <th>Action</th>
                            </tr>
                              {
                                data.map((item, index)=>(
                                    item.status == "confirmed"?(
                                        <tr>
                                        {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                        <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                        <td>{item.username}</td>
                                        {/* <td>{item.officerCadre}</td> */}
                                        <td>{item.serviceName}</td>
                                        <td className=''>
                                        <div className="d-flex gap-2 flex-nowrap h-100">
                                        <span title="Send SMS">
                                        <button className="btn btn-dark btn-sm"  onClick={() => resendSMS(item._id)}><i class="bi bi-send"></i></button>
                                        </span>
                                        <span title="reject booking">
                                   <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i></button>
                                   </span>
                                        {/* <span title="send reject booking">    <button className="btn btn-success btn-sm"  onClick={() => handleShowModal(item)}>&#8377;<i class="bi bi-check"></i></button></span> */}
                                        <span title="delete confirmed booking"> <button className="btn btn-danger btn-sm" onClick={()=>deleteHandler(item.applicationNo)}><i class="bi bi-trash"></i></button></span>

                                        <span title="Edit confirmed booking"> <button className="btn btn-danger btn-sm" onClick={()=>editRoom(item)}><i class="bi bi-pencil"></i></button></span>
                                      {
                                        item.paymentStatus === 'pending' ||item.paymentStatus === "Pending"?(
                                            <span title="Success Payment"> <button className="btn btn-success btn-sm" onClick={()=>handleSuccessPayment(item)}><i class="bi bi-check"></i></button></span>
                                        ):(null)
                                      }
                                       
                                        </div>
                                        </td>
                                    </tr>
                                    ):(null)
                                ))
                            }
                          </table>
                          </div>
                        )
                        :(
                           <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                        )
                     }
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Booked Rooms Details</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="confirmed").length} Room Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Booked Room Details</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.status=="confirmed")}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'bookedRooms'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>
                       
                        <hr />
                     {
                        data.filter((item)=>item.status == "confirmed").length !=0?(
                          <div className="table-container">
                              <table>
                            <tr>
                                <th>Profile</th>
                                <th>Officer's Name</th>
                                {/* <th>Service Name</th> */}
                                <th>Room Number</th>
                                <th>Room Type</th>
                                <th>Action</th>
                            </tr>
                              {
                                data.map((item, index)=>(
                                    item.status == "confirmed" && item.selectedRoomNumber != ""?(
                                        <tr>
                                        {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                        <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                        <td>{item.username}</td>
                                        {/* <td>{item.officerCadre}</td> */}
                                        {/* <td>{item.serviceName}</td> */}
                                        <td>{item.selectedRoomNumber}</td>
                                        <td>{item.roomType}</td>
                                        <td className=''>
                                        <div className="d-flex gap-2 flex-nowrap h-100">
                                        <span title="Send SMS">
                                        <button className="btn btn-dark btn-sm" onClick={()=>gotoViewDetails(item)}>
                                              <i class="bi bi-eye-fill" ></i>
                                              </button>
                                             </span>
                                        {/* <span title="reject booking">
                                   <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i></button>
                                   </span> */}
                                        {/* <span title="send reject booking">    <button className="btn btn-success btn-sm"  onClick={() => handleShowModal(item)}>&#8377;<i class="bi bi-check"></i></button></span> */}
                                        <span title="delete confirmed booking"> <button className="btn btn-danger btn-sm" onClick={()=>deleteHandler(item.applicationNo)}><i class="bi bi-trash"></i></button></span>

                                       
                                      {/* {
                                        item?.paymentStatus=== 'pending' || item.paymentStatus === "Pending"?(
                                            <span title="Success Payment"> <button className="btn btn-success btn-sm" onClick={()=>handleSuccessPayment(item)}><i class="bi bi-check"></i></button></span>
                                        ):(null)
                                      } */}

                                    {
                                        item.isCheckOut?(null):(<span title="Check out"> <button className="btn btn-success btn-sm" onClick={()=>checkOut(item._id)}><i class="bi bi-check"></i>Check out</button></span>)
                                    }
                                        </div>
                                        </td>
                                    </tr>
                                    ):(null)
                                ))
                            }
                          </table>
                          </div>
                        )
                        :(
                           <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                        )
                     }
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Rejected Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="rejected").length} Rejected Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Rejected bookings</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.status=="rejected")}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'rejectedbookings'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>
                       
                        <hr />
                     {
                        data.filter((item)=>item.status == "rejected").length !=0?(
                           <div className="table-container">
                             <table>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                {/* <th>Cadre</th> */}
                                <th>Service</th>
                                <th>Action</th>
                            </tr>
                              {
                                data.map((item, index)=>(
                                    item.status == "rejected"?(
                                        <tr>
                                        {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                        <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                        <td>{item.username}</td>
                                        {/* <td>{item.officerCadre}</td> */}
                                        <td>{item.serviceName}</td>
                                        <td className=''>
                                       <div className="d-flex gap-2 flex-nowrap">
                                     
                                      
                                     
                                      <span title="Confirm">   <button className="btn btn-success btn-sm" onClick={()=>handleConfirmBooking(item)}><i class="bi bi-check-lg"></i>Confirm</button></span>
                                      <span title="delete rejected booking"> <button className="btn btn-danger btn-sm" onClick={()=>deleteHandler(item.applicationNo)}><i class="bi bi-trash"></i>Delete</button></span>
                                      {/* <span title="Send SMS">
                                   <button className="btn btn-dark btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-send"></i></button>
                                   </span> */}
                                       </div>
                                        </td>
                                    </tr>
                                    ):(null)
                                ))
                            }
                          </table>
                           </div>
                        )
                        :(
                           <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                        )
                     }
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <h1 className="fs-5">Successfull Payments</h1>
                        <h1 className="fs-6"> {data.filter((item)=>item.paymentStatus=="success").length} Successfull Payments</h1>
                        <p className="fs-6 text-secondary">Here you can find all Successfull Payments</p>
                        </div>
                        <CSVLink
                        data={data.filter((item)=>item.paymentStatus=="success")}
                        headers={headers}
                        filename={`booking_data_${selectedMonth ? selectedMonth.label : 'successfullPayments'}.csv`}
                            className="main-btn"
                        >
                            <i class="bi bi-download"></i> Download Data
                        </CSVLink>
                        </div>
                       
                        <hr />
                     {
                        data.filter((item)=>item.paymentStatus == "success").length !=0?(
                           <div className="table-container">
                             <table>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                {/* <th>Cadre</th> */}
                                <th>Service</th>
                                <th>Action</th>
                            </tr>
                              {
                                data.map((item, index)=>(
                                    item.paymentStatus == "success"?(
                                        <tr>
                                        {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                        <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                        <td>{item.username}</td>
                                        {/* <td>{item.officerCadre}</td> */}
                                        <td>{item.serviceName}</td>
                                        <td className=''>
                                       <div className="d-flex gap-2 flex-nowrap">
                                     
                                      
                                     
                                       <span title="reject booking">
                                   <button className="btn btn-danger btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-x-lg"></i></button>
                                   </span>
                                      <span title="delete rejected booking"> <button className="btn btn-danger btn-sm" onClick={()=>deleteHandler(item.applicationNo)}><i class="bi bi-trash"></i></button></span>
                                      <span title="delete rejected booking"> <button className="btn btn-danger btn-sm" onClick={()=>handleRemovePayment(item)}><i class="bi bi-trash"></i>Remove Payment</button></span>
                                      {/* <span title="Send SMS">
                                   <button className="btn btn-dark btn-sm"  onClick={() => handleShowModal(item)}><i class="bi bi-send"></i></button>
                                   </span> */}
                                       </div>
                                        </td>
                                    </tr>
                                    ):(null)
                                ))
                            }
                          </table>
                           </div>
                        )
                        :(
                           <div className="col-md-3 m-auto">
                             <img src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740" className='w-100' alt="" />
                           </div>
                        )
                     }
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                        <h1 className='fs-5
                        
                        '>Mannually Block the Rooms</h1>
                     <BlockRoom/>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="all-bookings p-3 p-md-5">
                        <h1 className='fs-5
                        
                        '>Mannually Clear the Rooms</h1>
                     <ClearRoom/>
                  </div>
                </div>
            </div>

           

            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{viewDetails ? 'Booking Details' : 'Reject Booking'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewDetails ? (
                        <div>
                            <p><strong>Service Type:</strong> {viewDetails.serviceType}</p>
                            <p><strong>Service Name:</strong> {viewDetails.serviceName}</p>
                            <p><strong>Date:</strong> {new Date(viewDetails.eventdate).toLocaleDateString()}</p>
                            <p><strong>Total Cost:</strong> {viewDetails.totalCost}</p>
                        </div>
                    ) : (
                        <Form.Group>
                            <Form.Label>Rejection Reason</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>Close</Button>
                    {!viewDetails && <Button variant="primary" onClick={handleRejectBooking}>Reject</Button>}
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Dashboard;
