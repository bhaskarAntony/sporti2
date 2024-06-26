import React, { useEffect, useState } from 'react'
import './style.css'
import Feedback from '../../components/feedback/Feedback'
import { useParams } from 'react-router-dom';
import contactInfo from '../../data/contactinfo';
import Loading from '../../components/popups/Loading';

function Contact() {
  const { sporti } = useParams(); // Destructure sporti from useParams()
  const [contact, setContact] = useState(null); // Initialize service state with null

  useEffect(() => {
    // Fetch and set service based on sporti parameter
    setContact(contactInfo[sporti]);
  }, [sporti]); // Trigger effect whenever sporti changes

  if (!contact) {
    return <Loading/>; // Render loading indicator while data is being fetched
  }

  return (
    <div className='contact'>
   <div className={`contact-banner'}`}>
    <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2 fw-bold">CONTACT US</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2 fw-bold">{contact.title}</h1>
        </div>
    </div>
   </div>

   <div className="contact-info p-4">
    <div className="row">
      {
        contact.info.map((item, index)=>(
          <div className={`col-12 col-md-4 contact-main-card mb-3  `}>
            <div className="contact-card text-white p-3 h-100 rounded-2">
              <i className={`bi bi-${item.icon} display-2 mb-3`}></i>
              <h1 className="fs-3 fw-bold">{item.title}</h1>
              <p className="fs-5 mt-3">{item.desc}</p>
            </div>
          </div>
        ))
      }
    </div>
   </div>

   <div className="contact-map">
   <iframe src={contact.location} width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   </div>
   <div className="feedback text-center p-3">
   <i class="bi bi-stars fs-2 text-warning"></i>
   <h1 className="fs-2 fw-bold">WRITE TO US</h1>
   <span className="fs-6 subtitle d-block text-center">FEEL FREE TO SEND US A MESSAGE</span>
   </div>


   {/* <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
        <div className="contact-from p-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="from-group mt-3">
              <input type="text" placeholder='FULL NAME' />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="from-group mt-3">
              <input type="email" placeholder='EMAIL ADDRESS' />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="from-group mt-3">
              <input type="text" placeholder='SPORTI' value={data.title} readOnly />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="from-group mt-3">
              <input type="text" placeholder='SUBJECT' />
            </div>
          </div>

          <div className="col-12">
            <div className="from-group mt-3">
              <textarea name="" id="" cols="30" rows="10" placeholder='MESSAGE'></textarea>
            </div>
          </div>
          <div className="form-group mt-4 text-center">
            <button className="blue-btn">Submit</button>
          </div>
        </div>
     </div>
  
        </div>
      </div> */}
  
  <Feedback sporti={contact.title}/>
    </div>
  )
}

export default Contact