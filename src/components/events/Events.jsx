import React from 'react'
import gallerydata from '../../data/gallery'
import { Link } from 'react-router-dom'
import './style.css'

function Events() {
  return (
    <div className=''>
         <div className="contact-banner">
            {/* <h1 className='fs-1 fw-bold text-center'>About us</h1>
            <p className="fs-6 text-center">
            SPORTI consists of a team of Senior Officers from various units of the Police Department. It also has a Working Committee who conduct various Conferences and Workshops to discuss the operations and functioning of the Institute. The team hosts periodic meetings every last Friday of the month for effective improvements of the Institute.
            </p> */}
             <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2">Events & Gallery</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2">SPORTI</h1>
        </div>
    </div>
    </div>

      <div className="event-categories p-3 p-md-5">
                <div className="row">
                   {
                    gallerydata.map((eventItem, eventIndex)=>(
                        <div className="col-12 col-md-4 mb-3" key={eventIndex}>
                        <div className="event-card text-center rounded-2 h-100 overflow-hidden bg-white">
                            <div className="event-card-top">
                                <img src={eventItem.image} alt={eventItem.title} className='w-100 mb-2'/>
                            </div>
                            <div className="event-card-body p-3">
                                <p className=" fs-4">{eventItem.title}</p>
                                <Link to={`/gallery/${eventItem.id}`} className="blue-btn rounded-1">View Images</Link>
                            </div>
                            <div className="event card-footer d-flex justify-content-between">
                                
                            </div>
                        </div>
                    </div>
                    ))
                   }
                </div>
            </div>
    </div>
  )
}

export default Events