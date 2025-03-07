import { Avatar} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../components/popup/Loading';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Modal, ProgressBar, Table } from 'react-bootstrap';
import { BookingContext } from '../../components/hooks/BookingContext';
import ClearRoom from '../../components/dashboards/ClearRoom';
import BlockRoom from '../../components/dashboards/BlockRoom';

function RoomBookings() {
    const { Contextbookings, isloading, error, fetchBookings } = useContext(BookingContext);
    const [data, setData] = useState([]);
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


    
    useEffect(()=>{
        setData(Contextbookings.filter((item)=>item.serviceName === "Room Booking"));
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
//     axios.get('https://sporti-backend-live-3.onrender.com/api/sporti/service/bookings')
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

    const deleteHandler = (applicationNO) =>{
      if(window.confirm('Delete Booking?')){
        setLoading(true)
        axios.delete(`https://sporti-backend-live-p00l.onrender.com/api/sporti/service/delete/booking/${applicationNO}`)
        .then((res)=>{
            setLoading(false)
            toast.success('booking deleted');
            fetchBookings()
        })
        .catch((err)=>{
            setLoading(false)
            toast.error(err.message)
        })
      }else{
        toast.info('cancelled')
      }
    }
    if(loading || isloading){
        return <Loading/>
    }
    const showDetails = (data) =>{
        setViewDetails(data);
        setShowModal(true)
    }

    const handleConfirmBooking = async (formData) => {
       if(formData.serviceName == "Room Booking"){
            navigate(`/select/room`, { state: {data:formData } })
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
         navigate('/view/room/details', { state: {data:formData } });
       }
       else{
        navigate('/view/service/details', { state: {data:formData } });
       }
  }

  const editRoom = (formData) =>{
    if(formData.serviceName === "Room Booking"){
        navigate(`/edit/rooms/${formData.applicationNo}`)
    }
  }
  return (
    <div className='bg-light container-fluid'>
       <div className="row">
                <div className="col-md-12">
                    <div className="all-bookings p-3 p-md-5">
                        <h1 className="fs-5">Recent Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all user with bookings</p>
                        {
                            data.length!=0?(
                                <div className="table-container">
                                <table>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Officers Category</th>
                                        <th>Service</th>
                                        <th>Action</th>
                                    </tr>
                                      {
                                        data.map((item, index)=>(
                                          
                                            
                                            <tr>
                                                {/* <td><Avatar sx={{ bgcolor: "green" }}>{(item.username)}</Avatar></td> */}
                                                <td><img src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png" alt="" /></td>
                                                <td>{item.username}</td>
                                                <td>{item.serviceName =="Room Booking"?item.roomType:item.serviceType}</td>
                                                <td>{item.serviceName}</td>
                                                <td className=''>
                                              <div className="d-flex gap-3 flex-wrap h-100">
                                              {/* <i class="bi bi-pencil-fill fs-4 text-success"></i> */}
                                             <span title="view booking">
                                             <button className="btn btn-dark btn sm" onClick={()=>gotoViewDetails(item)}>
                                              <i class="bi bi-eye-fill" ></i>
                                              </button>
                                             </span>
                                               <button className="btn btn-danger btn-sm" onClick={()=>deleteHandler(item.applicationNo)}> <i class="bi bi-trash" ></i></button>
                                              </div>
                                                </td>
                                            </tr>
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
                        <h1 className="fs-5">Pending Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="pending").length} pending Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Pending bookings</p>
                     
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
                        <h1 className="fs-5">Confirmed Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="confirmed").length} confirmed Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Confirmed bookings</p>
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
                                        (item.paymentStatus).toLowerCase() === 'pending'?(
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
                        <h1 className="fs-5">Rejected Bookings</h1>
                        <h1 className="fs-6">   {data.filter((item)=>item.status=="rejected").length} Rejected Bookings</h1>
                        <p className="fs-6 text-secondary">Here you can find all Rejected bookings</p>
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
                        <h1 className="fs-5">Successfull Payments</h1>
                        <h1 className="fs-6"> {data.filter((item)=>item.paymentStatus=="success").length} Successfull Payments</h1>
                        <p className="fs-6 text-secondary">Here you can find all Successfull Payments</p>
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
    </div>
  )
}

export default RoomBookings